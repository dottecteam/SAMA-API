from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_atestados import Atestados
import uuid

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

        response = Atestados.salvar_dados(nome, email, curso, semestre, dataIn, dataFin, cid, nome_unico, cpf)
        if response != True:
            return jsonify({"status": False, "mensagem": "Erro ao salvar dados!"}), 400

        return jsonify({"status": True, "mensagem": "Atestado cadastrado com sucesso!"}), 200 
    except Exception as e:
        print(e)
        return jsonify({"status": False, "mensagem": "Erro ao cadastrar atestado!"}), 400
        
        

        
        
       
            
    
         




    
 