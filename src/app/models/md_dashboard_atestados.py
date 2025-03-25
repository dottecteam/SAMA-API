from collections import Counter
from datetime import datetime

class AtestadoMetricas:
    def __init__(self, arquivo="data/atestados/alunos.txt"):
        self.arquivo = arquivo
        self.atestados = []
        self.atestados_unicos = []
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
            if atestado not in self.atestados_unicos:
                self.atestados_unicos.append(atestado)
            try:
                data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
                data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
                duracao = (data_final - data_inicial).days
                atestado.insert(7, duracao)
            except ValueError:
                print(f"Erro ao processar datas no atestado: {atestado}")
        return self.atestados_unicos
    
    def atestados_pendentes(self):
        """Retorna a lista de atestados pendentes."""
        self.pendentes = [atestado for atestado in self.atestados_unicos if "Pendente" in atestado]
        return self.pendentes

    def atestados_aprovados(self):
        """Retorna a lista de atestados aprovados."""
        self.aprovados = [atestado for atestado in self.atestados_unicos if "Aprovado" in atestado]
        return self.aprovados

    def atestados_rejeitados(self):
        """Retorna a lista de atestados rejeitados."""
        self.rejeitados = [atestado for atestado in self.atestados_unicos if "Rejeitado" in atestado]
        return self.rejeitados
    
    def diff_anos(self):
        anos = []
        for atestado in self.atestados_unicos:
            ano = datetime.strptime(atestado[5], "%Y-%m-%d").year
            if ano not in anos:
                anos.append(ano)
        return anos

    def mensal(self):
        anos = self.diff_anos()
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
    
    def pessoas_afastadas(self):
        afastados = []
        for atestado in self.atestados_aprovados():
            data_atual = datetime.now()
            data_inicial = datetime.strptime(atestado[5], "%Y-%m-%d")
            data_final = datetime.strptime(atestado[6], "%Y-%m-%d")
            if data_inicial <= data_atual <= data_final:
                afastados.append(atestado)
        return(afastados)

