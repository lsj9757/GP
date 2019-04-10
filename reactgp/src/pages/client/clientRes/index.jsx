import React, { Component } from 'react';
import { Card, Form, Input, Button, Radio, Icon, DatePicker } from "antd";
import './index.less';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ClientRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleSubmit = () => {
        this.props.history.push({ pathname : '/client/clientLogin' ,query : { day: 'Friday'} })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const offsetLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        return (
            <div className="clientRes">
            <Card title="Register">
                <Form>
                    <FormItem>
                        {
                            getFieldDecorator('userName',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('userPwd', {
                                initialValue: '',
                                rules: []
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                                getFieldDecorator('birthday',{
                                    // initialValue:moment('2018-10-10')
                                })(
                                    <DatePicker
                                        style={{width:'100%'}}
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="birthday"
                                    />
                                )
                            }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('userTel',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="phone" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('userWechat',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="wechat" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="wechat" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('userAddress',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户名不能为空'
                                    },
                                    {
                                        min:5,max:10,
                                        message:'长度不在范围内'
                                    },
                                    {
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:'用户名必须为字母或者数字'
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="address" />
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