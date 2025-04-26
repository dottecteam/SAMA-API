import uuid
from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_teams import Teams
from app.utilities.ut_validation import Validation
from app.utilities.ut_cryptography import Criptography
import json

class TeamsController:

    #Função que recebe os dados
    def registerTeam():
        try:
            team = request.form['input-nome-form-equipe']
            master = request.form['input-nome-form-scmaster']
            pOwner = request.form['input-nome-form-po']
            password = request.form['input-password-form']
            EmMaster = request.form['input-email-form-scmaster']
            EmPOwner = request.form['input-email-form-po']

            # Recebe os desenvolvedores como listas
            dev_nomes = request.form.getlist('dev_name[]')
            dev_emails = request.form.getlist('dev_email[]')

            teams=Teams()
            
            if teams.saveDataTeam(team, master, pOwner, password, EmMaster, EmPOwner, dev_nomes, dev_emails):
                return jsonify({"status": True, "mensagem": "Equipe cadastrada com sucesso!"}), 200
            else:
                return jsonify({"status": False, "mensagem": "Erro ao cadastrar equipe."}), 400
        #Validações
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao validar data!"}), 500
        

    #Função para ler os dados
    def readTeam():
        teams=Teams()
        return teams.readTeam()
        
        

        
    def updateCertificate():
        data = request.get_json()
        status = data.get('status')
        id = data.get('id')
        if Teams().updateStatus(status, id):
            return jsonify({"mensagem": "Status atualizado com sucesso!"}), 200
        else:
            return jsonify({"mensagem": "Erro ao atualizar status."}), 500
            
    

        

        
        
       
            
    
         




    
 