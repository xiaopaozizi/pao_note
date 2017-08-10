/**
 * Created by 小炮子子 on 2017/7/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '@/api/tool'
import api from '@/api/api'

Vue.use(Vuex);
let tool = new Tool();

// 控制 ag-grid 表格列的显示和排序
let tableModule = {
  state : {
    // 箱单-----订单
    caseOrder : tool.getIte('caseOrder') ? tool.getIte('caseOrder') : [
      {name: "订单号", isChecked:true,record:'orderCode'},
      {name: "托运方",    isChecked:true,record: 'shipperInfo'},
      {name: "状态",isChecked:true, record:'orderStatus'},
      {name: "客户单号",    isChecked:true, record: 'customerCode'},
      {name: "装拆期限",     isChecked:true,record: 'expdateStr'},
      {name: "业务类型",  isChecked:true,record: 'busType'},
      {name: "提单号",  isChecked:true, record: 'billNumber'},
      {name: "船名航次",   isChecked:true, record: 'vesselVoyage'},
      {name: "截关日期",    isChecked:true,record: 'cyClosingDayStr'},
      {name: "来源",     isChecked:true, record: 'orderSource'},
      {name: "装拆地",     isChecked:false, record: 'destination'},
      {name: "提箱点",    isChecked:false,record: 'getClpPlace'},
      {name: "进箱点",    isChecked:false, record: 'downClpPlace'},
      {name: "船公司",    isChecked:false,record: 'shippingCompany'},
      {name: "部门",     isChecked:false,record: 'department'},
      {name: "业务员 ",     isChecked:false, record: "salesman"},
      {name: "箱型箱量",   isChecked:false, record: "teuTypeCount"},
      {name: "备注",    isChecked:false, record: "remark"},
    ],
    // 箱单----运单
    caseTransform : tool.getIte('caseTransform') ? tool.getIte('caseTransform') : [
//          {name: '', isChecked:true, record: "",checkBox:true,},
      {name: '运单号', isChecked:true, record: "tkBillCode",filterType: 'text'},
      {name: "运单状态", isChecked:true, record: "billStatus",filterType: 'text'},
      {name: "运单类型", isChecked:false,record: "billType",filterType: 'text'},
      {name: "装拆时间",isChecked:true, record: "destinationDateStr",filterType: 'text'},
      {name: "箱型", isChecked:false, record: "teuType",filterType: 'set'},
      {name: "箱号", isChecked:true, record: "teuNo",filterType: 'text'},
      {name: "铅封号", isChecked:true, record: "sealNo",filterType: 'text'},
      {name: "提箱点",isChecked:false, record: "getClpPlace",filterType: 'text'},
      {name: "进箱点",isChecked:false, record: "downClpPlace",filterType: 'text'},
      {name: "装拆地",isChecked:true, record: "destination",filterType: 'text'},
      {name: "是否需要白卡", isChecked:false, record: "needCcv",filterType: 'text'},
      {name: "监管点", isChecked:true, record: "ccPlace",filterType: 'text'},
      {name: "白卡号", isChecked:false, record: "ccvNo",filterType: 'text'},
      {name: "装拆点", isChecked:false, record: "destinationPoint",filterType: 'text'},
      {name: "计划重量",isChecked:false, record: "planWeight",filterType: 'text'},
      {name: "实际重量",isChecked:false, record: "realWeight",filterType: 'text'},
      {name: "托运方", isChecked:false, record: "sendBillInfo",filterType: 'text'},
      {name: "接运方",isChecked:false, record: "receiveBillInfo",filterType: 'text'},
      {name: "排单方式",isChecked:false, record: "doBillType",filterType: 'text'},
      {name: "车牌号",isChecked:false, record: "plateNo",filterType: 'text'},
      {name: "司机/手机",isChecked:false, record: "driverTep",filterType: 'text'}
    ],
  },
  getters : {

  },
  mutations : {

  }
}


/*
* 权限模块
* */
let powerModule = {
  state : {
    // 公司列表


  },
  getters : {

  },
  mutations : {
    // 获取公司列表

  },
  actions : {

  }
}



let router = new Vuex.Store({
  modules : {
    tableModule,
    powerModule
  }
})

export default router;
