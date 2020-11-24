/*
 * @Author: XuYang 
 * @Date: 2020-11-24 19:10:17 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:10:40
 * 启动页
 * 引入 thunk 和logger 中间件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer/index'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunk,
    logger
  )
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
