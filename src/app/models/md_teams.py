import os
from app import app
import shortuuid
import json
from app.utilities.ut_cryptography import Criptography
from datetime import datetime
from flask import session

class Teams:
    #Caminho do arquivo .txt
    srcData = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "teams", "teams.txt")
    evaluationsData = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "teams", "evaluations.txt")

    #Construtor da classe
    def __init__(self, team='', password='', master='', EmMaster='', pOwner='', EmPOwner='', devs=None, id='', img=''):
        self.team = team
        self.password=password
        self.master=master
        self.EmMaster=EmMaster
        self.pOwner=pOwner
        self.EmPOwner=EmPOwner
        self.devs = devs if devs else []
        self.id=id
        self.img=img

    #Funções de salvar dados
    #Função para salvar os dados no arquivo .txt
    def saveDataTeam(self, team, password, master, EmMaster, pOwner, EmPOwner, devs):
        try:
            idTeam = str(shortuuid.uuid())
      
            # Formata os dados antes de criptografar
            plain_data = {
                "id": idTeam,
                "team": team,
                "password": password,
                'master': master,
                "EmMaster": EmMaster,
                'pOwner': pOwner,
                "EmPOwner": EmPOwner,
                "devs": devs,
                "img": 'default.jpg'
            }
            
            # Converte para JSON formatado (para legibilidade no arquivo)
            json_data = json.dumps(plain_data, indent=2, ensure_ascii=False)
            
            # Criptografa o JSON completo
            encrypted_data = Criptography.encrypt(json_data)
            
            # Salva no arquivo com organização visual
            with open(self.srcData, "a", encoding="utf-8") as file:
                file.write(f"{encrypted_data}\n")
            return True
        except Exception as e:
            print(f"Erro ao salvar equipe: {e}")
            return False

    #Funções de ler os dados
    #Função para ler todos os times
    def readTeam(self):
        teams = []
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                lines = file.readlines()
                for line in lines:
                    decrypted = Criptography.decrypt(line)
                    team_data = json.loads(decrypted)
                    
                    teams.append(Teams(
                        id=team_data["id"],
                        team=team_data["team"],
                        password=team_data["password"],
                        master=team_data["master"],
                        EmMaster=team_data["EmMaster"],
                        pOwner=team_data["pOwner"],
                        EmPOwner=team_data["EmPOwner"],
                        devs=team_data["devs"],
                        img=team_data['img']
                    )) 
            return teams
        except FileNotFoundError:
            print("Arquivo de equipes não encontrado. Criando novo...")
            return []
        
    #Função de Login
    def login(self, id,password):
        try:
            print(id,password)
            teams=self.readTeam()
            for team in teams:
                if team.id==id and team.password==password:
                    session['team']={
                        'id': team.id,
                        'team': team.team,
                        'master': team.master,
                        'EmMaster': team.EmMaster,
                        'pOwner': team.pOwner,
                        'EmPOwner': team.EmPOwner,
                        'devs': team.devs,
                        'img':team.img
                    }
                    return True
            return False
        except Exception as e:
            print(f"Error: {e}")
            return False
    
    #Função de editar equipe
    def update_team(self, team_id, new_team_name, new_master, new_pOwner, new_EmMaster, new_EmPOwner, new_devs, new_img):
        try:
            teams = self.readTeam()
            with open(self.srcData, "w", encoding="utf-8") as file: 
                for team in teams:
                    if team.id == team_id:
                        team.team = new_team_name
                        team.master = new_master
                        team.pOwner = new_pOwner
                        team.EmMaster = new_EmMaster
                        team.EmPOwner = new_EmPOwner
                        team.devs = new_devs
                        team.img=new_img
                    
                    plain_data = {
                        "id": team.id,
                        "team": team.team,
                        "master": team.master,
                        "pOwner": team.pOwner,
                        "password": team.password,
                        "EmMaster": team.EmMaster,
                        "EmPOwner": team.EmPOwner,
                        "devs": team.devs,
                        'img':team.img
                    }
                    
                    json_data = json.dumps(plain_data, indent=2, ensure_ascii=False)
                    encrypted_data = Criptography.encrypt(json_data)
                    file.write(f"{encrypted_data}\n")
            return True
        except Exception as e:
            print(f"Erro ao atualizar equipe: {e}")
            return False 
        
    #Função para salvar avaliações encriptadas
    def save_evaluations(self, evaluations):
        try:
            data = {
                'id': session['team']['id'], #Salva o ID da equipe para identificação
                'team': session['team']['team'],
                'evaluations': evaluations,
                'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S') #Data/hora de envio de avaliações
                }
            json_data = json.dumps(data, indent=2, ensure_ascii=False)
            encrypted_data = Criptography.encrypt(json_data)

            with open(self.evaluationsData, 'a', encoding='utf-8') as file:
                file.write(f"{encrypted_data}\n")
            return True
        except:
            return False
        
    #Retorna uma lista com todas as avaliações decrypitadas
    def readEvaluations(self):
        try:
            with open(self.evaluationsData, 'r', encoding='utf-8') as file:
                evaluations = [linha.strip() for linha in file.readlines()]
            decrypted_evaluations = []
            for evaluation in evaluations:
                decrypted = Criptography.decrypt(evaluation)
                decrypted_evaluations.append(json.loads(decrypted))
            return decrypted_evaluations
        except:
            return None
    
    #Retorna todas as avaliações de uma equipe baseado no ID
    def readEvaluationsById(self, id):
        try:
            evaluations = self.readEvaluations()
            filtered = []
            for evaluation in evaluations:
                if evaluation['id'] == id:
                    filtered.append(evaluation)
            return filtered
        except:
            return None
