import React, {Component} from 'react';
import './App.css';
import {
    Button,
    SvgIcon,
    TextField,
    MenuItem,
} from '@material-ui/core';
import Swipeable from 'react-swipeable'


class StyleDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let formData = new FormData();
        let data = {record_id: this.props.id};
        formData.append("data", JSON.stringify(data));
        // let urlPath = "http://www.baidu.com";
        let urlPath = "http://192.168.18.188:7788/effect/record/pictures";
        // let urlPath = "http://light-bulb.cn/effect/record/pictures";

        fetch(urlPath, {
            method: "POST",
            body: formData,
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }).then(function (res) {
            if (res.status !== 200) {
                console.log("Some error, code: ", res.status)
            } else {
                console.log("Response data: ", res.json())
            }
        }).catch((reason => {console.log("Reject reason: " , reason)}))
    }

    swiping(e, deltaX, deltaY, absX, absY, velocity) {
        console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    }

    swipingLeft(e, absX) {
        console.log("You're Swiping to the Left...", e, absX)
    }

    swiped(e, deltaX, deltaY, isFlick, velocity) {
        console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
    }

    swipedUp(e, deltaY, isFlick) {
        console.log("You Swiped Up...", e, deltaY, isFlick)
    }

    render() {
        console.log(this.props)
        return (
            <Swipeable
                onSwiping={this.swiping}
                onSwipingLeft={this.swipingLeft}
                onSwiped={this.swiped}
                onSwipedUp={this.swipedUp} >
                <TextField>abcd</TextField>
                <TextField>abcd</TextField>
                <TextField>abcd</TextField>
                <TextField>abcd</TextField>
            </Swipeable>
        )
    }
}

export default StyleDetail;
