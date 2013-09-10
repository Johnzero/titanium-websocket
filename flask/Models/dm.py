# encoding: utf-8

"""
Created by Xero 2012-12-08.
"""

from datetime import date, timedelta,datetime
from flask import Flask, render_template
from flask import Blueprint, url_for, redirect, g, \
                flash, request, current_app, render_template,\
                send_from_directory, views, session,jsonify
from flask.ext.login import login_required, current_user
from ..extensions import db,login as login_manager

class DailyRecap(db.Model):
    __tablename__ = 'daily_recap'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(128))
    amount = db.Column(db.Integer)
    system = db.Column(db.Unicode(64))
    type = db.Column(db.Unicode(64))
    date = db.Column(db.Date, default=date.today)
    
class AmountDivision(db.Model):
    __tablename__ = 'sale_amount_by_division_date'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.utcnow)
    amount = db.Column(db.Integer)
    source = db.Column(db.Unicode(64))
    year = db.Column(db.Unicode(64))
    month = db.Column(db.Unicode(64))
    system = db.Column(db.Unicode(64))
    
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(64))
    code = db.Column(db.Unicode(64))
    system = db.Column(db.Unicode(64))


class ProductMonth(db.Model):
    __tablename__ = 'product_sale_by_month'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.utcnow)
    product_id = db.Column(db.Integer)
    aux_qty = db.Column(db.Integer)
    name = db.Column(db.Unicode(64))
    code = db.Column(db.Unicode(64))
    year = db.Column(db.Unicode(64))
    month = db.Column(db.Unicode(64))
    system = db.Column(db.Unicode(64))
    

class PricePadding(db.Model):
    __tablename__ = 'price_padding'
    
    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer)
    padding = db.Column(db.Integer)
    system = db.Column(db.Unicode(64))
    source = db.Column(db.Unicode(64))
    
class CapacityPadding(db.Model):
    __tablename__ = 'capacity_padding'
    
    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    system = db.Column(db.Unicode(64))
    source = db.Column(db.Unicode(64))


class ShapeAnalyze(db.Model):
    __tablename__ = 'shape_analyze'
    
    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer)
    system = db.Column(db.Unicode(64))
    purpose = db.Column(db.Unicode(64))

class Partner(db.Model):
    __tablename__ = 'partner'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(64))
    system = db.Column(db.Unicode(64))


class PartnerMonth(db.Model):
    __tablename__ = 'partner_month'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(64))
    date = db.Column(db.Date, default=date.today)
    amount = db.Column(db.Integer)
    year = db.Column(db.Unicode(64))
    month = db.Column(db.Unicode(64))
    system = db.Column(db.Unicode(64))
    source = db.Column(db.Unicode(64))