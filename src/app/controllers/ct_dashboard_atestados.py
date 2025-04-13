from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_dashboard_atestados import AtestadoMetricas
from datetime import datetime

def coletar_metricas():
    try:
        atestados = AtestadoMetricas()
        num_atestados = len(atestados.atestados)
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
        pendentes = atestados.pendentes
        aprovados = atestados.aprovados
        rejeitados = atestados.rejeitados
        afastados = atestados.afastados
        estado = {"pendentes": pendentes, "aprovados": aprovados, "rejeitados": rejeitados, "afastados": afastados}
        return estado
    except Exception as e:
        print(e)
        return []
    
def coletar_cids():
    try:
        atestados = AtestadoMetricas()
        cids = atestados.cids_unicas
        return cids
    except Exception as e:
        print(e)
        return []