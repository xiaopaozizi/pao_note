<template>
  <div class="fee">
    <el-row>
      <el-col :span="4">
          <span>应收合计: {{sum}}</span>
      </el-col>
      <el-col :span="4">
          <span>应付合计: {{sum}}</span>
      </el-col>
      <el-col :span="4">
          <span>利润合计: {{sum}}</span>
      </el-col>
    </el-row>
    <el-table
      :data="showFeeData"
      border
      style="width: 100%">
      <el-table-column
        prop="billCodes"
        label="运单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="costType"
        label="应收"
        width="180">
      </el-table-column>
      <el-table-column
        prop="shipperInfo"
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
    props:['selectData'],
    name: 'fee',
    components : {

    },
    data () {
      return {
        showFeeData:[],
      }
    },
    watch : {
      'selectData.xdOrderId':function() {
        this.test(this.selectData.xdOrderId);
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
            self.showFeeData = res;
            console.log(self.showFeeData);
          })
          .catch(function(err) {
            console.log(err);

          })
      }
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





