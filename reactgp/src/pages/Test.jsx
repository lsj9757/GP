import React, { Component } from 'react';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        console.log('WillMount')
    }

    componentDidMount() {
        console.log('DidMount')
    }

    componentWillReceiveProps(newProps) {
        console.log('WillProps' + newProps.name)
    }
    
    shouldComponentUpdate() {
        console.log('should update');
        return true; //默认返回true，若返回false即不执行之后的生命周期
    }

    componentWillUpdate() {
        console.log('WillUpdate')
    }

    componentDidUpdate() {
        console.log('DidUpdate')
    }

    render() {
        return (
            <div>
                this is children
                <p>{this.props.name}</p>
            </div>
        )
    }
}