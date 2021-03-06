import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 30000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = '/api';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  //_.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
/*  if(!res.data.success){
     //_.toast(res.data.msg);
    return Promise.reject(res);
  }*/
  return res;
}, (error) => {
  //_.toast("网络异常", 'fail');
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}


export default {
  /*
  * c查询模块接口
  * */
  //订单号的模糊查询
  getXdIdSearch(item) {
    return fetch('/xdorder/getsearchlist', { searchStr:item })
  },
  //客户简称模糊查询接口
  getShipperInfoSearch(params) {
    return fetch('/customerbaseinfo/getlistforsearch', params)
  },
  //托运方模糊查询接口
  customerSearch(item) {
   // return fetch('customerbaseinfo/getcustlistforsearch',{ searchStr:item })
    return new Promise((resolve, reject) => {
      axios.post('customerbaseinfo/getcustlistforsearch', { searchStr:item })
        .then(response => {
          let newData = response.data.data;
         // console.log(newData);
          //return;
          var resultData = [];
          for(var objTemp of newData) {
            //console.log(objTemp);
            resultData.push(
              {"key": objTemp.customerBaseId, "value": objTemp.custShortName}
            );
          }
          //console.log(resultData);
         // return;
          resolve(resultData);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //接运方模糊查询
  jieYunSearch(item) {
    return fetch('/customerbaseinfo/getfleetlistforsearch',{ searchStr:item})
  },

  //托运方联系人电话查询接口
  getShipperInfoContactSearch(params) {
    return fetch('customerbaseinfo/getshipperinfoforsearch', params)
  },
  //船名航次模糊搜索接口
  getVesselVoyageSearch(item) {
    return fetch('/vesselvoyageinfo/getvvilistforsearch', {searchStr:item})
  },
  //装拆地模糊查询
  getDestinationSearch(item) {
    return fetch('/destinationinfo/getdestinationlistforsearch', {searchStr:item})
  },
  //提箱点模糊查询和进箱点的模糊查询
  getClpPlaceSearch(item,val) {
    return fetch('/getdownclppoint/getpointlistforsearch', {searchStr:item,type:val})
  },
  //车牌号的模糊搜索
  getPlateNoSearch(item) {
    return fetch('/truckbaseinfo/getlistforsearch', {searchStr:item})
  },
  //司机手机模糊查询
  getDriverTelphoneSearch(item) {
    return fetch('/driverinfo/getlistforsearch', {searchStr:item})
  },
  //装拆点的模糊查询
  getDestinationPointSearch(item) {
    return fetch('/destinationpoint/getlistforsearch', {searchStr:item})
  },
  //业务类型下拉框 所有下拉接口的地方
  selectBusTypeHandle(item) {
    return fetch('/comdic/getcomdiclist', {dicType:item})
  },
  //船公司下拉接口
  getShippingCompanySearch(item,val) {
    return fetch('/comdic/getcomdiclistforsearch', {searchStr:item,type:val})
  },
  /*
  * 订单新增模块接口
  * */
  addBaseInfo(params) {
    return fetch('/xdorder/add', params)
  },
  //状态接口
  orderStatus(params) {
    return fetch('/xdorder/getlistall',params)
  },
  //订单修改状态接口
  xdOrderStateChange(id, state) {
    return fetch('/xdorder/modforstatus',{xdOrderId:id, orderStatus:state})
  },
  //订单编辑接口
  xdOrderEdit(params) {
    return fetch('/xdorder/mod',params)
  },
  //订单获取应收费用接口
  xdOrderCost(item) {
    return fetch('/costitem/getlistbyorderid',{relOrderId:item})
  },


/*
* 运单接口模块
* */
  //运单ID查询
  ydIdSearch(item) {
    return fetch('xdtkbill/getxdtkfullbill',{xdTkBillId:item})
  },
  //运单号查询
  ydNumSearch(item) {
    return fetch('/xdtkbill/getsearchlist',{searchStr:item})
  },
  //运单的新增
  tkAddSubmit(params) {
    return fetch('/xdtkbill/add', params)
  },
  //运单的编辑
  tkEditSubmit(params) {
    return fetch('/xdtkbill/mod', params)
  },
  //托卡的编辑保存
  tkEditCarSubmit(params) {
    return fetch('/sendtruck/settruck', params)
  },
  //托卡的删除
  tkDelSubmit(item) {
    return fetch('/xdtkbill/del', {xdTkBillId:item})
  },
  //运单的列表展示
  tkGetOrderList(params) {
    return fetch('/xdtkbill/getlist', params)
  },
  //运单查询列表的展示
  tkOrderQueryList(params) {
    return fetch('/xdtkbill/getlistall', params)
  },
  //运单修改状态接口
  tkOrderStateChange(id, state) {
    return fetch('/xdtkbill/modforstatus', {xdTkBillId:id, billStatus:state})
  },

/*箱单接口*/
  xdTableList(params) {
    return fetch('/xdorder/getlistall', params)
  },
  /*
   * 费用接口模块
   * */
  //费用名称模糊搜索
  getCostsForSearch(item,val) {
    return fetch('/costs/getcostsforsearch',{searchStr:item,type:val})
  },
  //费用新增接口
  costAdd(params) {
    return fetch('/costitem/add',params)
  },
  //费用列表接口
  costList(params) {
    return fetch('costitem/getlistall',params)
  },
  //费用编辑接口
  costEdit(params) {
    return fetch('costitem/mod',params)
  },
  //费用删除接口
  costDel(params) {
    return fetch('costitem/del',params)
  },
  /*
  * 结算接口
  * */
  //结算查询接口
  zdTableList(params) {
    return fetch('costitem/getlistforms',params)
  },
  //结算账单新增保存接口
  zdAddSave(params) {
    return fetch('monthlystatementinfo/addmonthlystatement',params)
  },
  //结算账单列表显示
  zdListShow(params) {
    return fetch('monthlystatementinfo/getlistforquery',params)
  },
  //账单号查询
  zdNumSearch(item) {
    return fetch('monthlystatementinfo/getsearchlist',{ searchStr:item })
  },
  //收付通知接口
  noticeListShow(params) {
    return fetch('receiptpaymentinfo/getlistforquery',params)
  },
  noticeAddSave(params) {
    return fetch('receiptpaymentinfo/addreceiptpayment',params)
  },
  //收付通知号模糊查询
  noticeNumberSearch(item) {
    return fetch('receiptpaymentinfo/getsearchlist',{ searchStr:item })
  },

  //销账号的搜索接口
  xzNumberSearch(item) {
    return fetch('chargeoffinfo/getsearchlist',{ searchStr:item })
  },
  //销账添加接口
  xzAddSave(params) {
    return fetch('chargeoffinfo/addchargeoff',params)
  },
  //销账列表显示接口
  xzListShow(params) {
    return fetch('chargeoffinfo/getlistforquery',params)
  },
  //销账的审核
  xzSh(item) {
    return fetch('chargeoffinfo/modforreview',{ chargeOffId:item })

  },
  //账户添加
  accountAdd(params) {
    return fetch('accountinfo/add',params)
  },
  //账户列表展示
  accountListShow(params) {
    return fetch('accountinfo/getlist',params)
  },
  //账户列表编辑
  accountEdit(params) {
    return fetch('accountinfo/mod',params)
  },
  //账户删除
  accountDel(params) {
    return fetch('accountinfo/del',params)
  },

  /*
  * 后勤管理模块
  *
  * */
  //客户新增接口
  customerAdd(params) {
    return fetch('customerbaseinfo/add',params)
  },
  //客户列表接口
  customerListShow(params) {
    return fetch('customerbaseinfo/getlist',params)
  },
  //客户编辑接口
  customerEdit(params) {
    return fetch('customerbaseinfo/mod',params)
  },
  //客户删除接口
  customerDel(params) {
    return fetch('customerbaseinfo/del',params)
  },
  //司机新增接口
  driverAdd(params) {
    return fetch('driverinfo/add',params)
  },
  //司机编辑接口
  driverEdit(params) {
    return fetch('driverinfo/mod',params)
  },
  //司机删除接口
  driverDel(params) {
    return fetch('driverinfo/del',params)
  },
  //司机列表展示
  driverListShow(params) {
    return fetch('driverinfo/getlist',params)
  },
  //绑定车牌新增接口
  driverBindNoAdd(params) {
    return fetch('driverinfo/addforbind',params)
  },
  //绑定车牌号接口
  driverBindNo(item) {
    return fetch('truckbaseinfo/getlistforbind',{ searchStr:item })
  },
  //取消绑定车牌
  driverCancelPlateNo(params) {
    return fetch('driverinfo/modfornotbind',params)
  },
  //车辆综合列表
  carAllListShow(params) {
    return fetch('truckbaseinfo/getlistforpage',params)
  },
  //车头列表显示
  carHeaderListShow(params) {
    return fetch('truckbaseinfo/getlist',params)
  },
  //车头的新增
  carHeaderAdd(params){
    return fetch('truckbaseinfo/add',params)
  },
  //车头号删除
  carHeaderDel(params){
    return fetch('truckbaseinfo/del',params)
  },
  //车头的编辑
  carHeaderMod(params) {
    return fetch('truckbaseinfo/mod',params)
  },
//客户端承运车队接口
    fleetCarSearch(item) {
         return fetch('customerbaseinfo/getfleetlistforsearch',{ searchStr:item })
    },
  //车头关联车队接口
    fleetRelSelect(item) {
      return fetch('customerbaseinfo/getlist',{ custType:item })
    },

  //挂车显示列表接口
    guaCarListShow(params) {
      return fetch('trailerinfo/getlist',params)
    },
  //查询挂车号接口
  guaCarSearchList(item) {
    return fetch('trailerinfo/getlistforbind',{ searchStr:item })
  },
  //绑定挂车接口
  bindGuaCar(params) {
    return fetch('truckbaseinfo/addbindtrailer',params)
  },

  //解绑
   cancelGuaCar(params) {
     return fetch('truckbaseinfo/modnotbindtrailer',params)
   },

  //挂车新增接口
   guaCarAdd(params) {
     return fetch('/trailerinfo/add',params)
   },
//挂车编辑接口
  guaCarEdit(params) {
    return fetch('/trailerinfo/mod',params)
  },
  //挂车删除接口
  guaCarDel(params) {
    return fetch('/trailerinfo/del',params)
  },


  //联系人列表接口
  contactList(params) {
    return fetch('contactinfo/getlist',params)
  },
  //联系人新增接口
  contactAdd(params) {
    return fetch('contactinfo/add',params)
  },
  //联系人编辑接口
  contactEdit(params) {
    return fetch('contactinfo/mod',params)
  },
  //联系人删除接口
  contactDel(params) {
    return fetch('contactinfo/del',params)
  },
  //联系人默认首选接口
  contactSelect(params) {
    return fetch('contactinfo/modfordefault',params)
  },

  //装拆点列表接口
  destinationPointList(params) {
    return fetch('destinationpoint/getlist',params)
  },
  //装拆点新增接口
  destinationPointAdd(params) {
    return fetch('destinationpoint/add',params)
  },
  //装拆点编辑接口
  destinationPointEdit(params) {
    return fetch('destinationpoint/mod',params)
  },
  //装拆点删除接口
  destinationPointDel(params) {
    return fetch('destinationpoint/del',params)
  },


  // 获取公司，部门，员工三级树节点
  getPowerTree(parmas){
    return fetch('syscompanyinfo/getlistfortree',parmas)
  },


  // 公司列表信息
  powerCompanyList(parmas){
    return fetch('syscompanyinfo/getlist',parmas)
  },
  // 通过id查询单条公司信息
  powerOneCompany(parmas){
    return fetch('syscompanyinfo/getcompanyinfo',parmas)
  },
  // 添加公司
  powerCompanyAdd(parmas){
    return fetch('syscompanyinfo/add',parmas)
  },
  // 编辑公司
  powerCompanyMod(parmas){
    return fetch('syscompanyinfo/mod',parmas)
  },
  // 删除公司
  powerCompanyDel(parmas){
    return fetch('syscompanyinfo/del',parmas)
  },



  // 根据公司id获取部门
  powerDepartmentList(parmas){
    return fetch('sysdepartmentinfo/getlist',parmas)
  },
  // 通过id查询单条部门信息
  powerOneDepartment(parmas){
    return fetch('sysdepartmentinfo/getdepartmentinfo',parmas)
  },
  // 添加部门
  powerDepartmentAdd(parmas){
    return fetch('sysdepartmentinfo/add',parmas)
  },
  // 编辑部门
  powerDepartmentMod(parmas){
    return fetch('sysdepartmentinfo/mod',parmas)
  },
  // 删除部门
  powerDepartmentDel(parmas){
    return fetch('sysdepartmentinfo/del',parmas)
  },





// 根据部门id获取员工
  powerStaffList(parmas){
    return fetch('sysstaffinfo/getlist',parmas)
  },
  // 通过id查询员工信息
  powerOneStaff(parmas){
    return fetch('sysstaffinfo/getstaffinfo',parmas)
  },
  // 添加员工
  powerStaffAdd(parmas){
    return fetch('sysstaffinfo/add',parmas)
  },
  // 编辑员工
  powerStaffMod(parmas){
    return fetch('sysstaffinfo/mod',parmas)
  },
  // 删除员工
  powerStaffDel(parmas){
    return fetch('sysstaffinfo/del',parmas)
  },



  // 角色列表
  powerRoleList(parmas){
    return fetch('sysroleinfo/getlist',parmas)
  },


  // 权限列表
  powerPowerList(parmas){
    return fetch('syspowerinfo/getlist',parmas)
  },

  // 通过角色和公司relRoleId，relCompanyId获取权限列表
  getPowerListByIds(parmas){
    return fetch('sysrolepowerrel/getpowertree',parmas)
  },

  // 编辑保存角色的权限配置
  editRolePower(parmas){
    return fetch('sysrolepowerrel/addbatch',parmas)
  },


  // 根据staff的uuid获取角色列表
  getRoleListByStaffId(parmas){
    return fetch('sysrolestaffrel/getrolesbystaffid',parmas)
  },

  // 根据staff的uuid获取权限列表
  getPowerListByStaffId(parmas){
    return fetch('sysstaffinfo/getpowerbystaffid',parmas)
  },


  // 为员工赋予职责
  giveRoleToStaff(parmas){
    return fetch('sysrolestaffrel/addforbatch',parmas)
  },


  // 用户登录
  userLogin(parmas){
    return fetch('login',parmas)
  },


}

