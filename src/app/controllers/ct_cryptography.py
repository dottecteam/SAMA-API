from cryptography.fernet import Fernet
from app import cripto_key

class Criptography:
    fernet=Fernet(cripto_key)

    def criptografar(linha):
        return Criptography.fernet.encrypt(linha.encode()).decode()

    def decriptografar(linha):
        return Criptography.fernet.decrypt(linha.encode()).decode()
