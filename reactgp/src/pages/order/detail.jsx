import React, { Component } from 'react';
import './detail.less';
import Axios from '../../axios';
import { Card } from 'antd';
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount(){
        // let orderId = this.props.match.params.orderId; //获取url的参数值
        // if(orderId){
        //     this.getDetailInfo(orderId);
        // }
        this.renderMap();
    }

    renderMap = () => {
        this.map = new window.BMap.Map("orderDetailMap"); // 创建地图实例  
        // var point = new window.BMap.Point(116.404, 39.915);  
        this.map.centerAndZoom('北京',11);
        this.addMapControl(); //调用地图控件
    }

    // 添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        console.log(map)
        // 比例尺控件
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        // 平移缩放控件
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }

    render() {
        return (
            <div className="detail">
            111
                <div id="orderDetailMap" className="order-map"></div>
            </div>
        )
    }
}