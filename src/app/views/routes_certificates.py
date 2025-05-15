from app import app
from flask import render_template, redirect, url_for, session, send_from_directory
from app.controllers.ct_certificates import *
from app.controllers.ct_users import *
from app.controllers.ct_secretary import *
from app.controllers.ct_dashboard_certificates import *
from app.models.md_log import Log
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
    Log().register(operation='Account: Logout')
    session.clear()
    return render_template('certificates/vw_form_register.html')

# Página da política de privacidade
@app.route("/usuarios/privacidade")
def privacy_policy_certificates():
    return render_template("certificates/vw_privacy_policy.html")

#Página de consulta de atestados
@app.route("/usuarios/atestados")
def user_certificates():
    return render_template("certificates/vw_user_certificates.html", data=CertificatesController.readUserCertificates())

#Atestados
#Página de Perfil
@app.route("/usuarios/perfil")
@UserController.loginRequired
def perfil_usuario():
    return render_template('certificates/vw_profile.html')

#Página de cadastro de atestados
@app.route("/atestados/cadastro")
@UserController.loginRequired
def certificates_register():
    return render_template('certificates/vw_form_upload.html')


#Página de login da secretaria
@app.route("/atestados/acesso")
def certificates_access():
    Log().register(operation='Account: Logout')
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

@app.route("/usuarios/alterar_info", methods=['POST'])
def user_change_info():
    return UserController.changeInformation()

@app.route("/usuarios/deletar_conta/validar", methods=["POST"])
def delete_val():
    return UserController.deleteValidation()

@app.route("/usuarios/deletar_conta", methods=["POST"])
def delete_acc():
    return UserController.deleteAccount()

@app.route("/usuarios/alterar_senha", methods=['POST'])
def user_change_password():
    return UserController.changePassword()

#Função para deslogar de contas  
@app.route('/logout')
def logout():
    Log().register(operation='Account: Logout')
    session.clear()
    return redirect(url_for('home'))

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
def search_certificates_id():
    return CertificatesController.searchCertificatesById()

#Função para pegar o atestado pelo id
@app.route('/atestado/deletar', methods=['POST'])
def delete_certificates():
    return CertificatesController.deleteCertificates()

#Função para pegar o atestado pelo id
@app.route('/atestado/consulta/tabela', methods=['POST'])
def update_table_query():
    return CertificatesController.updateTableAllCertificates()

#Função para pegar o atestado pelo id
@app.route('/usuarios/atestados/tabela', methods=['POST'])
def update_table_user_certificates():
    return CertificatesController.updateTableUserCertificates()

#Função para pegar o atestado pelo id
@app.route('/usuarios/sessao', methods=['POST'])
def is_logged():
    return UserController.isLogged()


#FUNÇÕES