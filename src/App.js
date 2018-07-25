import React, { Component } from 'react';
import './App.css';
import {
  Button,
  SvgIcon,
  TextField,
    MenuItem,
} from '@material-ui/core';

import {connect} from 'mqtt';
import StyleDetail from './StyleDetail'

const mqtt_server_url = "wss://light-bulb.cn:8084/mqtt";
const topic_send = "lb/send";
const topic_response = "lb/response/";

const client_id = 'C_' + new Date().getTime();

var client;

const intentions = [];
for(var i = 1; i< 100; i++) {
  intentions[i] = {key: i, value: i + ' 万元'}
}

const styles = [
  {key: 1, value: '现代简约'},
  {key: 7, value: '新中式风格'},
  {key: 2, value: '地中海风格'},
  {key: 3, value: '美式乡村'},
  {key: 4, value: '日式风格'},
  {key: 5, value: '东南亚风格'},
  {key: 6, value: '田园风格'},
  {key: 8, value: '古典欧式'},
];

const itemStyle = {
  width: "50%",
  margin: "15px",
};


class App extends Component {
  state = {
    name: "UNKNOWN",
    address: "UNKNOWN",
    telephone: "UNKNOWN",
    intention: '3 万元',
    style: styles[0].value,
  };

  _handleIntentionChange = (e) => {
    this.setState({
      intention: e.target.value
    })
  };

  _onStyleSelected = (e) => {
    this.setState({
      style: e.target.value
    })
  };

  componentDidMount() {
    client  = connect(mqtt_server_url, {clientId: client_id});

    client.on('connect', function () {
      client.subscribe(topic_response + client_id);
      console.log("Connect", "connected");
    });

    client.on('error', function (e) {
      console.log("Connect error", e);
    });


    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      alert("你的信息我们已经收到，我们会尽快安排工作人员跟您联系！");
      // window.opener=null;
      // window.open('','_self');
      // window.close();
      // client.end()
    });

    this.setState({
        path: this._getPorp("path")
    });
    this.setState({
        dataId: this._getPorp("id")
    });

    console.log("Search: ", window.location.search);
  }

  _getPorp(key) {
      let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
      let r = window.location.search.substr(1).match(reg);
      if (r !== null) {
          return unescape(r[2]);
      }

      return null;
  }

  _sendData = () => {
    let data = {
      name: this.state.name,
      address: this.state.address,
      telephone: this.state.telephone,
      budget: this.state.intention,
      style: this.state.style,
      client_id: client_id,
    };

    console.log('Client id', client_id);

    client.publish(topic_send, JSON.stringify(data))
  };

  render() {
    switch (this.state.path) {
        case "styledetail":
          return (
              <StyleDetail id = {this.state.dataId}/>
          );
        default:
            return (
                <form className="App">
                    <TextField
                        style = {itemStyle}
                        id = "name"
                        label = "您的姓名"
                        marggin = "normal"
                        onChange = {(e) => {this.setState({name: e.target.value})}}
                    /><br/>

                    <TextField
                        style = {itemStyle}
                        id = "address"
                        label = "您的地址"
                        marggin = "normal"
                        onChange = {(e) => {this.setState({address: e.target.value})}}
                    /><br/>


                    <TextField
                        style = {itemStyle}
                        id = "telephone"
                        label = "您的联系电话"
                        marggin = "normal"
                        helperText = "非常重要，请您仔细填写！"
                        onChange = {(e) => {this.setState({telephone: e.target.value})}}
                    /><br/>

                    <TextField
                        style = {itemStyle}
                        select = {true}
                        fullWidth = {false}
                        id = "intention"
                        label = "装修预算"
                        marggin = "normal"
                        value = {this.state.intention}
                        onChange = {this._handleIntentionChange}
                        helperText = "单位(万元)">
                        {
                            intentions.map(intention => (
                                <MenuItem key={intention.key} value={intention.value}>
                                    {intention.value}
                                </MenuItem>))
                        }
                    </TextField><br/>


                    <TextField
                        style = {itemStyle}
                        id = "style"
                        select = {true}
                        label = "装修风格"
                        value = {this.state.style}
                        onChange = {this._onStyleSelected}
                        marggin = "normal"
                    >
                        {
                            styles.map(style => (
                                <MenuItem key={style.key} value={style.value}>
                                    {style.value}
                                </MenuItem>))
                        }
                    </TextField><br/>

                    <Button
                        style = {itemStyle}
                        onClick = {this._sendData}
                        variant="raised"
                        color="primary">
                        愉快的填好了
                        <SvgIcon>
                            <path d="M2.01,21L23,12 2.01,3 2,10l15,2 -15,2z"/>
                        </SvgIcon>
                    </Button>
                </form>
            );
    }
  }
}

export default App;
