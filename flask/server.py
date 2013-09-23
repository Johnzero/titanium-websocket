# -*- coding: utf-8 -*-

from autobahn.websocket import WebSocketServerProtocol

Msg_CLIENT_POOL = []
Img_CLIENT_POOL = []

##
## Our WebSocket Server protocols
##
class MsgServerProtocol(WebSocketServerProtocol):

   def onConnect(self,connectionResponse):
      if connectionResponse.headers.has_key("user") :
         users = User.query.filter_by(username=connectionResponse.headers["user"]).first()
         if users:
            if users.password == connectionResponse.headers["password"]:
               pass
            else : self.closedByMe()
         else : self.closedByMe()
      else : 
         users = User.query.all()
         print users


   def onOpen(self):
      Msg_CLIENT_POOL.append(self)
      print self.peerstr,"Connected!"

   def onMessage(self, msg, binary):
      print msg
      # msg = eval(msg)
      # msg["pymessage"] = msg["message"].replace(";",'').replace("&#x","\u")
      # msg["pymessage"] = eval("u" + "'" + msg["pymessage"] + "'")
      # # unescape(message.data.replace(/&#x/g,'%u').replace(/;/g,''));

      # if msg["type"] == "update":
      #    print type(msg["message"])

      # for client in Msg_CLIENT_POOL:
      #    client.sendMessage("<SMsg : >" + msg['message'], binary)

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




