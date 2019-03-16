import React, { Component } from 'react';
import './index.less';

export default class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="noMatch">
                404
            </div>
        )
    }
}