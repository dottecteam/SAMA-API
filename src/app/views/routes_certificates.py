from app import app
from flask import render_template, redirect, url_for, session, send_from_directory
from app.controllers.ct_certificates import *
from app.controllers.ct_users import *
from app.controllers.ct_secretary import *
from app.controllers.ct_dashboard_certificates import *
import os

#TELAS

#Home
@app.route("/")
def home():
    return render_template("certificates/vw_home.html")
@app.route("/home")
def home_redirect():
    return redirect(url_for('home'))

#FAQ
@app.route("/faq")
def faq():
    return render_template("certificates/vw_faq.html")

#Usuários
#Página de cadastro de usuários
@app.route("/usuarios/cadastro")
def user_register():
    session.clear()
    return render_template('certificates/vw_form_register.html')

#Página de consulta de atestados
@app.route("/usuarios/atestados")
def user_certificates():
    return render_template("certificates/vw_user_certificates.html", data=CertificatesController.readUserCertificates())

#Atestados
#Página de cadastro de atestados
@app.route("/atestados/cadastro")
@UserController.loginRequired
def certificates_register():
    return render_template('certificates/vw_form_upload.html')


#Página de login da secretaria
@app.route("/atestados/acesso")
def certificates_access():
    session.clear()
    return render_template("certificates/vw_form_login.html")

#Página de consulta de atestados
@app.route("/atestados/consulta")
def certificates_search():
    return render_template("certificates/vw_query.html", data=CertificatesController.readAllCertificates())

#Página de painel de atestados
@app.route("/painel/atestados")
@SecretaryController.loginRequired
def painel_atestados():
    return render_template("certificates/vw_dashboard.html", metricas = coletar_metricas(), estado = coletar_estados(), cids = coletar_cids())

#TELAS



#FUNÇÕES

#USUÁRIOS
#Função para logar um usuário
@app.route("/usuarios/logar",methods=['post'])
def login_user():
    return UserController.loginUser()

#Função para enviar o código no email
@app.route("/usuarios/cadastro/validar", methods=['POST'])
def valide_email():
    return UserController.dataValidation()

#Função para cadastrar usuários
@app.route("/usuarios/cadastro/cadastrar", methods=['POST'])
def register_user():
    return UserController.registerUser()

#ATESTADOS
#Função para fazer o login da secretaria
@app.route('/atestados/acesso/logar', methods=['POST'])
def login_secretary():
    return SecretaryController.loginSecretary()

#Função para cadastrar atestados
@app.route("/atestados/cadastro/cadastrar", methods=['POST'])
def register_certificates():
    return CertificatesController.registerCertificate() 

#Função para servir arquivos de atestados
@app.route('/uploads/atestados/<filename>')
def get_file(filename):
    # Caminho correto para o diretório de 'atestados' dentro de 'UPLOAD_FOLDER'
    certificates_folder = os.path.join(app.config['UPLOAD_FOLDER'], 'certificates')
    
    # Verifica se o arquivo existe no diretório de 'atestados'
    try:
        return send_from_directory(certificates_folder, filename)
    except FileNotFoundError:
        return "Arquivo não encontrado", 404

#Função de trocar o status do atestado
@app.route('/atestado/consulta/status', methods=['POST'])
def update_status():   
    return CertificatesController.updateCertificate()

#Função para pegar o atestado pelo id
@app.route('/atestado/consulta/id', methods=['POST'])
def consultar_atestados_id():
    return CertificatesController.searchCertificatesById()
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
#FUNÇÕES