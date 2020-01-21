import random
import json
import socketio
import eventlet
from flask import Flask, render_template
from flask import Flask, session, request, json as flask_json
from flask_socketio import SocketIO, send, emit, join_room, leave_room, \
    Namespace, disconnect
import os
import socket
from pathlib import Path
from time import sleep
from threading import Thread, Event
import pandas as pd


today = pd.datetime.now().date()
today1=str(today)
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True
socketio = SocketIO(app)
socketio = SocketIO(app,cors_allowed_origins="*", async_mode=None, logger=False, engineio_logger=True)

def tail(file, n=1, bs=1024):
    f = open(file)
    f.seek(0,2)
    l = 1-f.read(1).count('\n')
    B = f.tell()
    while n >= l and B > 0:
            block = min(bs, B)
            B -= block
            f.seek(B, 0)
            l += f.read(block).count('\n')
    f.seek(B, 0)
    l = min(l,n)
    lines = f.readlines()[-l:]
    f.close()
    return lines

def graph():
    while True:
            lines = tail(f'{today1}.txt', 2)
            for line in lines:
                data=json.loads(line)

                if data["type"] == "SyntheticValue":
                    label=data["data"]["timestamp"][11:]
                    y=data["data"]["PNL"]
                    list=[label,y]
                    #print(list)
                    socketio.emit('data1',list, broadcast=True)
                    
            
                if data["type"] == "SyntheticRatio":
                    label=data["data"]["timestamp"][11:]
                    y=data["data"]["PNL"]
                    list=[label,y]
                    #print(list)
                    socketio.emit('data2',list, broadcast=True)
                    
            socketio.sleep(20)      

@socketio.on('connect')
def test_connect():
    print('Client connected')
    socketio.start_background_task(graph)
    print("Thread Started")
        

if __name__ == ("__main__"):
	# socketio.run(app,host="192.168.1.62", port=5002)
    socketio.run(app,host="192.168.0.101", port=5000) 