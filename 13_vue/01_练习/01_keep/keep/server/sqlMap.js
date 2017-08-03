/**
 * Created by 小炮子子 on 2017/8/3.
 */
// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into user(id, name, age) values (0, ?, ?)'
  }
}
module.exports = sqlMap;
