<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowClicked="tableClk"
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
  export default {
    props: ["tableData",'getDataForm'],
    name: "grid",
    data() {
      return {
        gridOptions: {getRowNodeId: function(data) { return data.chargeOffId; }},
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
    },
    methods: {
      test() {
        this.getRowData();
      },
      //初始化
      initData(xdtList){
        console.log('开始初始化数据=============')
        console.log(xdtList);
        this.createRowData(xdtList);
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
          accountFullName: objTemp.accountFullName,
          accountInfoId:objTemp.accountInfoId,
          accountNo:objTemp.accountNo,
          accountShortName:objTemp.accountShortName,
          accountType:objTemp.accountType,
          bankAddress:objTemp.bankAddress,
          bankFullName:objTemp.bankFullName,
          bankShortName:objTemp.bankShortName,
          bankTel:objTemp.bankTel,
          companyInfo:objTemp.companyInfo,
          contact:objTemp.contact,
          createDate:objTemp.createDate,
          createUser:objTemp.createUser,
          relCompanyInfoId:objTemp.relCompanyInfoId,
          remark:objTemp.remark,
          status:objTemp.status,
          telphone:objTemp.telphone
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
      onCellClicked(event) {//选中哪一条 对应的数据显示
        console.log(event);
      },
      tableClk(item) {//获取表格选中的个数
        var rowCount = this.gridOptions.api.getSelectedNodes();
        var selectedRows  = this.gridOptions.api.getSelectedRows();
        var selectData = item.node.data;
        this.$emit("seletClk",selectData);
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
      },
      //双击事件
      onRowDoubleClicked(event) {
        this.detailDialogFormVisible = !this.detailDialogFormVisible;
        let params = event.data;
        if(params.review == '2-已审核'){
          this.editTable = false;
        }else {
          this.editTable = true;
        }
        console.log(params);
        this.getDataForm = params;
      },
      detailDialogClosed() {
        this.detailShow = true;
      },
      //获取表格数据并且初始化
      getRowData() {
        let self = this;
        api.accountListShow()
          .then(function(res) {
            console.log(res);
            self.initData(res);
          })
          .catch(function(err) {
            console.log(err);

          })
      },
      updateRow(row){
        console.log('22222222222222');
        console.log(row);
        console.log(row.chargeOffId);
       // var rowNode = this.gridOptions.api.getRowNode(row.chargeOffId);
      // rowNode.setData(row);
        var oldRows = this.gridOptions.api.getSelectedRows();
        oldRows[0].review = row.review;
        oldRows[0].reviewDate = row.reviewDate;
        //this.gridOptions.api.refreshRows(oldRows);
        this.gridOptions.api.refreshView();
       // console.log(oldRow);
        //this.rowData

       // this.gridOptions.api.updateRowData({update: oldRows});
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
      this.gridOptions.api.sizeColumnsToFit();
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




