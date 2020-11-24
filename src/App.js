/*
 * @Author: XuYang 
 * @Date: 2020-11-24 19:09:53 
 * @Last Modified by:   XuYang 
 * @Last Modified time: 2020-11-24 19:09:53 
 * app文件, 整体路由
 */
import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './views/Login';
import Layout from './views/Layout'
import NoMatch from './views/NoMatch';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route path='/index'>
            <Layout></Layout>
          </Route>
          <Redirect from="/*" to="/login" />
          <Route path='/*'>
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
