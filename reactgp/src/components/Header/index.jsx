import React, { Component } from 'react';
import './index.less';
import { Row, Col } from 'antd';
import Utils from '../../resource/utils'
import Axios from '../../axios/index'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        this.setState({
            username: "👴"
        })
        setInterval(() => {
            let sysTime = Utils.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIDate()
    }

    getWeatherAPIDate = () => {
        // 张家界: 430800
        // 武汉: 420100
        // 北京: 110000
        // 杭州: 330100
        let city = 330100
        Axios.jsonp({
            url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=3da3145b7a1b62e3bcce0977db3cf02c`
        }).then((res) => {
            if (res.status === '1') {
                let weather = res.lives[0].weather
                this.setState({
                    weather
                })
            }
        })
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <span>你好，牛逼的{this.state.username}</span>
                    <a href="#">退出</a>  
                </Row>
                <Row className="header-crumb">
                    <Col span={4} className="header-crumb-title">
                        首页
                    </Col>
                    <Col span={20} className="header-crumb-weather">
                        <span className="header-crumb-weatherTime">{this.state.sysTime}</span>
                        <span className="header-crumb-weatherDetail">{this.state.weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}