import os
from app.controllers.ct_cryptography import Criptography

class Users:
    #Caminho do arquivo .txt
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "usuarios", "usuarios.txt")

    def __init__(self, nome, email, curso, semestre):
        self.nome = nome
        self.email = email
        self.curso = curso
        self.semestre=semestre
    
    def salvar_dados(nome, email, curso, semestre, senha):
        try:
            dados=Criptography.criptografar(linha=f"{nome};{email};{curso};{semestre};{senha}")
            with open(Users.caminho_arquivo, "a", encoding="utf-8") as arquivo:
                arquivo.write(f"{dados}\n")
                return True
        except Exception as e:
            print(f"Erro ao salvar os dados: {e}")
            return False