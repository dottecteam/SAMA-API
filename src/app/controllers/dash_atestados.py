from datetime import datetime

atestados = []
cids = []
aprovados = []
rejeitados = []

# Abre o documento de atestados e adicionando cada atestado à lista atestados[]
with open("data/atestados/alunos.txt", "r", encoding="utf-8") as usuarios:
    for linha in usuarios:
        if linha.strip():
            atestados.append((linha.strip()).split(";"))

for atestado in atestados:
    # Diferencia cids da lista de atestado e adiciona à lista cids(pode ser usado para contar quantos atestados diferentes há na lista de atestados)
    if atestado[6] not in cids:
        cids.append(atestado[6])

    # Conta a duração do atestado e adiciona à lista atestados após a data final
    data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
    data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
    atestado.insert(6, (data_final - data_inicial).days)

    # Conta o número de atestados aprovados ou rejeitados
    if atestado[10] == "aprovado":
        aprovados.append(atestado)
    if atestado[10] == "rejeitado":
        rejeitados.append(atestado)
