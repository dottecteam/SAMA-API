from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_teams import Teams
from functools import wraps
from app.models.md_log import Log

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
                Log().register(operation=f'Team: Login')
                return jsonify({"status": True,"message": "Equipe logada com sucesso!"}), 200
            else:
                Log().register(operation=f'Team: Login Attempt ({id})')
                return jsonify({"status": False, "message": "Credenciais incorretas."}), 400
        except Exception as e:
            print(f"Error: {e}")
            Log().register(operation=f'Team: Login Attempt')
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
                Log().register(operation=f'Team: Register Team')
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
        
    #Função para editar equipe
    @staticmethod
    def update_team():
        try:
            if 'team' not in session:
                return jsonify({"status": False, "message": "Acesso não autorizado."}), 401

            # Pega os dados do JSON enviado pelo frontend
            data = request.get_json()
            
            team_id = session['team']['id']
            team_name = data.get('teamName')
            master = data.get('SMaster')
            EmMaster = data.get('EmMaster')
            pOwner = data.get('PO')
            EmPOwner = data.get('EmPOwner')
            dev_names = data.get('dev_name', [])  # Lista de nomes
            dev_emails = data.get('dev_email', [])  # Lista de emails

            # Combina nomes e emails em uma lista de dicionários
            devs = [{"nome": nome, "email": email} for nome, email in zip(dev_names, dev_emails)]

            # Chama o método do model para atualizar
            if Teams().update_team(team_id, team_name, master, pOwner, EmMaster, EmPOwner, devs):
                # Atualiza a sessão
                session['team'] = {
                    'id': team_id,
                    'team': team_name,
                    'master': master,
                    'pOwner': pOwner,
                    'EmMaster': EmMaster,
                    'EmPOwner': EmPOwner,
                    'devs': devs
                }
                session.modified = True

                Log().register(operation=f'Team: Update Team Data ({team_id})')
                return jsonify({"status": True, "message": "Equipe atualizada com sucesso!"}), 200
            else:
                return jsonify({"status": False, "message": "Erro ao atualizar equipe."}), 400

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro interno ao atualizar equipe."}), 500
