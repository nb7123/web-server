import React, { Component } from 'react';
import './App.css';
import MenuItem from 'material-ui/Menu/MenuItem';
import {
  Button,
  SvgIcon,
  TextField,
} from 'material-ui';

import {connect} from 'mqtt';

const intentions = [];
for(var i = 1; i< 100; i++) {
  intentions[i] = {key: i, value: i}
}

const styles = [
  {label: '风格1', value: '风格1'},
  {label: '风格2', value: '风格2'},
  {label: '风格3', value: '风格3'},
  {label: '风格4', value: '风格4'},
  {label: '风格5', value: '风格5'},
  {label: '风格6', value: '风格6'},
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
    intention: 3,
    style: "精典中式"
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

  _testConnect = () => {
    console.log("Test connect mqtt server.");
    const client  = connect({host: '192.168.2.80', port: 8083, clientId: 'abcd_1234'});
    // let client = this.mqtt.connect('wxs://test.mosquitto.org');

    client.on('connect', function () {
      client.subscribe('presence');
      client.publish('presence', 'Hello mqtt');
      console.log("Connect", "connected");
    });

    client.on('error', function (e) {
      console.log("Connect error", e);
    });


    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end()
    })
  };


  // componentDidMount() {
  //   let client  = this.mqtt.connect([{host: "192.168.2.80", port: 1883}]);
  //
  //   client.on('connect', function () {
  //     client.subscribe('presence');
  //     client.publish('presence', 'Hello mqtt');
  //     console.log("connected");
  //   });
  //
  //   client.on('error', function (e) {
  //     console.log(e);
  //   });
  //
  //
  //   client.on('message', function (topic, message) {
  //     // message is Buffer
  //     console.log(message.toString());
  //     client.end()
  //   })
  // }

  render() {
    return (
      <form className="App">
        <TextField
          style = {itemStyle}
          id = "name"
          label = "您的姓名"
          marggin = "normal"
        />

        <div>
          <TextField
            style = {itemStyle}
            id = "address"
            label = "您的地址"
            marggin = "normal"
          />
        </div>


        <div>
          <TextField
            style = {itemStyle}
            id = "telephone"
            label = "您的联系电话"
            marggin = "normal"
            helperText = "非常重要，请您仔细填写！"
          />
        </div>

        <div>
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
                {intention.key}
              </MenuItem>))
            }
          </TextField>
        </div>


        <form>
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
                <MenuItem key={style.label} value={style.value}>
                  {style.label}
                </MenuItem>))
            }
          </TextField>
        </form>

        <Button
          style = {itemStyle}
          onClick = {this._testConnect}
          className={this.props.button} variant="raised" color="primary">
          Send
          <SvgIcon>
            <path d="M2.01,21L23,12 2.01,3 2,10l15,2 -15,2z"/>
          </SvgIcon>
        </Button>
      </form>
    );
  }
}

export default App;
