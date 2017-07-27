<template>
  <div class="fee">
    <el-row :gutter="20">
      <el-col :span="6">应收合计: {{yShou}}</el-col>
      <el-col :span="6">应付合计: {{yFu}}</el-col>
      <el-col :span="6">合计金额:{{yShou + yFu }}</el-col>
    </el-row>
    <el-table
      :data="showFeeData"
      size="small"
      border
      style="width: 100%">
      <el-table-column
        prop="billCodes"
        label="运单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="settleAccountsShortName"
        label="结算方简称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="costName"
        label="费用名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="单价"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="箱封号"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    props:['selectData','activeName'],
    name: 'fee',
    components : {

    },
    data () {
      return {
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
            self.showFeeData = res;
            console.log(self.showFeeData);
            self.selectClick(res);
          })
          .catch(function(err) {
            console.log(err);
          })
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





