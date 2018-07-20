import serial
from firebase import firebase
import json
import time
from threading import Timer
import socket

## Setup
ser = serial.Serial ("/dev/ttyAMA0", 115200)
idZ = 'z1'
idG = 'g1'
i = 0
sensors = []

auth = firebase.FirebaseAuthentication('****************************',
                                       '************************', 
                                 extra={'uid': '*************'})
firebase = firebase.FirebaseApplication('*************************', auth)

data = {idG : {"id": "1",
               "rua":"Av. das Forças Armadas 376",
               "tipo_zona":"Verde",
               "tarifa":"0.25€/15 min.",
               "horario":"09:00-19:00",
               "lat":"38.74771449916544",
               "lng":"-9.153176236770609",
               "sensores":"" } }

class Sensor:   
    
    def __init__(self, id, lat, lng):
      self.id = id
      self.lat = lat
      self.lng = lng      
      self.timer = Timer(100.0, self.removeSensor)
      self.timer.start()

    def getId(self):
        return self.id
    
    def startTimer(self):
        self.timer = Timer(100.0, self.removeSensor)
        self.timer.start()
        
    def cancelTimer(self):
        self.timer.cancel()

    def removeSensor(self):
        self.cancelTimer()
        idSens = "s" + self.id
        result = firebase.patch("/zonas/"+idZ+"/gateways/" + idG + "/sensores",
                                {idSens: {"id": self.id,
                                       "lat":self.lat,
                                       "lng":self.lng,
                                       "status":"-1"}})

def addSensor(list, sensorData):
    hasSensor = False
    if len(list) > 0:
        for member in list:
            if member.getId() == sensorData[0]:
                hasSensor = True
                break
    if not hasSensor:
        list += [Sensor(sensorData[0],sensorData[1],sensorData[2])]
        
def getSensorPosition(list, sensorId):
    sensorPos = -1
    hasSensor = False
    if len(list) > 0:
        a = 0
        for member in list:
            if member.getId() == sensorId:
                hasSensor = True
                break
            a += 1
    if hasSensor:
        sensorPos = a
    return sensorPos

result = firebase.get("/zonas/"+idZ+"/gateways/" + idG, None)
if result == None:
    result = firebase.patch("/zonas/"+idZ+"/gateways/", data)
    
## Loop
while True:    
    i = i + 1
    dataReceived = str(ser.readline().strip()).replace("b","")
    dataReceived = dataReceived.replace("'","").split(";")
    
    if dataReceived and len(dataReceived) == 4 and dataReceived[0] != "":
        idS = "s" + dataReceived[0]
        addSensor(sensors, dataReceived)
        sensors[getSensorPosition(sensors,dataReceived[0])].cancelTimer()
        result = firebase.patch("/zonas/"+idZ+"/gateways/" + idG + "/sensores",
                                {idS: {"id": dataReceived[0],
                                       "lat":dataReceived[1],
                                       "lng":dataReceived[2],
                                       "status":dataReceived[3]}})
        print ("%d Firebase: data uploaded to DB: %s" % (i, dataReceived))
        sensors[getSensorPosition(sensors,dataReceived[0])].startTimer()

