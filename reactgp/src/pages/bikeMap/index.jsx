import React, { Component } from 'react';
import { Card } from 'antd'
import Axios from '../../axios/index';

export default class BikeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){
        this.requestList();
    }

    // 列表请求
    requestList = () => {
        Axios.ajax({
            url:'/bike/list'
        }, true).then((res)=>{
            this.setState({
                total_count:res.result.bike_list.length
            })
            this.renderMap(res.result);
        })
    }

    // 渲染地图
    renderMap = (data) => {
        this.map = new window.BMap.Map("bikeMap", {enableMapClick: false}); // 创建地图实例  
        this.addMapControl(); //调用地图控件
        this.drawBikeList(data.bike_list) //绘制车辆分布 
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 比例尺控件
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        // 平移缩放控件
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.addControl(new window.BMap.CityListControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT,
            offset: new window.BMap.Size(10, 20),
        }));
    }

    // 绘制车辆分布
    drawBikeList = (list) => {
        let bikeIcon = new window.BMap.Icon("/assets/bike.png", new window.BMap.Size(40, 40), {
            imageSize: new window.BMap.Size(40, 40),
            anchor: new window.BMap.Size(20, 20)
        });
        for (let i = 0; i < list.length; i++) {
            let point = list[i].bike_local
            let bikePoint = new window.BMap.Point(point.lng, point.lat);
            var bikeMarker = new window.BMap.Marker(bikePoint, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
            if (i == 0) {
                this.map.centerAndZoom(bikePoint, 13);
            }
        }
    }

    render() {
        return (
            <div className="bikeMap">
                <Card style={{marginTop:'0.8rem'}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="bikeMap" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}