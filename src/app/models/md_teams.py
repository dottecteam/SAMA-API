import os
from app import app
import shortuuid
import json
from app.utilities.ut_cryptography import Criptography
from flask import session

class Teams:
    #Caminho do arquivo .txt
    srcData = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "teams", "teams.txt")

    #Construtor da classe
    def __init__(self, team='', master='', pOwner='', password='', EmMaster='', EmPOwner='', devs=None, id=''):
        self.team = team
        self.master = master
        self.pOwner = pOwner
        self.password=password
        self.EmMaster=EmMaster
        self.EmPOwner=EmPOwner
        self.devs = devs if devs else []
        self.id=id

    #Funções de salvar dados
    #Função para salvar os dados no arquivo .txt
    def saveDataTeam(self, team, master, pOwner, password, EmMaster, EmPOwner, dev_nomes, dev_emails):
        try:
            idTeam = str(shortuuid.uuid())
            devs = [{"nome": nome, "email": email} for nome, email in zip(dev_nomes, dev_emails)]
            
            # Formata os dados antes de criptografar
            plain_data = {
                "id": idTeam,
                "team": team,
                "master": master,
                "pOwner": pOwner,
                "password": password,
                "EmMaster": EmMaster,
                "EmPOwner": EmPOwner,
                "status": "Pendente",
                "devs": devs
            }
            
            # Converte para JSON formatado (para legibilidade no arquivo)
            json_data = json.dumps(plain_data, indent=2, ensure_ascii=False)
            
            # Criptografa o JSON completo
            encrypted_data = Criptography.encrypt(json_data)
            
            # Salva no arquivo com organização visual
            with open(self.srcData, "a", encoding="utf-8") as file:
                file.write("--- INÍCIO DA EQUIPE ---\n")
                file.write(f"{encrypted_data}\n")
                file.write("--- FIM DA EQUIPE ---\n\n")  # 2 quebras de linha para separação
            return True
        except Exception as e:
            print(f"Erro ao salvar equipe: {e}")
            return False

    #Funções de ler os dados
    #Função para ler todos os atestados
    def readTeam(self):
        teams = []
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                current_block = []
                recording = False
                
                for line in file:
                    line = line.strip()
                    
                    if line == "--- INÍCIO DA EQUIPE ---":
                        current_block = []
                        recording = True
                    elif line == "--- FIM DA EQUIPE ---" and recording:
                        try:
                            encrypted_data = "\n".join(current_block)
                            decrypted = Criptography.decrypt(encrypted_data)
                            team_data = json.loads(decrypted)
                            
                            teams.append(Teams(
                                id=team_data["id"],
                                team=team_data["team"],
                                master=team_data["master"],
                                pOwner=team_data["pOwner"],
                                password=team_data["password"],
                                EmMaster=team_data["EmMaster"],
                                EmPOwner=team_data["EmPOwner"],
                                devs=team_data["devs"]
                            ))
                        except Exception as e:
                            print(f"Erro ao processar bloco: {e}")
                        finally:
                            recording = False
                    elif recording:
                        current_block.append(line)
                        
            return teams
        except FileNotFoundError:
            print("Arquivo de equipes não encontrado. Criando novo...")
            return []
        
    def login(self, id,password):
        try:
            print(id,password)
            teams=self.readTeam()
            for team in teams:
                print(team)
                if team.id==id and team.password==password:
                    session['team']={
                        'id': team.id,
                        'team': team.team,
                        'master': team.master,
                        'pOwner': team.pOwner,
                        'EmMaster': team.EmMaster,
                        'EmPOwner': team.EmPOwner,
                        'devs': team.devs
                    }
                    return True
            return False
        except Exception as e:
            print(f"Error: {e}")
            return False
        