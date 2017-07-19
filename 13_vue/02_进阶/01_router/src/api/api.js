/**
 * Created by 小炮子子 on 2017/7/14.
 */

import Vue from 'vue'
import axios from 'axios'
// // 创建基本的axios配置
var http = axios.create({

});
// 挂载到vue的原型
Vue.prototype.$http = http;
// 基本路径
let base = '';
// 发送请求
// POST 登录请求
export const requestLogin = params => { return this.$http.post(`${base}/login`, params).then(res => res.data)}
// POST 获取用户信息
export const reqUserList = params => { return this.$http.post(`${base}/user/list`, params).then(res => res.data)}
// GET 获取书籍列表
export const reqBookList = params => { return this.$http.get(`${base}/book/list`, params).then(res => res.data)}
// GET 添加书籍
export const reqAddBook = params => { return this.$http.get(`${base}/book/add`, params).then(res => res.data)}
// GET 编辑书籍
export const reqEditBook = params => { return this.$http.get(`${base}/book/edit`, params).then(res => res.data)}
// GET 删除书籍
export const reqDelBook = params => { return this.$http.get(`${base}/book/del`, params).then(res => res.data)}
// GET 批量删除书籍
export const reqDelMoreBook = params => { return this.$http.get(`${base}/book/delMore`, params).then(res => res.data)}


let base2 =  '/api';
// 司机管理
// POST 获取司机列表
export const reqDriverList = params => { return this.$http.get(`${base2}/driver/getList`, params).then(res => res.data)}

