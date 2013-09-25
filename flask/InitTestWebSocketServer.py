#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2013-06-25 21:56:55
# @Author  : Xero
# @Link    : https://github.com/Johnzero
# @Version : $Id$

import socket,threading,struct,sys,base64,hashlib
from time import sleep

# If flash Socket The policy that is sent to the clients.
POLICY = """<cross-domain-policy><allow-access-from domain="*" to-ports="*" /></cross-domain-policy>\0"""
# The string the client has to send in order to receive the policy.
POLICYREQUEST = "<policy-file-request/>"
clientpool = []
IP = "192.168.1.13"

#启动websocket server
class InitWebSocketServer(object) :

    def __init__(self):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #tcp 链接
        try:
            sock.bind((IP,8080)) #绑定本地地址
            sock.listen(10)
        except:
            print("Server is already running,quit")
            sys.exit()
        while 1:  #创建一个死循环,接受客户端
            connection,address = sock.accept()
            print "Connection from : ",address
            if(self.handshake(connection) != False):
                 #如果握手失败,不启动任务
                t = threading.Thread(target=self.DoRemoteCommand,args=(connection,))
                t.start()

    #连接成功后回应给客户端进行握手
    def handshake(self,client):
        headers = {}
        shake = client.recv(1024)
        if not len(shake):
            return False
        if shake.startswith(POLICYREQUEST):
            client.send(POLICY)
            return True
        header, data = shake.split('\r\n\r\n', 1)
        for line in header.split("\r\n")[1:]:
            key, value = line.split(": ", 1)
            headers[key] = value
        if(headers.has_key("Sec-WebSocket-Key") == False):
            print("this socket is not websocket,close")
            client.close()
            return False
        szKey = base64.b64encode(hashlib.sha1(headers["Sec-WebSocket-Key"] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest())
        szHost = headers["Host"]
        our_handshake = "HTTP/1.1 101 Switching Protocols\r\n" \
                        "Upgrade:websocket\r\n"\
                        "Connection: Upgrade\r\n"\
                        "Sec-WebSocket-Accept:"+ szKey + "\r\n" \
                        "WebSocket-Origin:" + "localhost" + "\r\n" \
                        "WebSocket-Location: ws://" + szHost + "/WebManagerSocket\r\n" \
                        "WebSocket-Protocol:WebManagerSocket\r\n\r\n"
        state = client.send(our_handshake)
        if state:
            clientpool.append(client)
            # self.SendData("Welcome to WebSocket!\nThis messsage is from server!",client)
        return True
    
    #接收客户端发送过来的消息,并且解包
    def RecvData(self,nNum,client):
        try:
            pData = client.recv(nNum)
            fi = open(r"C:\Users\Administrator\Desktop\temp6.temp","wb")
            fi.write(pData)
            fi.close()
            if not len(pData):
                return False
        except:
            return False
        else:
            code_length = ord(pData[1]) & 127
            if code_length == 126:
                masks = pData[4:8]
                data = pData[8:]
            elif code_length == 127:
                masks = pData[10:14]
                data = pData[14:]
            else:
                masks = pData[2:6]
                data = pData[6:]
            raw_str = ""
            i = 0
            for d in data:
                print ord(masks[i%4])
                raw_str += chr(ord(d) ^ ord(masks[i%4]))
                i += 1
            return raw_str

    #这算是客户端一个循环接受数据并且处理数据的线程
    def DoRemoteCommand(self,connection):
        while 1:
            szBuf = self.RecvData(65550,connection)
            if(szBuf == False):
                try :
                    clientpool.remove(connection)
                    for connect in clientpool:
                        self.SendData(str(connection.getpeername())+" quit!",connect)
                except ValueError:pass
                break
            else:
                head = '\x81'
                if len(szBuf) < 126:
                    head += struct.pack('B', len(szBuf))
                elif len(szBuf) <= 0xFFFF:
                    head += struct.pack('!BH', 126, len(szBuf))
                else:
                    head += struct.pack('!BQ', 127, len(szBuf))
                # while 1:
                #     for connect in clientpool:
                #         connect.sendall(head+szBuf)
                #     sleep(5)
                for connect in clientpool:
                        connect.sendall(head+szBuf)


        #打包发送数据给客户端  
    def SendData(self,pData,client):  
        if(pData == False):  
            return False  
        else:  
            pData = str(pData)  
              
        token = "\x81"  
        length = len(pData)  
        if length < 126:  
            token += struct.pack("B", length)  
        elif length <= 0xFFFF:  
            token += struct.pack("!BH", 126, length)  
        else:  
            token += struct.pack("!BQ", 127, length)  
        pData = '%s%s' % (token,pData)  
      
        client.send(pData)  
          
        return True 
if __name__ == '__main__':

    websocket = InitWebSocketServer()