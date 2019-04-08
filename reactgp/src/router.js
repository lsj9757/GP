import React, { Component } from 'react';
import { BrowserRouter as Routers, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Common from './common'
import Login from './pages/login'
import NoMatch from './pages/noMatch'
import City from './pages/city'
import Detail from './pages/order/detail'
import Order from './pages/order'
import User from './pages/user'
import BikeMap from './pages/bikeMap'
import Permission from './pages/permission'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'

export default class Router extends Component {
  render() {
    return (
      <Routers>
          <App>
            <Switch>
              <Route path="/login" component={Login}/>
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
                    <Route path="/user" component={User}></Route>
                    <Route path="/bikeMap" component={BikeMap}></Route>
                    <Route path="/permission" component={Permission}></Route>
                    <Route path="/echarts/bar" component={Bar}></Route>
                    <Route path="/echarts/pie" component={Pie}></Route>
                    <Route path="/echarts/line" component={Line}></Route>
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
