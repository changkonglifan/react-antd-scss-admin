/*
 * @Author: XuYang 
 * @Date: 2020-11-19 14:10:32 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:02:13
 */
import http from '../utils/http'
/**
 * 登录
 * @param {*} params 
 */
export const login = async (params) => {
    return await http.post('/admin/user/login', params, {form: true})
}