import uuid
from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_certificates import Certificates
from app.utilities.ut_validation import Validation

class CertificatesController:

    #Função para ler os certificados de uma pessoa
    def readUserCertificates():
        return Certificates().readDataByEmail(session['user']['email'])
         
    def readAllCertificates():
        return Certificates().readAllData()

    def searchCertificatesById():
        data = request.get_json()
        id = data.get('id')
        certificate=Certificates()
        data = certificate.readDataById(id)
        response = jsonify({
            "status": True,
            "message": "Dados encontrados!",
            "name": data.name,
            "email": data.email,
            "course": data.course,
            "semester": data.semester,
            "dateIn": data.dateIn,
            "dateFin": data.dateFin,
            "cid": data.cid,
            "pdf": data.pdf,
            "status": data.status,
            "period": data.period,
            "id": data.id
        }), 200
        print(response)
        return response

    def registerCertificate():
        try:
            dateIn = request.form['date-form-certificates-1']
            dateFin = request.form['date-form-certificates-2']
            cid = request.form['input-cid-form-certificates']
            file = request.files['file-form-certificates']
            certificates=Certificates()
        #Validações
            if Validation.valideCid(cid) == False:
                return jsonify({"status": False, "message": "CID inválida!"}), 400
            
            if Validation.validePeriod(dateIn,dateFin) == False:
                return jsonify({"status": False, "message": "Período inválido!"}), 400
        
            if Validation.valideFile(file) == False:
                return jsonify({"status": False, "message": "Arquivo inválido!"}), 400
            
            uniqueName = str(uuid.uuid4()) + ".pdf"
            response = certificates.saveFile(file, uniqueName) 
            if response != True:
                return jsonify({"status": False, "message": "Erro ao salvar arquivo!"}), 400
        
            response = certificates.saveData(name=session['user']['name'],email=session['user']['email'],course=session['user']['course'],semester=session['user']['semester'],dateIn=dateIn,dateFin=dateFin,cid=cid,uniqueName=uniqueName)
            if response != True:
                certificates.deleteFile(uniqueName)
                return jsonify({"status": False, "message": "Erro ao salvar data!"}), 400

            return jsonify({"status": True, "message": "Código enviado com sucesso!"}), 200
        except Exception as e:
            print(e)
            certificates.deleteFile(uniqueName)
            return jsonify({"status": False, "message": "Erro ao validar data!"}), 500

        
    def updateCertificate():
        data = request.get_json()
        status = data.get('status')
        id = data.get('id')
        if Certificates().updateStatus(status, id):
            return jsonify({"mensagem": "Status atualizado com sucesso!"}), 200
        else:
            return jsonify({"mensagem": "Erro ao atualizar status."}), 500
            
    

        

        
        
       
            
    
         




    
 