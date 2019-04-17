import React, { Component } from 'react';
import { Card, Button, Form, Input, Select, Radio, message, Modal, DatePicker, Table, Tag } from 'antd'
import Utils from '../../resource/utils';
import Axios from '../../axios/index';
import Moment from 'moment'
import '../style/common.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class WorkerManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worker_list:[],
            worker_info:{}
        };
    }

    params = {
        page:1,
        drawService_info:[],
        drawService_city:''
    }

    componentDidMount(){
        this.requestList();
    }

    requestList = ()=>{
        Axios.ajax({
            url:'/worker/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }, true).then((res)=>{
            let _this = this;
            this.setState({
                worker_list:res.result.worker_list.map((item,index)=>{
                    item.key=index
                    return item;
                }),
                pagination:Utils.pagination(res,(current)=>{
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
    
    // 操作员工
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if(type =='create'){
            this.setState({
                title:'创建员工',
                isVisible:true,
                type,
                refresh: true //用于刷新清空地图
            })
        }else if(type=="edit" || type=='detail'){
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个员工'
                })
                return;
            }
            this.setState({
                title:type =='edit'?'编辑员工':'查看详情',
                isVisible:true,
                worker_info:item,
                type,
                refresh: true //用于刷新填充地图
            })
        }else if(type=="delete"){
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个员工'
                })
                return;
            }
            Modal.confirm({
                title: '确定要删除此员工吗？',
                content: `是否删除员工 ${item.worker_name} 的信息?`,
                onOk:()=>{
                    Axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code == '0'){
                            message.success('删除成功');
                            this.setState({
                                isVisible:false
                            })
                            this.requestList();
                        }
                    })
                }
            })
        }
    }

    handleSubmit = () => {
        let type = this.state.type;
        let data = this.workerForm.props.form.getFieldsValue();
        data.worker_serviceArea = this.params.drawService_info.slice(0);
        data.worker_service = this.params.drawService_city;
        // 格式化生日
        data.worker_birthday = Moment(data.worker_birthday).format("YYYY-MM-DD")
        console.log(data)
        this.workerForm.props.form.validateFields((err,values)=>{ // 校验
            if (!err && this.params.drawService_info.length) {
                Axios.ajax({
                    url:type == 'create'?'/user/add':'/user/edit',
                    data:{
                        params:{
                            ...data
                        }
                    }
                }).then((res)=>{
                    if(res.code == '0'){
                        let tip = type == 'create'?'创建成功':'修改成功';
                        message.success(tip);
                        this.requestList();
                        // 重置表单
                        this.workerForm.props.form.resetFields(); 
                        this.params.drawService_info = [];
                        this.params.drawService_city = ''
                        this.setState({
                            isVisible:false,
                            type:'clear', //将type置为clear清空地图
                            worker_info:''
                        })
                    }
                })
            } else if (err) {
                message.warning(`输入有误~`)
            } else if (!this.params.drawService_info.length) {
                message.warning(`还没有绘制区域哦~`)
            } 
        })
    }

    // 接收绘制的管理区域
    handleDraw = (drawService_info, drawService_city) => {
        this.params.drawService_info = drawService_info.slice(0)
        this.params.drawService_city = drawService_city
    }

    // 用于将refresh置为false防止继续刷新填充地图
    handleRefresh = () => {
        this.setState({
            refresh: false
        })
    }

    render() {
        const worker_columns = [{
            title: 'ID',
            dataIndex: 'id'
          }, {
            title: '员工名',
            dataIndex: 'worker_name'
          }, {
            title: '性别',
            dataIndex: 'worker_sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
          }, {
            title: '角色',
            dataIndex: 'worker_role',
            width: 130,
            // align: 'center',
            render(role){
                let config = {
                    1:'一级管理',
                    2:'二级管理',
                    3:'三级管理',
                    4:'司机管理',
                    5:'五级管理'
                }
                let color = {
                    1:'#C1232B',
                    2:'#27727B',
                    3:'#B5C334',
                    4:'#FCCE10',
                    5:'#E87C25',
                }
                return <span><Tag color={color[role]} key={role}>{config[role]}</Tag></span>;
            }
          },{
            title: '手机号码',
            dataIndex: 'worker_phone',
          },{
            title: '生日',
            dataIndex: 'worker_birthday'
          },{
            title: '管理城市',
            dataIndex: 'worker_service'
          }
        ];

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        }

        let footer = {}
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            }
        }

        return (
            <div className="workerManage">
                <Card style={{marginTop:'0.8rem'}}>
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={()=>this.handleOperator('detail')}>员工管理区域详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={worker_columns}
                        dataSource={this.state.worker_list}
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
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        // 重置表单
                        this.workerForm.props.form.resetFields();
                        this.params.drawService_info = [];
                        this.params.drawService_city = ''
                        this.setState({
                            isVisible:false,
                            type:'clear',   //将type置为clear清空地图
                            worker_info:'' // 保证在关闭员工详情的时候 重置表单
                        })
                    }}
                    {...footer}
                >
                    <WorkerForm 
                        worker_info={this.state.worker_info} 
                        type={this.state.type} 
                        wrappedComponentRef={(inst) => this.workerForm = inst }
                        transferDraw={this.handleDraw}
                        refresh={this.state.refresh}
                        transferRefresh={this.handleRefresh}
                    />
                </Modal>
            </div>
        )
    }
}
class WorkerForm extends Component{

