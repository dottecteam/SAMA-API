from flask import jsonify, session
from app.models.md_teams import Teams
from datetime import datetime

class DashboardTeams:
    def getData():
        data = DashboardTeams.organizeEvaluations(Teams().readEvaluationsById(session['team']['id']))
        avarage = DashboardTeams.avarage(data)
        return data, avarage
    
    def organizeEvaluations(data):
        return sorted(
            data,
            key = lambda x: datetime.strptime(x['time'], '%Y-%m-%d %H:%M:%S'),
            reverse = True
        )
        
    def avarage(data):
        avarageAll = []

        for list in data:
            avarage = []
            proactivity = []
            autonomy = []
            collaboration = []
            delivery = []

            for _, notes in list['evaluations'].items():
                proactivity.append(float(notes['proatividade']))
                autonomy.append(float(notes['autonomia']))
                collaboration.append(float(notes['colaboracao']))
                delivery.append(float(notes['entrega']))

            for scores in [proactivity, autonomy, collaboration, delivery]:
                avarage.append(float(f'{(sum(scores) / len(scores)):.1f}'))

            avarageAll.append(avarage) 
        return avarageAll

            
            
                
        
