import React from 'react'
import {connect} from 'react-redux'

import Highlight from '../Highlight'
import {updateCommand} from '../redux/action';

class Html extends React.Component {
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
        return `<script src="https://cdn.netpie.io/microgear.js"></script>
<script>
    const APPID     = ${appid ? '"' + appid + '"' : '"APPID"'};
    const APPKEY    = ${appkey ? '"' + appkey + '"' : '"APPKEY"'};
    const APPSECRET = ${appsecret ? '"' + appsecret + '"' : '"APPSECRET"'};
    
    var microgear = Microgear.create({
        key: APPKEY,
        secret: APPSECRET,
        alias : ${appalias ? '"' + appalias + '"' : '"htmlgear"'}         /*  optional  */
    });
    
    ${eventConnect?`microgear.on('connected', function() {
        document.getElementById("data").innerHTML = "Now I am connected with netpie...";
        setInterval(function() {
            microgear.chat("htmlgear","Hello from myself at "+Date.now());
        },5000);
    });`:''}
    ${eventMessage?`microgear.on('message',function(topic,msg) {
        document.getElementById("data").innerHTML = msg;
    });`:''}
    ${eventFound?`microgear.on('present', function(event) {
        console.log(event);
    });`:''}
    ${eventLost?`microgear.on('absent', function(event) {
        console.log(event);
    });`:''}
    
    microgear.connect(APPID);
</script>

<div id="data">_____</div>`
    };

    render() {
        return Highlight('html', this.props.command);
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

export default connect(mapStateToProps, mapDispatchToProps)(Html)