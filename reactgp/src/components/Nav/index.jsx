import React, { Component } from 'react';
import './index.less';
import MenuConfig from '../../resource/menuConfig';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig)
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((e,i) => {
            if (e.children) {
                return (
                    <SubMenu title={e.title} key={e.key}>
                        { this.renderMenu(e.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={e.title} key={e.key}>{e.title}</Menu.Item>
        })
    }

    render() {
        return (
            <div className="nav">
                <div className="nav-logo">
                    <img src="/assets/logo.jpg" alt="lsj"/>
                    <h1>lsj</h1>
                </div>
                <Menu
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}