/**
 * Created by 小炮子子 on 2017/7/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '@/api/tool'

Vue.use(Vuex);
let tool = new Tool();

// 控制 ag-grid 表格列的显示和排序
let tableModule = {
  state : {
    // 箱单-----订单
    caseOrder : tool.getIte('caseOrder') ? tool.getIte('caseOrder') : {
      'bigHeader' : [
        {name: "订单号", isChecked:true,record:'orderCode',filterText: 'text'},
        {name: "托运方",    isChecked:true,record: 'shipperInfo',filterText: 'text'},
        {name: "状态",isChecked:true, record:'orderStatus',filterText: 'text'},
        {name: "客户单号",    isChecked:true, record: 'customerCode',filterText: 'text'},
        {name: "装拆期限",     isChecked:true,record: 'expdateStr',filterText: 'text'},
        {name: "业务类型",  isChecked:true,record: 'busType',filterText: 'text'},
        {name: "提单号",  isChecked:true, record: 'billNumber',filterText: 'text'},
        {name: "船名航次",   isChecked:true, record: 'vesselVoyage',filterText: 'text'},
        {name: "截关日期",    isChecked:true,record: 'cyClosingDayStr',filterText: 'text'},
        {name: "来源",     isChecked:true, record: 'orderSource',filterText: 'text'},
        {name: "装拆地",     isChecked:false, record: 'destination',filterText: 'text'},
        {name: "提箱点",    isChecked:false,record: 'getClpPlace',filterText: 'text'},
        {name: "进箱点",    isChecked:false, record: 'downClpPlace',filterText: 'text'},
        {name: "船公司",    isChecked:false,record: 'shippingCompany',filterText: 'text'},
        {name: "部门",     isChecked:false,record: 'department',filterText: 'text'},
        {name: "业务员 ",     isChecked:false, record: "salesman",filterText: 'text'},
        {name: "箱型箱量",   isChecked:false, record: "teuTypeCount",filterText: 'text'},
        {name: "备注",    isChecked:false, record: "remark",filterText: 'text'},
      ],
      'littleHeader' : [
        {name: '', isChecked:true, record: "",checkBox:true},
        {name: '运单号', isChecked:true, record: "tkBillCode",filterType: 'text'},
        {name: "运单状态", isChecked:true, record: "billStatus",filterType: 'text'},
        {name: "运单类型", isChecked:true,record: "billType",filterType: 'text'},
        {name: "箱型", isChecked:true, record: "teuType",filterType: 'text'},
        {name: "箱号", isChecked:true, record: "teuNo",filterType: 'text'},
        {name: "封号", isChecked:true, record: "sealNo",filterType: 'text'},
        {name: "提箱点",isChecked:true, record: "getClpPlace",filterType: 'text'},
        {name: "进箱点",isChecked:true, record: "downClpPlace",filterType: 'text'},
        {name: "装拆地",isChecked:true, record: "destination",filterType: 'text'},
        {name: "是否需要白卡", isChecked:true, record: "needCcv",filterType: 'text'},
        {name: "监管点", isChecked:true, record: "ccPlace",filterType: 'text'},
        {name: "白卡号", isChecked:true, record: "ccvNo",filterType: 'text'},
        {name: "装拆点", isChecked:true, record: "destinationPoint",filterType: 'text'},
        {name: "装拆时间",isChecked:true, record: "destinationDateStr",filterType: 'text'},
        {name: "计划重量(KG)",isChecked:true, record: "planWeight",filterType: 'text'},
        {name: "实际重量(KG)",isChecked:true, record: "realWeight",filterType: 'text'},
        {name: "托运方", isChecked:true, record: "sendBillInfo",filterType: 'text'},
        {name: "接运方",isChecked:true, record: "receiveBillInfo",filterType: 'text'},
        {name: "排单方式",isChecked:true, record: "doBillType",filterType: 'text'},
        {name: "车牌号",isChecked:true, record: "plateNo",filterType: 'text'},
        {name: "司机/手机",isChecked:true, record: "driverTep",filterType: 'text'},
        {name: "备注",isChecked:true, record: "remark",filterType: 'text'}
      ]
    },
    // 箱单----运单
    caseTransform : tool.getIte('caseTransform') ? tool.getIte('caseTransform') : {
      'bigHeader': [
//          {name: '', isChecked:true, record: "",checkBox:true,},
        {name: '订单号', isChecked:true, record: "relXdOrderCode",filterType: 'text'},
        {name: '运单号', isChecked:true, record: "tkBillCode",filterType: 'text'},
        {name: "运单状态", isChecked:true, record: "billStatus",filterType: 'text'},
        {name: "运单类型", isChecked:false,record: "billType",filterType: 'text'},
        {name: "装拆时间",isChecked:true, record: "expdateStr",filterType: 'text'},
        {name: "箱型", isChecked:false, record: "teuType",filterType: 'set'},
        {name: "箱号", isChecked:true, record: "teuNo",filterType: 'text'},
        {name: "封号", isChecked:true, record: "sealNo",filterType: 'text'},
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
    // 箱单-----预提
    caseWithHolding : tool.getIte('caseWithHolding') ? tool.getIte('caseWithHolding') : {
      'bigHeader' : [
        {name: '运单号', isChecked:true, record: "tkBillCode",filterType: 'text'},
        {name: "状态", isChecked:true, record: "billStatus",filterType: 'text'},
        {name: "排车类型", isChecked:false,record: "billType",filterType: 'text'},
        {name: "预提方",isChecked:false, record: "receiveBillInfo",filterType: 'text'},
        {name: "箱型", isChecked:false, record: "teuType",filterType: 'set'},
        {name: "车牌号",isChecked:false, record: "plateNo",filterType: 'text'},
        {name: "司机/手机",isChecked:false, record: "driverTep",filterType: 'text'},
        {name: "提箱点",isChecked:false, record: "getClpPlace",filterType: 'text'},
        {name: "落箱点",isChecked:false, record: "downClpPlace",filterType: 'text'},
        {name: "箱号", isChecked:true, record: "teuNo",filterType: 'text'},
        {name: "封号", isChecked:true, record: "sealNo",filterType: 'text'},
        {name: "提箱时间",isChecked:true, record: "destination",filterType: 'text'},
        {name: "备注", isChecked:false, record: "remark",filterType: 'text'}
      ]
    },
    //箱单 -----运单排车
    //caseArrangeCar: tool.getIte('caseArrangeCar') ? tool.getIte('caseArrangeCar') : ,
  },
  getters : {

  },
  mutations : {

  }
};

let router = new Vuex.Store({
  modules : {
    tableModule
  }
})

export default router;
