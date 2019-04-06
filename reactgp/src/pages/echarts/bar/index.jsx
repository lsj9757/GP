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
export default class Bar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount(){
        echarts.registerTheme('theme',echartTheme);
    }

    getOption(){
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip : {
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
                    type: 'bar',
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

    getOption2(){
        let option = {
            // 标题
            title: {
                text: '用户骑行订单'
            },
            // 触摸提示框
            tooltip : {
                trigger: 'axis' // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            },
            // 图例数据组件
            legend:{
                data:['OFO','摩拜','小蓝']
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
            // 数据源
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [
                        2000,
                        3000,
                        5500,
                        7000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [
                        1500,
                        3000,
                        4500,
                        6000,
                        8000,
                        10000,
                        15000
                    ]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        2500,
                        4000,
                        6000,
                        7000,
                        8000
                    ]
                },
            ]
        }
        return option;
    }

    render(){
        return (
            <div className="bar">
                <Card title="一">
                    <ReactEcharts option={this.getOption()} theme="theme" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
                <Card title="二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="theme" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
            </div> 
        );
    }
}