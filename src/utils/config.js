/*
 * @Author: XuYang 
 * @Date: 2020-11-20 11:21:11 
 * @Last Modified by: XuYang
 * @Last Modified time: 2020-11-24 19:04:23
 * 加密算法等
 */
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt'
/**
 * 默认请求地址
 */
export const baseURL = () =>{
    const env = process.env.NODE_ENV;
    switch(env){
        default:
            return 'http://127.0.0.1:8008'
    }
}

const descKey = CryptoJS.enc.Utf8.parse("caicai");
const IV = CryptoJS.enc.Utf8.parse('caicaiBlog');// 偏移量  
// des 加密
export function encryptByDes(message){
    var keyHex = CryptoJS.enc.Utf8.parse(descKey);
    message = CryptoJS.enc.Utf8.parse(message);
    var encrypted = CryptoJS.AES.encrypt(message, keyHex, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

// des 解密

export function decryptByDes(message){
    var keyHex = CryptoJS.enc.Utf8.parse(descKey);

    let base64 = CryptoJS.enc.Base64.parse(message);
    let src = CryptoJS.enc.Base64.stringify(base64);
    var decrypted = CryptoJS.AES.decrypt(src, keyHex, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })
    var decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

/**
 * 公钥
 *  */
export const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWbozYSQ6u7f50JDhcVlTEf7ct9dW3kqrIINgfbPV2iKaa9SFv2gYArOhAgajXqgpX4+6CIdqFCtZPL8Znkv7s6cUtMktqBfCeVgv0Q8ehH/CCQeB480MEN17NG6tenraxRCgAEmwZUpg0apW9amDUDLIt8is/cIpANWbiyQL8cQIDAQAB';

/**
 * 获取JSEncrypt加密文件
 * RSA 加密
 */
export function enCodePassword(password){
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(password);
}