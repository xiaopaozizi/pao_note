/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'

let base = '/api'



//export const reqUserList = params => { return this.$http.post(`/api/user/userList`, { params: params }) }
export const addUser = params => {
  //console.log(params);
  return axios.post(`/api/user/addUser`, { params: params })
}


