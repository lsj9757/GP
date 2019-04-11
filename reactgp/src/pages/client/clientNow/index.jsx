import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Icon, Select, Modal } from "antd";
import './index.less';
import Utils from '../../../resource/utils';
const FormItem = Form.Item;
const Option = Select.Option;

class ClientNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startFlag:false,
            startTime:0
        };
    }

    componentDidMount(){
        this.renderMap()
    }

    params = {
        recordTimer: null
    }


    handleOperator = (startFlag) => {
        if (!startFlag) {
            let startInfo = this.props.form.getFieldsValue();
            this.props.form.validateFields((err,values)=>{ //校验
                if (!err) {
                    this.setState({
                        startFlag:true,
                        startInfo
                    })
                    this.params.recordTimer = setInterval(()=>{
                        this.setState({
                            startTime:this.state.startTime+1
                        })
                    },1000)
                } else {
                    message.warning(`输入有误~`)
                }
            })
        } else {
            Modal.confirm({
                title: '睁大眼睛',
                content: `确定要结束此行程吗?`,
                onOk:()=>{
                   this.handleEnd()
                }
            })
        }
    }

    handleEnd = () =>{
        message.success(`结束成功!`)
        // 清除计时器
        clearTimeout(this.params.recordTimer)
        this.setState({
            startFlag:false,
            startInfo:'',
            startTime:0
        })
    }

    renderMap = () => {
        // this.map = new window.BMap.Map("clientNowMap"); // 创建地图实例  
        // this.addMapControl(); //调用地图控件
        // this.drawBikeRoute(result.position_list) //调用行驶路线(mock数据里是这个'position_list'参数)
        this.getGeolocation()
    }

    getGeolocation = () => {
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
                // document.getElementById('status').innerHTML='定位成功'
                // var str = [];
                // str.push('定位结果：' + data.position);
                // str.push('定位类别：' + data.location_type);
                // if(data.accuracy){
                //     str.push('精度：' + data.accuracy + ' 米');
                // }//如为IP精确定位结果则没有精度信息
                // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                // document.getElementById('result').innerHTML = str.join('<br>');
                console.log(data.position.lat, data.position.lng)
            }
            function onError(data) {
                // document.getElementById('status').innerHTML='定位失败'
                // document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
                console.log(2)
            }
        });   
        // window.AMap.plugin('AMap.CitySearch', function () {
            
        // })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let companyConfig = {
            1 : '摩拜',
            2 : 'OFO',
            3 : '小蓝'
        }
        return (
            <div className="clientNow">
                <Form style={{paddingTop: '0rem'}}>
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
                                    getFieldDecorator('bikeCompany', {
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
                                            <Option value={2}>OFO</Option>
                                            <Option value={3}>小蓝</Option>
                                        </Select>
                                    )
                                }</FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('bikeSn',{
                                            initialValue:'',
                                            rules:[
                                                {
                                                    required:true,
                                                    message:'不能为空~'
                                                },
                                                {
                                                    pattern:new RegExp('^[0-9]{5,}$'),
                                                    message:'车辆编号为至少5位的数字哦~'
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
                                    <div>共享单车运营商 : {companyConfig[this.state.startInfo.bikeCompany]}</div>
                                </FormItem>
                                <FormItem className="clientNow-Data">
                                    <div>车辆编号 : {this.state.startInfo.bikeSn}</div>
                                </FormItem>
                                <FormItem className="clientNow-Data">
                                    <div>骑行时间 : {Utils.programTime(this.state.startTime)}</div>
                                </FormItem>
                            </div>)
                    }
                </Form>
            </div>
        )
    }
}
export default Form.create()(ClientNow);