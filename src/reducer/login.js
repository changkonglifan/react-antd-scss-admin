import { LOGIN } from "../constants/types";

/*
 * @Author: XuYang 
 * @Date: 2020-11-26 10:59:12 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-26 11:01:43
 */
const initState = {
    loginInfo:{
        name: '',// 用户名
        avatar: ''// 头像
    }
}

export default function login(state = initState, action){
    switch(action.type){
        case LOGIN:
            return {...state, loginInfo: action.params};
        default:
            return state;
    }
}