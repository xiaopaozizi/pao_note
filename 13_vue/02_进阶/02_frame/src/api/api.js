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
export const reqUserList = params => { return axios.post(`${base}/user/list`, params).then(res => res.data)}
// GET 获取书籍列表
export const reqBookList = params => { return axios.get(`${base}/book/list`, params).then(res => res.data)}
// GET 添加书籍
export const reqAddBook = params => { return axios.get(`${base}/book/add`, params).then(res => res.data)}
// GET 编辑书籍
export const reqEditBook = params => { return axios.get(`${base}/book/edit`, params).then(res => res.data)}
// GET 删除书籍
export const reqDelBook = params => { return axios.get(`${base}/book/del`, params).then(res => res.data)}
// GET 批量删除书籍
export const reqDelMoreBook = params => { return axios.get(`${base}/book/delMore`, params).then(res => res.data)}
