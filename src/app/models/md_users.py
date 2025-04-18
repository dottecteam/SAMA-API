import os
from app.controllers.ct_cryptography import Criptography
from flask import session

class Users:
    #Caminho do arquivo .txt
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "usuarios", "usuarios.txt")

    def __init__(self, nome, email, curso, semestre, senha):
        self.nome = nome
        self.email = email
        self.curso = curso
        self.semestre=semestre
        self.senha=senha
    
    def salvar_dados(nome, email, curso, semestre, senha):
        try:
            usuarios=Users.ler_usuario(email)
            if len(usuarios)>0:
                return False
            dados=Criptography.criptografar(linha=f"{nome};{email};{curso};{semestre};{senha}")
            with open(Users.caminho_arquivo, "a", encoding="utf-8") as arquivo:
                arquivo.write(f"{dados}\n")
                return True
        except Exception as e:
            print(f"Erro ao salvar os dados: {e}")
            return False
        
    def ler_usuario(email):
        usuarios = []
        try:
            with open(Users.caminho_arquivo, "r", encoding="utf-8") as arquivo:
                linhas = arquivo.readlines()
                for linha in linhas:
                    dados=Criptography.decriptografar(linha).strip().split(';')
                    if dados and dados[1]==email and len(dados)>=5:
                        usuario=Users(
                            nome=dados[0],
                            email=dados[1],
                            curso=dados[2],
                            semestre=dados[3],
                            senha=dados[4]
                        )
                        usuarios.append(usuario)
                return usuarios
        except FileNotFoundError:
            return False

    def login(email,senha):
        usuarios=Users.ler_usuario(email)
        if usuarios[0].senha==senha:
            session['usuario'] = {
                'nome':usuarios[0].nome,
                'email':usuarios[0].email,
                'curso':usuarios[0].curso,
                'semestre':usuarios[0].semestre,
                'senha':usuarios[0].senha
            }
            return True
        else:
            return False

