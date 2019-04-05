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