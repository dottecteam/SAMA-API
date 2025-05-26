from flask import session
from src.app import secretary_password

class Secretary:
    def __init__(self):
        self.password = secretary_password

    def login(self, password):
        if password == self.password:
            session['secretary'] = password
            return True
        else:
            return False