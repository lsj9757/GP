import React, { Component } from 'react';
import './index.less';
import MenuConfig from '../../resource/menuConfig';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'

const SubMenu = Menu.SubMenu;

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKey: ''
        };
    }

    handleClick = ({item, key}) => {
        if (key == this.state.currentKey) {
            return false;
        }
        // dispatch事件派发，(通过action)自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));

        this.setState({
            currentKey: key
        })

        // 清除全局地图定时器
        clearInterval(window.clearMapTimer)
    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = window.location.pathname
        this.setState({
            currentKey, 
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
            return <Menu.Item title={e.title} key={e.key}>
                <NavLink to={e.key}>{e.title}</NavLink>
            </Menu.Item>
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
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}
export default connect()(Nav)