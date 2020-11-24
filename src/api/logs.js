/*
 * @Author: XuYang 
 * @Date: 2020-11-24 19:02:11 
 * @Last Modified by:   XuYang 
 * @Last Modified time: 2020-11-24 19:02:11 
 */
import http from '../utils/http'
/**
 * 获取所有日志
 * @param {*} params 
 */
export const getAllLogs = async (params) => await http.get('/admin/logs/getAll', {params: params});

/**
 * 导出日志
 * @param {*} params 
 */
export const exportAllLogs = async (params) => await http.get('/admin/logs/exportAll', {params: params})