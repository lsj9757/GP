import React, { Component } from 'react';
import { HashRouter as Routers, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Common from './common'
import Client from './client'
import Login from './pages/login'
import Home from './pages/home'
import Detail from './pages/order/detail'
import Order from './pages/order'
import BikeMap from './pages/bikeMap'
import ClientLogin from './pages/client/clientLogin'
import ClientRes from './pages/client/clientRes'
import ClientNow from './pages/client/clientNow'
import UserManage from './pages/userManage'
import WorkerManage from './pages/workerManage'
import CityOrder from './pages/echarts/cityOrder'
import BikeOrder from './pages/echarts/bikeOrder'
import TimeOrder from './pages/echarts/timeOrder'

export default class Router extends Component {

  render() {
    return (
      <Routers>
          <App>
            <Switch>
              {/* <Route path="/login" component={Login}/> */}
              <Route path="/client" render={()=>
                <Client>
                  <Route path="/client/clientLogin" component={ClientLogin} />
                  <Route path="/client/clientRes" component={ClientRes} />
                  <Route path="/client/clientNow" component={ClientNow} />
                </Client>
              }></Route>
              <Route path='/common' render={()=>
                <Common>
                  <Route path="/common/order/detail/:orderId" component={Detail} />
                </Common>
              }></Route>
              <Route path='/' render={()=>
                <Admin>
                  <Switch>
                    <Route path="/admin/home" component={Home}></Route>
                    <Route path="/admin/order" component={Order}></Route>
                    <Route path="/admin/userManage" component={UserManage}></Route>
                    <Route path="/admin/workerManage" component={WorkerManage}></Route>
                    <Route path="/admin/bikeMap" component={BikeMap}></Route>
                    <Route path="/admin/echarts/cityOrder" component={CityOrder}></Route>
                    <Route path="/admin/echarts/bikeOrder" component={BikeOrder}></Route>
                    <Route path="/admin/echarts/timeOrder" component={TimeOrder}></Route>
                    <Redirect to="/admin/home" />
                  </Switch>
                </Admin>
              }></Route>
            </Switch>
          </App>
      </Routers>
    );
  }
}
