from flask import session

class Secretaria:
    password = 'secretaria@2025'

    def logar(senha):
        if senha == Secretaria.password:
            session['secretaria'] = senha
            return True
        else:
            return False