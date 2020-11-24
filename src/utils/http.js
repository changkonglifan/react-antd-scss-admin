/*
 * @Author: XuYang 
 * @Date: 2020-11-20 11:19:08 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:04:43
 * axios 请求封装
 */
import axios from 'axios';
import qs from 'qs'
import { getCookie } from '.';
import {  baseURL } from './config'
/**
 * 创建实例
 */
const instance = axios.create({
    baseURL: baseURL(),
    // timeout: 1000,
    headers: {
      'Accept': 'application/json'
    }
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // 携带token
    if(!config.params){
      config.params = {
        token : getCookie('token')
      };
    }else {
      config.params.token = getCookie('token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code + '' === '-101'){
      // 登录已失效
      window.location.href = '/login';
    }
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;