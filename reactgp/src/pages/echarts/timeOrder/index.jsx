import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
// import echarts from 'echarts'

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
export default class timeOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount(){
        echarts.registerTheme('theme',echartTheme);
    }

    getOption() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    stack: 'OFO',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    stack: '摩拜',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                },
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: true, // 默认填充到x的0刻度
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {} // 区域填充样式
                }
            ]
        }
        return option;
    }

    render(){
        return (
            <div className="timeOrder">
               <Card title="折线图表之一">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 400
                    }}/>
                </Card>
                <Card title="折线图表之二" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 400
                    }}/>
                </Card>
                <Card title="折线图表之三" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption3()}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 400
                    }}/>
                </Card>
            </div> 
        );
    }
}