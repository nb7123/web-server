import React, { Component } from 'react';
import './App.css';
import {
  Button,
  SvgIcon,
  TextField,
    MenuItem,
} from '@material-ui/core';

const intentionAddPath = "http://light-bulb.cn:7788/intention/add";
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

  _sendData = () => {
      if (this.state.name.length === 0 || this.state.name === "UNKNOWN") {
          alert("为了更好的为您服务，请填写您的姓名");
      } else if (this.state.telephone.length !== 11) {
          alert("为了更好的为您服务，请填写正确的手机号码");
      } else if (this.state.address.length === 0 || this.state.address === "UNKNOWN") {
          alert("为了更好的为您服务，请填写您的详细地址");
      }
      else {
          let data = {
              username: this.state.name,
              address: this.state.address,
              telephone: this.state.telephone,
              budget: this.state.intention,
              style: this.state.style,
          };

          fetch(intentionAddPath, {
              method: "POST",
              body: "data=" + JSON.stringify(data),
              mode: "cors",
              headers: {
                  "Access-Control-Request-Headers": "*",
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
          }).then((res) => {
              if (res.status !== 200) {
                  console.log("Some error, code: ", res.status)
              } else {
                  return res.json()
              }
          }).then((json) => {
              console.log("Json result: ", json);
              if (json.code === 0) {
                  console.log("Valid data");
                  alert("你的信息我们已经收到，我们会尽快安排工作人员跟您联系！");
              } else {
                  alert(json.msg)
              }
          }).catch((reason => {alert("Reject reason:" + reason)}));
      }
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
