import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message} from 'antd'
import Axios from '../../axios/index';
import Baseform from '../../components/Baseform'

export default class BikeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bikeInfo:{}
        };
    }

    params = {
        page:1
    }

    componentDidMount(){
        this.requestList();
    }

    // 列表请求
    requestList = () => {
        Axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    total_count:res.result.total_count
                },()=>{
                    
                })
                this.renderMap(res.result);
            }
        })
    }

    // 表单封装，通过构建表单对象，在Baseform中进行统一渲染
    formList = [
        {
            type: '城市'
        }, {
            type: '时间查询'
        }, {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 150,
            list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '3', name: '行程结束'}]
        }
    ]

    // 查询表单
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    };

    // 渲染地图
    renderMap = (res) => {
        this.map = new window.BMap.Map("container", {enableMapClick: false}); // 创建地图实例  
        // this.map.centerAndZoom('北京', 11);
        this.addMapControl(); //调用地图控件
        this.drawBikeRoute(res.route_list) //调用行驶路线(mock数据里是这个'route_list'参数)
        this.drawServiceArea(res.service_list) //绘制服务区
        this.drawBikeList(res.bike_list) //绘制车辆分布 
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 比例尺控件
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        // 平移缩放控件
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (list) => {
        let startPoint = '';
        let endPoint = '';
        if (list.length > 0) {
            let first = list[0].split(',');
            let last = list[list.length - 1].split(',');
            // 绘制起始坐标
            startPoint =  new window.BMap.Point(first[0], first[1]);
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })

            let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);

            // 绘制结束坐标
            endPoint = new window.BMap.Point(last[0], last[1]);
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42)
            })
            let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            // 连接路线图
            let trackPoint = [];
            for (let i = 0; i < list.length; i++) {
                let point = list[i].split(",");
                trackPoint.push(new window.BMap.Point(point[0], point[1]));
            }

            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(endPoint, 11);
        }
    }

    // 绘制服务区
    drawServiceArea = (list) => {
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < list.length; i++) {
            let point = list[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#1DA57A',
            strokeWeight: 4,
            strokeOpacity: 1,
            // fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polygon);
    }

    // 绘制车辆分布
    drawBikeList = (list) => {
        let bikeIcon = new window.BMap.Icon("/assets/bike.png", new window.BMap.Size(26, 26), {
            imageSize: new window.BMap.Size(26, 26),
            anchor: new window.BMap.Size(13, 13)
        });
        for (let i = 0; i < list.length; i++) {
            let point = list[i].split(",");
            let bikePoint = new window.BMap.Point(point[0], point[1]);
            var bikeMarker = new window.BMap.Marker(bikePoint, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        }
    }

    render() {
        return (
            <div className="bikeMap">
                <Card>
                    <Baseform formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}