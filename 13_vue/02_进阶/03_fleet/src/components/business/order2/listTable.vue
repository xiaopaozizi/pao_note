<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue" id="myGrid"
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
  import api from '@/api/api'
  export default {
    props: ["tableData",'getDataForm'],
    name: "grid",
    data() {
      return {
        gridOptions: {getRowNodeId: function(data) { return data.chargeOffId; }},
        columnDefs: [],
        rowData: null,
        defCol: this.tableData
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    methods: {
        test() {
          this.unixChange(1499788800000)
        },
      //时间戳转成时间
      unixChange(val) {
        let unixTimestamp =val;
        let  newDate = new Date(unixTimestamp);
        let  commonTime = newDate.toLocaleString();
        return commonTime
      },
       getLocalTime(nS) {
         return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ')
       },
  //初始化
      initData(xdtList){
        console.log('开始初始化数据=============')
        console.log(xdtList);
       // this.gridOptions.api.setRowData(xdtList);//将数据插入到表格里面
//      this.createRowData(xdtList);
        this.rowData = xdtList
      },
      createRowData(xdtList) {//生成表格数据函数
        let  self = this;
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
          billNumber: objTemp.billNumber,
          busType: objTemp.busType,
          createDate: self.getLocalTime(objTemp.createDate),
          createUser: objTemp.createUser,
          customerCode: objTemp.customerCode,
          cyClosingDay: objTemp.cyClosingDay,
          department: objTemp.department,
          destination: objTemp.destination,
          downClpPlace: objTemp.downClpPlace,
          expdate: objTemp.expdate,
          expdateQuery: objTemp.expdateQuery,
          getClpPlace: objTemp.getClpPlace,
          markType: objTemp.markType,
          orderCode: objTemp.orderCode,
          orderSource: objTemp.orderSource,
          orderStatus: objTemp.orderStatus,
          receiveOrderId: objTemp.receiveOrderId,
          receiveOrderInfo: objTemp.receiveOrderInfo,
          remark: objTemp.remark,
          salesman: objTemp.salesman,
          shipperId: objTemp.shipperId,
          shipperInfo: objTemp.shipperInfo,
          shippingCompany: objTemp.shippingCompany,
          teuTypeCount: objTemp.teuTypeCount,
          vesselVoyage: objTemp.vesselVoyage,
          xdOrderId: objTemp.xdOrderId,
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
      getRowData(state) {
        let self = this;
        let params = {
          orderStatus: state
        };
        api.orderStatus(params)
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
        }
      };
      this.createColumnDefs();
    },
    mounted() {
      this.getRowData();
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

