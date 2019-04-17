import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
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
export default class timeOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount(){
        echarts.registerTheme('theme',echartTheme);
        this.requestList()
    }

    requestList = () => {
        Axios.ajax({
            url:'/echarts/list'
        }, true).then((res)=>{
            let weekTimeArr = this.handleOrder(res.result.echarts_list,'week')
            let monthTimeArr = this.handleOrder(res.result.echarts_list,'month')
            this.setState({
                weekTimeArr,
                monthTimeArr
            })
        })
    }

    handleOrder = (data, type) => {
        if (type == 'week') {
            let timeArr = [0,0,0,0,0,0,0]
            for (let i = 0; i < data.length; i++) {
                let week = data[i].week_time
                timeArr[week]++
            }
            return timeArr
        }
        if (type = 'month') {
            let timeArr = [0,0,0,0,0,0,0,0,0,0,0,0]
            for (let i = 0; i < data.length; i++) {
                let week = new Date(parseInt(data[i].start_time)).getMonth()+1
                timeArr[week]++
            }
            
            return timeArr
        }
    }

    initWeekDidMount = (timeArr) => {
        let option = {
            title: {
                text: '每周骑行订单数量变化'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: true, // 默认填充到x的0刻度
                data: [
                    '周日',
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: timeArr,
                    areaStyle: {} // 区域填充样式
                }
            ]
        }
        return option;
    }

    initMonthDidMount = (timeArr) => {
        let option = {
            title: {
                text: '各月骑行订单数量变化'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: true, // 默认填充到x的0刻度
                data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: timeArr,
                    areaStyle: {} // 区域填充样式
                }
            ]
        }
        return option;
    }

    render(){
        return (
            <div className="timeOrder">
                <Card style={{marginTop:'0.8rem'}}>
                    <ReactEcharts
                        option={this.initWeekDidMount(this.state.weekTimeArr)}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 400
                    }}/>
                </Card>
                <Card style={{marginTop:20}}>
                    <ReactEcharts
                        option={this.initMonthDidMount(this.state.monthTimeArr)}
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