import React, { Component } from 'react';
import { BrowserRouter as Routers, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Common from './common'
import Client from './client'
import Login from './pages/login'
import NoMatch from './pages/noMatch'
import City from './pages/city'
import Detail from './pages/order/detail'
import Order from './pages/order'
import BikeMap from './pages/bikeMap'
import Permission from './pages/permission'
import Bar from './pages/echarts/bar'
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
              <Route path="/login" component={Login}/>
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
                    <Route path="/order" component={Order}></Route>
                    <Route path="/city" component={City}></Route>
                    <Route path="/userManage" component={UserManage}></Route>
                    <Route path="/workerManage" component={WorkerManage}></Route>
                    <Route path="/bikeMap" component={BikeMap}></Route>
                    <Route path="/permission" component={Permission}></Route>
                    <Route path="/echarts/bar" component={Bar}></Route>
                    <Route path="/echarts/cityOrder" component={CityOrder}></Route>
                    <Route path="/echarts/bikeOrder" component={BikeOrder}></Route>
                    <Route path="/echarts/timeOrder" component={TimeOrder}></Route>
                    <Redirect to="/home" />
                    <Route component={NoMatch}></Route>
                  </Switch>
                </Admin>
              }></Route>
            </Switch>
          </App>
      </Routers>
    );
  }
}
