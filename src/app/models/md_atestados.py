import os

class Atestados:
    #Caminho do arquivo .txt
    caminho_arquivo = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "alunos.txt")
    #Caminho dos uploads de atestados
    caminho_atestados = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "atestados", "uploads"))

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
    def ler_dados():
        try:
            with open(Atestados.caminho_arquivo, "r") as arquivo:
                linhas = arquivo.readlines()
                return [linha.strip().split(";") for linha in linhas if linha.strip()]
        except FileNotFoundError:
            return []
    
    #Função para salvar atestados em .pdf
    def salvar_arquivo(arquivo, nome_unico):
        try:
            with open(os.path.join(Atestados.caminho_atestados, nome_unico), "wb") as f:
                f.write(arquivo.read())
            return True
        except Exception as e:
            print(f"Erro ao salvar o arquivo: {e}")
            return False