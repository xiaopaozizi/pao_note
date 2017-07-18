/**
 * Created by 小炮子子 on 2017/7/14.
 */

// 引入axios和axios-mock-adapter

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers, userList} from './data/User'
import { bookList} from './data/Book'
let _userList = userList;
let _bookList = bookList;


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
    mock.onPost('/user/list').reply(arg => {
      let { username } = JSON.parse(arg.data);
      // 通过username进行过滤筛选
      // 如果username不为空
      if(username && username !== ''){
        _userList = _userList.filter((u)=>{
          if(u.name.indexOf(username) > -1){
            return true;
          }
          return false;
        })
      } else {
        _userList = userList;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { data : _userList }]);
        }, 2000)
      })
    })

    // 获取图书列表
    mock.onGet('/book/list').reply(config => {
      let { bookname, pageNo, pageSize } = config;
      // 通过bookname进行过滤筛选
      // 如果bookname不为空
      if(bookname && bookname !== ''){
        _bookList = bookList.filter((b)=>{
          if(b.name.indexOf(bookname) > -1){
            return true;
          }
          return false;
        })
      } else {
        _bookList = bookList;
      }
      //console.log(_bookList);
      // 获取总条数
      let total = _bookList.length;
      // 分页
      _bookList = _bookList.filter((item, index) => index < pageNo * pageSize && index >= (pageNo - 1) * pageSize)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { book : _bookList, total }]);
        }, 500)
      })

    })

    // 添加书籍
    mock.onGet('/book/add').reply(config => {
      let { book } = config;
      _bookList.push(book);

      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, { bookList : _bookList}])
        }, 500)
      })
    })


    // 编辑书籍
    mock.onGet('/book/edit').reply(config => {
      let { book } = config;
      _bookList.some(item => {
        if(item.id === book.id){
          item.name = book.name;
          item.author = book.author;
          item.date = book.date;
          item.desc = book.desc;
          return true;
        }
      })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, { code : 200, msg : '编辑成功'}])
        }, 500)
      })
    })

    // 删除书籍
    mock.onGet('/book/del').reply(config => {
      let { id } = config;
      _bookList.forEach((b, index) => {
        if ( b.id === id ) {
          // 删除掉
          _bookList.splice(index, 1);
          return;
        }
      })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, { code : 200, msg : '删除成功', book : _bookList}])
        }, 500)
      })
    })
    // 批量删除书籍
    mock.onGet('/book/delMore').reply(config => {
      let { ids } = config;
      ids = ids.split(',');
      //console.log(_bookList.length);
      _bookList = _bookList.filter(item => !ids.includes(item.id))
      console.log(_bookList.length);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([200, { code : 200, msg : '批量删除成功', book : _bookList}])
        }, 500)
      })
    })



  }
}
