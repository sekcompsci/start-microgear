import React from 'react'
import {connect} from 'react-redux'

import Highlight from '../Highlight'
import {updateCommand} from '../redux/action';

class Python extends React.Component {
    componentWillMount() {
        this.initCode(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.initCode(newProps);
    }

    initCode = (newProps) => {
        this.props.updateCommand(
            this.genCommand(newProps)
        );
    };

    genCommand = ({appid, appkey, appsecret, appalias, eventConnect, eventMessage, eventFound, eventLost}) => {
        return `import microgear.client as microgear
import logging
import time

appid = ${appid ? '"' + appid + '"' : '"APPID"'}
gearkey = ${appkey ? '"' + appkey + '"' : '"APPKEY"'}
gearsecret = ${appsecret ? '"' + appsecret + '"' : '"APPSECRET"'}

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})

${eventConnect?`def connected():
    logging.info("Now I am connected with netpie")`:''}
${eventMessage?`def message(topic, message):
    logging.info(topic + " " + message)`:''}
${eventFound?`def found(gear):
    logging.info(gear + " become online.")`:''}
${eventLost?`def lost(gear):
    logging.info(gear + " become offline.")`:''}

microgear.setalias(${appalias ? '"' + appalias + '"' : '"pygear"'})
${eventConnect?`microgear.on_connect = connected`:''}
${eventMessage?`microgear.on_message = message`:''}
${eventFound?`microgear.on_present = found`:''}
${eventLost?`microgear.on_absent = lost`:''}
microgear.connect(False)

while True:
    microgear.chat(${appalias ? '"' + appalias + '"' : '"pygear"'}, "Hello world. " + str(int(time.time())))
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