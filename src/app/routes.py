
from app import app
from flask import render_template, request, redirect, url_for, jsonify, session, send_from_directory
from app.controllers.ct_atestado import *
from app.controllers.ct_secretaria import *
from app.controllers.ct_dashboard_atestados import *

#TELAS
#Home
@app.route("/")
def home():
    return render_template("vw_home.html")

#Página de cadastro de atestados
@app.route("/atestados/cadastro")
def atestados():
    return render_template('vw_form_atestados.html')

#Página de cadastro de atestados
@app.route("/atestados/acesso")
def acesso_secretaria():
    return render_template("vw_form_acesso.html")

#Página de consulta de atestados
@app.route("/atestados/consulta")
def consulta_atestados():
    return render_template("vw_consulta_atestados.html")

#Página de painel de atestados
@app.route("/painel/atestados")
@login_required_secretaria
def painel_atestados():
    dados = coletar_dados()
    return render_template("vw_dashboard_atestados.html", dados = dados)

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
@app.route("/atestados/cadastro/cadastrar", methods=['POST'])
def cadastrar():
    response = cadastrar_atestado()
    return response
    
@app.route('/atestados/acesso/logar', methods=['POST'])
def logar():
    response = logar_secretaria()
    return response

@app.route('/atestados/acesso/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
#FUNÇÕES