<template>
  <div class="grid" style="">
    <!--合计内容-->
    <el-row :gutter="20">
      <el-col :span="6">合计金额:{{selectNowData.money}}</el-col>
    </el-row>
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-fresh" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../../api/api';
  export default {
    props: ["tableData",'selectNowData','noticeShow'],
    name: "grid",
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
      'selectNowData.receiptPaymentId':function(val,oldVal) {
          console.log(val);
          this.getCostList(val);
      }
    },
    methods: {
      test() {
        this.getCostList();
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
            createDate:objTemp.createDate,
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
        let tableCol = this.defCol
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
          relReceiptPaymentId: item ,
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
        }
      };
      this.createColumnDefs();
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




