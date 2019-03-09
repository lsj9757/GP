import React, { Component } from 'react';
import Test from './Test';
import './Life.less';
import {Button} from 'antd';

export default class TestParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    handleAdd () {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div className="content">
                <p>this is parent</p>
                <Button>11</Button>
                <button onClick={this.handleAdd.bind(this)}>click</button>
                <p>{this.state.count}</p>
                <Test name=" lsj"></Test>
            </div>
        )
    }
}