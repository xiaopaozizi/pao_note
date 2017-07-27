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
                 rowSelection="multiple"
                 :rowDoubleClicked="onRowDoubleClicked"
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
      "ag-grid-vue": AgGridVue

    },
    methods: {
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
            account: objTemp.account,
            chargeOffDateStr: objTemp.chargeOffDateStr,
            chargeOffId: objTemp.chargeOffId,
            chargeOffNo: objTemp.chargeOffNo,
            chargeOffType: objTemp.chargeOffType,
            chargeOffUser: objTemp.chargeOffUser,
            createDateQuery: objTemp.createDateQuery,
            money: objTemp.money,
            realDateStr: objTemp.realDateStr,
            receiptPaymentType: objTemp.receiptPaymentType,
            relSettleAccountsId: objTemp.relSettleAccountsId,
            remark: objTemp.remark,
            review: objTemp.review,
            reviewDateStr: objTemp.reviewDateStr,
            reviewUser: objTemp.reviewUser,
            settleAccountsFullName: objTemp.settleAccountsFullName,
            settleAccountsShortName: objTemp.settleAccountsShortName,
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
      clickRowHandle(item) {
        console.log('我是点击函数');
        this.$emit("seletClk", item.data);
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

    /*    let  unixTimestamp = new Date(Unix timestamp * 1000);
        let  commonTime = unixTimestamp.toLocaleString();*/
        this.getDataForm = params;
      },

      //编辑
      edit() {
        this.detailShow = !this.detailShow;
        let params = this.getDataForm;
        this.$refs.noticeAddForm.initSearchForm(params);
      },
      save() {
        this.$refs.noticeAddForm.addSave();
      },
      detailDialogClosed() {
        this.detailShow = true;
      },
      //获取表格数据并且初始化
      getRowData(params) {
        let self = this;
        api.xzListShow(params)
          .then(function(res) {
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
        //this.gridOptions.api.refreshRows(oldRows);
        this.gridOptions.api.refreshView();
       // console.log(oldRow);
        //this.rowData

       // this.gridOptions.api.updateRowData({update: oldRows});
      },
      //获取行样式
      rowStyle() {
        this.gridOptions.getRowStyle = function(params){
          if(  !params.data.chargeOffNo ) {
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




