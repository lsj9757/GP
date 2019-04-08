import React, { Component } from 'react';
import {Card, Button, Form, Input, Select, Tree, message, Modal} from 'antd'
import Utils from '../../resource/utils';
import Axios from '../../axios/index';
import Etable from '../../components/Etable';
import menuConfig from '../../resource/menuConfig'
import '../style/common.less';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class Permission extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
    }

    params = {
        page:1
    }

    requestList = ()=>{
        Axios.ajax({
            url:'role/list',
            data:{
                params:{}
            }
        }).then((res)=>{
            this.setState({
                list:res.result.item_list.map((item,index)=>{
                    item.key=index
                    return item;
                })
            })
        })
    }

    componentDidMount(){
        this.requestList();
    }

    // 角色创建
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }

    // 角色提交
    handleRoleSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        Axios.ajax({
            url:'role/create',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                message.success('角色创建成功');
                this.setState({
                    isRoleVisible:false
                })
                this.requestList();
            }
        })
    }

    // 权限设置
    handlePermission = ()=>{
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem
        });
        let menuList = this.state.selectedItem.menus;
        this.setState({
            menuInfo:menuList
        })
    }

    handlePermEditSubmit = ()=>{
        let data = this.permEditForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        Axios.ajax({
            url:'/permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                message.success('权限设置成功');
                this.setState({
                    isPermVisible:false
                })
                this.requestList();
            }
        })
    }

    render(){
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>           
                <div className="content-wrap">
                    <Etable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst }/>
                </Modal>
                <Modal
                       title="权限设置"
                       visible={this.state.isPermVisible}
                       width={600}
                       onOk={this.handlePermEditSubmit}
                       onCancel={()=>{
                           this.setState({
                               isPermVisible:false
                           })
                       }}>
                        <PermEditForm
                            wrappedComponentRef={(inst) => this.permEditForm = inst }
                            detailInfo={this.state.detailInfo}
                            menuInfo={this.state.menuInfo||[]}
                            patchMenuInfo={(checkedKeys)=>{
                                this.setState({
                                    menuInfo: checkedKeys
                                });
                            }}
                        />
                </Modal>
            </div>
        );
    }
}

// 角色创建
class RoleForm extends Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue:1
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

// 设置权限
class PermEditForm extends React.Component {
    state = {};
    // 设置选中的节点，通过 父组件方法 再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    renderTreeNodes = (data,key='') => {
        return data.map((item) => {
            let parentKey = key+item.key;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderTreeNodes(item.children,parentKey)}
                    </TreeNode>
                );
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        { this.renderBtnTreedNode(item,parentKey) }
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };

    renderBtnTreedNode = (menu,parentKey='')=> {
        const btnTreeNode = []
        menu.btnList.forEach((item)=> {
            console.log(parentKey+'-btn-'+item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey+'-btn-'+item.key} className="op-role-tree"/>);
        })
        return btnTreeNode;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength="8" placeholder={detail_info.role_name}/>
                </FormItem>
                <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status',{
                        initialValue: '1'
                    })(
                        <Select style={{ width: 80}}
                                placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo ||[]}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PermEditForm = Form.create({})(PermEditForm);