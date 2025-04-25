from flask import render_template, request, redirect, url_for, jsonify, session
from app.utilities.ut_validation import Validation
from app.models.md_users import Users
from functools import wraps

class UserController:
    def dataValidation():
        try:
            session['name'] = request.form['input-name-form-users']
            session['email'] = request.form['input-email-form-users']
            session['course'] = request.form['select-course-form-users']
            session['semester'] = request.form['select-semester-form-users']
            session['password']=request.form['input-password-form-users']
            session['confirmPassword']=request.form['input-confirm-password-form-users']

            if Validation.validePassword(session['password'],session['confirmPassword'])==False:
                session.clear()
                return jsonify({"status": False, "message": "Erro ao validar senha!"}), 400
            
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
            session.clear()
            return jsonify({"status": True, "message": "Atestado cadastrado com sucesso!"}), 200 
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao cadastrar atestado!"}), 400

    def loginUser():
        try:
            email=request.form.get('input-user-form-login')
            password=request.form.get('input-password-form-login')
            user=Users()
            response=user.login(email,password)
            if response:
                return jsonify({"status": True,"message": "Logado com sucesso!"}), 200
            else:
                return jsonify({"status": False, "message": "Credenciais inválidas."}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False,"message": "Erro ao logar!"}), 400
        
    def loginRequired(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user' not in session:
                return redirect(url_for('home'))
            return f(*args, **kwargs)
        return decorated_function

    def changePassword():
        email = session['user']['email']
        senha_atual = request.form['senha_atual']
        nova_senha = request.form['nova_senha']
        confirmar_senha = request.form['confirmar_senha']

        if session['user']['password'] != senha_atual:
            return jsonify({'success': False, 'mensagem': 'Senha Incorreta'})
        if nova_senha != confirmar_senha:
            return jsonify({'success': False, 'mensagem': 'As novas senhas não coincidem'})
        
        response = Users.change_password(email, nova_senha)
        return jsonify({'mensagem': response})
    
    def isLogged():
        try:
            if session['user']:
                return jsonify({"status": True,"message": "Está logado!"})
            else:
                return jsonify({"status": False,"message": "Não está logado!"})
        except:
            return jsonify({"status": False,"message": "Não está logado!"})
