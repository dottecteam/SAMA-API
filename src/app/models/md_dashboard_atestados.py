from collections import Counter
from datetime import datetime
import os
import json

class AtestadoMetricas:
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "alunos.txt")
    caminho_json = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "cid11.json")

    def __init__(self, arquivo=caminho_arquivo, arquivo_json=caminho_json):
        self.arquivo = arquivo
        self.arquivo_json = arquivo_json
        self.atestados = []
        self.atestados_unicos = set()
        self.afastados = []
        self.pendentes = []
        self.aprovados = []
        self.rejeitados = []
        self.cids_unicas = {}
        self.carregar_dados()
        self.abrir_json_cid11()
        self.dif_atestados()
        self.pessoas_afastadas()
        self.atestados_pendentes()
        self.atestados_aprovados()
        self.atestados_rejeitados()
        self.dif_anos()
        self.mensal()
        self.dif_cids()
        self.contar_cids()

    def carregar_dados(self):
        """Carrega os dados do arquivo e preenche a lista de atestados."""
        with open(self.arquivo, "r", encoding="utf-8") as usuarios:
            for linha in usuarios:
                if linha.strip():
                    dados = linha.strip().split(";")
                    self.atestados.append(dados)

    def dif_atestados(self):
        """Retorna uma lista com atestados únicos e adiciona a duração."""
        for atestado in self.atestados:
            try:
                data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
                data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
                duracao = (data_final - data_inicial).days
                atestado.insert(7, duracao)   
                self.atestados_unicos.add(tuple(atestado))
            except ValueError:
                print(f"Erro ao processar datas no atestado: {atestado}")  
        return self.atestados_unicos
    
    def pessoas_afastadas(self):
        """Retorna uma lista com os atestados aprovados que estão em vigor (Pessoas Afastadas)."""
        for atestado in self.atestados_aprovados():
            data_atual = datetime.now()
            data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
            data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
            if data_inicial <= data_atual <= data_final:
                self.afastados.append(atestado)
        self.afastados.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"), reverse=True)
        return(self.afastados)

    def atestados_pendentes(self):
        """Retorna a lista de atestados pendentes."""
        self.pendentes = [atestado for atestado in self.atestados_unicos if "Pendente" in atestado]
        self.pendentes.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"), reverse=True)
        return self.pendentes

    def atestados_aprovados(self):
        """Retorna a lista de atestados aprovados."""
        self.aprovados = [atestado for atestado in self.atestados_unicos if "Aprovado" in atestado]
        self.aprovados.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"), reverse=True)
        for atestado in self.aprovados:
            atestado[4].upper()
        return self.aprovados

    def atestados_rejeitados(self):
        """Retorna a lista de atestados rejeitados."""
        self.rejeitados = [atestado for atestado in self.atestados_unicos if "Rejeitado" in atestado]
        self.rejeitados.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"), reverse=True)
        return self.rejeitados
    
    def dif_anos(self):
        """Retorna uma lista com os anos dos atestados aprovados."""
        anos = set()
        for atestado in self.atestados_aprovados():
            ano = datetime.strptime(atestado[5], "%Y-%m-%d").year
            anos.add(ano)
        anos = list(anos)
        anos.sort()
        anos.reverse()
        return anos

    def mensal(self):
        """Retorna um dicionário com a quantidade de atestados por mês em cada ano."""
        anos = self.dif_anos()
        mesesPorAno = {}
        for ano in anos:
            mesesPorAno.update({ano: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
        
        for atestado in self.atestados_unicos:
            data = datetime.strptime(atestado[5], "%Y-%m-%d")
            mes = data.month
            ano = data.year
            if ano in anos:
                mesesPorAno[ano][mes - 1] += 1
        return mesesPorAno
    

    """Tratamento de CIDs"""

    def abrir_json_cid11(self):

        with open(self.arquivo_json, "r", encoding="utf-8") as jsonfile:
            dados = json.load(jsonfile)
        cid_dict = {item["Code"]: item["Title"] for item in dados}
        return cid_dict

    def descricao_cid(self, codigo):
        cid_dict = self.abrir_json_cid11()
        response = cid_dict.get(codigo, None)
        if response:
            return response.replace("- - - -", "").replace("- - - ", "").replace("- - ", "").replace("- ", "")
        return "Código Inválido"
    
    def dif_cids(self):
        """Retorna uma lista com os CIDs únicos e suas descrições."""
        for atestado in self.aprovados:
            cid = atestado[4]
            if cid not in self.cids_unicas:
                descricao = self.descricao_cid(cid)
                if descricao:
                    self.cids_unicas[cid] = 0, descricao
        return self.cids_unicas
    
    def contar_cids(self):
        """Retorna um dicionário com a contagem de cada CID."""
        rank = 0
        for atestado in self.aprovados:
            cid = atestado[4]
            self.cids_unicas[cid] = self.cids_unicas[cid][0] + 1, self.cids_unicas[cid][1]
        self.cids_unicas = dict(sorted(self.cids_unicas.items(), key=lambda item: item[1][0], reverse=True))
        for cid in self.cids_unicas:
            rank +=1
            self.cids_unicas[cid] = rank, self.cids_unicas[cid][0], self.cids_unicas[cid][1]
        return self.cids_unicas