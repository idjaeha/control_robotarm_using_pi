# -*- coding: utf-8 -*-
from flask import Flask, render_template, url_for, redirect, request
from app import app

motors = [0, 1, 2, 3, 4, 5]

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

@app.route('/motors/')
def get_motors():
    return {
        "m1":motors[0],
        "m2":motors[1],
        "m3":motors[2],
        "m4":motors[3],
        "m5":motors[4],
        "m6":motors[5],
    }

@app.route('/motor/<int:number>/')
def get_motor(number):
    return {
        "value":motors[number]
    }

