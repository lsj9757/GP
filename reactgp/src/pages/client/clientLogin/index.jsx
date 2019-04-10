import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import './index.less';
const FormItem = Form.Item;

class ClientLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleSubmit = () => {
        this.props.history.push({ pathname : '/client/clientRes' ,query : { day: 'Friday'} })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="clientLogin">
                <img src="/assets/logo.jpg" alt="lsj"/>
                <Form style={{paddingTop: '8rem'}}>
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
                        <Button style={{width:'100%'}} type="primary"  onClick={this.handleSubmit}>Login in</Button>
                    </FormItem>
                    <div className="clientLogin-rsgo">
                        Or <a href="./clientRes">register now!</a>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(ClientLogin);