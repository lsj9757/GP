import React, { Component } from 'react';
import { HashRouter as Routers, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import NoMatch from './pages/noMatch'
import Buttons from './pages/ui/buttons'

export default class Router extends Component {
  render() {
    return (
      <Routers>
          <App>
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' render={()=>
              <Admin>
                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                <Route component={NoMatch}></Route>
              </Admin>
            }></Route>
          </App>
      </Routers>
    );
  }
}
