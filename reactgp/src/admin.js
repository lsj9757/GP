import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Content from './components/Content';
import { Row, Col } from 'antd';
import './admin.less';

export default class Admin extends Component {
  render() {
    return (
      <Row className="container">
          <Col span={4} className="nav">
            <Nav/>
          </Col>
          <Col span={20} className="main">
            <Header/>
            <Content/>
            <Footer/>
          </Col>
      </Row>
    );
  }
}
