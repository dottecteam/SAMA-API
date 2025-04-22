import os
from app import app
import uuid
from app.utilities.ut_cryptography import Criptography

class Teams:
    #Caminho do arquivo .txt
    srcData = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "teams", "teams.txt")

    #Construtor da classe
    def __init__(self, team='', master='', pOwner='', password='', EmMaster='', EmPOwner='', id=''):
        self.team = team
        self.master = master
        self.pOwner = pOwner
        self.password=password
        self.EmMaster=EmMaster
        self.EmPOwner=EmPOwner
        self.id=id

    #Funções de salvar dados
    #Função para salvar os dados no arquivo .txt
    def saveDataTeam(self, team, master, pOwner, password, EmMaster, EmPOwner):
        try:
            idTeam = str(uuid.uuid4())
            with open(self.srcData, "a", encoding="utf-8") as file:
                line=Criptography.encrypt(f"{idTeam};{team};{master};{pOwner};{password};{EmMaster};{EmPOwner};Pendente")
                file.write(f"{line}\n")
                return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    #Funções de ler os dados
    #Função para ler todos os atestados
    def readTeam(self):
        teams = [] 
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                lines = file.readlines()
            
                for line in lines:
                    data = Criptography.decrypt(line).strip().split(";")
                    if data and len(data) >= 7:
                        team = Teams(
                            id=data[0],
                            team=data[1],
                            master=data[2],
                            pOwner=data[3],
                            password=data[4],
                            EmMaster=data[5],
                            EmPOwner=data[6]
                        )
                        teams.append(team)
                return teams
        except FileNotFoundError:
            return False
        
    #Atualizar a situação de um atestado
    # def updateStatus(self, status, id):
    #     teams = []
    #     try:
    #         with open(self.srcData, "r", encoding="utf-8") as file:
    #             for team in file:
    #                 teams = Criptography.decrypt(team).strip().split(';')
    #                 if certificate[0] == id:
    #                     certificate[9] = status 
    #                 certificates.append(';'.join(certificate)) 

    #         with open(self.srcData, "w", encoding="utf-8") as file:
    #             for line in certificates:
    #                 line=Criptography.encrypt(line)
    #                 file.write(f'{line}\n')
    #         return True
    #     except:
    #         return False