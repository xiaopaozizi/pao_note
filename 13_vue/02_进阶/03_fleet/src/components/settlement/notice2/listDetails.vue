<template>
  <div class="add-bill">
    <!--查询框-->
    <el-row>
      <el-col :span="6">
        <label>收付通知号</label>
        <span>{{getDataForm.receiptPaymentCode}}</span>
      </el-col>
      <el-col :span="6">
        <label>结算方简称</label>
        <span>{{getDataForm.settleAccountsShortName}}</span>
      </el-col>
      <el-col :span="6">
        <label>结算方全称</label>
        <span>{{getDataForm.settleAccountsFullName}}</span>
      </el-col>
      <el-col :span="6">
        <label>制单日期</label>
        <span>{{getDataForm.chargeOffDate}}</span>
      </el-col>
      <el-col :span="6">
        <label>账单号</label>
      </el-col>
    </el-row>
    <div></div>
    <!--合计内容-->
    <el-row :gutter="20">
      <el-col :span="6">合计金额:{{getDataForm.money}}</el-col>
    </el-row>
    <!--表格内容-->
    <bill-table :tableData="tableData" ref="child" :tableDataId="getDataForm.receiptPaymentId"></bill-table>
    <el-row>
      <el-col :span="6">
        <label>备注</label>
        <span>{{getDataForm.remark}}</span>
      </el-col>
    </el-row>
  </div>
  <!---->
</template>

<script>
  import NoticeTable from './listDetailTable.vue'
  export default {
    props:['getDataForm'],
    name: 'add-bill',
    components : {
      "bill-table": NoticeTable
    },
    data() {
      return {
        tableData : [
          {name: '单号', isChecked:true, record: "billCodes"},
          {name: '产生日期', isChecked:true, record: "createDate"},
          {name: "结算方简称", isChecked:true, record: "settleAccountsShortName"},
          {name: "结算方全称", isChecked:true, record: "settleAccountsFullName"},
          {name: "账单号", isChecked:true, record: "monthlyStatementNo"},
          {name: "费用状态", isChecked:true, record: "costStatus"},
          {name: "收付", isChecked:true,record: "costType"},
          {name: "费用名称", isChecked:true, record: "costName"},
          {name: "单价", isChecked:true, record: "unitPrice"},
          {name: "数量", isChecked:true, record: "number"},
          {name: "金额",isChecked:true, record: "money"},
          {name: "备注",isChecked:true, record: "remark"},
          {name: "业务类型",isChecked:true, record: ""},
          {name: "客户单号", isChecked:true, record: "customerCode"},
          {name: "箱型", isChecked:true, record: "teuType"},
          {name: "箱号", isChecked:true, record: "teuNo"},
          {name: "车牌号", isChecked:true, record: "plateNo"},
          {name: "装拆地",isChecked:true, record: "destination"},
        ],
        formInline: {
          user: '',
          region: '',
          date1: '',
          date2: '',
          desc: ''
        },
        editData: {name: "", id: 1, isChecked:false, checkBox:true, record: ""}


      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      editBill() {
        this.tableData.unshift(this.editData);
        this.$refs.child.test()
      },
      //时间戳转成时间
      unixChange() {
        let unixTimestamp = this.getDataForm.chargeOffDate;
        let  newDate = new Date();
        newDate.setTime(unixTimestamp * 1000);
        let  commonTime = newDate.toLocaleString();
        this.getDataForm.chargeOffDate = commonTime;
        console.log(unixTimestamp)
      }
    },
    mounted() {
      this.unixChange()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bill-list .icon-inline {
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    background-color: lightblue;
    margin-top: 5px;
  }
</style>



