# -*- coding: utf-8 -*-
from flask import Flask, render_template, url_for, redirect, request
from app import app

@app.route('/<value>' , methods=["GET"])
def index(value=3):
    return render_template('index.html', value=value)

@app.route('/', methods=["POST"])
def indexPost():
    value = request.args.get("value")
    return render_template('index.html', vaule=value)

@app.route('/profile/<username>/')
def get_profile(username):
    return url_for("test_cookies", myname=username)