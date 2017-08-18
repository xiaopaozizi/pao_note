<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 :rowDataChanged="rowDataChanged"
                 :floatingFilter="true"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api';
  export default {
    props: ["selectRowData"],
    name: "grid",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [
          {name: '单号', isChecked:true, record: "billCodes",filterText: 'text'},
          {name: '产生日期', isChecked:true, record: "createDate",filterText: 'text'},
          {name: "结算方简称", isChecked:true, record: "settleAccountsShortName",filterText: 'text'},
          {name: "结算方全称", isChecked:true, record: "settleAccountsFullName",filterText: 'text'},
          {name: "账单号", isChecked:true, record: "monthlyStatementNo",filterText: 'text'},
          {name: "费用状态", isChecked:true, record: "costStatus",filterText: 'text'},
          {name: "收付", isChecked:true,record: "costType",filterText: 'text'},
          {name: "费用名称", isChecked:true, record: "costName",filterText: 'text'},
          {name: "类别", isChecked:true, record: "costName",filterText: 'text'},
          {name: "单价", isChecked:true, record: "unitPrice",filterText: 'text'},
          {name: "数量", isChecked:true, record: "number",filterText: 'text'},
          {name: "金额",isChecked:true, record: "money",filterText: 'text'},
          {name: "备注",isChecked:true, record: "remark",filterText: 'text'},
          {name: "业务类型",isChecked:true, record: "",filterText: 'text'},
          {name: "客户单号", isChecked:true, record: "specsModel",filterText: 'text'},
          {name: "箱型", isChecked:true, record: "teuType",filterText: 'text'},
          {name: "实际重量", isChecked:true, record: "realWeigh",filterText: 'text'},
          {name: "箱号", isChecked:true, record: "teuNo",filterText: 'text'},
          {name: "车牌号", isChecked:true, record: "plateNo",filterText: 'text'},
          {name: "装拆地",isChecked:true, record: "destination",filterText: 'text'},
          {name: "通知号",isChecked:true, record: "receiptPaymentNo",filterText: 'text'},
          {name: "销账号",isChecked:true, record: "chargeOffNo",filterText: 'text'},
        ]
      }
    },
    components: {
      "ag-grid-vue": AgGridVue
    },
    watch: {
      "selectRowData.receiptPaymentId" :function (val,oldVal)  {
        this.getCostList(val);
      }
    },
    methods: {
      //转日期+时间的格式
      formatDateTime(date) {
        if(date === '') {
          return date;
        }else {
          let  start = new Date(date);
          let y = start.getFullYear();
          let m = start.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          var d = start.getDate();
          d = d < 10 ? ('0' + d) : d;
          let  h = start.getHours();
          h = h < 10 ? '0' + h : h;
          let  z =  start.getMinutes();
          z = z < 10 ? '0' + z : z;
          let  s =  start.getSeconds();
          s = s < 10 ? '0' + s : s;
          return y + '-' + m + '-' + d + ' ' + h +':'+ z +':' + s;
        }

      },
      //改变表格自适应
      rowDataChanged() {
        let self = this;
        if(this.rowData != null && this.rowData.length > 0){
          console.log('我已经加载完');
          setTimeout(function(){
            self.autoColumns();
          },100)

        }
      },
      autoColumns() {
        var allColumnIds = [];
        this.columnDefs.forEach( function(columnDef) {
          allColumnIds.push(columnDef.field);
        });
        this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
      },
      //获取行样式
      rowStyle() {
        this.gridOptions.getRowStyle = function(params){
          if(params.data.unitPrice < 0) {

            return {color:'red'}
          } else if( params.data.unitPrice > 0 ) {
            return {color:'blue'}
          }
        };
      },
      //初始化
      initData(xdtList){
        this.createRowData(xdtList);
        this.rowStyle();
      },
      createRowData(xdtList) {//生成表格数据函数
        let self= this;
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            billCodes:objTemp.billCodes,
            billType:objTemp.billType,
            chargeOffDate:objTemp.chargeOffDate,
            chargeOffNo:objTemp.chargeOffNo,
            costItemId:objTemp.costItemId,
            costName:objTemp.costName,
            costSource:objTemp.costSource,
            costStatus:objTemp.costStatus,
            costType:objTemp.costType,
            createDate: self. formatDateTime(objTemp.createDate),
            createDateQuery:objTemp.createDateQuery,
            createUser:objTemp.createUser,
            customerCode:objTemp.customerCode,
            destination:objTemp.destination,
            money:objTemp.money,
            monthlyStatementDate:objTemp.monthlyStatementDate,
            monthlyStatementNo:objTemp.monthlyStatementNo,
            number:objTemp.number,
            plateNo:objTemp.plateNo,
            receiptPaymentDate:objTemp.receiptPaymentDate,
            receiptPaymentCode:objTemp.receiptPaymentCode,
            receiptPaymentType:objTemp.receiptPaymentType,
            receiptPaymentNo:objTemp.receiptPaymentNo,
            receiptPaymentId:objTemp.receiptPaymentId,
            relBillId:objTemp.relBillId,
            relChargeOffId:objTemp.relChargeOffId,
            relMonthlyStatementId:objTemp.relMonthlyStatementId,
            relReceiptPaymentId:objTemp.relReceiptPaymentId,
            relSettleAccountsId:objTemp.relSettleAccountsId,
            remark:objTemp.remark,
            settleAccountsFullName:objTemp.settleAccountsFullName,
            settleAccountsShortName:objTemp.settleAccountsShortName,
            specsModel:objTemp.specsModel,
            teuNo:objTemp.teuNo,
            teuType:objTemp.teuType,
            unitPrice:objTemp.unitPrice,
          })
        }
        this.rowData = rowData;
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
          this.columnDefs.push(
            {
              headerName: tableCol[i].name,
              field: tableCol[i].record,
              suppressMenu: false,
              suppressFilter: false,
              checkboxSelection: tableCol[i].checkBox,
              headerCheckboxSelection: tableCol[i].checkBox
            }
          )
        }
      },
      //获取查询费用列表
      getCostList(item) {
        let self = this;
        let params = {
          relReceiptPaymentId: item
        };

        api.zdTableList(params)
          .then(function(res) {
            console.log(res);
            self.initData(res)
          })
          .catch(function(err) {

          })
      },
    },
    beforeMount() {
      this.gridOptions = {
        context: {
          componentParent: this
        },
        localeText: {
          page: '页',
          more: '更多',
          to: '到',
          of: '总共',
          next: '下一页',
          last: '最后一页',
          first: '第一页',
          previous: '上一页',
          loadingOoo: '正在加载....',
          noRowsToShow: '没有找到您想要的数据...',
          // for number filter
          contains: '包含',
          notContains: '不包含',
          startsWith:'开始',
          endsWith: '结束',
          equals: '等于',
          notEqual: '不等于',
          lessThan: '小于',
          greaterThan: '大于',
          filterOoo: '请输入您要过滤的内容',
        }
      };
      this.createColumnDefs();
    },
    mounted() {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




