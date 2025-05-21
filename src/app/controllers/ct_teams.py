from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_teams import Teams
from app.models.md_users import Users
from app.utilities.ut_validation import Validation
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
            password = request.form['input-password-form']
            EmMaster = request.form['input-email-form-scmaster']
            EmPOwner = request.form['input-email-form-po']

            # Recebe os desenvolvedores como listas
            dev_emails = request.form.getlist('dev_email[]')

            teams=Teams()

            # Verifica se os desenvolvedores estão cadastrados
            if Validation.UserIsRegistered(EmMaster)==False:
                return jsonify({"status": False, "message": f"Desenvolvedor {EmMaster} não cadastrado."}), 400
            if Validation.UserIsRegistered(EmPOwner)==False:
                return jsonify({"status": False, "message": f"Desenvolvedor {EmPOwner} não cadastrado."}), 400
            for email in dev_emails:
                if Validation.UserIsRegistered(email)==False:
                    return jsonify({"status": False, "message": f"Desenvolvedor {email} não cadastrado."}), 400
                
            # Busca o nome dos membros pelo email
            users = Users()
            devs = []
            for email in dev_emails:
                user = users.readUser(email)
                nome = user[0].name
                devId = f"{(dev_emails.index(email) + 1):03}"
                dev = {
                    'devId': devId,
                    'email': email,
                    'nome': nome
                }
                devs.append(dev)
            master = users.readUser(EmMaster)[0].name
            pOwner = users.readUser(EmPOwner)[0].name

            if teams.saveDataTeam(team, password, master, EmMaster, pOwner, EmPOwner, devs):
                Log().register(operation=f'Team: Register Team')
                return jsonify({"status": True, "message": "Equipe cadastrada com sucesso!"}), 200
            else:
                return jsonify({"status": False, "message": "Erro ao cadastrar equipe."}), 400
        #Validações
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao validar!"}), 500
        

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
    def update_team():
        try:
            if 'team' not in session:
                return jsonify({"status": False, "message": "Acesso não autorizado."}), 401

            # Pega os dados do JSON enviado pelo frontend
            data = request.get_json()
            
            team_id = session['team']['id']
            team_name = data.get('teamName')
            EmMaster = data.get('EmMaster')
            EmPOwner = data.get('EmPOwner')
            dev_emails = data.get('dev_email', [])

            # Verifica se os desenvolvedores está cadastrado
            if Validation.UserIsRegistered(EmMaster)==False:
                return jsonify({"status": False, "message": f"Desenvolvedor {EmMaster} não cadastrado."}), 400
            if Validation.UserIsRegistered(EmPOwner)==False:
                return jsonify({"status": False, "message": f"Desenvolvedor {EmPOwner} não cadastrado."}), 400
            for email in dev_emails:
                if Validation.UserIsRegistered(email)==False:
                    return jsonify({"status": False, "message": f"Desenvolvedor {email} não cadastrado."}), 400

            # Busca o nome dos membros pelo email
            users = Users()
            devs = []
            for email in dev_emails:
                user = users.readUser(email)
                nome = user[0].name
                devId = f"{(dev_emails.index(email) + 1):03}"
                dev = {
                    'devId': devId,
                    'email': email,
                    'nome': nome
                }
                devs.append(dev)
            master = users.readUser(EmMaster)[0].name
            pOwner = users.readUser(EmPOwner)[0].name

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

                Log().register(operation=f'Team: Update Team Data ({team_id})')
                return jsonify({"status": True, "message": "Equipe atualizada com sucesso!"}), 200
            else:
                return jsonify({"status": False, "message": "Erro ao atualizar equipe."}), 400

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro interno ao atualizar equipe."}), 500


        #Função para salvar avaliações
    def saveEvaluations():
        try:
            teams = Teams()
            team = session['team']
            raw_evaluations = dict(request.form)
            evaluations = {team['EmMaster']: {}, team['EmPOwner']: {}}
            for dev in team['devs']:
                evaluations[dev['email']] = {}
            for ev in ['proatividade', 'autonomia', 'colaboracao', 'entrega']:
                evaluations[team['EmMaster']][ev] = raw_evaluations['master_' + ev]
                evaluations[team['EmPOwner']][ev] = raw_evaluations['po_' + ev]
                for dev in team['devs']:
                    devEmail = dev['email']
                    devId = dev['devId']
                    evaluations[devEmail][ev] = raw_evaluations[devId + '_' + ev]

            if teams.save_evaluations(evaluations):
                Log().register(operation=f'Team: Evaluation Saved')
                return jsonify({"status": True, "message": "Avaliações salvas com sucesso!"}), 200
            else:
                Log().register(operation=f'Team: Failed Evaluation Attempt')
                return jsonify({"status": False, "message": "Não foi possível salvar avaliações"}), 400
        except Exception as e:
            print(e)
            Log().register(operation=f'Team: Failed Evaluation Attempt')
            return jsonify({"status": False, "message": "Não foi possível salvar avaliações"}), 500