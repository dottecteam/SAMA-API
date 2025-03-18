import uuid
from app import app
from flask import render_template, request, redirect, url_for, jsonify, session, send_from_directory
from app.controllers.ct_atestado import *
from app.controllers.ct_secretaria import *
from flask import render_template, request, redirect, url_for, jsonify, session

#TELAS
#Home
@app.route("/")
def home():
    return render_template("vw_home.html")

#Página de cadastro de atestados
@app.route("/atestados/cadastro")
def atestados():
    usuarios = ler_dados()
    return render_template("vw_form_atestados.html", usuarios=usuarios)

#Página de cadastro de atestados
@app.route("/atestados/acesso")
def acesso_secretaria():
    return render_template("vw_form_acesso.html")

#Página de painel de atestados
@app.route("/painel/atestados")
@login_required_secretaria
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
@app.route("/atestados/cadastro/cadastrar", methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        nome = request.form['input-nome-form-atestados']
        email = request.form['input-email-form-atestados']
        curso = request.form['input-curso-form-atestados']
        semestre = request.form['select-form-atestados']
        dataIn = request.form['date-form-atestados-1']
        dataFin = request.form['date-form-atestados-2']
        cid = request.form['input-cid-form-atestados']
        arquivo = request.files['file-form-atestados']

        
        
        if arquivo.filename.endswith(".pdf"):
            nome_unico = str(uuid.uuid4()) + arquivo.filename
            caminho_atestados = f"../data/atestados/{nome_unico}"
            salvar_arquivo(arquivo, caminho_atestados)
    
        salvar_dados(nome, email, curso, semestre, dataIn, dataFin, cid, nome_unico)  

        usuarios = ler_dados()
        return render_template('vw_form_atestados.html', usuarios=usuarios)

@app.route('/atestados/acesso/logar', methods=['POST'])
def logar():
    response = logar_secretaria()
    return response

@app.route('/atestados/acesso/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
#FUNÇÕES