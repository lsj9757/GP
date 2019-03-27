import React, { Component } from 'react';
import { BrowserRouter as Routers, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Common from './common'
import Login from './pages/login'
import NoMatch from './pages/noMatch'
import Buttons from './pages/ui/buttons'
import City from './pages/city'

export default class Router extends Component {
  render() {
    return (
      <Routers>
          <App>
            <Route path='/admin' render={()=>
              <Admin>
                <Switch>
                  <Route path="/admin/ui/buttons" component={Buttons}></Route>
                  <Route path="/admin/form/login" component={Login}></Route>
                  <Route path="/admin/city" component={City}></Route>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            }></Route>
            <Route path='/common' render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={Login} />
              </Common>
            }></Route>
          </App>
      </Routers>
    );
  }
}
