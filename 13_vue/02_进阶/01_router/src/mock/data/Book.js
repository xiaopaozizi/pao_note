/**
 * Created by 小炮子子 on 2017/7/14.
 */


import Mock from 'mockjs'



let bookList = [];
for( let i = 0; i < 50; i++ ) {
  bookList.push(Mock.mock({
    id : Mock.Random.guid(),
    name : Mock.Random.ctitle(5, 10),
    desc : Mock.Random.csentence(180, 500),
    author: Mock.Random.cname(),
    date: Mock.Random.datetime(),
  }))
}

export {  bookList }
