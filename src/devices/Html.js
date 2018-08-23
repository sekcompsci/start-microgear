import React from 'react'
import {connect} from 'react-redux'

import Highlight from '../Highlight'
import {updateCommand} from '../redux/action';

class Html extends React.Component {
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
        return `<script src="https://cdn.netpie.io/microgear.js"></script>
<script>
    const APPID     = ${appid ? '"' + appid + '"' : '"APPID"'};
    const APPKEY    = ${appkey ? '"' + appkey + '"' : '"APPKEY"'};
    const APPSECRET = ${appsecret ? '"' + appsecret + '"' : '"APPSECRET"'};
    
    var microgear = Microgear.create({
        key: APPKEY,
        secret: APPSECRET,
        alias : ${alias ? '"' + alias + '"' : '"htmlgear"'}         /*  optional  */
    });
    
    microgear.on('message',function(topic,msg) {
        document.getElementById("data").innerHTML = msg;
    });
    
    microgear.on('connected', function() {
        document.getElementById("data").innerHTML = "Now I am connected with netpie...";
        setInterval(function() {
            microgear.chat("htmlgear","Hello from myself at "+Date.now());
        },5000);
    });
    
    microgear.on('present', function(event) {
        console.log(event);
    });
    
    microgear.on('absent', function(event) {
        console.log(event);
    });
    
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