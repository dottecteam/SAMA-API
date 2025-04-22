import re
import os
import random
from datetime import datetime
from flask import session
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from app import app
from app import admin_email, admin_password
from app.models.md_dashborad_certificates import AtestadoMetricas

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
                <body style="font-family: Arial; color: #000000;">
                    <img src="cid:logo" style="border-radius:15px;width: 500px; margin-bottom: 20px;">
                    <h2 style="text-align:center">Confirmação de E-mail</h2>
                    <p style="text-align:center">Seu código de confirmação:</p>
                    <h1 style="color: #3b8c6e; text-align:center">{session['code']}</h1>
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
            print(f"Erro ao enviar e-mail: {e}")
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
    
    #Função para validar a senha
    def validePassword(password, confirmPassword):
        if len(password)<8 or len(password)>12 or password!=confirmPassword:
            return False
        return True