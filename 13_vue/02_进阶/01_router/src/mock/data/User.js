/**
 * Created by 小炮子子 on 2017/7/14.
 */


import Mock from 'mockjs'

const LoginUsers = [
  {
    id : 1,
    username : 'xiaopaozizi',
    password : '123456',
    email : 'scryc@qq.com',
    nickname : '小炮子子'
  }
]

/*const userList = Mock.mock({
  "userList|100": [
    {
      "id|+1" : 1,
      "name" : Mock.Random.cname(),
      "sex|1-2" : true,
      "age|18-60" : 60,
      "birth" : Mock.Random.date(),
      "address" : Mock.Random.county(true)
    }
  ]
})*/
let userList = [];
for( let i = 0; i < 100; i++ ) {
  userList.push(Mock.mock({
    "id" : Mock.Random.guid(),
    "name" : Mock.Random.cname(),
    "sex|1-2" : true,
    "age|18-60" : 1,
    "birth" : Mock.Random.date(),
    "address" : Mock.Random.county(true)
  }))
}


export { LoginUsers, userList }
