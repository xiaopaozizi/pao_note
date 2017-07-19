<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-fresh" id="myGrid"
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
            createDate : objTemp.createDate,
            createUser:objTemp.createUser,
            custFullName:objTemp.custFullName,
            custMemCode:objTemp.custMemCode,
            custShortName: objTemp.custShortName,
            custType: objTemp.custType,
            customerBaseId: objTemp.customerBaseId,
            customerSales: objTemp.customerSales,
            email: objTemp.email,
            mobilephone: objTemp.mobilephone,
            officeAddr: objTemp.officeAddr,
            principal: objTemp.principal,
            remark: objTemp.remark,
            settleAccountsShortName: objTemp.settleAccountsShortName,
            status: objTemp.status,
            telephone: objTemp.telephone
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
        api.customerListShow()
          .then(function(res) {
            self.initData(res);
          })
          .catch(function(err) {
            console.log('获取客户数据')
            console.log(err);

          })
      },
      updateRow(row){
         console.log('我是表格单条数据');
         console.log(row);
        var oldRows = this.gridOptions.api.getSelectedRows();
        oldRows[0].custFullName = row.custFullName;
        oldRows[0].custMemCode = row.custMemCode;
        oldRows[0].custShortName = row.custShortName;
        oldRows[0].custType = row.custType;
        oldRows[0].customerBaseId = row.customerBaseId;
        oldRows[0].customerSales = row.customerSales;
        oldRows[0].email = row.email;
        oldRows[0].mobilephone = row.mobilephone;
        oldRows[0].officeAddr = row.officeAddr;
        oldRows[0].principal = row.principal;
        oldRows[0].remark = row.remark;
        oldRows[0].settleAccountsShortName = row.settleAccountsShortName;
        oldRows[0].status = row.status;
        oldRows[0].telephone = row.telephone;
        this.gridOptions.api.refreshView();
      },
      //数据刷新
      refreshView() {
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
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
 /* .grid {
    text-align: center;
  }*/
</style>




