<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowClicked="clickRowHandle"
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
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  import edit from './addList.vue'
  export default {
    props: ["tableData",'getDataForm'],
    name: "grid",
    data() {
      return {
        gridOptions: {

        },
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
      'add-form': edit

    },
    methods: {
      //转日期格式
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
      test() {
        console.log(this.getDataForm);
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
      //初始化
      initData(xdtList){
        this.createRowData(xdtList);
        this.rowStyle();
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            billMoney:objTemp.billMoney,
            billRemark:objTemp.billRemark,
            createDateStr:objTemp.createDateStr,
            createDateQuery:objTemp.createDateQuery,
            createUser:objTemp.createUser,
            modDateStr:objTemp.modDateStr,
            modUser:objTemp.modUser,
            monthlyStatementId:objTemp.monthlyStatementId,
            monthlyStatementNo:objTemp.monthlyStatementNo,
            paymentCount:objTemp.paymentCount,
            paymentMoney:objTemp.paymentMoney,
            receiptCount:objTemp.receiptCount,
            receiptMoney:objTemp.receiptMoney,
            receiptPaymentType:objTemp.receiptPaymentType,
            relSettleAccountsId:objTemp.relSettleAccountsId,
            relMonthlyStatementId:objTemp.relMonthlyStatementId,
            settleAccountsFullName:objTemp.settleAccountsFullName,
            settleAccountsShortName:objTemp.settleAccountsShortName,
          })
        }
        this.rowData = rowData;
      },
      createColumnDefs() {//生成表格表头
        let self = this;
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
           if( tableCol[i].isChecked) {
             self.columnDefs.push(
               {
                 headerName: tableCol[i].name,
                 field: tableCol[i].record,
                 suppressMenu: false,
                 filter:tableCol[i].filterText,
                 suppressFilter: false,
                 checkboxSelection: tableCol[i].checkBox,
                 headerCheckboxSelection: tableCol[i].checkBox
               }
             )
           }

        }
      },
      clickRowHandle(item) {
        console.log('我是点击函数');
        this.$emit("seletClk", item.data);
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
      },
      //获取表格数据并且初始化
      getRowData(params) {
        let self = this;
        api.zdListShow(params)
          .then(function(res) {
            console.log('我是初始化表格数据');
            console.log(res);
            let  data  = res.data;
            self.initData(data)
          })
          .catch(function(err) {
            console.log(err);

          })
      },
      updateRow(row){
        console.log('22222222222222');
        console.log(row);
        var oldRows = this.gridOptions.api.getSelectedRows();
        oldRows[0].review = row.review;
        oldRows[0].reviewDate = row.reviewDate;
        this.gridOptions.api.refreshView();
      },
      //获取行样式
      rowStyle() {
        this.gridOptions.getRowStyle = function(params){
          if(  !params.data.monthlyStatementNo ) {
            return {color:'red'}
          } else{
            return {color:'blue'}
          }
        };
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




