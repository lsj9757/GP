import React, { Component } from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import themeLight from '../themeLight'
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
export default class Pie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount(){
        echarts.registerTheme('theme',themeLight);
    }

    getOption() {
        let option = {
            title: {
                text: '用户骑行订单',
                x : 'center'
            },
            legend : {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一','周二','周三','周四','周五','周六','周日']
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
                    data:[
                        {
                            value:1000,
                            name:'周一' // 饼图没有X轴,所以用name表示
                        },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        },
                    ],
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
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
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
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    center: [
                        '50%', '60%'
                    ],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        }, {
                            value: 1000,
                            name: '周二'
                        }, {
                            value: 2000,
                            name: '周三'
                        }, {
                            value: 1500,
                            name: '周四'
                        }, {
                            value: 3000,
                            name: '周五'
                        }, {
                            value: 2000,
                            name: '周六'
                        }, {
                            value: 1200,
                            name: '周日'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
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
            tooltip: {
                trigger: 'item', // 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
                formatter: "{a} <br/>{b} : {c} ({d}%)" // 自定义提示
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    center: [
                        '50%', '50%'
                    ],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        }, {
                            value: 1000,
                            name: '周二'
                        }, {
                            value: 2000,
                            name: '周三'
                        }, {
                            value: 1500,
                            name: '周四'
                        }, {
                            value: 3000,
                            name: '周五'
                        }, {
                            value: 2000,
                            name: '周六'
                        }, {
                            value: 1200,
                            name: '周日'
                        }
                    ].sort((a, b)=>{ return a.value - b.value; }),

                    // 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                    //'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
                    //'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
                    roseType: 'radius', 
                    
                    // animationType: 'scale',
                    // animationEasing: 'elasticOut',
                    // animationDelay: function (idx) {
                    //     return Math.random() * 200;
                    // }
                }
            ]
        }
        return option;
    }

    render(){
        return (
            <div className="pie">
                <Card title="饼形图表之一">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 600 }}/>
                </Card>
                <Card title="饼形图之二" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 600 }}/>
                </Card>
                <Card title="饼形图之三" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption3()}
                        theme="theme"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 500 }}/>
                </Card>
            </div> 
        );
    }
}