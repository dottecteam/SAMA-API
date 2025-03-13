from app import app
from flask import render_template, request, redirect, url_for, jsonify, session

@app.route("/")
def home():
    return render_template("vw_home.html")

@app.route("/avaliacao")
def avaliacao():
    return render_template("vw_avaliacoes.html")

@app.route("/atestados")
def atestados():
    return render_template("vw_atestados.html")

@app.route("/painel")
def painel():
    return render_template("vw_painel.html")