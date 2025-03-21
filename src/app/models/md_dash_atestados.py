from datetime import datetime
from app.models.md_atestados import Atestados

atestados_unicos = []
aprovados = []
reprovados = []


# Diferencia atestados, adiciona a duração do atestado após a dataFin e retorna atestados_unicos 
def dif_atestados():
    for atestado in Atestados.ler_dados():
        if atestado not in atestados_unicos:
            atestados_unicos.append(atestado)
        data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
        data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
        atestado.insert(6, (data_final - data_inicial).days)
    return atestados_unicos

# Retorna atestados aprovados
def atestados_aprovados():
    for atestado in Atestados.ler_dados():
        if "aprovado" in atestado:
            aprovados.append(atestado)
    return aprovados
    
# Retorna atestados reprovados
def atestados_reprovados():
    for atestado in Atestados.ler_dados():
        if "reprovado" in atestado:
            reprovados.append(atestado)
    return reprovados

