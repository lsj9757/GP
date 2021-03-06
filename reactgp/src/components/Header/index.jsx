import React, { Component } from 'react';
import './index.less';
import { Row, Col } from 'antd';
import Utils from '../../resource/utils'
import Axios from '../../axios/index'
import { connect } from 'react-redux'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        this.setState({
            username: "👴"
        })
        this.getTime() // 先执行一次
        setInterval(this.getTime, 1000)
        this.getWeatherAPIDate()
    }

    // 获取时间
    getTime = () => {
        let sysTime = Utils.formateDate(new Date().getTime())
        this.setState({
            sysTime
        })
    }

    // 获取天气
    getWeatherAPIDate = () => {
        // 张家界: 430800
        // 武汉: 420100
        // 北京: 110000
        // 杭州: 330100
        let city = 420100
        Axios.jsonp({
            url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=3da3145b7a1b62e3bcce0977db3cf02c`
        }).then((res) => {
            if (res.status === '1') {
                let data = res.lives[0]
                this.setState({
                    weather: data.weather,
                    temperature: data.temperature,
                    city: data.city
                })
            }
        })
    }

    render() {
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={10} className="header-top-logo">
                        <img src="/assets/logo.png" alt="lsj"/>
                        <span>LSJ共享单车统计与管理系统</span>
                        <img src="/assets/logologo.png" alt="lsj"/>
                    </Col>
                    <Col span={14}>
                        <span>你好，牛逼的{this.state.username}</span>
                        <a href="javascript:void(0);">退出</a>  
                    </Col>
                </Row>
                {
                    menuType?'':
                        <Row className="header-crumb">
                            <Col span={4} className="header-crumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span={20} className="header-crumb-weather">
                                <span className="header-crumb-weatherTime">{this.state.sysTime}</span>
                                <span className="header-crumb-weatherDetail">{this.state.city}  {this.state.weather}  {this.state.temperature}°C</span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)