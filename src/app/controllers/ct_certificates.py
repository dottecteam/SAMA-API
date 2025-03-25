from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_certificates import Atestados
from app.controllers.ct_validation import Validade
import uuid



def consultar_atestados_alunos():
    cpf = request.args.get('cpf')

    response = Atestados.ler_dados_cpf(cpf)
    return response

def validar_dados():
    session['nome'] = request.form['input-nome-form-atestados']
    session['email'] = request.form['input-email-form-atestados']
    session['curso'] = request.form['input-curso-form-atestados']
    session['semestre'] = request.form['select-form-atestados']
    session['dataIn'] = request.form['date-form-atestados-1']
    session['dataFin'] = request.form['date-form-atestados-2']
    session['cid'] = request.form['input-cid-form-atestados']
    arquivo = request.files['file-form-atestados']
    session['cpf'] = request.form['input-cpf-form-atestados']

    if Validade.validar_cpf(session['cpf']) == False:
        return jsonify({"status": False, "mensagem": "CPF inválido!"}), 400
    
    if Validade.enviar_codigo(session['email']) == False:
        return jsonify({"status": False, "mensagem": "Erro ao enviar email!"}), 400

    if Validade.validar_arquivo(arquivo) == False:
        return jsonify({"status": False, "mensagem": "Arquivo inválido!"}), 400
    session['arquivo'] = str(uuid.uuid4()) + ".pdf"
    response = Atestados.salvar_arquivo(arquivo, session['arquivo']) 
    if response != True:
        return jsonify({"status": False, "mensagem": "Erro ao salvar arquivo!"}), 400
    
    return jsonify({"status": True, "mensagem": "Código enviado com sucesso!"}), 200


def cadastrar_atestado():
    codigo = request.form['input-codigo-form-atestados']
    
    try:
        if codigo != session['codigo']:
            Atestados.remover_arquivo(session['arquivo'])
            return jsonify({"status": False, "mensagem": "Código incorreto!"}), 400

        response = Atestados.salvar_dados(session['nome'], session['email'], session['curso'], session['semestre'], session['dataIn'], session['dataFin'], session['cid'], session['arquivo'], session['cpf'])
        if response != True:
            Atestados.remover_arquivo(session['arquivo'])
            return jsonify({"status": False, "mensagem": "Erro ao salvar dados!"}), 400

        session.clear()
        return jsonify({"status": True, "mensagem": "Atestado cadastrado com sucesso!"}), 200 
    except Exception as e:
        print(e)
        Atestados.remover_arquivo(session['arquivo'])
        return jsonify({"status": False, "mensagem": "Erro ao cadastrar atestado!"}), 400
        

        
        
       
            
    
         




    
 