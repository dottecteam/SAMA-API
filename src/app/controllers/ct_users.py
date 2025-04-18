from flask import render_template, request, redirect, url_for, jsonify, session
from app.controllers.ct_validation import Validade
from app.models.md_users import Users
from functools import wraps

def validar_email_usuario():
    try:
        session['nome'] = request.form['input-nome-form-users']
        session['email'] = request.form['input-email-form-users']
        session['curso'] = request.form['input-curso-form-users']
        session['semestre'] = request.form['select-form-users']
        session['senha']=request.form['input-senha-form-users']
        session['confirmarsenha']=request.form['input-confirmarsenha-form-users']

        if session['senha']!=session['confirmarsenha']:
            session.clear()
            return jsonify({"status": False, "mensagem": "Senhas diferentes!"}), 400
        
        if Validade.enviar_codigo(session['email']) == False:
           session.clear()
           return jsonify({"status": False, "mensagem": "Erro ao enviar email!"}), 400
        
        return jsonify({"status": True, "mensagem": "Código enviado com sucesso!"}), 200
    except Exception as e:
        print(e)
        session.clear()
        return jsonify({"status": False, "mensagem": "Erro ao validar dados!"}), 500
    
def cadastrar_usuario():
    codigo = request.form['input-codigo-form-users']
    try:
        if codigo != session['codigo']:
            return jsonify({"status": False, "mensagem": "Código incorreto!"}), 400
        response=Users.salvar_dados(nome=session['nome'],email=session['email'],curso=session['curso'],semestre=session['semestre'],senha=session['senha'])
        if response != True:
            session.clear()
            return jsonify({"status": False, "mensagem": "Erro ao salvar dados!"}), 400
        session.clear()
        return jsonify({"status": True, "mensagem": "Atestado cadastrado com sucesso!"}), 200 
    except Exception as e:
        print(e)
        return jsonify({"status": False, "mensagem": "Erro ao cadastrar atestado!"}), 400

def login_user():
    try:
        email=request.form.get('input-user-form-login')
        senha=request.form.get('input-password-form-login')
        response=Users.login(email,senha)
        if response:
            return jsonify({"status": True,"mensagem": "Logado com sucesso!"}), 200
        else:
            return jsonify({"status": False, "mensagem": "Credenciais inválidas."}), 400
    except Exception as e:
        print(e)
        return jsonify({"status": False,"mensagem": "Erro ao logar!"}), 400
    
def login_required_user(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'usuario' not in session:
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function