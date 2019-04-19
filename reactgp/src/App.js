import React, { Component } from 'react';
import './style/App.less';
import { withRouter } from 'react-router-dom';

window.onload = function() {
  // 阻止双击放大
  var lastTouchEnd = 0;
  document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
          event.preventDefault();
      }
  });
  document.addEventListener('touchend', function(event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false);

  // 阻止双指放大
  document.addEventListener('gesturestart', function(event) {
      event.preventDefault();
  });
}

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
