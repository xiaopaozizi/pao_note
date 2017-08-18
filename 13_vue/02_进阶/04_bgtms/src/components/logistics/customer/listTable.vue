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
                 :floatingFilter="true"
                 :rowData="rowData"
                 >
    </ag-grid-vue>
    <div>
      总条数: {{totals}} 条
    </div>


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
        gridOptions: {

/*          pagination: true,
          paginationPageSize: 100,
          cacheOverflowSize: 2,
          maxConcurrentDatasourceRequests: 2,
          infiniteInitialRowCount: 100,
          maxBlocksInCache: 2,
         paginationOverflowSize:50,
          paginationInitialRowCount:50,
          cacheBlockSize:50,*/
    /*      getRowNodeId: function(item) {
          return item.id+1;
        }*/},
        columnDefs: [],
        rowData:null,
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
        //记录总数
        totals:'',
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    methods: {
      rowDataChanged() {
        let self = this;
        if(this.rowData != null && this.rowData.length > 0){
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
      test() {
        this.getRowData();
      },
      //初始化
      //改变表格自适应
      initData(xdtList){
        console.log('开始初始化数据=============')
        console.log(xdtList);
      //  this.setRowData(xdtList);
        xdtList.forEach( function(data, index) {
          data.id =  (index + 1);
        });
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
        };
//      this.columnDefs[0].valueGetter= "node.id";
        console.log(this.columnDefs);
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
            console.log(res);
            //self.setRowData(res);
            self.totals = res.length;
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
        this.getRowData();
      },
      //滚动分页
      setRowData(allOfTheData) {
        allOfTheData.forEach( function(data, index) {
          data.id =  (index + 1);
        });
        console.log('第一步');
        console.log(allOfTheData);
        var dataSource = {
          rowCount: null, // behave as infinite scroll,
          getRows: function (params) {
            console.log('asking for ' + params.startRow + ' to ' + params.endRow);
            console.log(params);
            // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
            // To make the demo look real, wait for 500ms before returning
            setTimeout( function() {
              // take a slice of the total rows
              var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
              console.log(rowsThisPage);
              // make a copy of each row - this is what would happen if taking data from server
              for (var i = 0; i<rowsThisPage.length; i++) {
                var item = rowsThisPage[i];
                // this is a trick to copy an object
                var itemCopy = JSON.parse(JSON.stringify(item));
                rowsThisPage[i] = itemCopy;
              }
              // if on or after the last page, work out the last row.
              var lastRow = -1;
              if (allOfTheData.length <= params.endRow) {
                lastRow = allOfTheData.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          }
        };
        console.log(dataSource);
        this.gridOptions.api.setDatasource(dataSource);
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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 /* .grid {
    text-align: center;
  }*/
</style>




