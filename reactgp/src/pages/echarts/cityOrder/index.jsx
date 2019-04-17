import React,{Component} from 'react';
import echarts from "echarts";
import { Card } from 'antd'
import { mapJson } from '../../../resource/chinaJSON';
import Axios from '../../../axios/index';

export default class CityOrder extends Component {
    constructor() {
        super();
        this.state = {
            
      }
   }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        Axios.ajax({
            url:'/echarts/list'
        }, true).then((res)=>{
            let cityArr = this.handleOrder(res.result.echarts_list)
            this.initMapDidMount(cityArr);
        })
    }

    // 计算各全国城市订单数量
    handleOrder = (data) => {
        let cityArr = [
            {
                name:data[0].bike_gc.split('/')[1],
                value:[
                    data[0].bike_local.lng,
                    data[0].bike_local.lat,
                    1
                ]
            }
        ]
        for (let i = 1; i < data.length; i++) {
            let city = data[i].bike_gc.split('/')[1]
            for (let j = 0; j < cityArr.length; j++) {
                if (city == cityArr[j].name) {
                    cityArr[j].value[2]++
                    break;
                } 
                if (j == cityArr.length-1) {
                    cityArr.push({
                        name:city,
                        value: [
                            data[i].bike_local.lng,
                            data[i].bike_local.lat,
                            1
                        ]
                    })
                    break;
                }
            }
        }
        console.log(cityArr)
        return cityArr
    }

    initMapDidMount = (cityArr) => {
        echarts.registerMap('china', mapJson); // 注册地图
        var mapChart = echarts.init(document.getElementById('map'));
        var option = {
        backgroundColor: '#aaa',
        title: {
            text: '全国城市共享单车总订单分布',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            min: cityArr.sort(function (a, b) {
                return b.value[2] - a.value[2];
            }).slice(cityArr.length-1)[0].value[2],
            max: cityArr.sort(function (a, b) {
                return a.value[2] - b.value[2];
            }).slice(cityArr.length-1)[0].value[2],
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
                color: '#fff'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: function (params) {            //格式化鼠标指到点上的弹窗返回的数据格式
                return params.name + ' : ' + params.value[2];
            }
         },
        geo: {
            // left: '200',
            map: 'china',
            roam: true, 
            label: {
                emphasis: {        //鼠标划到后弹出的文字 显示省份
                    color: '#fff',    //高亮背景色
                    show: true,       //是否高亮显示
                    fontSize:12,       //字体大小
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            },
            zoom:2
        },
        series: [
            {
                name: '订单数量',      // series名称
                type: 'scatter',        // series图表类型
                effectType: 'ripple',         // 圆点闪烁样式，目前只支持ripple波纹式
                coordinateSystem: 'geo',      // series坐标系类型
                data:cityArr,// series数据内容
                symbolSize: 12,
                rippleEffect: {        // ripple的样式控制
                    brushType: 'stroke',
                    color: '#28FF28',
                   },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                zlevel: 1
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: cityArr.sort(function (a, b) {
                    return b.value[2] - a.value[2];
                }).slice(0, 6),
                symbolSize: 16,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                zlevel: 1
            }
        ],
    }
    if (option && typeof option === "object") {
        mapChart.setOption(option);
    }
   }
   render() {
      return (
        <Card style={{marginTop:'0.8rem'}}>
            <div style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
                <div id="map" style={{width: '1100px',height: '500px'}} />
            </div> 
        </Card>
      );
   }
}