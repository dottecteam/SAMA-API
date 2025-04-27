from app import app
from flask import render_template, redirect, url_for, session, send_from_directory
from app.controllers.ct_teams import *
import os

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
    return render_template("teams/vw_dashboard.html")

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
def viewTeams():
    return render_template("teams/vw_view_teams.html", teams=TeamsController.readTeam())

#Página de criar avaliações
@app.route("/equipes/avaliacoes")
def avaliacao():
    return render_template("teams/vw_form_evaluate.html")

#TELAS