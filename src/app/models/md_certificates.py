import os
from datetime import datetime
from app import app
import uuid


class Atestados:
    #Caminho do arquivo .txt
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "alunos.txt")
    #Caminho dos uploads de atestados
    caminho_atestados = os.path.abspath(os.path.join(app.config['UPLOAD_FOLDER'], "atestados"))

    def __init__(self, nome, email, curso, semestre, dataIn, dataFin, cid, pdf, cpf, situacao, periodo, id):
        self.nome = nome
        self.email = email
        self.curso = curso
        self.semestre=semestre
        self.dataIn=dataIn
        self.dataFin=dataFin
        self.cid=cid
        self.pdf=pdf
        self.cpf=cpf
        self.situacao=situacao
        self.periodo=periodo
        self.id=id

    
    #Função para salvar os dados no arquivo .txt
    def salvar_dados(nome, email, curso, semestre, dataIn, dataFin, cid, nome_unico, cpf):
        try:
            id_atestado = str(uuid.uuid4())
            with open(Atestados.caminho_arquivo, "a", encoding="utf-8") as arquivo:
                arquivo.write(f"{nome};{email};{cpf};{curso};{semestre};{dataIn};{dataFin};{cid.upper()};{nome_unico};Pendente;{id_atestado}\n")
                return True
        except Exception as e:
            print(f"Erro ao salvar os dados: {e}")
            return False

    #Função para ler os dados do arquivo .txt
    def ler_dados_cpf(cpf):
        atestados_encontrados = []  # Lista para armazenar os objetos Atestados encontrados
        try:
            with open(Atestados.caminho_arquivo, "r", encoding="utf-8") as arquivo:
                linhas = arquivo.readlines()
            
                # Loop para verificar cada linha
                for linha in linhas:
                    dados = linha.strip().split(";")
                    if dados and dados[2] == cpf and len(dados) >= 10:  # O CPF está na terceira posição (índice 2)
                        # Criando um objeto Atestados e adicionando à lista
                        atestado = Atestados(
                            nome=dados[0],
                            email=dados[1],
                            cpf=dados[2],
                            curso=dados[3],
                            semestre=dados[4],
                            dataIn=datetime.strptime(dados[5], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            dataFin=datetime.strptime(dados[6], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            cid=dados[7],
                            pdf=dados[8],
                            situacao=dados[9],
                            periodo=str((datetime.strptime(dados[6], "%Y-%m-%d")-datetime.strptime(dados[5], "%Y-%m-%d")).days) + " dias" if (datetime.strptime(dados[6], "%Y-%m-%d")-datetime.strptime(dados[5], "%Y-%m-%d")).days > 1 else " dia",
                            id=dados[10]
                        )
                        atestados_encontrados.append(atestado)
                return atestados_encontrados
        except FileNotFoundError:
            return False
        
    def ler_dados():
        atestados_encontrados = []
        try:
            with open(Atestados.caminho_arquivo, "r", encoding="utf-8") as arquivo:
                linhas = arquivo.readlines()
            
                # Loop para verificar cada linha
                for linha in linhas:
                    dados = linha.strip().split(";")
                    if dados and len(dados) >= 10:  # Verifica se a linha tem pelo menos 9 elementos
                        # Criando um objeto Atestados e adicionando à lista
                        atestado = Atestados(
                            nome=dados[0],
                            email=dados[1],
                            cpf=dados[2],
                            curso=dados[3],
                            semestre=dados[4],
                            dataIn=datetime.strptime(dados[5], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            dataFin=datetime.strptime(dados[6], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            cid=dados[7],
                            pdf=dados[8],
                            situacao=dados[9],
                            periodo=str((datetime.strptime(dados[6], "%Y-%m-%d")-datetime.strptime(dados[5], "%Y-%m-%d")).days) + " dias" if (datetime.strptime(dados[6], "%Y-%m-%d")-datetime.strptime(dados[5], "%Y-%m-%d")).days > 1 else "1 dia",
                            id=dados[10]
                        )
                        atestados_encontrados.append(atestado)
                return atestados_encontrados
        except FileNotFoundError:
            return False
        
    def ler_dados_id(id):
        try:
            with open(Atestados.caminho_arquivo, "r", encoding="utf-8") as arquivo:
                linhas = arquivo.readlines()
            
                # Loop para verificar cada linha
                for linha in linhas:
                    dados = linha.strip().split(";")
                    if dados and len(dados) >= 10 and dados[10] == id:  # Verifica se a linha tem pelo menos 9 elementos
                        # Criando um objeto Atestados e adicionando à lista
                        atestado = Atestados(
                            nome=dados[0],
                            email=dados[1],
                            cpf=dados[2],
                            curso=dados[3],
                            semestre=dados[4],
                            dataIn=datetime.strptime(dados[5], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            dataFin=datetime.strptime(dados[6], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            cid=dados[7],
                            pdf=dados[8],
                            situacao=dados[9],
                            periodo=str((datetime.strptime(dados[6], "%Y-%m-%d")-datetime.strptime(dados[5], "%Y-%m-%d")).days) + " dias" if (datetime.strptime(dados[6], "%Y-%m-%d")-datetime.strptime(dados[5], "%Y-%m-%d")).days > 1 else "1 dia",
                            id=dados[10]
                        )
                return atestado
        except FileNotFoundError:
            return False
    
    #Função para salvar atestados em .pdf
    def salvar_arquivo(arquivo, nome_unico):
        try:
            with open(os.path.join(Atestados.caminho_atestados, nome_unico), "wb") as f:
                f.write(arquivo.read())
            return True
        except Exception as e:
            print(f"Erro ao salvar o arquivo: {e}")
            return False
        
    def remover_arquivo(nome_unico):
        try:
            os.remove(os.path.join(Atestados.caminho_atestados, nome_unico))
            return True
        except Exception as e:
            print(f"Erro ao excluir o arquivo: {e}")
            return False
        
    def atualizar_status(status, id):
        atestados_atualizados = []
        try:
            with open(Atestados.caminho_arquivo, "r", encoding="utf-8") as arquivo:
                for atestado in arquivo:
                    atestado = atestado.strip().split(';')
                    if atestado[10] == id:
                        atestado[9] = status 
                    atestados_atualizados.append(';'.join(atestado)) 

            with open(Atestados.caminho_arquivo, "w", encoding="utf-8") as arquivo:
                for linha in atestados_atualizados:
                    arquivo.write(linha + '\n')
            return True
        except:
            return False