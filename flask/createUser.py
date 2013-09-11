# encoding: utf-8
#!flask/bin/python

"""
helpers.py

Created by J.W. on 2012-12-11.
Copyright (c) 2012 Fu Guang Industrial Co., Lmt.. All rights reserved.
"""

from Models import User

import os.path

def createusers(username,email,role,active):

	return User(username=username,email=email,role=role,active=active)






