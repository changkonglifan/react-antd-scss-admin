/*
 * @Author: XuYang 
 * @Date: 2020-11-26 17:37:44 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 17:38:09
 */
import http from '../utils/http';

/**
 * 获取所有的标签
 * 树形结构
 * @param {*} params 
 */
export const getAllTags = (params) => http.get('/admin/tags/getAll', {params: params});