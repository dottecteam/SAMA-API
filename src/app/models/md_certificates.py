import os
from datetime import datetime
from app import app
import shortuuid
from app.utilities.ut_cryptography import Criptography

class Certificates:
    #Caminho do arquivo .txt
    srcData = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "certificates", "certificates.txt")

    #Caminho dos uploads de atestados
    srcUpload = os.path.abspath(os.path.join(app.config['UPLOAD_FOLDER'], "certificates"))

    #Caminho dos CIDs existentes
    srcCids = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "cid11.json")

    #Construtor da classe
    def __init__(self, name='', email='', course='', semester='', dateIn='', dateFin='', cid='', pdf='', status='', period='', id=''):
        self.name = name
        self.email = email
        self.course = course
        self.semester=semester
        self.dateIn=dateIn
        self.dateFin=dateFin
        self.cid=cid
        self.pdf=pdf
        self.status=status
        self.period=period
        self.id=id

    #Funções de salvar dados
    #Função para salvar os dados no arquivo .txt
    def saveData(self, name, email, course, semester, dateIn, dateFin, cid, uniqueName):
        try:
            idCertificate = str(shortuuid.uuid())
            with open(self.srcData, "a", encoding="utf-8") as file:
                line=Criptography.encrypt(f"{idCertificate};{name};{email};{course};{semester};{dateIn};{dateFin};{cid.upper()};{uniqueName};Pendente")
                file.write(f"{line}\n")
                return True
        except Exception as e:
            print(f"Error: {e}")
            return False
        
    #Recebe uma lista e reescreve todo o banco de atestados
    def writeAllData(self,list):
        try:
            with open(self.srcData,'w',encoding="utf-8") as file:
                for item in list:
                    line=Criptography.encrypt(f"{item.id};{item.name};{item.email};{item.course};{item.semester};{datetime.strptime(item.dateIn.split()[0],"%d/%m/%Y").strftime("%Y-%m-%d")};{datetime.strptime(item.dateFin.split()[0],"%d/%m/%Y").strftime("%Y-%m-%d")};{item.cid};{item.pdf};{item.status}")
                    file.write(f"{line}\n")
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

        
    #Função para salvar atestados em .pdf
    def saveFile(self, file, uniqueName):
        try:
            with open(os.path.join(self.srcUpload, uniqueName), "wb") as f:
                f.write(file.read())
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    #Funções de ler os dados
    #Função para ler todos os atestados
    def readAllData(self):
        certificates = [] 
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                lines = file.readlines()
            
                for line in lines:
                    data = Criptography.decrypt(line).strip().split(";")
                    if data and len(data) >= 9:
                        certificate = Certificates(
                            id=data[0],
                            name=data[1],
                            email=data[2],
                            course=data[3],
                            semester=data[4],
                            dateIn=datetime.strptime(data[5], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            dateFin=datetime.strptime(data[6], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            cid=data[7],
                            pdf=data[8],
                            status=data[9],
                            period=str((datetime.strptime(data[6], "%Y-%m-%d")-datetime.strptime(data[5], "%Y-%m-%d")).days) + " dias" if (datetime.strptime(data[6], "%Y-%m-%d")-datetime.strptime(data[5], "%Y-%m-%d")).days > 1 else "1 dia"
                        )
                        certificates.append(certificate)
                return certificates
        except FileNotFoundError:
            return False
        
    #Função para ler os atestados de um certo email
    def readDataByEmail(self, email):
        certificates = [] 
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                lines = file.readlines()
            
                for line in lines:
                    data = Criptography.decrypt(line).strip().split(";")
                    if data and data[2] == email and len(data) >= 9:
                        certificate = Certificates(
                            id=data[0],
                            name=data[1],
                            email=data[2],
                            course=data[3],
                            semester=data[4],
                            dateIn=datetime.strptime(data[5], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            dateFin=datetime.strptime(data[6], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            cid=data[7],
                            pdf=data[8],
                            status=data[9],
                            period=str((datetime.strptime(data[6], "%Y-%m-%d")-datetime.strptime(data[5], "%Y-%m-%d")).days) + " dias" if (datetime.strptime(data[6], "%Y-%m-%d")-datetime.strptime(data[5], "%Y-%m-%d")).days > 1 else "1 dia"
                        )
                        certificates.append(certificate)
                return certificates
        except FileNotFoundError:
            return False
        
    #Função para ler os atestados com um certo id
    def readDataById(self, id):
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                lines = file.readlines()
            
                for line in lines:
                    data = Criptography.decrypt(line).strip().split(";")
                    if data and data[0] == id and len(data) >= 9:
                        certificate = Certificates(
                            id=data[0],
                            name=data[1],
                            email=data[2],
                            course=data[3],
                            semester=data[4],
                            dateIn=datetime.strptime(data[5], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            dateFin=datetime.strptime(data[6], "%Y-%m-%d").strftime("%d/%m/%Y"),
                            cid=data[7],
                            pdf=data[8],
                            status=data[9],
                            period=str((datetime.strptime(data[6], "%Y-%m-%d")-datetime.strptime(data[5], "%Y-%m-%d")).days) + " dias" if (datetime.strptime(data[6], "%Y-%m-%d")-datetime.strptime(data[5], "%Y-%m-%d")).days > 1 else " dia"
                        )
                        break
                return certificate
        except FileNotFoundError:
            return False
    
    #Deletar um arquivo pdf
    def deleteFile(self, uniqueName):
        try:
            os.remove(os.path.join(self.srcUpload, uniqueName))
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False
        
    #Função para deletar um certificado
    def deleteData(self, id):
        try:
            certificateExcluded=self.readDataById(id=id)
            certificates=self.readAllData()
            filteredCertificates=[]
            for certificate in certificates:
                if certificate.id!=certificateExcluded.id:
                    filteredCertificates.append(certificate)
            if self.writeAllData(filteredCertificates):
                if self.deleteFile(certificateExcluded.pdf):
                    return True
                else:
                    return False
            else:
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False
        
    def deleteAllDataByEmail(self, email):
        try:
            certificatesExcluded=self.readDataByEmail(self, email)
            certificates=self.readAllData(self)
            filteredCertificates=[]
            for certificate in certificates:
                for certificateExcluded in certificatesExcluded:
                    if certificate.email!=certificateExcluded.email:
                        filteredCertificates.append(certificate)
                    self.deleteFile(self, certificate.pdf)
            if self.writeAllData(self, filteredCertificates):
                return True
            else:
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False
        
    #Atualizar a situação de um atestado
    def updateStatus(self, status, id):
        certificates = []
        try:
            with open(self.srcData, "r", encoding="utf-8") as file:
                for certificate in file:
                    certificate = Criptography.decrypt(certificate).strip().split(';')
                    if certificate[0] == id:
                        certificate[9] = status 
                    certificates.append(';'.join(certificate)) 

            with open(self.srcData, "w", encoding="utf-8") as file:
                for line in certificates:
                    line=Criptography.encrypt(line)
                    file.write(f'{line}\n')
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False
    
    def changePersonalData(name, email, course, semester):
        certificates = Certificates.readAllData(Certificates)
        fixedCertificates = []
        try:
            for certificate in certificates:
                if certificate.email==email:
                    certificate.name = name
                    certificate.course = course
                    certificate.semester = semester
                fixedCertificates.append(certificate)
            if Certificates.writeAllData(Certificates, fixedCertificates):
                return True
            else:
                return False
        except Exception as e:
            print(f"Error: {e}")
            return False
            