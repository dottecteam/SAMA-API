from collections import Counter
from datetime import datetime

class AtestadoDados:
    def __init__(self, arquivo="data/atestados/alunos.txt"):
        self.arquivo = arquivo
        self.atestados = []
        self.atestados_unicos = []
        self.aprovados = []
        self.reprovados = []
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
                atestado.insert(6, duracao)
            except ValueError:
                print(f"Erro ao processar datas no atestado: {atestado}")
        return self.atestados_unicos

    def atestados_aprovados(self):
        """Retorna a lista de atestados aprovados."""
        self.aprovados = [atestado for atestado in self.atestados if "aprovado" in atestado]
        return self.aprovados

    def atestados_reprovados(self):
        """Retorna a lista de atestados reprovados."""
        self.reprovados = [atestado for atestado in self.atestados if "reprovado" in atestado]
        return self.reprovados
