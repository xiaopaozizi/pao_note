<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
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
                 :rowDataChanged="rowDataChanged"
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
            chargeOffDateStr:objTemp.chargeOffDateStr,
            chargeOffNo:objTemp.chargeOffNo,
            costItemId:objTemp.costItemId,
            costName:objTemp.costName,
            costSource:objTemp.costSource,
            costStatus:objTemp.costStatus,
            costType:objTemp.costType,
            createDateStr: objTemp.createDateStr,
            createDateQuery:objTemp.createDateQuery,
            createUser:objTemp.createUser,
            customerCode:objTemp.customerCode,
            destination:objTemp.destination,
            money:objTemp.money,
            monthlyStatementDate:objTemp.monthlyStatementDate,
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
            console.log('我是新增的表格');
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
        this.gridOptions.api.sizeColumnsToFit();
        this.rowDataChanged();
        this.autoColumns();
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
      console.log('我 加载了没？？？');
      this.gridOptions.api.sizeColumnsToFit();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




