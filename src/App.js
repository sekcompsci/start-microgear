import React from 'react'
import {connect} from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button, Form, Icon, Input, Layout, Select, Tooltip} from 'antd'
import './App.css'

import ESP8266 from './devices/esp8266'

const {Sider, Content, Header} = Layout;
const Option = Select.Option;
const FormItem = Form.Item;

class App extends React.Component {
    state = {
        ssid: null,
        pass: null,
        appid: null,
        appkey: null,
        appsecret: null,
        board: 'esp8266'
    };

    handleSSID = (e) => {
        this.setState({ssid: e.target.value})
    };

    handlePASS = (e) => {
        this.setState({pass: e.target.value})
    };

    handleAPPID = (e) => {
        this.setState({appid: e.target.value})
    };

    handleKEY = (e) => {
        this.setState({appkey: e.target.value})
    };

    handleSECRET = (e) => {
        this.setState({appsecret: e.target.value})
    };

    handleMicrogear = (val) => {
        this.setState({board: val})
    };

    clearState = () => {
        this.props.form.resetFields();
        this.setState({
            ssid: null,
            pass: null,
            appid: null,
            appkey: null,
            appsecret: null
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {offset: 1, span: 6},
                sm: {offset: 2, span: 20}
            },
            wrapperCol: {
                xs: {offset: 1, span: 6},
                sm: {offset: 2, span: 20}
            },
        };

        let microgearCode;

        switch (this.state.board) {
            case 'esp8266': {
                microgearCode = <ESP8266 ssid={this.state.ssid} pass={this.state.pass} appid={this.state.appid} appkey={this.state.appkey} appsecret={this.state.appsecret}/>;
                break;
            }
            case 'html': {
                microgearCode = "";

                break;
            }
            default: {
                microgearCode = <ESP8266 ssid={this.state.ssid} pass={this.state.pass} appid={this.state.appid} appkey={this.state.appkey} appsecret={this.state.appsecret}/>;
            }
        }

        return (
            <Layout className="layout">
                <Sider breakpoint="md" width="350" collapsedWidth="0">
                    <img className="logo" src="https://netpie.io/public/netpieio/img/logo/netpie_logo_4.png"
                         alt="netpie"/>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    WIFI SSID &nbsp;
                                    <Tooltip title="Wifi name">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('ssid', {
                                rules: [{required: true, message: 'Please input your ssid!', whitespace: true}],
                            })(
                                <Input setfieldsvalue={this.state.ssid} onChange={this.handleSSID}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    WIFI PASSWORD &nbsp;
                                    <Tooltip title="Wifi password">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your password!', whitespace: true}],
                            })(
                                <Input setfieldsvalue={this.state.pass} onChange={this.handlePASS}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    NETPIE APPID &nbsp;
                                    <Tooltip title="Application name from https://netpie.io/app">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('appid', {
                                rules: [{required: true, message: 'Please input your appid!', whitespace: true}],
                            })(
                                <Input setfieldsvalue={this.state.appid} onChange={this.handleAPPID}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    NETPIE KEY &nbsp;
                                    <Tooltip title="string for authen netpie">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('key', {
                                rules: [{required: true, message: 'Please input your key!', whitespace: true}],
                            })(
                                <Input setfieldsvalue={this.state.appkey} onChange={this.handleKEY}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    NETPIE SECRET &nbsp;
                                    <Tooltip title="string for authen netpie">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('secret', {
                                rules: [{required: true, message: 'Please input your secret!', whitespace: true}],
                            })(
                                <Input setfieldsvalue={this.state.appsecret} onChange={this.handleSECRET}/>
                            )}
                        </FormItem>
                        <Button type="danger" style={{float: 'right', marginRight: '2rem'}} onClick={this.clearState}
                                ghost>Clear</Button>
                    </Form>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', height: '50px', padding: '10px 0'}}>
                        <CopyToClipboard text={this.props.command}>
                            <Button type="primary" style={{float: 'right', marginRight: '1rem'}}>Copy</Button>
                        </CopyToClipboard>
                        <Select style={{width: '220px', float: 'right', marginRight: '1rem'}} defaultValue='esp8266'
                                placeholder="Select another microgear" onChange={this.handleMicrogear}>
                            <Option value="esp8266">esp8266</Option>
                            <Option value="html">html</Option>
                            <Option value="python">python</Option>
                            <Option value="nodeJS">nodeJS</Option>
                            <Option value="nb-iot">nb-iot</Option>
                        </Select>
                    </Header>
                    <Content className="content">
                        {microgearCode}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        command: state.command
    }
};

export default connect(mapStateToProps)(Form.create()(App))