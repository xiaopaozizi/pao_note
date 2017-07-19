<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-fresh" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowSelected="tableClk"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowDoubleClicked="onRowDoubleClicked"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../../api/api';
  export default {
    props: ["tableData",'getDataForm'],
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
    },watch: {
      'getDataForm.monthlyStatementId':function(val,oldVal) {
          this.getCostList();
      }
    },
    methods: {
      test() {
        this.gridOptions.api.refreshHeader();
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
      clearRowData(){
        this.rowData.splice(0,this.rowData.length);
      },
      //获取查询费用列表
      getCostList() {
        let self = this;
        let params = {
          relMonthlyStatementId: this.getDataForm.monthlyStatementId,
        };
        api.zdTableList(params)
          .then(function(res) {
            console.log(res);
            self.initData(res);
          })
          .catch(function(err) {
            console.log(err);
          })
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
      onQuickFilterChanged(event) {
        this.gridOptions.api.setQuickFilter(event.target.value);
      },
      onCellClicked(event) {//选中哪一条 对应的数据显示
        console.log(event);
      },
      tableClk() {//获取表格选中的个数
        var rowCount = this.gridOptions.api.getSelectedNodes();
        var selectedRows  = this.gridOptions.api.getSelectedRows();
        this.$emit("seletClk",selectedRows);
      console.log(selectedRows);
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
      },
      //让表格的checkbox隐藏
      checkBoxHide() {
        console.log(this.deColTitle);

        this.deColTitle[0].isChecked = true;
        this.gridOptions.api.refreshHeader()

      },
      //让其默认选中
      selectPaymentNo(item) {
        console.log('我是默认的函数');
        this.gridOptions.api.forEachNode( function (node) {
          if (node.data.relMonthlyStatementId === item) {
            node.setSelected(true);
          }
        });
      },
      //双击事件
      onRowDoubleClicked(event) {
        this.$emit("changeDialog",event.data);
        console.log(event.data);
      },
      //将新行设置到网格中
      onGetSetRow(rows) {
        //增加表格数据
        console.log('我是rows');
        console.log( this.rowData);
        let  newStore = this.rowData.slice();
        for(let i=0; i<rows.length; i++) {
          newStore.push(rows[i]);
        }
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里
        this.selectPaymentNo(this.getDataForm.monthlyStatementId);
      },
      //将插入的的表格数据变为空
      onClearRows() {
        let self = this;
        this.gridOptions.api.forEachNode( function (node) {
          if(node.selected === false) {
            console.log(node);

          self.gridOptions.api.removeItems(node.data);
//            this.gridOptions.api.refreshView()
          }
        });
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid {
    text-align: center;
  }
</style>




