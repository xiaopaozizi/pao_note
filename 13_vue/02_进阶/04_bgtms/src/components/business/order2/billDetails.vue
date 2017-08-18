<template>
  <div class="details">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="运单信息" name="运单信息">
        <base-info  :showData="doubleData"  :activeName="activeName" ref="tkBaseInfo" :updateRow="updateRow"></base-info>
      </el-tab-pane>
      <el-tab-pane label="费用信息" name="费用信息">
        <edit-fee :showData="doubleData"  :activeName="activeName" ref="tkFee"></edit-fee>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="上传图片">角色管理</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import editFee from '@/components/business/waybill2/editFee'
  import info from '@/components/business/waybill2/ydBaseInfo'
    export default {
      props:['doubleData','updateRow'],
      name:'details',
      components: {
        'edit-fee': editFee,
        'base-info' : info,
      },
      data() {
        return {
          activeName: '运单信息'
        };
      },
      watch: {

      },
      methods: {
        handleClick(tab) {
          let self = this;
          if(tab.label === '运单信息') {
            console.log('啦啦啦啦啦');
            self.$refs.tkBaseInfo.showInfoMsg(self.doubleData.relOrderId);
          } else  if(tab.label === '费用信息') {
            self.$refs.tkFee.getCostList(self.doubleData.xdTkBillId);
          }
          console.log(tab.label);
        }
      },
      mounted(){
        this.$refs.tkBaseInfo.showInfoMsg(this.doubleData.relOrderId);
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

