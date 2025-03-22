from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_atestados import Atestados
import uuid
import re

def cadastrar_atestado():
    try:
        nome = request.form['input-nome-form-atestados']
        email = request.form['input-email-form-atestados']
        curso = request.form['input-curso-form-atestados']
        semestre = request.form['select-form-atestados']
        dataIn = request.form['date-form-atestados-1']
        dataFin = request.form['date-form-atestados-2']
        cid = request.form['input-cid-form-atestados']
        arquivo = request.files['file-form-atestados']
        cpf = request.form['input-cpf-form-atestados']

        if arquivo.filename.endswith(".pdf"):
            nome_unico = str(uuid.uuid4()) + arquivo.filename
            
            response = Atestados.salvar_arquivo(arquivo, nome_unico) 
            if response != True:
                return jsonify({"status": False, "mensagem": "Erro ao salvar arquivo!"}), 400

        if validar_cpf(cpf) == False:
            return jsonify({"status": False, "mensagem": "CPF inválido!"}), 400
        
        response = Atestados.salvar_dados(nome, email, curso, semestre, dataIn, dataFin, cid, nome_unico, cpf)
        if response != True:
            return jsonify({"status": False, "mensagem": "Erro ao salvar dados!"}), 400

        return jsonify({"status": True, "mensagem": "Atestado cadastrado com sucesso!"}), 200 
    except Exception as e:
        print(e)
        return jsonify({"status": False, "mensagem": "Erro ao cadastrar atestado!"}), 400
        
def consultar_atestados_alunos():
    cpf = request.args.get('cpf')

    response = Atestados.ler_dados_cpf(cpf)
    return response

def validar_cpf(cpf):
         # Remove qualquer caractere não numérico
    cpf = re.sub(r'[^0-9]', '', cpf)
    
        # Verifica se o CPF tem 11 dígitos
    if len(cpf) != 11:
        return False
    
        # Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if cpf == cpf[0] * 11:
        return False
    
        # Validação do primeiro dígito verificador
    soma_1 = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito_1 = (soma_1 * 10) % 11
    if digito_1 == 10 or digito_1 == 11:
            digito_1 = 0
    
        # Validação do segundo dígito verificador
    soma_2 = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito_2 = (soma_2 * 10) % 11
    if digito_2 == 10 or digito_2 == 11:
        digito_2 = 0
    
        # Verifica se os dígitos verificadores estão corretos
    if cpf[9] == str(digito_1) and cpf[10] == str(digito_2):
        return True
    return False


        
        
       
            
    
         




    
 