    params={
        drawService_info:[],
    }

    componentDidMount(){
        this.renderMap()
        this.clearListener()
        // 只有绑定在window上才能正常进行下去..(切换tab菜单时清除)
        window.clearMapTimer = setInterval(this.clearListener,500)
    }

    // 渲染地图
    renderMap = () => {
        this.map = new window.BMap.Map("workerManage_Map", {enableMapClick: false}); // 创建地图实例  
        this.addMapControl(); //调用地图控件
        if (this.props.refresh && this.props.type == 'create') {
            this.map.centerAndZoom('武汉', 13);
            this.clickPot()
        }
        if (this.props.worker_info.worker_serviceArea && this.props.type !== 'create') {
            this.params.drawService_info = this.props.worker_info.worker_serviceArea.slice(0)
            var middle = new window.BMap.Point(this.params.drawService_info[0].lng, this.params.drawService_info[0].lat);
            this.map.centerAndZoom(middle, 13);
            if (this.props.type != 'detail') {
                this.clickPot()
            }
            this.drawService()
        } 
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 平移缩放控件
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_SMALL }));
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    }

    // 点击跳跃
    clickPot = () => {
        let _this = this
        this.map.addEventListener("click", function(e){
            var point = new window.BMap.Point(e.point.lng, e.point.lat);
            _this.params.drawService_info.push({
                'lng': e.point.lng,
                'lat': e.point.lat
            })
            var marker = new window.BMap.Marker(point);  // 创建标注
            _this.map.addOverlay(marker);               // 将标注添加到地图中
            // 文字标注
            var label = new window.BMap.Label(_this.params.drawService_info.length, {offset:new window.BMap.Size(20,-10)});
	        marker.setLabel(label);
            marker.setAnimation(window.BMAP_ANIMATION_BOUNCE); //跳动的动画
        });   
    }

    // 绘制
    drawService = () => {
        if (this.params.drawService_info.length > 2) {
            // 连接路线图
            let trackPoint = [];
            let _this = this;
            for (let i = 0; i < this.params.drawService_info.length; i++) {
                let point = this.params.drawService_info[i];
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
            // 传递服务区和城市需要在定位城市的回调完成
            var gc = new window.BMap.Geocoder();
            var pointAdd = new window.BMap.Point(this.params.drawService_info[0].lng, this.params.drawService_info[0].lat);
            gc.getLocation(pointAdd, function(e){
                let province = e.addressComponents.province 
                let city = e.addressComponents.city
                _this.props.transferDraw(_this.params.drawService_info, `${province}/${city}`)
            })
        } else {
            message.warning('至少三个点才能绘制哦~')
        }
        
    }

    // 清除
    clearService = () => {
        this.params.drawService_info = [];
        this.props.transferDraw([], '');
        this.map.clearOverlays();
    }

    // 用于监听清除绘制点的方法
    clearListener = () =>{
        if (this.props.type == 'clear') {
            // 当type为clear的时候调用清除方法
            this.clearService()
        } else if (this.props.refresh) {
            this.renderMap()
            //用于将refresh置为false防止继续刷新地图
            this.props.transferRefresh() 
        }
    }

    getRole = (role) => {
        return {
            1:'一级管理',
            2:'二级管理',
            3:'三级管理',
            4:'司机管理',
            5:'五级管理'
        }[role]
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const worker_info = this.props.worker_info || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        worker_info && type=='detail'?worker_info.worker_name:
                        getFieldDecorator('worker_name',{
                            initialValue:worker_info.worker_name,
                            rules:[
                                {
                                    required:true,
                                    message:'不能为空~'
                                },
                            ]
                        })(
                            <Input type="text" placeholder="请输入姓名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        worker_info && type=='detail'?worker_info.worker_sex==1?'男':'女':
                        getFieldDecorator('worker_sex',{
                            initialValue:worker_info.worker_sex,
                            rules:[
                                {
                                    required:true,
                                    message:'不能为空~'
                                },
                            ]
                        })(
                        <RadioGroup>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="手机号码" {...formItemLayout}>
                    {
                        worker_info && type=='detail'?worker_info.worker_phone:
                        getFieldDecorator('worker_phone',{
                            initialValue:worker_info.worker_phone,
                            rules:[
                                {
                                    required:true,
                                    message:'不能为空~'
                                },
                                {
                                    pattern:new RegExp('^[1][3-8][0-9]{9}$'),
                                    message:'手机号不规范哦~'
                                }
                            ]
                        })(
                            <Input type="text" placeholder="请输入手机号码"/>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        worker_info && type=='detail'?worker_info.worker_birthday:
                        getFieldDecorator('worker_birthday',{
                            initialValue:Moment(worker_info.worker_birthday),
                            rules: [
                                {
                                    required:true,
                                    message:'不能为空~'
                                },
                            ]
                        })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem label="角色" {...formItemLayout}>
                    {
                        worker_info && type=='detail'?this.getRole(worker_info.worker_role):
                        getFieldDecorator('worker_role',{
                            initialValue:worker_info.worker_role,
                            rules:[
                                {
                                    required:true,
                                    message:'不能为空~'
                                },
                            ]
                        })(
                        <Select>
                            <Option value={1}>一级管理</Option>
                            <Option value={2}>二级管理</Option>
                            <Option value={3}>三级管理</Option>
                            <Option value={4}>四级管理</Option>
                            <Option value={5}>五级管理</Option>
                        </Select>
                    )}
                </FormItem>
                {
                    this.props.type == 'detail' ? '' : (
                        <div>
                            <div style={{textAlign:'center',color: 'rgba(0, 0, 0, 0.85)'}} className="ant-form-item-required">绘制管理区域 :</div>
                            <Button type="primary" onClick={this.drawService} style={{margin:'0 20px 0 50px'}}>绘制</Button>
                            <Button type="primary" onClick={this.clearService} style={{marginRight:'20px'}}>清空</Button>
                            <span>在地图上按管理顺序点击之后点击绘制成一个区域,取最后一个绘制区域</span>
                        </div>
                    )
                }
                <div id="workerManage_Map" className="workerManage-Map" style={{height:'400px', margin:'10px 50px'}}></div>
            </Form>
        );
    }
}
WorkerForm = Form.create({})(WorkerForm);