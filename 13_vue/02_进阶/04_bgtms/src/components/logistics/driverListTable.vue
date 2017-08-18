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
                 :rowData="rowData">
    </ag-grid-vue>
    <div>
      总条数: {{totals}} 条
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../api/api'
  var allOfTheData = [];
  var sequenceId = 1;
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
        //记录总数
        totals:'',
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    methods: {
      //转日期+时间的格式
      formatDate(date) {
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
        console.log('开始初始化数据=============')
        console.log(xdtList);
       // this.rowData = xdtList;
        this.createRowData(xdtList);
      },
      createRowData(xdtList) {//生成表格数据函数
        let self = this;
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
            createDateStr: objTemp.createDateStr,
            createUser: objTemp.createUser,
            driverHeadPic: objTemp.driverHeadPic,
            driverId: objTemp.driverId,
            driverLicenseEndStr: objTemp.driverLicenseEndStr,
            driverLicenseStartStr: objTemp.driverLicenseStartStr,
            driverName: objTemp.driverName,
            familyTel: objTemp.familyTel,
            fleet: objTemp.fleet,
            idAddr: objTemp.idAddr,
            idCard: objTemp.idCard,
            medicalCheck: objTemp.medicalCheck,
            medicalCheckDateStr: objTemp.medicalCheckDateStr,
            nextReturnDueStr: objTemp.nextReturnDueStr,
            relFleetId: objTemp.relFleetId,
            remark: objTemp.remark,
            status: objTemp.status,
            telephone1: objTemp.telephone1,
            telephone2: objTemp.telephone2,
            usualAddr: objTemp.usualAddr,
            workNo: objTemp.workNo,
            workNoEndStr: objTemp.workNoEndStr,
            workNoStartStr: objTemp.workNoStartStr
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
//              suppressMenu: false,
              filter:'text',
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
            self.totals = res.length;
/*            self.setRowData(res);*/
            self.initData(res);
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
      //判断是否被选中
      selectRow() {
        var oldRows = this.gridOptions.api.getSelectedRows();
        this.$emit('selectNow',oldRows);
      },
      //数据刷新
      refreshView() {
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.getRowData();
      },
      //增加表格数据
      addNewRow(objTemp){
        console.log('我是rowData');
        this.getRowData();
//        this.rowData.unshift(objTemp);
/*        var newStore = this.rowData.slice();
        newStore.unshift(objTemp);
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里*/
      },
//
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
      },

      test() {
        this.gridOptions.getRowStyle = function(){
          return {textAlign:'center'}
        }
      }
    },
    beforeMount() {
      this.gridOptions = {
        context: {
          componentParent: this
        },
 /*       rowModelType: 'infinite',
        cacheOverflowSize: 2,
        maxConcurrentDatasourceRequests: 2,
        infiniteInitialRowCount: 1,*/
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




