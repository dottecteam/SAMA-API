from app import app
from flask import render_template, request, redirect, url_for, jsonify, session

#TELAS
#Home
@app.route("/")
def home():
    return render_template("vw_home.html")

#Página de cadastro de atestados
@app.route("/atestados/cadastro")
def atestados():
    return render_template("vw_form_atestados.html")

#Página de cadastro de atestados
@app.route("/atestados/acesso")
def acesso_secretaria():
    return render_template("vw_form_acesso.html")

#Página de painel de atestados
@app.route("/painel/atestados")
def painel_atestados():
    return render_template("vw_dashboard_atestados.html")

#Página de painel de atestados
@app.route("/painel/equipes")
def painel_equipes():
    return render_template("vw_dashboard_equipes.html")

#Página de cadastro de equipes
@app.route("/equipes/cadastro")
def equipes():
    return render_template("vw_form_equipes.html")

@app.route("/equipes/avaliacoes")
def avaliacao():
    return render_template("vw_form_avaliacoes.html")
#TELAS

#FUNÇÕES

#FUNÇÕES