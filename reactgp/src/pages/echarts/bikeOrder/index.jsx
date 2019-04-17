import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import themeLight from '../themeLight'
// import echarts from 'echarts'
import Axios from '../../../axios/index';

// 按需引入的方法
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class bikeOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount(){
        echarts.registerTheme('theme',themeLight);
        this.requestList()
    }

    requestList = () => {
        Axios.ajax({
            url:'/echarts/list'
        }, true).then((res)=>{
            let bikeOrderArr = this.handleOrder(res.result.echarts_list, 'order')
            let bikeTimeArr = this.handleOrder(res.result.echarts_list, 'time')
            this.setState({
                bikeOrderArr,
                bikeTimeArr
            })
        })
    }

    // 计算各类单车订单数量与时长
    handleOrder = (data,type) => {
        let bikeArr = [
            {
                name:'摩拜',
                value:0
            },
            {
                name:'哈喽出行',
                value:0
            },
            {
                name:'永安行',
                value:0
            },
            {
                name:'OFO小黄车',
                value:0
            },
            {
                name:'青桔单车',
                value:0
            },
            {
                name:'其它',
                value:0
            }
        ]
        if (type == 'order') {
            for (let i = 0; i < data.length; i++) {
                let company = data[i].bike_company
                for (let j = 0; j < bikeArr.length; j++) {
                    if (company == (j+1)) {
                        bikeArr[j].value++
                        break;
                    }
                }
            }
            return bikeArr
        }
        if (type == 'time') {
            for (let i = 0; i < data.length; i++) {
                let company = data[i].bike_company
                for (let j = 0; j < bikeArr.length; j++) {
                    if (company == (j+1)) {
                        bikeArr[j].value += data[i].bike_time
                        break;
                    }
                }
            }
            return bikeArr
        }
    }

    initOrderDidMount = (bikeArr) => {
        let option = {
            title: {
                text: '用户各类单车骑行订单数量分布',
                top: 40,
                x: 'center'
            },
            legend : {
                orient: 'vertical',
                right: 100,
                top: 0,
                bottom: 20,
                data: ['摩拜','哈喽出行','永安行','OFO小黄车','青桔单车','其它']
            },
            tooltip: {
                trigger : 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name : '订单量',
                    type : 'pie',
                    radius : '55%',
                    center : [
                        '50%', '60%'
                    ],
                    data:bikeArr,
                    itemStyle : {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    }

    initTimeDidMount = (bikeArr) => {
        let option = {
            title: {
                text: '用户各类单车骑行订单时长分布',
                top: 40,
                x: 'center'
            },
            legend : {
                orient: 'vertical',
                right: 100,
                top: 0,
                bottom: 20,
                data: ['摩拜','哈喽出行','永安行','OFO小黄车','青桔单车','其它']
            },
            tooltip: {
                trigger : 'item',
                formatter : "{a} <br/>{b} : {c}s ({d}%)"
            },
            series: [
                {
                    name : '骑行总时间',
                    type : 'pie',
                    radius : '55%',
                    center : [
                        '50%', '60%'
                    ],
                    data:bikeArr,
                    itemStyle : {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    }

    render(){
        return (
            <div className="bikeOrder">
                <Card style={{marginTop:'0.8rem'}}>
                    <ReactEcharts
                        option={this.initOrderDidMount(this.state.bikeOrderArr)}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 600 }}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.initTimeDidMount(this.state.bikeTimeArr)}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 600 }}/>
                </Card>
            </div> 
        );
    }
}