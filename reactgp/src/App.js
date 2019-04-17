import React, { Component } from 'react';
import './style/App.less';
import { withRouter } from 'react-router-dom';


class App extends Component {
  componentDidMount() {
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
      this.props.history.push({ pathname : '/client/clientLogin' })
    }
  }

  render() {
    return (
      <div className="App">
        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
