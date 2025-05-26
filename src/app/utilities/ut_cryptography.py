from cryptography.fernet import Fernet
from src.app import cripto_key

class Criptography:
    fernet=Fernet(cripto_key)

    def encrypt(linha):
        return Criptography.fernet.encrypt(linha.encode()).decode()

    def decrypt(linha):
        return Criptography.fernet.decrypt(linha.encode()).decode()
