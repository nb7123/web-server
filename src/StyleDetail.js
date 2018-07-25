import React, {Component} from 'react';
import './App.css';

// let urlPath = "http://www.baidu.com";
// let urlPath = "http://light-bulb.cn/effect/record/pictures";
const urlPath = "http://light-bulb.cn/effect/record/pictures";

class StyleDetail extends Component {
    state = {
      imageList: [],
    };

    componentDidMount() {
        let formData = new FormData();
        let data = {record_id: Number(this.props.id)};
        formData.append("data", JSON.stringify(data));

        fetch(urlPath, {
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
            if (json.code === 0 && json.data.length > 0) {
                console.log("Valid data");
                this.setState({
                    imageList: json.data
                });
            }
        }).catch((reason => {console.log("Reject reason: " , reason)}))
    }

    render() {
        console.log(this.props);
        let imgStyle = {width: '100%'};
        var pictures = [];
        this.state.imageList.forEach((item, i, arr) => {
            pictures.push(<img src = {item.url} style = {imgStyle} alt = "" />)
        });
        return (
            <div>
                {
                    pictures
                }
            </div>
        )
    }
}

export default StyleDetail;
