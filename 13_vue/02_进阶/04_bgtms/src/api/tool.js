/**
 * Created by 小炮子子 on 2017/7/26.
 */


class Tool {

  getIte(key) {
    if(localStorage.getItem(key)){
      return JSON.parse(localStorage.getItem(key)); // 取数据 => 如果本地有key 则执行，没有则引用data的数据
    }
    return false;
  }
  setIte(key, sub, value) {
    let res = JSON.parse(localStorage.getItem(key)) || {};
    res[sub] = value;
    localStorage.setItem(key, JSON.stringify(res)); //存数据 =>
  }
}


export default Tool;
