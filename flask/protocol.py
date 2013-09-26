
# -*- coding: utf-8 -*-

import uuid, sys, time, random

from twisted.python import log
from twisted.internet import reactor
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource

from flask import Flask, render_template,url_for,redirect,send_from_directory,request
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

import config
from extensions import db,cache
from Models import User
# from createUser import createusers

from autobahn.websocket import WebSocketServerProtocol, listenWS

from autobahn.resource import WebSocketResource, \
                              WSGIRootResource, \
                              HTTPChannelHixie76Aware
from autobahn.flashpolicy import FlashPolicyFactory

# If flash Socket The policy that is sent to the clients.
POLICY = """<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>\0"""
# The string the client has to send in order to receive the policy.
POLICYREQUEST = "<policy-file-request/>"
Msg_CLIENT_POOL = []
Img_CLIENT_POOL = []
IP = "ws://localhost:8080/"

##
## Our WebSocket Server protocols
##
class MsgServerProtocol(WebSocketServerProtocol):

   def onConnect(self,connectionResponse):
      if connectionResponse.headers.has_key("user") :
         users = User.query.filter_by(username=connectionResponse.headers["user"]).first()
         if users:
            if users.password == connectionResponse.headers["password"]:
               self.name = connectionResponse.headers["user"]
            else : self.closedByMe()
         else : self.closedByMe()
      else : 
         users = User.query.all()
         print users


   def onOpen(self):
      Msg_CLIENT_POOL.append(self)
      print self.name,self.peerstr,"Connected!"

   def sendDict(self, sender, to, timing, payload, binary, payload_frag_size = None, sync = False):
      payloadDict = {"data":payload,"time":timing,"sender":sender.encode("utf8"),"to":to,"type":"text", "random":random.random()}
      self.sendMessage(str(payloadDict), binary)

   def onMessage(self, msg, binary):
      msg = eval(msg)
      msg["pymessage"] = msg["message"].replace(";",'').replace("&#x","\u")
      msg["pymessage"] = eval("u" + "'" + msg["pymessage"] + "'")
      # unescape(message.data.replace(/&#x/g,'%u').replace(/;/g,''));

      if msg["type"] == "update":
         print type(msg["message"])

      for client in Msg_CLIENT_POOL:
         client.sendDict(self.name, "", time.strftime('%Y-%m-%d,%H:%M:%S',time.localtime(time.time())), msg['message'], binary)

   def connectionLost(self, reason):
      try:
         Msg_CLIENT_POOL.remove(self)
      except:pass
      print 'connectionLost'

   def onClose(self, wasClean, code, reason):
      Msg_CLIENT_POOL.remove(self)
      print 'Close';


class ImgServerProtocol(WebSocketServerProtocol):

   def onOpen(self):
      Img_CLIENT_POOL.append(self)
      print self.peerstr,"Connected!"

   def onMessage(self, img, binary):
      print len(img)
      for client in Img_CLIENT_POOL:
         client.sendMessage(img, binary)

   def connectionLost(self, reason):
      WebSocketServerProtocol.connectionLost(self, reason)

   def onClose(self, wasClean, code, reason):
      Img_CLIENT_POOL.remove(self)

##
## Our WSGI application .. in this case Flask based
##

app = Flask(__name__,static_folder='static')
app.secret_key = str(uuid.uuid4())
app.config.from_object('config')
db.init_app(app)
db.app = app

@app.route('/')
def page_home():
   return render_template('index.html')

@app.route('/register/<string:user_name>/<string:password>',methods = ['GET', 'POST'])
def register(user_name,password):
   try:
      user = User(username=user_name,password=password,email="",role=400,active=1)
      db.session.add(user)
      db.session.commit()
   except IntegrityError:
      return "IntegrityError"
   except:return "ServerError"

   return "true"
   # return render_template('index.html')

@app.route('/scriptcam.lic')
def static_from_root():
   return redirect('/static/ScriptCam/scriptcam.lic')
   # return send_from_directory('/static/ScriptCam/', request.path[1:])
