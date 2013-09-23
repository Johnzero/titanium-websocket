# -*- coding: utf-8 -*-
from protocol import MsgServerProtocol,ImgServerProtocol

from twisted.internet import reactor
from twisted.python import log
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource

from autobahn.websocket import WebSocketServerFactory, WebSocketServerProtocol, listenWS
from autobahn.resource import WebSocketResource, WSGIRootResource, HTTPChannelHixie76Aware
from autobahn.flashpolicy import FlashPolicyFactory

import socket,sys
address = socket.gethostbyname(socket.gethostname())
print address

IP = "ws://localhost:8080/"

debug = True
if debug:
   log.startLogging(sys.stdout)

##
## Our WSGI application .. in this case Flask based
##
from flask import Flask, render_template,url_for,redirect,send_from_directory,request
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

import config, uuid
from extensions import db,cache
from Models import User
# from createUser import createusers

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
@app.route('/scriptcam.lic')
def static_from_root():
   return redirect('/static/ScriptCam/scriptcam.lic')

##
## create a Twisted Web resource for our WebSocket server
##
msgFactory = WebSocketServerFactory(IP,debug = debug,debugCodePaths = debug)
msgFactory.protocol = MsgServerProtocol
msgFactory.setProtocolOptions(allowHixie76 = True) # needed if Hixie76 is to be supported
msgResource = WebSocketResource(msgFactory)

imgFactory = WebSocketServerFactory(IP,debug = debug,debugCodePaths = debug)
imgFactory.protocol = ImgServerProtocol
imgFactory.setProtocolOptions(allowHixie76 = True) # needed if Hixie76 is to be supported
imgResource = WebSocketResource(imgFactory)

##
## create a Twisted Web WSGI resource for our Flask server
##
wsgiResource = WSGIResource(reactor, reactor.getThreadPool(), app)

##
## create a root resource serving everything via WSGI/Flask, but
## the path "/ws" served by our WebSocket stuff
##
rootResource = WSGIRootResource(wsgiResource, {'msg': msgResource,'img':imgResource})

## We need to start a "Flash Policy Server" on TCP/843
## which Adobe Flash player will contact to check if
## it is allowed to connect to the WebSocket port.
##
# If flash Socket The policy that is sent to the clients.
POLICY = """<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>\0"""
# The string the client has to send in order to receive the policy.
POLICYREQUEST = "<policy-file-request/>"
flashPolicyFactory = FlashPolicyFactory(8080)
reactor.listenTCP(843, flashPolicyFactory)

##
## create a Twisted Web Site and run everything
##
site = Site(rootResource)
site.protocol = HTTPChannelHixie76Aware # needed if Hixie76 is to be supported

reactor.listenTCP(8080, site)
reactor.run()

#twistd -y echo_server.tac