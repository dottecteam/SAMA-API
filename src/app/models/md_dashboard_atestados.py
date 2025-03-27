from collections import Counter
from datetime import datetime
import os

class AtestadoMetricas:
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "alunos.txt")

    def __init__(self, arquivo=caminho_arquivo):
        self.arquivo = arquivo
        self.atestados = []
        self.atestados_unicos = set()
        self.pendentes = []
        self.aprovados = []
        self.rejeitados = []
        self.cids = Counter()
        self.carregar_dados()

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
        afastados = []
        for atestado in self.atestados_aprovados():
            data_atual = datetime.now()
            data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
            data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
            if data_inicial <= data_atual <= data_final:
                afastados.append(atestado)
        afastados.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"))
        return(afastados)

    def atestados_pendentes(self):
        """Retorna a lista de atestados pendentes."""
        self.pendentes = [atestado for atestado in self.atestados_unicos if "Pendente" in atestado]
        self.pendentes.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"))
        return self.pendentes

    def atestados_aprovados(self):
        """Retorna a lista de atestados aprovados."""
        self.aprovados = [atestado for atestado in self.atestados_unicos if "Aprovado" in atestado]
        self.aprovados.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"))
        return self.aprovados

    def atestados_rejeitados(self):
        """Retorna a lista de atestados rejeitados."""
        self.rejeitados = [atestado for atestado in self.atestados_unicos if "Rejeitado" in atestado]
        self.rejeitados.sort(key=lambda x: datetime.strptime(x[5], "%Y-%m-%d"))
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
    
    def cids_mais_comuns(self): 
        """Retorna um dicionário com os CIDs mais comuns."""
        for atestado in self.atestados_unicos:
            self.cids[atestado[3]] += 1
        return self.cids.most_common(5)
    
    def executar(self):
        """Executa todas as funções da classe."""
        self.dif_atestados()
        self.atestados_pendentes()
        self.atestados_aprovados()
        self.atestados_rejeitados()
        self.dif_anos()
        self.mensal()
        self.pessoas_afastadas()
        self.cids_mais_comuns()
