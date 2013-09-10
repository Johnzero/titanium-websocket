# encoding: utf-8
"""
Xero
"""
from ..extensions import db
from datetime import datetime

class Products(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    content = db.Column(db.Text())
    model = db.Column(db.String(150))
    brand = db.Column(db.String(50))
    cover = db.Column(db.String(150))

    def __unicode__(self):
        return self.name

    def get_midium_thumb(self):
            if self.cover:
                return 'http://flickholdr.com/580/430/cup'
            return 'http://flickholdr.com/580/430/cup'
    
    def __init__(self, name, content, brand, model, cover):
        self.name = name
        self.content = content
        self.model = model
        self.brand = brand
        self.cover = cover
        
class Discounts(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    content = db.Column(db.Text())
    product = db.Column(db.String(150))
    primeprice = db.Column(db.String(150))
    discoutprice = db.Column(db.String(150))
    cover = db.Column(db.Unicode(1500))
    
    def __init__(self, title, content, product, primeprice, discoutprice, cover):
        
        self.title = title
        self.content = content
        self.product = product
        self.primeprice = primeprice
        self.discoutprice = discountprice
        self.cover = cover
    
    def __unicode__(self):
        return self.title

class Purchase(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    address = db.Column(db.Text())
    content = db.Column(db.Text())
    cover = db.Column(db.Unicode(150))
    
    def __init__(self, name, address, content, cover):
        self.name = name
        self.address = address
        self.content = content
        self.cover = cover

    def __unicode__(self):
        return self.name
