<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :pagination="true"
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
  import api from '../../api/api'
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
      //初始化
      initData(xdtList){
        console.log('开始初始化数据=============')
        console.log(xdtList);
        this.gridOptions.api.setRowData(xdtList);//将数据插入到表格里面
     //   this.createRowData(xdtList);
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            account: objTemp.account,
            accountNo: objTemp.accountNo,
            allowDriveType: objTemp.allowDriveType,
            bank: objTemp.bank,
            bankAddr: objTemp.bankAddr,
            bindingTruckNo: objTemp.bindingTruckNo,
            contactAddr: objTemp.contactAddr,
            createDate: objTemp.createDate,
            createUser: objTemp.createUser,
            driverHeadPic: objTemp.driverHeadPic,
            driverId: objTemp.driverId,
            driverLicenseEnd: objTemp.driverLicenseEnd,
            driverLicenseStart: objTemp.driverLicenseStart,
            driverName: objTemp.driverName,
            familyTel: objTemp.familyTel,
            fleet: objTemp.fleet,
            idAddr: objTemp.idAddr,
            idCard: objTemp.idCard,
            medicalCheck: objTemp.medicalCheck,
            medicalCheckDate: objTemp.medicalCheckDate,
            nextReturnDue: objTemp.nextReturnDue,
            relFleetId: objTemp.relFleetId,
            remark: objTemp.remark,
            status: objTemp.status,
            telephone1: objTemp.telephone1,
            telephone2: objTemp.telephone2,
            usualAddr: objTemp.usualAddr,
            workNo: objTemp.workNo,
            workNoEnd: objTemp.workNoEnd,
            workNoStart: objTemp.workNoStart
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
        api.driverListShow()
          .then(function(res) {
            self.initData(res)
          })
          .catch(function(err) {
            console.log(err);

          })
      },
      updateRow(row){
        console.log('我是表格单条数据');
        var oldRows = this.gridOptions.api.getSelectedRows();
        for(let showJson in row) {
          console.log(row[showJson]);
          oldRows[0][showJson] = row[showJson];
        }
        this.gridOptions.api.refreshView();
      },
      //数据刷新
      refreshView() {
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.gridOptions.api.refreshView();
      },
      //增加表格数据
      addNewRow(objTemp){
        console.log('我是rowData');
        console.log(this.rowData);
        var newStore = this.rowData.slice();
        newStore.unshift(objTemp);
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里
      },
      test() {
        this.gridOptions.getRowStyle = function(){
          return {textAlign:'center'}
        }
      },
      setRowData(allOfTheData) {
        var dataSource = {
          rowCount: null, // behave as infinite scroll
          getRows(params) {
            api.driverListShow()
              .then(function(res) {
                allOfTheData =  res;
              })
              .catch(function(err) {
                console.log(err);


              })
            setTimeout( function() {
              // take a slice of the total rows
              var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
              // if on or after the last page, work out the last row.
              var lastRow = -1;
              if (allOfTheData.length <= params.endRow) {
                lastRow = allOfTheData.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500)
          }
        };

        this.gridOptions.api.setDatasource(dataSource);
      }


    },
    beforeMount() {
      this.gridOptions = {
        context: {
          componentParent: this
        },
        rowModelType: 'infinite',
        paginationPageSize: 100,
        cacheOverflowSize: 2,
        maxConcurrentDatasourceRequests: 2,
        infiniteInitialRowCount: 1,
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
        }
      };
      this.createColumnDefs();
    },
    mounted() {
     this.gridOptions.api.sizeColumnsToFit();
      this.test()

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




