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
  setIte(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); //存数据 =>
  }
  // 时间戳----->日期
  formatDateTime(timeStamp) {
    var date = new Date(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  };
}


export default Tool;
