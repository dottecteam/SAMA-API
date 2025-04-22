from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_secretary import Secretary
from functools import wraps

class SecretaryController:
    def loginRequired(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'secretary' not in session:
                return redirect(url_for('certificates_access'))
            return f(*args, **kwargs)
        return decorated_function

    def loginSecretary():
        try:
            password = request.form.get('input-password-secretary')
            secretary=Secretary()
            response = secretary.login(password)
            if response:
                return jsonify({"status": True,"message": "Secretaria logada com sucesso!"}), 200
            else:
                return jsonify({"status": False, "message": "Senha incorreta."}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False,"message": "Erro ao logar secretaria!"}), 400 