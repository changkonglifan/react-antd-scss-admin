/*
 * @Author: XuYang 
 * @Date: 2020-11-19 14:10:32 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 18:32:38
 */
import http from '../utils/http'

/**
 * 获取所有的用户
 * @param {*} params 
 */
export const getAllUser = async (params) => await http.get('/admin/user/getAll', {params: params});

/**
 * 新增用户
 * @param {*} params 
 */
export const addUser = async (params) => await http.post('/admin/user/add', params);

/**
 * 修改用户
 * @param {*} params 
 */
export const modifyUser = async (params) => await http.post('/admin/user/update', params);

/**
 * 删除用户
 * @param {*} params 
 */
export const deleteUser = async (params) => await http.delete('/admin/user/delete', {params: params});

/**
 * 重置密码
 * @param {*} params 
 */
export const resetPsw = async (params) => await http.post('/admin/user/resetPassword', params);

/**
 * 退出登录
 * @param {*} params 
 */
export const logout = async () => await http.post('/admin/user/logout');
/**
 * 修改密码
 * @param {*} params 
 */
export const changePassword = async (params)=> await http.post('/admin/user/changePassword',params)