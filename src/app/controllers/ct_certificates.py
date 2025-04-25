import uuid
from flask import render_template, request, redirect, url_for, jsonify, session
from app.models.md_certificates import Certificates
from app.utilities.ut_validation import Validation

class CertificatesController:

    #Função para ler os aterstados de uma pessoa
    def readUserCertificates():
        return Certificates().readDataByEmail(session['user']['email'])
         
    #Função para ler todos os atestados
    def readAllCertificates():
        return Certificates().readAllData()

    #Função que procura os atestados pelo id
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
        return response

    #Função que registra os atestados
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
            print(f"Error: {e}")
            certificates.deleteFile(uniqueName)
            return jsonify({"status": False, "message": "Erro ao validar data!"}), 500

        
    #Função que atualiza o status do atestado
    def updateCertificate():
        try:
            data = request.get_json()
            status = data.get('status')
            id = data.get('id')
            if Certificates().updateStatus(status, id):
                return jsonify({"mensagem": "Status atualizado com sucesso!"}), 200
            else:
                return jsonify({"mensagem": "Erro ao atualizar status."}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao validar data!"}), 500
        
    #Função que deleta o atestado
    def deleteCertificates():
        try:
            id=request.form.get("id")
            if Certificates().deleteData(id):
                return jsonify({"status": True,"message": "Status atualizado com sucesso!"}), 200
            else:
                return jsonify({"status": False,"message": "Erro ao atualizar status."}), 400
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao validar data!"}), 500
            
    #Função que atualiza a tabela dos atestados
    def updateTableUserCertificates():
        try:
            certificates=Certificates().readDataByEmail(session['user']['email'])
            if certificates:
                table=''
                for certificate in certificates:
                    table+=f'''<tr>
                                    <td>{ certificate.cid }</td>
                                    <td>{ certificate.dateIn }</td>
                                    <td>{ certificate.dateFin }</td>
                                    <td>{ certificate.period }</td>
                                    <td>{ certificate.status }</td>
                                    <td>'''
                    if certificate.status=='Pendente':
                        table+=f'''
                                    <button class="btn-delete-certificate btn btn-danger" data-id="{ certificate.id }">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                '''
                    table+=f'''
                            </td>
                        </tr>'''
                return jsonify({"status": True,"message": "Tabela atualizada com sucesso!", "table": table}), 200
            else:
                return jsonify({"status": False, "message": "Erro ao atualizar tabela!"}), 500
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao atualizar tabela!"}), 500
        
    def updateTableAllCertificates():
        try:
            certificates=Certificates().readAllData()
            if certificates:
                table=''
                for certificate in certificates:
                    table+=f'''<tr class="table-query-tr" data-id="{certificate.id}" data-status="{certificate.status}">
                                    <td>{ certificate.name }</td>
                                    <td>{ certificate.dateIn }</td>
                                    <td>{ certificate.dateFin }</td>
                                    <td>{ certificate.period }</td>
                                    <td>{ certificate.status }</td>
                                </tr>'''
                return jsonify({"status": True,"message": "Tabela atualizada com sucesso!", "table": table}), 200
            else:
                return jsonify({"status": False, "message": "Erro ao atualizar tabela!"}), 500
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"status": False, "message": "Erro ao atualizar tabela!"}), 500
    

        

        
        
       
            
    
         




    
 