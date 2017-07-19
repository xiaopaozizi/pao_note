<template>
  <div class="grid" style="">
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-fresh" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowSelected="tableClk"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>

    <!--通知详情-->
    <el-dialog :modal="false" @close="detailDialogClosed" :close-on-click-modal="false"  :title="detailDialogData.title" v-model="detailDialogFormVisible" :size="detailDialogData.size">
      <div v-show="detailShow">
        <detail-form ref="noticeDetailForm" :getDataForm="getDataForm"></detail-form>
      </div>
      <div  v-show="!detailShow">
        <add-form  ref="noticeAddForm" :getDataForm="getDataForm" :dialogType="dialogType"></add-form>
      </div>
      <div slot="footer" v-show="editTable">
        <el-button @click="edit" v-show="detailShow">编辑</el-button>
        <el-button @click="save" v-show="!detailShow">保存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../../api/api'
  import Detail from './listDetails.vue'
  import edit from './addList.vue'
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
          title : '销账详情',
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
      'detail-form': Detail,
      'add-form': edit

    },
    methods: {
      test() {
        console.log(this.getDataForm);
      },
      //初始化
      initData(xdtList){
        this.createRowData(xdtList);
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            createDate: objTemp.createDate,
            createDateQuery: objTemp.createDateQuery,
            createUser: objTemp.createUser,
            modDate: objTemp.modDate,
            modUser: objTemp.modUser,
            money: objTemp. money,
            printCount: objTemp.printCount,
            receiptPaymentCode: objTemp.receiptPaymentCode,
            receiptPaymentId: objTemp.receiptPaymentId,
            receiptPaymentType: objTemp.receiptPaymentType,
            relSettleAccountsId: objTemp.relSettleAccountsId,
            remark: objTemp.remark,
            settleAccountsFullName: objTemp.settleAccountsFullName,
            settleAccountsShortName: objTemp.settleAccountsShortName
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
      onQuickFilterChanged(event) {
        this.gridOptions.api.setQuickFilter(event.target.value);
      },
      onCellClicked(event) {//选中哪一条 对应的数据显示
        console.log(event);
      },
      tableClk() {//获取表格选中的个数
        var selectedRows  = this.gridOptions.api.getSelectedRows();
        this.$emit("seletClk",selectedRows);
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
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
        api.noticeListShow(params)
          .then(function(res) {
            let data = res.data;
            self.initData(data)
          })
          .catch(function(err) {
            console.log(err.data);

          })
      },
      updateRow(row){
        console.log('22222222222222');
        console.log(row);
        console.log(row.chargeOffId);
       // var rowNode = this.gridOptions.api.getRowNode(row.chargeOffId);
      // rowNode.setData(row);
        var oldRows = this.gridOptions.api.getSelectedRows();
        oldRows[0].review = row.review;
        oldRows[0].reviewDate = row.reviewDate;
        //this.gridOptions.api.refreshRows(oldRows);
        this.gridOptions.api.refreshView();
       // console.log(oldRow);
        //this.rowData

       // this.gridOptions.api.updateRowData({update: oldRows});
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
/*  .grid {
    text-align: center;
  }*/
</style>




