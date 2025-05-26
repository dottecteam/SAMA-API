import re
import os
import random
from datetime import datetime
from flask import session
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from src.app import app
from src.app import admin_email, admin_password
from src.app.models.md_dashborad_certificates import AtestadoMetricas
from src.app.models.md_users import Users

class Validation:

    #Funçãio para validar a cid
    def valideCid(cid):
        cidDict = AtestadoMetricas()
        cid = cid.upper()
        if cid in cidDict.cid_11:
            return True
        return False

    #Função para enviar email com o código de confirmação
    def sendEmail(email):
        session['code'] = str(random.randint(100000, 999999))
        logo_path = os.path.join(app.root_path, "..", "static", "images", "logo.jpg")
        body = f"""
            <html>
                <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f9; color: #333333; margin: 0; padding: 0;">
                    <!-- Container Principal -->
                    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Logo -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <img src="cid:logo" style="border-radius: 15px; width: 200px; margin-bottom: 20px;" alt="Logo" />
                        </div>

                        <!-- Título -->
                        <h2 style="text-align: center; font-size: 24px; color: #333333; font-weight: 600;">Confirmação de E-mail</h2>

                        <!-- Mensagem -->
                        <p style="text-align: center; font-size: 16px; color: #555555; margin-top: 10px;">Para concluir o processo, por favor, insira o código de confirmação abaixo:</p>

                        <!-- Código de Confirmação -->
                        <div style="text-align: center; margin: 20px 0;">
                            <h1 style="color: #3b8c6e; font-size: 36px; font-weight: bold; padding: 20px; background-color: #f0f9f4; border-radius: 8px; display: inline-block; min-width: 120px;">
                                {session['code']}
                            </h1>
                        </div>

                        <!-- Instrução -->
                        <p style="text-align: center; font-size: 14px; color: #777777;">Se você não solicitou essa confirmação, por favor, ignore este e-mail.</p>

                        <!-- Rodapé -->
                        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #888888;">
                            <p>&copy; 2025 SAMA. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </body>
            </html>


            """

        # Criação da mensagem com partes (HTML + Imagem)
        msg = MIMEMultipart("related")
        msg['Subject'] = 'Código de Confirmação'
        msg['From'] = admin_email
        msg['To'] = email

        # Adicionando o corpo HTML
        customMsg = MIMEMultipart("alternative")
        customMsg.attach(MIMEText(body, 'html'))
        msg.attach(customMsg)

        # Adicionando a imagem da logo
        try:
            with open(logo_path, 'rb') as img:
                image = MIMEImage(img.read())
                image.add_header('Content-ID', '<logo>')
                msg.attach(image)
        except Exception as e:
            print(f"Error: {e}")

        # Enviando e-mail
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(admin_email, admin_password)
            server.sendmail(admin_email, email, msg.as_string())
            server.quit()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False
    
    #Função para validar o código
    def confirmEmail(code):
        try:
            if code == session['code']:
                return True
            else:
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False

    #Função para validar o arquivo pdf    
    def valideFile(file):
        if file.filename.endswith(".pdf"):
            return True
        return False
    
    #Função para validar o período
    def validePeriod(dataIn,dataFin):
        if (datetime.strptime(dataFin, "%Y-%m-%d")-datetime.strptime(dataIn, "%Y-%m-%d")).days>=0:
            return True
        return False
    
    #Função para validar a igualdade da senha
    def validePassword(password, confirmPassword):
        if password != confirmPassword:
            return False
        else:
            return True
        
    #Função para verificar se o desenvolvedor está cadastrado
    def UserIsRegistered(email):
        try:
            if len(Users().readUser(email))>0:
                return True
            return False
        except Exception as e:
            print(f"Error: {e}")
            return False