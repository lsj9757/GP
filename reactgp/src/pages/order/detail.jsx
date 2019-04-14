import React, { Component } from 'react';
import './detail.less';
import Axios from '../../axios';
import { Card } from 'antd';
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_info:{},
            start_location:'',
            end_location:'',
            distance:0
        };
    }

    componentDidMount(){
        let orderId = this.props.match.params.orderId; //获取url的参数值
        if(orderId){
            this.getDetailInfo(orderId);
        }
    }

    getDetailInfo = (orderId) => {
        Axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    id: orderId
                }
            }
        }, true).then((res)=>{
            this.setState({
                order_info:res.result,
                start_location:res.result.geolocation_location[0],
                end_location:res.result.geolocation_location[1]
            })
            this.renderMap(res.result.geolocation_info);
            // this.getGeolocation() 
        })
    }

    renderMap = (data) => {
        this.map = new window.BMap.Map("orderDetailMap"); // 创建地图实例  
        this.addMapControl(); //调用地图控件
        this.drawBikeRoute(data) //调用行驶路线(mock数据里是这个'position_list'参数)
        // this.drawServiceArea(result.area)
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 比例尺控件
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        // 平移缩放控件
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        // 改变缩略大小
        setTimeout(()=>{
            map.setZoom(13)
        },1000)
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length-1];
            // 绘制起始坐标
            startPoint =  new window.BMap.Point(first.lng, first.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })

            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);

            // 绘制结束坐标
            endPoint = new window.BMap.Point(last.lng, last.lat);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                // 定位到骑行位置中间
                if (i == Math.ceil(positionList.length/2)-1) {
                    let middle = new window.BMap.Point(point.lng, point.lat)
                    this.map.centerAndZoom(middle, 11);
                }
                // 计算骑行距离
                if (i > 0) {
                    let pointPre = new window.BMap.Point(positionList[i-1].lng, positionList[i-1].lat);
                    let pointNow = new window.BMap.Point(point.lng, point.lat);
                    this.getDistance(pointPre, pointNow)
                }
                trackPoint.push(new window.BMap.Point(point.lng, point.lat));
            }

            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
        }
    }

    // 绘制服务区
    drawServiceArea = (area) => {
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < area.length; i++) {
            let point = area[i];
            trackPoint.push(new window.BMap.Point(point.lng, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#1DA57A',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polygon);
    }

    getDistance = (pointPre, pointNow) => {
        // let gc_length = _this.params.geolocation_info.length
        // let pointPre = new window.BMap.Point(_this.params.geolocation_info[gc_length-1].lng, _this.params.geolocation_info[gc_length-1].lat);
        // let pointNow = new window.BMap.Point(data.position.lng, data.position.lat);
        let distancePoint = this.map.getDistance(new window.BMap.Point(pointPre, pointNow))
        console.log(this.map.getDistance)
        this.setState({
            distance: this.state.distance + distancePoint
        })
    }

    render() {
        const info = this.state.order_info || {};
        let companyConfig = {
            1 : '摩拜',
            2 : 'OFO',
            3 : '小蓝'
        }
        return (
            <div className="detail">
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">车辆类别 :</div>
                                <div className="detail-form-content">{companyConfig[info.bike_company]}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号 :</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名 :</div>
                                <div className="detail-form-content">{info.bike_user}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户地址 :</div>
                                <div className="detail-form-content">{info.user_address}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码 :</div>
                                <div className="detail-form-content">{info.user_phone}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">订单编号 :</div>
                                <div className="detail-form-content">{info.id}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程起点 :</div>
                                <div className="detail-form-content">{this.state.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点 :</div>
                                <div className="detail-form-content">{this.state.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程 :</div>
                                <div className="detail-form-content">{this.state.distance}米</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}