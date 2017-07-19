<template>
  <div class="zo-list" style="">
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-fresh" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :pagination="true"
                 :enableColResize="true"
                 :rowClicked="tableClk"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
    <el-tabs v-model="activeName">
      <el-tab-pane label="车辆信息" name="车辆信息">车辆信息</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../../api/api'
  export default {
    name: "zo-list",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [
          {name: "车辆助记码",  isChecked:true, record: "waybillNum"},
          {name: "车头号/挂车号",  isChecked:false, record: ""},
          {name: "进港证号", isChecked:false, record: "state"},
          {name: "厂牌型号", isChecked:false, record: "orderType"},
          {name: "燃料类型", isChecked:false, record: "boxquantity"},
          {name: "马力",  isChecked:false, record: "waybillNum"},
          {name: "自重",  isChecked:false, record: "shipper"},
          {name: "轴数",  isChecked:false, record: "currency"},
          {name: "备注",  isChecked:false, record: "carnum"},
          {name: "季审到期日期",  isChecked:false, record: "driver"},
          {name: "年审到期日期",  isChecked:false, record: "driver"}
        ],  //
        /*=======*/
        activeName: '车辆信息'


      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    methods: {
      //初始化
      initData(list){
        console.log('开始初始化数据=============');
        this.gridOptions.api.setRowData(list);//将数据插入到表格里面
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
          this.columnDefs.push(
            {
              headerName: tableCol[i].name, //表头的名字
              field: tableCol[i].record,
              suppressMenu: false,
              suppressFilter: false,
              checkboxSelection: tableCol[i].checkBox,
              headerCheckboxSelection: tableCol[i].checkBox
            }
          )
        }
      },
      tableClk(item) {//获取表格选中的个数
        var rowCount = this.gridOptions.api.getSelectedNodes(); //获取表格的节点数
        var selectedRows  = this.gridOptions.api.getSelectedRows(); //获取选中的列表 数据
        var selectData = item.node.data; //获取data数据
        this.$emit("seletClk",selectData); //将之传给父级
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
      },
      //双击事件
      onRowDoubleClicked(event) {

      },
      //获取表格数据并且初始化
      getRowData() {
        let self = this;
        let params = {
          page:1,
          rows: 500
      }
  /*      api.carAllListShow(params)
          .then(function() {})
          .catch(function(err) {
            console.log(err);
            self.initData(err.data)
          })*/
      },
      //跟新列表数据
      updateRow(row){
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
