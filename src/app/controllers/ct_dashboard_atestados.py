from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_dashboard_atestados import AtestadoMetricas

def coletar_metricas():
    try:
        atestados = AtestadoMetricas()
        num_atestados = len(atestados.dif_atestados())
        num_pendentes = len(atestados.atestados_pendentes())
        num_aprovados = len(atestados.atestados_aprovados())
        num_rejeitados = len(atestados.atestados_rejeitados())
        num_afastados = len(atestados.pessoas_afastadas())
        anos = atestados.dif_anos()
        meses = atestados.mensal()
        
        metricas = [num_atestados, num_afastados, num_pendentes, num_aprovados, num_rejeitados, anos, meses]
        return metricas
    except Exception as e:
        print(e)
        return jsonify({"status": False, "mensagem": "Erro ao coletar dados do atestado!"}), 400
