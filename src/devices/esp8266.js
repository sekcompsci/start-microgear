import React from 'react'
import {connect} from 'react-redux'

import Highlight from '../Highlight'
import {updateCommand} from '../redux/action';

class ESP8266 extends React.Component {
    genCommand = (ssid, pass, appid, appkey, appsecret, alias) => {
        return `/*  NETPIE ESP8266 basic sample                            */
/*  More information visit : https://netpie.io             */

#include <ESP8266WiFi.h>
#include <MicroGear.h>

const char* ssid     = ${ssid ? '"' + ssid + '"' : '"WIFI_SSID"'};
const char* password = ${pass ? '"' + pass + '"' : '"WIFI_KEY"'};

#define APPID   ${appid ? '"' + appid + '"' : '"APPID"'}
#define KEY     ${appkey ? '"' + appkey + '"' : '"APPKEY"'}
#define SECRET  ${appsecret ? '"' + appsecret + '"' : '"APPSECRET"'}
#define ALIAS   ${alias ? '"' + alias + '"' : '"esp8266"'}

WiFiClient client;

int timer = 0;
MicroGear microgear(client);

/* If a new message arrives, do this */
void onMsghandler(char *topic, uint8_t* msg, unsigned int msglen) {
    Serial.print("Incoming message --> ");
    msg[msglen] = '\0';
    Serial.println((char *)msg);
}

void onFoundgear(char *attribute, uint8_t* msg, unsigned int msglen) {
    Serial.print("Found new member --> ");
    for (int i=0; i<msglen; i++)
        Serial.print((char)msg[i]);
    Serial.println();  
}

void onLostgear(char *attribute, uint8_t* msg, unsigned int msglen) {
    Serial.print("Lost member --> ");
    for (int i=0; i<msglen; i++)
        Serial.print((char)msg[i]);
    Serial.println();
}

/* When a microgear is connected, do this */
void onConnected(char *attribute, uint8_t* msg, unsigned int msglen) {
    Serial.println("Connected to NETPIE...");
    /* Set the alias of this microgear ALIAS */
    microgear.setAlias(ALIAS);
}


void setup() {
    /* Add Event listeners */

    /* Call onMsghandler() when new message arraives */
    microgear.on(MESSAGE,onMsghandler);

    /* Call onFoundgear() when new gear appear */
    microgear.on(PRESENT,onFoundgear);

    /* Call onLostgear() when some gear goes offline */
    microgear.on(ABSENT,onLostgear);

    /* Call onConnected() when NETPIE connection is established */
    microgear.on(CONNECTED,onConnected);

    Serial.begin(115200);
    Serial.println("Starting...");

    /* Initial WIFI, this is just a basic method to configure WIFI on ESP8266.                       */
    /* You may want to use other method that is more complicated, but provide better user experience */
    if (WiFi.begin(ssid, password)) {
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }
    }

    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    /* Initial with KEY, SECRET and also set the ALIAS here */
    microgear.init(KEY,SECRET,ALIAS);

    /* connect to NETPIE to a specific APPID */
    microgear.connect(APPID);
}

void loop() {
    /* To check if the microgear is still connected */
    if (microgear.connected()) {
        Serial.println("connected");

        /* Call this method regularly otherwise the connection may be lost */
        microgear.loop();

        if (timer >= 1000) {
            Serial.println("Publish...");

            /* Chat with the microgear named ALIAS which is myself */
            microgear.chat(ALIAS,"Hello");
            timer = 0;
        } 
        else timer += 100;
    }
    else {
        Serial.println("connection lost, reconnect...");
        if (timer >= 5000) {
            microgear.connect(APPID);
            timer = 0;
        }
        else timer += 100;
    }
    delay(100);
}`
    };

    constructor(props) {
        super(props);

        let command = this.genCommand(this.props.ssid, this.props.pass, this.props.appid, this.props.appkey, this.props.appsecret, this.props.alias);

        this.props.updateCommand(command);
    }

    componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
            let command = this.genCommand(newProps.ssid, newProps.pass, newProps.appid, newProps.appkey, newProps.appsecret, this.props.alias);
            this.props.updateCommand(command);
        }
    }

    render() {
        return Highlight('c++', this.props.command);
    }
}

const mapStateToProps = state => {
    return {
        command: state.command
    }
};

const mapDispatchToProps = {
    updateCommand
};

export default connect(mapStateToProps, mapDispatchToProps)(ESP8266)