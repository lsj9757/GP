import React, { Component } from 'react';
import { BrowserRouter as Routers, Route, Switch} from 'react-router-dom'
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
            <Route path='/admin' render={()=>
              <Admin>
                <Switch>
                  <Route path="/admin/form/login" component={Login}></Route>
                  <Route path="/admin/order" component={Order}></Route>
                  <Route path="/admin/city" component={City}></Route>
                  <Route path="/admin/user" component={User}></Route>
                  <Route path="/admin/bikeMap" component={BikeMap}></Route>
                  <Route path="/admin/permission" component={Permission}></Route>
                  <Route path="/admin/echarts/bar" component={Bar}></Route>
                  <Route path="/admin/echarts/pie" component={Pie}></Route>
                  <Route path="/admin/echarts/line" component={Line}></Route>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            }></Route>
            <Route path='/common' render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={Detail} />
              </Common>
            }></Route>
          </App>
      </Routers>
    );
  }
}
