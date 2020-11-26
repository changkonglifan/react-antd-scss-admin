/*
 * @Author: XuYang 
 * @Date: 2020-11-24 19:02:33 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 10:59:09
 * 合并reducer
 */
import { combineReducers } from 'redux';
import menu from './menu'
import login from './login'
export default combineReducers({
    menu,
    login
})