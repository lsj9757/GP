import React, { Component } from 'react';
import Test from './Test'

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
            <div>
                <p>this is parent</p>
                <button onClick={this.handleAdd.bind(this)}>click</button>
                <p>{this.state.count}</p>
                <Test name=" lsj"></Test>
            </div>
        )
    }
}