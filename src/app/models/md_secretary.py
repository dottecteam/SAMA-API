from flask import session
from app import secretary_password

class Secretaria:
    password = secretary_password

    def logar(senha):
        if senha == Secretaria.password:
            session['secretaria'] = senha
            return True
        else:
            return False