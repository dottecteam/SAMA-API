from app import app
from flask import render_template, redirect, url_for, session, send_from_directory
from app.controllers.ct_teams import *
import os
from app.controllers.ct_dashboard_teams import DashboardTeams

#TELAS
#Página de login
@app.route("/equipes/acesso")
def teams_access():
    session.clear()
    return render_template("teams/vw_form_login.html")

#Página de painel de atestados
@app.route("/painel/equipes")
@TeamsController.loginRequired
def teams_panel():
    data, avarage = DashboardTeams.getData()
    return render_template("teams/vw_dashboard.html", data = data, avarage = avarage)

#Página de cadastro de equipes
@app.route("/equipes/cadastro")
def register_teams():
    return render_template("teams/vw_form_register.html")

# Página de política de privacidade
@app.route("/equipes/privacidade")
def privacy_policy_teams():
    return render_template("teams/vw_privacy_policy.html")

#Página de visualização de equipes
@app.route("/equipes/visualizar")
def view_teams():
    return render_template("teams/vw_view_teams.html", teams=TeamsController.readAllTeams())

#Página de minha equipe
@app.route("/equipes/equipe")
def team_profile():
    return render_template("teams/vw_profile.html", team=TeamsController.readTeamById())

#Página de criar avaliações
@app.route("/equipes/avaliacoes")
def avaliacao():
    return render_template("teams/vw_form_evaluate.html")
#TELAS


#FUNÇÕES
#Página de cadastro de equipes (Back)
@app.route("/equipes/cadastro/cadastrar", methods=['POST'])
def equipesCadastrar():
    return TeamsController.registerTeam()

#Função para fazer o login da equipe
@app.route('/equipes/acesso/logar', methods=['POST'])
def login_team():
    Log().register(operation='Account: Logout')
    session.clear()
    return TeamsController.loginTeam()

#Página de edição de equipe
@app.route("/equipes/atualizar", methods=['POST'])
@TeamsController.loginRequired  
def update_team():
    return TeamsController.update_team()

#Função para registrar avaliação
@app.route('/equipes/avaliacoes/avaliar', methods=['POST'])
@TeamsController.loginRequired
def salvar_avaliacoes():
    return TeamsController.saveEvaluations()

#FUNÇÕES