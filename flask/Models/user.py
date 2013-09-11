# encoding: utf-8

"""
Created by Xero 2012-12-08.
"""

import hashlib
from datetime import datetime
from werkzeug import generate_password_hash, check_password_hash, cached_property

from flask.ext.sqlalchemy import BaseQuery
from flask.ext.login import UserMixin
from extensions import db

class UserQuery(BaseQuery):

    def authenticate(self, login, password):
        
        user = self.filter(db.or_(User.username==login, User.email==login)).first()
        if user:
            authenticated = user.check_password(password)
        else:
            authenticated = False

        return user, authenticated

    def authenticate_openid(self, email, openid):

        user = self.filter(User.email==email).first()

        if user:
            authenticated = user.check_openid(openid)
        else:
            authenticated = False

        return user, authenticated

class User(db.Model, UserMixin):
    query_class = UserQuery
    
    # user roles
    ADMIN = 100
    RESELLER = 200
    EDITOR = 300
    MEMBER = 400
    # FUGUANG = 200
    # FGA = 300
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Unicode(60), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=False, nullable=False)
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)
    role = db.Column(db.Integer, default=MEMBER)
    
    active = db.Column(db.Boolean, default=True)
    _password = db.Column("password", db.String(80))
    _openid = db.Column("openid", db.String(80), unique=True)
    is_active = db.Column(db.Boolean, default=True)
    
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)

    def __str__(self):
        return self.username

    def __repr__(self):
        return "<%s>" % self
    
    def is_active(self):
        return self.active

    def _get_password(self):
        return self._password

    def _set_password(self, password):
        self._password = generate_password_hash(password)

    password = db.synonym("_password", 
                          descriptor=property(_get_password,
                                              _set_password))

    def check_password(self, password):
        if self.password is None:
            return False
        return check_password_hash(self.password, password)

    def _get_openid(self):
        return self._openid

    def _set_openid(self, openid):
        self._openid = generate_password_hash(openid)

    openid = db.synonym("_openid", 
                          descriptor=property(_get_openid,
                                              _set_openid))
    @property
    def is_admin(self):
        return self.role >= self.ADMIN
    
    # @property
    # def is_fuguang(self):
    #     return self.role >= self.FUGUANG
    
    # @property
    # def is_fga(self):
    #     return self.role >= self.FGA
    
    
    # @property
    # def system(self):
    #     if self.role == self.FUGUANG:
    #         return 'FUGUANG'
    #     elif self.role == self.FGA:
    #         return 'FGA'
    #     return ''

    def check_openid(self, openid):
        if self.openid is None:
            return False
        return check_password_hash(self.openid, openid)


    @cached_property
    def gravatar(self):
        if not self.email:
            return ''
        md5 = hashlib.md5()
        md5.update(self.email.strip().lower())
        return md5.hexdigest()

    def gravatar_url(self, size=80):
        if not self.gravatar:
            return ''

        return "http://www.gravatar.com/avatar/%s.jpg?s=%d" % (
            self.gravatar, size)