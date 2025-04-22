import os
from app.utilities.ut_cryptography import Criptography
from flask import session

class Users:
    #Caminho do arquivo .txt
    srcData = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "users", "users.txt")

    #Construtor da classe
    def __init__(self, name='', email='', course='', semester='', password=''):
        self.name = name
        self.email = email
        self.course = course
        self.semester=semester
        self.password=password
    
    #Função para salvar dados
    def saveData(self, name, email, course, semester, password):
        try:
            users=self.readUser(email)
            if len(users)>0:
                return False
            data=Criptography.encrypt(linha=f"{name};{email};{course};{semester};{password}")
            with open(self.srcData, "a", encoding="utf-8") as file:
                file.write(f"{data}\n")
                return True
        except Exception as e:
            print(f"Error: {e}")
            return False
        
    #Função para ler o usuario
    def readUser(self, email):
        users = []
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                lines = file.readlines()
                for line in lines:
                    data=Criptography.decrypt(line).strip().split(';')
                    if data and data[1]==email and len(data)>=5:
                        user=Users(
                            name=data[0],
                            email=data[1],
                            course=data[2],
                            semester=data[3],
                            password=data[4]
                        )
                        users.append(user)
                return users
        except FileNotFoundError as e:
            print(f"Error: {e}")
            return False

    #Função para logar na conta
    def login(self,email,password):
        user=self.readUser(email)
        if user[0].password==password:
            session['user'] = {
                'name':user[0].name,
                'email':user[0].email,
                'course':user[0].course,
                'semester':user[0].semester,
                'password':user[0].password
            }
            return True
        else:
            return False

