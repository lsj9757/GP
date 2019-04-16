import React, { Component } from 'react';
import { Form, Input, Button, message, Icon, Select, Modal, notification } from "antd";
import './index.less';
import Utils from '../../../resource/utils';
import Cookies from 'js-cookie';

const FormItem = Form.Item;
const Option = Select.Option;

class ClientNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startFlag:false,
            geolocationFlag:false, //是否可以定位,若不行则无法开启
            bike_gc:'', //订单初始位置
            bike_time:0,
            start_time:'',
            end_time:'',
        };
    }

    componentDidMount(){
        if (Cookies.get('user_name')) {
            this.renderMap()
        } else {
            this.props.history.push({ pathname : '/client/clientLogin' })
        }
    }

    params = {
        recordTimer: null, // 骑行计时器
        geolocationTimer: null, // 定位计时器
        geolocation_info: [], // 骑行位置信息
        geolocation_location: [] //骑行起止位置
    }

    // 退出登陆
    userEnd = () => {
        Cookies.remove('user_name');
        message.success('退出成功', 1)
        this.props.history.push({ pathname : '/client/clientLogin' })
    }

    // 操作
    handleOperator = (startFlag) => {
        if (!startFlag) {
            let bike_info = this.props.form.getFieldsValue();
            this.props.form.validateFields((err,values)=>{ // 校验
                if (!err && this.state.geolocationFlag) {
                    this.setState({
                        startFlag:true,
                        bike_info, // 表单信息
                        start_time:new Date().getTime() // 开始时间
                    })
                    this.params.recordTimer = setInterval(()=>{
                        this.setState({
                            bike_time:this.state.bike_time+1
                        })
                    },1000)
                    // 先执行一次记录起始位置
                    this.getGeolocation(true)
                    message.success('开始记录~',1)
                    // 定时记录行驶路径
                    this.params.geolocationTimer = setInterval(this.getGeolocation,15000)
                } else {
                    this.state.geolocationFlag ? message.warning(`输入有误~`,1) : message.error('定位失败~ 由于Chrome、iOS10等已不再支持非安全域的浏览器定位请求，本站无资金升级https= =换个浏览器试试8~', 6)
                }
            })
        } else {
            Modal.confirm({
                title: '睁大你的眼睛',
                content: `确定要结束此行程吗?`,
                onOk:()=>{
                   this.handleEnd()
                }
            })
        }
    }

    // 结束按钮
    handleEnd = () =>{
        if (!this.params.geolocation_location[1]) {
            this.params.geolocation_location[1] = this.params.geolocation_location[0]
        }
        let all_info = {
            'bike_user' : Cookies.get('user_name'),
            'bike_sn' : this.state.bike_info.bike_sn,
            'bike_company' : this.state.bike_info.bike_company,
            'bike_time' : this.state.bike_time,
            'bike_gc' : this.state.bike_gc,
            'bike_local' : this.params.geolocation_info[this.params.geolocation_info.length-1],
            // 'bike_distance' : this.params.bike_distance,
            'start_time' : this.state.start_time,
            'end_time' : new Date().getTime(),
            'week_time' : new Date().getDay(),
            'geolocation_info' : this.params.geolocation_info,
            'geolocation_location' : this.params.geolocation_location
        }
        console.log(all_info)
        message.success(`结束骑行~`,1)
        this.getGeolocation()
        // 清除计时器
        clearTimeout(this.params.recordTimer)
        clearTimeout(this.params.geolocationTimer)
        // 清空数据
        this.setState({
            startFlag:false,
            geolocationFlag:false,
            bike_info:'',
            bike_time:0
        })
        this.params.geolocation_location = []
        this.params.geolocation_info = []
    }

    // 地图(高德)
    renderMap = () => {
        this.getGeolocation()
    }

    // 绘制地图,定位并记录位置
    getGeolocation = (record) => {
        let _this = this
        var map = new window.AMap.Map('clientNowMap', {
            resizeEnable: true
        });
        var options = {
            'enableHighAccuracy': true,//是否使用高精度定位，默认:true
            'showButton': true,//是否显示定位按钮
            'buttonPosition': 'RB',//定位按钮的位置
            /* LT LB RT RB */
            'buttonOffset': new window.AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
            'showMarker': true,//是否显示定位点
            'markerOptions':{//自定义定位点样式，同Marker的Options
              'offset': new window.AMap.Pixel(-18,-21),
              'content':'<img src="/assets/local.png" style="width:36px;height:42px"/>'
            },
            'circleOptions': {//定位精度圈的样式
                'strokeColor': '#1DA57A',
                'noSelect': true,
                'strokeOpacity': 0.5,
                'strokeWeight': 2,
                'fillColor': '#f9c700',
                'fillOpacity': 0.25
            },
            'showCircle': true,//是否显示定位精度圈
            'zoomToAccuracy': true
        }
        window.AMap.plugin(["AMap.Geolocation"], function() {
            var geolocation = new window.AMap.Geolocation(options);
            map.addControl(geolocation);
            geolocation.getCurrentPosition()
            window.AMap.event.addListener(geolocation, 'complete', onComplete)
            window.AMap.event.addListener(geolocation, 'error', onError)
            //解析定位结果
            function onComplete(data) {
                // 第一次定位
                if (!_this.state.startFlag) {
                    _this.setState({
                        geolocationFlag : true 
                    })
                    message.success('定位成功~',1)
                } else {
                    // 进入骑行模式
                    // 用于记录街道(高德api)
                    let geocoder = new window.AMap.Geocoder({
                        radius: 500 //范围，默认：1000
                    });
                    if (record) {
                        // 第一次进入骑行模式需要根据定位记录当前城市(这里用的百度api)
                        var gc = new window.BMap.Geocoder();
                        var point = new window.BMap.Point(data.position.lng, data.position.lat);
                        gc.getLocation(point, function(e){
                            let province = e.addressComponents.province 
                            let city = e.addressComponents.city
                            _this.setState({
                                bike_gc : `${province}/${city}`
                            })
                        })
                        // 第一次进入骑行模式需要根据定位记录当前街道(这里用的高德api= =)
                        geocoder.getAddress([data.position.lng, data.position.lat], function(status, result) {
                            if (status === 'complete'&&result.regeocode) {
                                var address = result.regeocode.formattedAddress;
                                _this.params.geolocation_location.push(address)
                            }else{
                                console.log(result)                            }
                        });
                    } else {
                        // 之后进入骑行模式需要根据定位刷新当前街道(这里用的高德api= =)
                        geocoder.getAddress([data.position.lng, data.position.lat], function(status, result) {
                            if (status === 'complete'&&result.regeocode) {
                                var address = result.regeocode.formattedAddress;
                                _this.params.geolocation_location[1] = address
                            }else{
                                console.log(result)                            }
                        });
                        //     var Bmap = new window.BMap.Map("container"); // 创建地图实例  
                        //     // 从第二次进入骑行模式时开始计算距离(这里用的百度api)
                        //     let gc_length = _this.params.geolocation_info.length
                        //     let pointPre = new window.BMap.Point(_this.params.geolocation_info[gc_length-1].lng, _this.params.geolocation_info[gc_length-1].lat);
                        //     let pointNow = new window.BMap.Point(data.position.lng, data.position.lat);
                        //     let distancePoint = Bmap.getDistance(new window.BMap.Point(pointPre, pointNow))
                        //     _this.params.bike_distance += Number(distancePoint)
                        // }
                    }
                    let position = {
                        'lng' : data.position.lng,
                        'lat' : data.position.lat
                    }
                    _this.params.geolocation_info.push(position)
                }
            }
            function onError(data) {
                message.error('定位失败~ 由于Chrome、iOS10等已不再支持非安全域的浏览器定位请求，本站无资金升级https= =换个浏览器试试8~', 6)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let companyConfig = {
            1 : '摩拜',
            2 : '哈喽出行',
            3 : '永安行',
            4 : 'OFO小黄车',
            5 : '青桔单车',
            6 : '其它'
        }
        return (
            <div className="clientNow">
                <Form style={{paddingTop: '0rem'}}>
                    <div className="clientNow-User">
                        <span>您好, {Cookies.get('user_name')}</span>
                        <span onClick={this.userEnd}>退出 <Icon type="logout"/></span>
                    </div>
                    <FormItem>
                        <Button style={{width:'100%'}} type={!this.state.startFlag ? 'primary' : 'danger'}  onClick={()=>this.handleOperator(this.state.startFlag)}>
                            {   
                                !this.state.startFlag ?
                                (<div>START <Icon type="double-right"/></div>):
                                (<div>END <Icon type="poweroff" /></div>) 
                            }
                        </Button>
                    </FormItem>
                    <div id="clientNowMap" className="clientNow-Map" style={{height:'320px',marginBottom:'2rem'}}></div>
                    {
                        !this.state.startFlag ? 
                            (<div>
                                <FormItem>{
                                    getFieldDecorator('bike_company', {
                                        rules:[
                                            {
                                                required:true,
                                                message:'不能为空~'
                                            },
                                        ]
                                    })(
                                        <Select
                                            placeholder="选择共享单车运营商"
                                        >
                                            <Option value={1}>摩拜</Option>
                                            <Option value={2}>哈喽出行</Option>
                                            <Option value={3}>永安行</Option>
                                            <Option value={4}>OFO小黄车</Option>
                                            <Option value={5}>青桔单车</Option>
                                            <Option value={6}>其它</Option>
                                        </Select>
                                    )
                                }</FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('bike_sn',{
                                            initialValue:'',
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'不能为空~'
                                                }
                                            ]
                                        })(
                                            <Input prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="车辆编号" />
                                        )
                                    }
                                </FormItem>
                            </div>) :

                            (<div>
                                <FormItem className="clientNow-Data">
                                    <div>当前位置 : {this.state.bike_gc}</div>
                                </FormItem>
                                <FormItem className="clientNow-Data">
                                    <div>{companyConfig[this.state.bike_info.bike_company]} 编号 : {this.state.bike_info.bike_sn}</div>
                                </FormItem>
                                <FormItem className="clientNow-Data">
                                    <div>开始时间 : {Utils.formateDate(this.state.start_time, true)}</div>
                                </FormItem>
                                <FormItem className="clientNow-Data">
                                    <div>骑行时间 : {Utils.programTime(this.state.bike_time)}</div>
                                </FormItem>
                            </div>)
                    }
                </Form>
            </div>
        )
    }
}
export default Form.create()(ClientNow);