import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';
// import Content from './components/Content';
import { Row, Col } from 'antd';
import './style/admin.less';
// import Home from './pages/home';

export default class Admin extends Component {
  render() {
    return (
      <Row className="container">
          <Col span={4} className="container-nav">
            <Nav/>
          </Col>
          <Col span={20} className="container-main">
            <Header/>
            <Row className="container-main-content">
              { this.props.children }
            </Row>
            {/* <Home/> */}
            <Footer/>
          </Col>
      </Row>
    );
  }
}
