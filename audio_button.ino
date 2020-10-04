#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
int button = 12; //D6
int buttonState = 1;

void setup()
{
  pinMode(button, INPUT_PULLUP);  //Setup internal pull up resistor since we are not using an external resistor
  Serial.begin(115200);           //Serial connection
  WiFi.begin("SSID", "PASSWORD"); //WiFi connection

  while (WiFi.status() != WL_CONNECTED)
  { //Wait for the WiFI connection completion

    delay(500);
    Serial.println("Waiting for connection");
  }
}

void loop()
{

  if (WiFi.status() == WL_CONNECTED)
  { //Check WiFi connection status
    HTTPClient http;
    buttonState = digitalRead(button);
    if (buttonState == 1)
    {
      Serial.println("in");
      http.begin("http://192.168.1.34:8081/in");    //Specify request destination
      http.addHeader("Content-Type", "text/plain"); //Specify content-type header
      int httpCode = http.POST("Out");              //Send the request

      String payload = http.getString(); //Get the response payload
      Serial.println(httpCode);          //Print HTTP return code
      Serial.println(payload);           //Print request response payload

      http.end(); //Close connection
    }
    if (buttonState == 0)
    {
      Serial.println("out");
      http.begin("http://192.168.1.34:8081/out");   //Specify request destination
      http.addHeader("Content-Type", "text/plain"); //Specify content-type header
      int httpCode = http.POST("Out");              //Send the request

      String payload = http.getString(); //Get the response payload
      Serial.println(httpCode);          //Print HTTP return code
      Serial.println(payload);           //Print request response payload

      http.end(); //Close connection
    }
  }
  else
  {

    Serial.println("Error in WiFi connection");
  }

  delay(50); //Send a request every 30 seconds
}
