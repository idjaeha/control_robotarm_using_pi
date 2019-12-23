# -*- coding: utf-8 -*-
from flask import Flask, render_template, url_for, redirect, request
from app import app

@app.route('/' , methods=["GET", "POST"])
def index(value = 3):
    if request.method == "GET":
        return render_template('index.html', value=value)
    else:
        value = int(request.form["slider"])
        return render_template('index.html', value=value)
    
@app.route('/profile/<username>/')
def get_profile(username):
    return url_for("test_cookies", myname=username)

@app.route('/motor/<int:number>')
def get_motor(number):
    return [number for _ in range(6)]