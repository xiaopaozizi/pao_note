/**
 * Created by 小炮子子 on 2017/7/14.
 */


import axios from 'axios'
// 基本路径
let base = '';
// 发送请求
// POST 登录请求
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data)}
// POST 获取用户信息
export const reqUserList = params => { return axios.post(`${base}/userList`, params).then(res => res.data)}
