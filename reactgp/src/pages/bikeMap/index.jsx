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
        let bikeconfig = {
            1:'/assets/摩拜.png',
            2:'/assets/哈喽出行.png',
            3:'/assets/永安行.png',
            4:'/assets/OFO小黄车.png',
            5:'/assets/青桔单车.png',
            6:'/assets/bike.png'
        }
        for (let i = 0; i < list.length; i++) {
            let bikeIcon = new window.BMap.Icon(bikeconfig[list[i].bike_company], new window.BMap.Size(40, 40), {
                imageSize: new window.BMap.Size(40, 40),
                anchor: new window.BMap.Size(20, 20)
            });
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
                    <div>
                        <span>共{this.state.total_count}辆车</span>
                        <span style={{margin:'0 20px'}}>
                            <div style={{width:'30px', backgroundColor:'#C1232B', height:'12px', display:'inline-block', borderRadius:'10px', marginRight:'10px'}}></div>
                            摩拜
                        </span>
                        <span style={{marginRight:'20px'}}>
                            <div style={{width:'30px', backgroundColor:'#27727B', height:'12px', display:'inline-block', borderRadius:'10px', marginRight:'10px'}}></div>
                            哈喽出行
                        </span>
                        <span style={{marginRight:'20px'}}>
                            <div style={{width:'30px', backgroundColor:'#2bb5ce', height:'12px', display:'inline-block', borderRadius:'10px', marginRight:'10px'}}></div>
                            永安行
                        </span>
                        <span style={{marginRight:'20px'}}>
                            <div style={{width:'30px', backgroundColor:'#FCCE10', height:'12px', display:'inline-block', borderRadius:'10px', marginRight:'10px'}}></div>
                            OFO小黄车
                        </span>
                        <span style={{marginRight:'20px'}}>
                            <div style={{width:'30px', backgroundColor:'#E87C25', height:'12px', display:'inline-block', borderRadius:'10px', marginRight:'10px'}}></div>
                            青桔单车
                        </span>
                        <span style={{marginRight:'20px'}}>
                            <div style={{width:'30px', backgroundColor:'#FE8463', height:'12px', display:'inline-block', borderRadius:'10px', marginRight:'10px'}}></div>
                            其它
                        </span>
                    </div>
                    <div id="bikeMap" style={{height:500, marginTop:'20px'}}></div>
                </Card>
            </div>
        )
    }
}