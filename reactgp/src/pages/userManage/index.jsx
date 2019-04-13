import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import Utils from '../../resource/utils';
import Axios from '../../axios/index';
import '../style/common.less';
const FormItem = Form.Item;
const Option = Select.Option;

export default class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_list:[]
        };
    }

    params = {
        page:1 // 这里不用this.state.page的原因是因为state是用来渲染页面dom的,params这里只需要改变变量,不需要渲染dom
    }

    componentDidMount(){
        this.requestList();
    }

    // 默认请求接口数据
    requestList = () =>{
        let _this = this;
        Axios.ajax({
            url: '/user/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }, true).then((res)=>{
            let list = res.result.user_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                user_list: list,
                pagination: Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    render() {
        const user_columns = [
            {
                title:'ID',
                dataIndex:'id'
            }, {
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '手机号码',
                dataIndex: 'user_phone',
            },
            {
                title: '微信号',
                dataIndex: 'user_wx',
            }, {
                title: '生日',
                dataIndex: 'user_birthday',
            }, {
                title: '所在城市',
                dataIndex: 'user_address'
            }, {
                title: '骑行总时长',
                dataIndex: 'user_time',
                render(data){
                    return Utils.programTime(data)
                }
            }, {
                title: '总订单',
                dataIndex: 'user_order'
            }
        ]
        return (
            <div className="userManage">
                <div className="content-wrap" style={{marginTop:'0.8rem'}}>
                    <Table
                        bordered
                        columns={user_columns}
                        dataSource={this.state.user_list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}