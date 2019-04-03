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
