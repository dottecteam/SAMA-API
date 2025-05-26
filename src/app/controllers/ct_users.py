from flask import render_template, request, redirect, url_for, jsonify, session
from app.utilities.ut_validation import Validation
from app.models.md_users import Users
from app.models.md_teams import Teams
from app.models.md_certificates import Certificates
from functools import wraps
from app.models.md_log import Log

class UserController:
    def dataValidation():
        try:
            session.clear()
            session['name'] = request.form['input-name-form-users']
            session['email'] = request.form['input-email-form-users']
            session['course'] = request.form['select-course-form-users']
            session['semester'] = request.form['select-semester-form-users']
            session['password']=request.form['input-password-form-users']
            session['confirmPassword']=request.form['input-confirm-password-form-users']

            if Validation.UserIsRegistered(session['email']) == True:
                session.clear()
                return jsonify({"status": False, "message": "Usuário já cadastrado!"}), 400
            
            
            if Validation.validePassword(session["password"], session["confirmPassword"]) == False:
                session.clear()
                return jsonify({"status": False, "message": "As senhas não coincidem."}), 400

            if Validation.sendEmail(session['email']) == False:
                session.clear()
                return jsonify({"status": False, "message": "Erro ao enviar email!"}), 400
            
            return jsonify({"status": True, "message": "Código enviado com sucesso!"}), 200
        except Exception as e:
            print(f"Error: {e}")
            session.clear()
            return jsonify({"status": False, "message": "Erro ao validar dados!"}), 500
    
    def registerUser():
        code = request.form['input-code-form-users']
        try:
            if code != session['code']:
                return jsonify({"status": False, "message": "Código incorreto!"}), 400
            user=Users()
            response=user.saveData(name=session['name'],email=session['email'],course=session['course'],semester=session['semester'],password=session['password'])
            if response != True:
                session.clear()
                return jsonify({"status": False, "message": "Erro ao salvar dados!"}), 400
            Log().register(operation=f'User: Register Account ({session['email']})')
            session.clear()
            return jsonify({"status": True, "message": "Atestado cadastrado com sucesso!"}), 200 
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao cadastrar atestado!"}), 400

    def loginUser():
        try:
            session.clear()

            email=request.form.get('input-user-form-login')
            password=request.form.get('input-password-form-login')
            user=Users()
            response=user.login(email,password)
            if response:
                Log().register(operation=f'User: Login')
                return jsonify({"status": True,"message": "Logado com sucesso!"}), 200
            else:
                Log().register(operation=f'User: Login Attempt')
                return jsonify({"status": False, "message": "Credenciais inválidas."}), 400
        except Exception as e:
            print(f"Error: {e}")
            Log().register(operation=f'User: Login Attempt')
            return jsonify({"status": False,"message": "Erro ao logar!"}), 500
        
    def loginRequired(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user' not in session:
                return redirect(url_for('home'))
            return f(*args, **kwargs)
        return decorated_function
    
    def changeInformation():
        password = request.form['password']
        new_name = request.form['new_name']
        email = request.form['email']
        new_course = request.form['new_course']
        new_semester = request.form['new_semester']
                
        if password != session['user']['password']:
            return jsonify({'status': False, 'message': 'Senha Incorreta'})
                
        else:
            response = Users.change_information(email, new_name, new_course, new_semester)
            if not response:
                return jsonify({'status': False, 'message': 'Erro ao alterar dados'})
            response = Certificates.changePersonalData(name = new_name, email = email, course = new_course, semester = new_semester)
            Log().register(operation=f'User: Change Data')
            return jsonify({'status': True, 'message': 'Dados alterados com sucesso!'})
        
    def deleteValidation():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if password != session['user']['password']:
            Log().register(operation=f'User: Delete Account Attempt')
            return jsonify({'status': False, 'message': 'Senha Incorreta'})

        if Validation.sendEmail(email):
            return jsonify({"status": True, "message": "Email enviado com sucesso!"})
        else:
            Log().register(operation=f'User: Delete Account Attempt')
            return jsonify({"status": False, "message": "Erro ao enviar email!"}), 400

        
    def deleteAccount():
        try:
            data = request.get_json()
            email = data.get('email')
            code = data.get('code')

            if not Validation.confirmEmail(code):
                Log().register(operation=f'User: Delete Account Attempt')
                return jsonify({"status": False, "message": "Código incorreto!"}), 400
            
            if Users.delete_account(email):
                if Certificates.deleteAllDataByEmail(Certificates, email):
                    Log().register(operation=f'User Account: Delete Account')
                    session.clear()
                    return jsonify({"status": True, "message": "Conta excluída com sucesso!"}) 
            Log().register(operation=f'User: Delete Account Attempt')  
            return jsonify({"status": False, "message": "Erro ao excluir conta"})
        except:
            Log().register(operation=f'User: Delete Account Attempt')
            return jsonify({"status": False, "message": "Erro ao excluir conta"})
            
    def changePassword():
        email = session['user']['email']
        senha_atual = request.form['senha_atual']
        nova_senha = request.form['nova_senha']
        confirmar_senha = request.form['confirmar_senha']

        if session['user']['password'] != senha_atual:
            return jsonify({'success': False, 'message': 'Senha Incorreta'})
        if nova_senha != confirmar_senha:
            return jsonify({'success': False, 'message': 'As novas senhas não coincidem'})
        if nova_senha == session['user']['password']:
            return jsonify({'success': False, 'message': 'Nova senha igual senha atual'})
        
        response = Users.change_password(email, nova_senha)
        Log().register(operation=f'User: Change Password')
        return jsonify({'message': response})
    
    def isLogged():
        try:
            if session['user']:
                return jsonify({"status": True,"message": "Está logado!"})
            else:
                return jsonify({"status": False,"message": "Não está logado!"})
        except:
            return jsonify({"status": False,"message": "Não está logado!"})

    def getTeamData():
        try:
            teams = Teams
            email = session['user']['email']
            team = teams.getTeamByEmail(Teams, email)
            return team
        except Exception as e:
            print(f"Error: {e}")
            return e
