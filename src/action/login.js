/*
 * @Author: XuYang 
 * @Date: 2020-11-26 10:57:46 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 11:01:42
 */
import { LOGIN } from "../constants/types"

/**
 * 登录写入username
 * 和avatar
 * @param {*} params 
 */
export const setLoginInfo = (params) => {
    return {
        type: LOGIN,
        params: params
    }
}