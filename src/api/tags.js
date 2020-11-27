/*
 * @Author: XuYang 
 * @Date: 2020-11-26 17:37:44 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-27 18:22:13
 */
import http from '../utils/http';

/**
 * 获取所有的标签
 * 树形结构
 * @param {*} params 
 */
export const getAllTags = (params) => http.get('/admin/tags/getAll', {params: params});

/**
 * 添加节点
 * @param {*} params 
 */
export const addTag = (params) => http.post('/admin/tags/add', params)

/**
 * 修改节点
 * @param {*} params 
 */
export const updateTag = (params) => http.post('/admin/tags/update', params)

/**
 * 删除
 * @param {} params 
 */
export const deleteTag = (params) => http.delete('/admin/tags/delete', {params: params})