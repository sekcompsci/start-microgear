import React from 'react'
import {connect} from 'react-redux'

import Highlight from '../Highlight'
import {updateCommand} from '../redux/action';

class Python extends React.Component {
    constructor(props) {
        super(props);

        let command = this.genCommand(this.props.appid, this.props.appkey, this.props.appsecret, this.props.appalias);

        this.props.updateCommand(command);
    }

    componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
            let command = this.genCommand(newProps.appid, newProps.appkey, newProps.appsecret, newProps.appalias);
            this.props.updateCommand(command);
        }
    }

    genCommand = (appid, appkey, appsecret, alias) => {
        return `import microgear.client as microgear
import logging
import time

appid = ${appid ? '"' + appid + '"' : '"APPID"'}
gearkey = ${appkey ? '"' + appkey + '"' : '"APPKEY"'}
gearsecret = ${appsecret ? '"' + appsecret + '"' : '"APPSECRET"'}

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})

def connected():
    logging.info("Now I am connected with netpie")

def message(topic, message):
    logging.info(topic + " " + message)
    
def found(gear):
    logging.info(gear + " become online.")
    
def lost(gear):
    logging.info(gear + " become offline.")

microgear.setalias(${alias ? '"' + alias + '"' : '"pygear"'})
microgear.on_connect = connected
microgear.on_message = message
microgear.on_present = found
microgear.on_absent = lost
microgear.connect(False)

while True:
    microgear.chat(${alias ? '"' + alias + '"' : '"pygear"'}, "Hello world. " + str(int(time.time())))
    time.sleep(1)`
    };

    render() {
        return Highlight('python', this.props.command);
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

export default connect(mapStateToProps, mapDispatchToProps)(Python)