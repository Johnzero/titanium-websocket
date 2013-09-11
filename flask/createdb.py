# encoding: utf-8
#!flask/bin/python

"""
helpers.py

Created by J.W. on 2012-12-11.
Copyright (c) 2012 Fu Guang Industrial Co., Lmt.. All rights reserved.
"""

from Models import User

from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO
from server import app
from extensions import db

import os.path

db.init_app(app)
db.app = app
db.create_all()

admin = User(username="john",email="",role=400,active=1,password="123")
db.session.add(admin)
db.session.commit()




