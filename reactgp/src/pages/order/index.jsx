import React, { Component } from 'react';
import { Card, Button, Table, Modal, message} from 'antd'
import Utils from '../../resource/utils';
import Axios from '../../axios/index';
import Baseform from '../../components/Baseform'
import '../style/common.less';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_list:[]
        };
    }
    params = {
        page:1 // 这里不用this.state.page的原因是因为state是用来渲染页面dom的,params这里只需要改变变量,不需要渲染dom
    }

    // Baseform组件参数
    formList = [
        {
            width:170,
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '车辆类别',
            field:'bike_company',
            initialValue: 1,
            width: 120,
            list: [{ id: 1, name: '摩拜' }, { id: 2, name: '哈喽出行' }, { id: 3, name: '永安行' }, { id: 4, name: 'OFO小黄车' }, { id: 5, name: '青桔单车'}, {id: 6, name: '其它'}]
        }
    ]

    componentDidMount(){
        this.requestList()
    }

    // Baseform组件参数
    handleFilter = (filterParams) => {
        this.params = filterParams;
        this.requestList();
        message.success('查询成功')
        console.log(filterParams)
    }

    requestList = () => {
        let _this = this;
        Axios.ajax({
            url:'/order/list',
            data:{
                params: this.params
            }
        }, true).then((res)=>{
            let list = res.result.order_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                order_list: list, //table数据
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }

    render() {

        const order_columns = [
            {
                title:'订单ID',
                dataIndex:'id'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '车辆类别',
                dataIndex: 'bike_company',
                render(state){
                    let config = {
                        1 : '摩拜',
                        2 : '哈喽出行',
                        3 : '永安行',
                        4 : 'OFO小黄车',
                        5 : '青桔单车',
                        6 : '其它'
                    }
                    return config[state];
                }
            },
            {
                title: '用户名',
                dataIndex: 'bike_user'
            },
            {
                title: '行驶城市',
                dataIndex: 'bike_gc',

            },
            {
                title: '行驶时长',
                dataIndex: 'bike_time',
                render(data){
                    return Utils.programTime(data)
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                render(data){
                    return Utils.formateDate(parseInt(data))
                }
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                render(data){
                    return Utils.formateDate(parseInt(data))
                }
            }
        ]

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        }

        return (
            <div className="order">
                <Card style={{marginTop:'0.8rem'}}>
                    <Baseform formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={order_columns}
                        dataSource={this.state.order_list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
            </div>
        )
    }
}