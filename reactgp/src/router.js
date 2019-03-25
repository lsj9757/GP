import React, { Component } from 'react';
import { HashRouter as Routers, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './admin'
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
          </App>
      </Routers>
    );
  }
}
