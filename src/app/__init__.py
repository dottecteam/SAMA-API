from flask import Flask
from dotenv import load_dotenv
import os

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Configuração do Flask
app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "uploads"))
app.secret_key = os.getenv('SECRET_KEY', '.tec@2025')

from app.views import routes_certificates, routes_teams