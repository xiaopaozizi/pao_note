/**
 * Created by 小炮子子 on 2017/7/14.
 */

// 引入axios和axios-mock-adapter

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers, userList} from './data/User'



export default {
  init(){
    // 配置
    let mock = new MockAdapter(axios);

    // 登录
    mock.onPost('/login').reply(arg => {
      // 获取请求数据
      // 登录用户名和密码
      let {username, password} = JSON.parse(arg.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          // 判读在登录列表中，是否包括当前要登录的用户
          let hasUser = LoginUsers.some(u => {
            if ( u.username === username && u.password === password ) {
              user = JSON.parse(JSON.stringify(u));
              // 删除密码，防止泄露
              delete user.password;
              return true;
            } else {
              return false;
            }
          })
          // 如果存在该用户，则登录
          if(hasUser){
            resolve([200, { code : 200, msg : '登录成功', user}]);
          } else {
            resolve([200, { code : 500, msg : '用户名或密码错误'}])
          }
        }, 1000)
      })
    })

    // 获取用户列表
    mock.onPost('/userList').reply(arg => {
      let { username } = JSON.parse(arg.data);
      //console.log(username);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { data : userList }]);
        }, 500)
      })
    })
  }
}
