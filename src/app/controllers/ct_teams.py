from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_teams import Teams
from functools import wraps

class TeamsController:
    def loginRequired(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'team' not in session:
                return redirect(url_for('teams_access'))
            return f(*args, **kwargs)
        return decorated_function
    
    def loginTeam():
        try:
            id=request.form.get('input-id-team')
            password = request.form.get('input-password-team')
            teams=Teams()
            response = teams.login(id,password)
            if response:
                return jsonify({"status": True,"message": "Equipe logada com sucesso!"}), 200
            else:
                return jsonify({"status": False, "message": "Credenciais incorretas."}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False,"message": "Erro ao logar equipe!"}), 400 

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
    def readAllTeams():
        teams=Teams()
        return teams.readTeam()
        
    def readTeamById():
        try:
            teams=Teams().readTeam()
            for team in teams:
                if team.id == session['team']['id']:
                    return team
            return None
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao ler dados da equipe!"}), 500
            
    

        

        
        
       
            
    
         




    
 