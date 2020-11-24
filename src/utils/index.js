/*
 * @Author: XuYang 
 * @Date: 2020-11-24 19:02:48 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:04:59
 * 通用方法, 包括cookies操作
 */
 
/**
 * 写入cookies
 * @param {*} name 
 * @param {*} value 
 */
export function setCookie(name,value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
/**
 * 读取cookies
 * @param {*} name 
 */
export function getCookie(name) {
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
        return unescape(arr[2]);
else
    return null;
}

export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/**
 * 清空cookies
 * @param {*} name 
 */
export function clearCookie(name) {     
    setCookie(name, "", -1); 
}
/**
 * 删除所有的cookies
 */
export function clearAllCookie(){
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
}