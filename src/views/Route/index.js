/*
 * @Author: XuYang 
 * @Date: 2020-11-24 10:40:44 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 16:23:14
 * 内容切换部分路由
 */
import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Home from '../Home';
import NoMatch from '../NoMatch'
import User from '../UserManager'
import Logs from '../Logs'
import Tags from '../Tags';

const RouteMain = () =>{
    return (
        <Switch>
            <Route exact path='/index/home'>
                <Home></Home>
            </Route>
            <Route exact path='/index/user'>
                <User></User>
            </Route>
            <Route exact path='/index/logs'>
                <Logs></Logs>
            </Route>
            <Route exact path='/index/tag'>
                <Tags></Tags>
            </Route>
            <Route path='/index/*'>
                <NoMatch></NoMatch>
            </Route>
        </Switch>
    )
}

export default RouteMain;