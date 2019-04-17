import React, { Component } from 'react';
import { Form, Input, Button, message, Icon } from "antd";
import './index.less';
import Cookies from 'js-cookie';
const FormItem = Form.Item;

class ClientLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount(){
        if (Cookies.get('user_name')) {
            this.props.history.push({ pathname : '/client/clientNow' })
        }
    }

    handleSubmit = () => {
        let user_info = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{ // 校验
            if (!err) {
                message.success(`登陆成功~`, 1)
                // cookies存入
                Cookies.set('user_name', user_info.user_name, { expires: 1 });
                this.props.history.push({ pathname : '/client/clientNow' })
            } else {
                message.warning(`输入有误~`, 1)
            }
        })
    }

    handleRes = () => {
        this.props.history.push({ pathname : '/client/clientRes' })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="clientLogin">
                <img src="/assets/bg2.png" alt="lsj"/>
                <Form style={{paddingTop: '4rem'}}>
                    <FormItem>
                        {
                             getFieldDecorator('user_name',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'不能为空~'
                                    },
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
                        <Button style={{width:'100%'}} type="primary"  onClick={this.handleSubmit}>Login In</Button>
                    </FormItem>
                    <div className="clientLogin-rsgo">
                        Or <a href="javascript:void(0);" onClick={this.handleRes}>register now!</a>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(ClientLogin);