from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_dashboard_atestados import AtestadoMetricas

def coletar_metricas():
    try:
        atestados = AtestadoMetricas()
        atestados.executar()
        num_atestados = len(atestados.dif_atestados())
        anos = atestados.dif_anos()
        meses = atestados.mensal()
        
        metricas = [num_atestados, anos, meses]
        return metricas
    except Exception as e:
        print(e)
        return []
    
def coletar_estados():
    try:
        atestados = AtestadoMetricas()
        atestados.executar()
        pendentes = atestados.atestados_pendentes()
        aprovados = atestados.atestados_aprovados()
        rejeitados = atestados.atestados_rejeitados()
        afastados = atestados.pessoas_afastadas()
        estado = {"pendentes": pendentes, "aprovados": aprovados, "rejeitados": rejeitados, "afastados": afastados}
        return estado
    except Exception as e:
        print(e)
        return []

