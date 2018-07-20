#include <SoftwareSerial.h>

SoftwareSerial xbee(2, 3); // RX, TX
const int ProxSensor = 7;
const String data = "0;38.748914;-9.155396;"; //0;38.748914;-9.155396; //1;38.748890;-9.155382; //2;38.748872;-9.155369;
int dgRead = -1;
int counter = 0;
int numReads = 0;

void setup() {  
  pinMode(ProxSensor, INPUT);
  Serial.begin(115200);  
  xbee.begin( 115200 );
}

void loop() {  
  char* bufSend;
  String dataToSend = data;
  int status = digitalRead(ProxSensor);
  
  if(dgRead != status){
    numReads++;
    if(numReads >= 2){
      dgRead = status;
    }
  }
  else{
    numReads = 0;
  }
     
  if(counter == 10 || numReads >= 2){      
    dataToSend += dgRead;
    dataToSend.toCharArray(bufSend, dataToSend.length());  
    xbee.write( bufSend, dataToSend.length() );  
    Serial.println( dataToSend );
    counter = 0;
    numReads = 0;
  }
  
  counter++;
  delay(2000);
}
