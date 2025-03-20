
class Atestados:
    #Caminho do arquivo .txt
    caminho_arquivo = "../data/usuarios.txt"  #O caminho "base" do projeto está em /src pois é onde roda o 'run.py'
    #Caminho do arquivo .txt
    caminho_atestados = "../data/atestados"

    #Função para salvar os dados no arquivo .txt
    def salvar_dados(nome, email, curso, semestre, dataIn, dataFin, cid, nome_unico, cpf):
        with open(Atestados.caminho_arquivo, "a") as arquivo:
            arquivo.write(f"{nome};{email};{cpf};{curso};{semestre};{dataIn};{dataFin};{cid};{nome_unico}\n")
            return True

    #Função para ler os dados do arquivo .txt
    def ler_dados():
        try:
            with open(Atestados.caminho_arquivo, "r") as arquivo:
                linhas = arquivo.readlines()
                return [linha.strip().split(";") for linha in linhas if linha.strip()]
        except FileNotFoundError:
            return []
    
    #Função para salvar atestados em .pdf
    def salvar_arquivo(arquivo, caminho_atestados):
        with open(caminho_atestados, "wb") as f:
            f.write(arquivo.read())
            return True