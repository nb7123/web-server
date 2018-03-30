import React, { Component } from 'react';
import './App.css';
import MenuItem from 'material-ui/Menu/MenuItem';
import {
  Button,
  SvgIcon,
  TextField,
} from 'material-ui';

import {connect} from 'mqtt';

const mqtt_server_url = "wss://light-bulb.cn:8084/mqtt";
const topic_send = "lb/send";
const topic_response = "lb/response/";

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
    style: styles[0].value
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

  _sendData = () => {
    let data = [];
    data[0] = {name: this.state.name};
    data[1] = {address: this.state.address};
    data[2] = {telephone: this.state.telephone};
    data[3] = {intention: this.state.intention};
    data[4] = {style: this.state.style};


    const client_id = 'C_' + new Date().getTime();
    console.log('Client id', client_id);

    const client  = connect(mqtt_server_url, {clientId: client_id});

    client.on('connect', function () {
      client.subscribe(topic_response + client_id);
      console.log("Connect", "connected");
      client.publish(topic_send, JSON.stringify(data))
    });

    client.on('error', function (e) {
      console.log("Connect error", e);
    });


    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      window.opener=null;
      window.open('','_self');
      window.close();
      client.end()
    })
  };

  render() {
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

export default App;
