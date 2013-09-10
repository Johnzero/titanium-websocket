###############################################################################
##
##  Copyright 2012 Tavendo GmbH
##
##  Licensed under the Apache License, Version 2.0 (the "License");
##  you may not use this file except in compliance with the License.
##  You may obtain a copy of the License at
##
##      http://www.apache.org/licenses/LICENSE-2.0
##
##  Unless required by applicable law or agreed to in writing, software
##  distributed under the License is distributed on an "AS IS" BASIS,
##  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
##  See the License for the specific language governing permissions and
##  limitations under the License.
##
###############################################################################

import socket
ips = socket.gethostbyname(socket.gethostname())
print ips

import uuid, sys

from twisted.python import log
from twisted.internet import reactor
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource

from flask import Flask, render_template,url_for,redirect,send_from_directory,request

from autobahn.websocket import WebSocketServerFactory, \
                               WebSocketServerProtocol, listenWS

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
IP = "ws://192.168.1.107:8080/"

##
## Our WebSocket Server protocols
##
class MsgServerProtocol(WebSocketServerProtocol):

   def onOpen(self):
      Msg_CLIENT_POOL.append(self)
      print self.peerstr,"Connected!"

   def onMessage(self, msg, binary):
      print msg
      msg =  eval(msg)
      for client in Msg_CLIENT_POOL:
         client.sendMessage("<SMsg : >" + msg['message'], binary)

   def connectionLost(self, reason):
      Msg_CLIENT_POOL.remove(self)
      print 'connectionLost'

   def onClose(self, wasClean, code, reason):
      Msg_CLIENT_POOL.remove(self)
      print 'CLose';


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

@app.route('/')
def page_home():
   return render_template('index.html')

@app.route('/scriptcam.lic')
def static_from_root():
   return redirect('/static/ScriptCam/scriptcam.lic')
   # return send_from_directory('/static/ScriptCam/', request.path[1:])

if __name__ == "__main__":

   debug = True
   # app.debug = debug
   # if debug:
   # log.startLogging(sys.stdout)
   
   ##
   ## create a Twisted Web resource for our WebSocket server
   ##
   msgFactory = WebSocketServerFactory(IP,
                                      debug = debug,
                                      debugCodePaths = debug)
   msgFactory.protocol = MsgServerProtocol
   msgFactory.setProtocolOptions(allowHixie76 = True) # needed if Hixie76 is to be supported
   msgResource = WebSocketResource(msgFactory)
   imgFactory = WebSocketServerFactory(IP,
                                      debug = debug,
                                      debugCodePaths = debug)
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
   flashPolicyFactory = FlashPolicyFactory(8080)
   reactor.listenTCP(843, flashPolicyFactory)

   ##
   ## create a Twisted Web Site and run everything
   ##
   site = Site(rootResource)
   site.protocol = HTTPChannelHixie76Aware # needed if Hixie76 is to be supported

   reactor.listenTCP(8080, site)
   reactor.run()
