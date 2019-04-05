import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../resource/utils';
const FormItem = Form.Item;

class Baseform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList; // 获取传过来的参数
        const formItemList = [];
        if (formList && formList.length > 0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === '时间查询'){
                    const begin_time = <FormItem label="订单时间" key={'begin_time'}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker style={{ width: width }} showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={'end_time'}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker style={{ width: width }} showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time)
                }else if(item.type === 'INPUT'){
                    const INPUT = <FormItem label={label} key={field+' lsj'}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Input style={{ width: width }} type="text" placeholder={placeholder} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field+' lsj'}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type === '城市') {
                    const cityList = [
                        { id: '0', name: '全部' }, 
                        { id: '1', name: '北京' }, 
                        { id: '2', name: '天津' }, 
                        { id: '3', name: '上海' }
                    ]
                    const CITY = <FormItem label={'城市'} key={field+' lsj'}>
                        {
                            getFieldDecorator(['city_id'], {
                                initialValue: '0'
                            })(
                                <Select
                                    style={{ width: width || 100 }}
                                    placeholder={'全部'}
                                >
                                    {Utils.getOptionList(cityList)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CITY)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field+' lsj'}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList;
    }

    render() {
        return (
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(Baseform);