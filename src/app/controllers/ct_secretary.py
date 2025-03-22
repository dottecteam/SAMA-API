from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_secretary import Secretaria
from functools import wraps

def login_required_secretaria(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'secretaria' not in session:
            return redirect(url_for('acesso_secretaria'))
        return f(*args, **kwargs)
    return decorated_function

def logar_secretaria():
    try:
        senha = request.form.get('senha')
        response = Secretaria.logar(senha)
        print(response)
        if response:
            print("aqui")
            return jsonify({"status": True,"mensagem": "Secretaria logada com sucesso!"}), 200
        else:
            return jsonify({"status": False, "mensagem": "Senha incorreta."}), 400
    except Exception as e:
        print(e)
        return jsonify({"status": False,"mensagem": "Erro ao logar secretaria!"}), 400