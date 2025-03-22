from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_dash_atestados import AtestadoDados

def coletar_dados():
    try:
        atestados = AtestadoDados()
        num_atestados = len(atestados.dif_atestados())
        num_aprovados = len(atestados.atestados_aprovados())
        num_reprovados = len(atestados.atestados_reprovados())
        
        dados = [num_atestados, num_aprovados, num_reprovados]
        return dados
    except Exception as e:
        print(e)
        return jsonify({"status": False, "mensagem": "Erro ao coletar dados do atestado!"}), 400
