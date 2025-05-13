import os
from flask import Flask, request, session
from datetime import datetime
class Log:
    srcData=os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "log.txt")
    def register(self, operation):
        ip = request.remote_addr
        if 'user' in session:
            account=session['user']['email']
        elif 'team' in session:
            account=session['user']['team']
        elif 'secretary' in session:
            account='Secretary'
        else:
            account='Not Logged'
        time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        line=f'[{time}] IP = {ip} | Account = {account} | Operation = {operation}'
        with open(self.srcData, "a") as file:
           file.write(line)