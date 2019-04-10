import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message} from 'antd'
import './style/client.less'

export default class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="client">
                {this.props.children}
            </div>
        )
    }
}