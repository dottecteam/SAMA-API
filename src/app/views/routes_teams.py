from app import app
from flask import render_template, redirect, url_for, session, send_from_directory


#TELAS
#Página de painel de atestados
@app.route("/painel/equipes")
def painel_equipes():
    return render_template("teams/vw_dashboard.html")

#Página de cadastro de equipes
@app.route("/equipes/cadastro")
def equipes():
    return render_template("teams/vw_form_register.html")

#Página de criar avaliações
@app.route("/equipes/avaliacoes")
def avaliacao():
    return render_template("teams/vw_form_evaluate.html")
#TELAS