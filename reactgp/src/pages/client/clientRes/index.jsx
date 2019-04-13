import React, { Component } from 'react';
import { Card, Form, Input, Button, Icon, DatePicker, Cascader, message } from "antd";
import './index.less';
import moment from 'moment';
import cityList from '../../../resource/address.js';
import Cookies from 'js-cookie';

const FormItem = Form.Item;

class ClientRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleSubmit = () => {
        let user_info = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{ // 校验
            if (!err) {
                message.success(`注册成功并进入~`)
                // 格式化生日
                user_info.user_birthday = moment(user_info.user_birthday).format("YYYY-MM-DD")
                // 拼接地址
                user_info.user_address = `${user_info.user_address[0]}/${user_info.user_address[1]}`
                console.log(user_info)
                // 同样存入cookies
                Cookies.set('user_name', user_info.user_name, { expires: 1 });
                this.props.history.push({ pathname : '/client/clientNow' })
            } else {
                message.warning(`输入有误~`)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className="clientRes">
            <Card title="Register">
                <Form>
                    <FormItem>
                        {
                            getFieldDecorator('user_name',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'不能为空~'
                                    },
                                    {
                                        min:6,max:12,
                                        message:'长度6-12位'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="userName" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('user_pwd', {
                                initialValue: '',
                                rules: [
                                    {
                                        required:true,
                                        message:'不能为空~'
                                    },
                                ]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="userPwd" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                                getFieldDecorator('user_birthday',{
                                    rules: [
                                        {
                                            required:true,
                                            message:'不能为空~'
                                        },
                                    ]
                                })(
                                    <DatePicker
                                        style={{width:'100%'}}
                                        format="YYYY-MM-DD"
                                        placeholder="birthday"
                                    />
                                )
                            }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('user_phone',{
                                initialValue:'',
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
                                <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="phone" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('user_wx',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'不能为空~'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="wechat" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="wechat" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('user_address',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'不能为空~'
                                    }
                                ]
                            })(
                                <Cascader options={cityList} placeholder="address" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button style={{width:'100%'}} type="primary"  onClick={this.handleSubmit}>Register && Login In</Button>
                    </FormItem>
                </Form>
            </Card>
            </div>
        )
    }
}
export default Form.create()(ClientRes);