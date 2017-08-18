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
                 :floatingFilter="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapState } from 'vuex'
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  import Tool from '@/api/tool'
  export default {
    props: ['getDataForm'],
    name: "grid",
    data() {
      return {
        gridOptions: {getRowNodeId: function(data) { return data.chargeOffId; }},
        columnDefs: [],
        rowData: null,
        defCol: [],
        freshFlag:false,
        total: null,
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
      //转日期格式
      getDate(strDate) {
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
            function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
        return date;
      },
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
          return y + '-' + m + '-' + d;
        }

      },
      //转日期+时间的格式
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
        let  self = this;
        const rowData = [];
       rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
          billNumber: objTemp.billNumber,
          busType: objTemp.busType,
          createDateStr: self.formatDateTime(objTemp.createDateStr),
          createUser: objTemp.createUser,
          customerCode: objTemp.customerCode,
          cyClosingDayStr: self.formatDate(objTemp.cyClosingDayStr),
          department: objTemp.department,
          destination: objTemp.destination,
          downClpPlace: objTemp.downClpPlace,
          expdateStr: self.formatDate(objTemp.expdateStr),
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
       // console.log(3333,this.defCol);
        let that = this;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < this.defCol.length; i++){
          if(this.defCol[i].isChecked) {
            this.columnDefs.push(
              {
                headerName: that.defCol[i].name,
                field: that.defCol[i].record,
                filter:that.defCol[i].filterText,
                suppressFilter: false,
                checkboxSelection: that.defCol[i].checkBox,
                headerCheckboxSelection: that.defCol[i].checkBox
              }
            )
          }

        }
      },
      onCellClicked(event) {//选中哪一条 对应的数据显示

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
            self.total = res.length;
            self.initData(res);

          })
          .catch(function(err) {


          })
      },
      updateRow(row){
        var oldRows = this.gridOptions.api.getSelectedRows();
        for(let showJson in row) {
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
        var newStore = this.rowData.slice();
        newStore.unshift(objTemp);
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里
      },

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
    },
    mounted() {
      let tool = new Tool();
      this.defCol = tool.getIte('caseOrder').bigHeader;
      this.getRowData();
      this.gridOptions.api.sizeColumnsToFit();
/*    :rowDataChanged="rowDataChanged"*/
     this.createColumnDefs();
    },
    watch:{
      '$route' : function () {
           this.getRowData();
           console.log(this.$route.params.id);
      }
    },
    destroyed(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*  .grid {
      text-align: center;
    }*/
</style>

