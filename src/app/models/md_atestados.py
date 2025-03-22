import os
import re

class Atestados:
    #Caminho do arquivo .txt
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "alunos.txt")
    #Caminho dos uploads de atestados
    caminho_atestados = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "uploads"))

    def __init__(self, nome, email, curso, semestre, dataIn, dataFin, cid, pdf, cpf):
        self.nome = nome
        self.email = email
        self.curso = curso
        self.semestre=semestre
        self.dataIn=dataIn
        self.dataFin=dataFin
        self.cid=cid
        self.pdf=pdf
        self.cpf=cpf

    
    #Função para salvar os dados no arquivo .txt
    def salvar_dados(nome, email, curso, semestre, dataIn, dataFin, cid, nome_unico, cpf):
        try:
            with open(Atestados.caminho_arquivo, "a") as arquivo:
                arquivo.write(f"{nome};{email};{cpf};{curso};{semestre};{dataIn};{dataFin};{cid};{nome_unico}\n")
                return True
        except Exception as e:
            print(f"Erro ao salvar os dados: {e}")
            return False

    #Função para ler os dados do arquivo .txt
    def ler_dados_cpf(cpf):
        atestados_encontrados = []  # Lista para armazenar os objetos Atestados encontrados
        try:
            with open(Atestados.caminho_arquivo, "r") as arquivo:
                linhas = arquivo.readlines()
            
                # Loop para verificar cada linha
                for linha in linhas:
                    dados = linha.strip().split(";")
                    if dados and dados[2] == cpf:  # O CPF está na terceira posição (índice 2)
                        # Criando um objeto Atestados e adicionando à lista
                        atestado = Atestados(
                            nome=dados[0],
                            email=dados[1],
                            cpf=dados[2],
                            curso=dados[3],
                            semestre=dados[4],
                            dataIn=dados[5],
                            dataFin=dados[6],
                            cid=dados[7],
                            pdf=dados[8]
                        )
                        atestados_encontrados.append(atestado)
                return atestados_encontrados
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
        
    def validar_cpf(cpf):
         # Remove qualquer caractere não numérico
        cpf = re.sub(r'[^0-9]', '', cpf)
    
        # Verifica se o CPF tem 11 dígitos
        if len(cpf) != 11:
            return False
    
        # Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        if cpf == cpf[0] * 11:
            return False
    
        # Validação do primeiro dígito verificador
        soma_1 = sum(int(cpf[i]) * (10 - i) for i in range(9))
        digito_1 = (soma_1 * 10) % 11
        if digito_1 == 10 or digito_1 == 11:
            digito_1 = 0
    
        # Validação do segundo dígito verificador
        soma_2 = sum(int(cpf[i]) * (11 - i) for i in range(10))
        digito_2 = (soma_2 * 10) % 11
        if digito_2 == 10 or digito_2 == 11:
            digito_2 = 0
    
        # Verifica se os dígitos verificadores estão corretos
        if cpf[9] == str(digito_1) and cpf[10] == str(digito_2):
            return True
        return False