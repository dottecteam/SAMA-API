from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_dashboard_atestados import AtestadoDados

def coletar_dados():
    try:
        atestados = AtestadoDados()
        num_atestados = len(atestados.dif_atestados())
        num_aprovados = len(atestados.atestados_aprovados())
        num_reprovados = len(atestados.atestados_reprovados())
        meses = atestados.mensal()
        
        dados = [num_atestados, num_aprovados, num_reprovados, meses]
        return dados
    except Exception as e:
        print(e)
        return jsonify({"status": False, "mensagem": "Erro ao coletar dados do atestado!"}), 400
