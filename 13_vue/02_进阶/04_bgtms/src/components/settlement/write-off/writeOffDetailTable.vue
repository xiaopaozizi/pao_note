<template>
  <div class="grid-write" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowDataChanged="rowDataChanged"
                 :rowData="rowData">
    </ag-grid-vue>
<!--    <el-row>
      <el-col :span="6">
        <label>销账类型</label>
        <span>{{selectNowData.chargeOffType}}</span>
      </el-col>
      <el-col :span="6">
        <label>关联账户</label>
        <span>{{selectNowData.account}}</span>

      </el-col>
      <el-col :span="6">
        <label>销账日期</label>
        <span>{{selectNowData.realDate}}</span>
      </el-col>
      <el-col :span="6">
        <label>备注</label>
        <span>{{selectNowData.remark}}</span>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../../api/api';
  export default {
    props: ["tableData",'tableDataId','selectNowData'],
    name: "grid-write",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: this.tableData
      }
    },
    components: {
      "ag-grid-vue": AgGridVue
    },
    watch: {
      'selectNowData.chargeOffId':function(val,oldVal) {
          this.getCostList(val);
      }
    },
    methods: {
      test() {
        this.getCostList();
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
      //初始化
      initData(xdtList){
        this.gridOptions.api.setRowData([]);
        this.createRowData(xdtList);
      },
      createRowData(xdtList) {//生成表格数据函数
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
            createDateStr:objTemp.createDateStr,
            createDateQuery:objTemp.createDateQuery,
            createUser:objTemp.createUser,
            customerCode:objTemp.customerCode,
            destination:objTemp.destination,
            money:objTemp.money,
            monthlyStatementDateStr:objTemp.monthlyStatementDateStr,
            monthlyStatementNo:objTemp.monthlyStatementNo,
            number:objTemp.number,
            plateNo:objTemp.plateNo,
            receiptPaymentDateStr:objTemp.receiptPaymentDateStr,
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
      getCostList(val) {
        let self = this;
        let params = {
          relChargeOffId: val ,
        };
        console.log(params);
        api.zdTableList(params)
          .then(function(res) {
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
  .grid {
    text-align: center;
  }
</style>




