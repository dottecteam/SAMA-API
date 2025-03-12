from app import app
from flask import render_template, request, redirect, url_for, jsonify, session

@app.route("/")
def home():
    return render_template("template.html")