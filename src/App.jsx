import React from 'react'
import { Layout, Form, Input, Tooltip, Icon, Button, Select } from 'antd'
import ESP8266 from './devices/ESP8266'
import './App.css'

const { Sider, Header, Content } = Layout
const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
    state = {
        ssid: null,
        pass: null,
        appid: null,
        appkey: null,
        appsecret: null
    }

    handleSSID = (e) => {
        const val = e.target.value
        this.setState({ ssid: val })
    }

    handlePASS = (e) => {
        const val = e.target.value
        this.setState({ pass: val })
    }

    handleAPPID = (e) => {
        const val = e.target.value
        this.setState({ appid: val })
    }

    handleKEY = (e) => {
        const val = e.target.value
        this.setState({ appkey: val })
    }

    handleSECRET = (e) => {
        const val = e.target.value
        this.setState({ appsecret: val })
    }

    clearState = () => {
        this.setState({
            ssid: null,
            pass: null,
            appid: null,
            appkey: null,
            appsecret: null
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { offset: 1, span: 6 },
                sm: { offset: 2, span: 20 }
            },
            wrapperCol: {
                xs: { offset: 1, span: 6 },
                sm: { offset: 2, span: 20 }
            },
        }
        const headItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }

        return (
            <Layout className="layout">
                <Sider breakpoint="md" width="350" collapsedWidth="0">
                    <img className="logo" src="https://netpie.io/public/netpieio/img/logo/netpie_logo_4.png" alt="netpie" />
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    WIFI SSID &nbsp;
                                        <Tooltip title="Wifi name">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('ssid', {
                                rules: [{ required: true, message: 'Please input your ssid!', whitespace: true }],
                            })(
                                <Input value={this.state.ssid} onChange={this.handleSSID} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    WIFI PASSWORD &nbsp;
                                        <Tooltip title="Wifi password">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!', whitespace: true }],
                            })(
                                <Input value={this.state.pass} onChange={this.handlePASS} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    NETPIE APPID &nbsp;
                                        <Tooltip title="Application name from https://netpie.io/app">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('appid', {
                                rules: [{ required: true, message: 'Please input your appid!', whitespace: true }],
                            })(
                                <Input value={this.state.appid} onChange={this.handleAPPID} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    NETPIE KEY &nbsp;
                                        <Tooltip title="string for authen netpie">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('key', {
                                rules: [{ required: true, message: 'Please input your key!', whitespace: true }],
                            })(
                                <Input value={this.state.appkey} onChange={this.handleKEY} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                    NETPIE SECRET &nbsp;
                                        <Tooltip title="string for authen netpie">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('secret', {
                                rules: [{ required: true, message: 'Please input your secret!', whitespace: true }],
                            })(
                                <Input value={this.state.appsecret} onChange={this.handleSECRET} />
                            )}
                        </FormItem>
                        <Button type="danger" style={{ float: 'right', marginRight: '2rem' }} onClick={this.clearState} ghost>Clear</Button>
                    </Form>
                </Sider>
                <Layout>
                    {/* <Header style={{ background: '#000' }}>
                        <FormItem
                            {...headItemLayout}
                            label="Select"
                            hasFeedback
                        >
                            {getFieldDecorator('select', {
                                rules: [
                                    { required: true, message: 'Please select your country!' },
                                ],
                            })(
                                <Select placeholder="Please select a country">
                                    <Option value="esp8266">ESP8266</Option>
                                    <Option value="arduino-wifi">Arduino (Wifi)</Option>
                                    <Option value="arduino-lan">Arduino (Lan)</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Header> */}
                    <Content className="content">
                        <ESP8266 ssid={this.state.ssid} pass={this.state.pass} appid={this.state.appid} appkey={this.state.appkey} appsecret={this.state.appsecret} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Form.create()(App)