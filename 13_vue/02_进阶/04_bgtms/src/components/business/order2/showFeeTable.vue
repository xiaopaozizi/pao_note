<template>
  <div class="fee">
    <el-row :gutter="20">
      <el-col :span="6">应收合计: {{yShou}}</el-col>
      <el-col :span="6">应付合计: {{yFu}}</el-col>
      <el-col :span="6">合计金额:{{yShou + yFu }}</el-col>
    </el-row>
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  export default {
    props:['selectData','activeName'],
    name: 'fee',
    components : {
      'ag-grid-vue': AgGridVue
    },
    data () {
      return {
        gridOptions: null,
        columnDefs : [],
        rowData:[],
        selectNowData:null,
        showFeeData:[],
        //应收、应付合计
        yShou:null,
        yFu: null,
      }
    },
    watch : {
      'selectData.xdOrderId':function() {
        let self = this;
        if(this.activeName == '费用信息') {
          console.log('我是费用ID');
          console.log(self.selectData.xdOrderId);
          self.test(self.selectData.xdOrderId);
        }

      }
    },
    computed: {
      sum() {
         return '2222'
      }
    },
    methods: {
      test(val){
        let self = this;
        api.xdOrderCost(val)
          .then(function(res) {
            console.log(res);
            self.createRowData(res);
            console.log(self.showFeeData);
            self.selectClick(res);
          })
          .catch(function(err) {
            console.log(err);
          })
      },
      //创建表格数据
      createRowData(xdtList) {
//             this.gridOptions.api.setRowData(xdtList);
        this.rowData = xdtList ;
        this.gridOptions.api.sizeColumnsToFit();
      },
      //创建表格头部数据
      createColumnDefs() {
        return [
          {
            headerName: "运单号",
            field: "billCodes",
          },
          {
            headerName: "结算方简称",
            field: "settleAccountsShortName",
          },
          {
            headerName: "费用名称",
            field: "costName"
          },
          {
            headerName: "类别",
            field: "specsModel",
          },
          {
            headerName: "单价",
            field: "unitPrice"
          },
          {
            headerName: "数量",
            field: "number"
          },
          {
            headerName: "金额",
            field: "money"
          },
          {
            headerName: "箱型",
            field: "teuType",
          },
          {
            headerName: "箱号",
            field: "teuNo"
          },
          {
            headerName: "封号",
            field: "sealNo"
          },
          {
            headerName: "装拆地",
            field: "destination",
          },
          {
            headerName: "实际重量",
            field: "realWeight",
          },
          {
            headerName: "备注",
            field: "remark",
          },
        ]
      },


      //费用统计
      selectClick(item){
        let self = this;
        let yingShou = [];
        self.yShou = 0;
        self.yFu = 0;
        item.forEach(function(selectedRow, index) {
          yingShou.push(selectedRow.money);
          if(selectedRow.costType == '应收'){
            self.yShou += yingShou[index];
          }else if(selectedRow.costType == '应付') {
            self.yFu += yingShou[index];
          }
        });
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
        }
      };
      this.columnDefs = this.createColumnDefs();
    },
    mounted() {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }




</script>
<style>
  .fee{
    font-style:normal;
  }
  #pao-sort-row .pao-nav {
    margin:20px;
    height : 36px;
  }
  #pao-sort-row .pao-nav button {
    float : right;
    margin-left:10px;
  }

</style>





