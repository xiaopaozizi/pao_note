<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-fresh" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowClicked="clickRowHandle"
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
  import api from '../../../api/api'
  import edit from './addList.vue'
  export default {
    props: ["tableData",'getDataForm'],
    name: "grid",
    data() {
      return {
        gridOptions: {

        },
        columnDefs: [],
        rowData: null,
        defCol: this.tableData,
        //通知详情
        detailDialogFormVisible: false,
        detailDialogData: {
          title : '账单详情',
          size : 'full'
        },
        dialogType:'edit',
       //刚开始显示详情页面
        detailShow:true,
        editTable:true,
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
      'add-form': edit

    },
    methods: {
      test() {
        console.log(this.getDataForm);
      },
      //初始化
      initData(xdtList){
        this.createRowData(xdtList);
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            billMoney:objTemp.billMoney,
            billRemark:objTemp.billRemark,
            createDate:objTemp.createDate,
            createDateQuery:objTemp.createDateQuery,
            createUser:objTemp.createUser,
            modDate:objTemp.modDate,
            modUser:objTemp.modUser,
            monthlyStatementId:objTemp.monthlyStatementId,
            monthlyStatementNo:objTemp.monthlyStatementNo,
            paymentCount:objTemp.paymentCount,
            paymentMoney:objTemp.paymentMoney,
            receiptCount:objTemp.receiptCount,
            receiptMoney:objTemp.receiptMoney,
            receiptPaymentType:objTemp.receiptPaymentType,
            relSettleAccountsId:objTemp.relSettleAccountsId,
            relMonthlyStatementId:objTemp.relMonthlyStatementId,
            settleAccountsFullName:objTemp.settleAccountsFullName,
            settleAccountsShortName:objTemp.settleAccountsShortName,
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
      clickRowHandle(item) {
        console.log('我是点击函数');
        this.$emit("seletClk", item.data);
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
      },
      //获取表格数据并且初始化
      getRowData(params) {
        let self = this;
        api.zdListShow(params)
          .then(function(res) {
            console.log(res);
            let  data  = res.data;
            self.initData(data)
          })
          .catch(function(err) {
            console.log(err);

          })
      },
      updateRow(row){
        console.log('22222222222222');
        console.log(row);
        var oldRows = this.gridOptions.api.getSelectedRows();
        oldRows[0].review = row.review;
        oldRows[0].reviewDate = row.reviewDate;
        this.gridOptions.api.refreshView();
      }


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
    },
    destroyed(){
      console.log("destroyed" + new Date());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*  .grid {
    text-align: center;
  }*/
</style>




