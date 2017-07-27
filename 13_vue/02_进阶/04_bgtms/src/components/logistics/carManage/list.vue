<template>
  <div class="car-list">
    <!--tab切换框-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="综合" name="综合">
           <compre :tableData="tableData"></compre>
      </el-tab-pane>
      <el-tab-pane label="车头登记" name="车头登记">
         <car-header :activeNameMsg="activeName"></car-header>
      </el-tab-pane>
      <el-tab-pane label="挂车登记" name="挂车登记">
        <gua-car></gua-car>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import compre from './comprehensive.vue'
  import carHead from './carHeader.vue'
  import carFooter from './guaCar.vue'
    export default {
      components: {
        'compre': compre,
        'car-header':carHead,
        'gua-car': carFooter
      },
      data() {
        return {
          tableData:[
            {name: "车牌号",  isChecked:true, record: "tractorNo"},
            {name: "助记码",  isChecked:false, record: "memCode"},
            {name: "行驶证号", isChecked:false, record: "licenseNo"},
            {name: "进港证号", isChecked:false, record: "enterPortNo"},
            {name: "白卡号", isChecked:false, record: "bondedTruckNo"},
            {name: "登记日期",  isChecked:false, record: "registerDate"},
            {name: "厂牌型号",  isChecked:false, record: "model"},
            {name: "燃料类型",  isChecked:false, record: "fuelType"},
            {name: "自重",  isChecked:false, record: "selfWeight"},
            {name: "轴数",  isChecked:false, record: "rollerNum"},
            {name: "年审期限",  isChecked:false, record: "annualInspPeriod"},
            {name: "季审日期",  isChecked:false, record: "quarterlyDate"},
            {name: "二级维护日期",  isChecked:false, record: "twoLevelMainDate"},
            {name: "状态",  isChecked:false, record: "status"},
            {name: "车辆类型",  isChecked:false, record: "truckType"},
            {name: "所有人",  isChecked:false, record: "owner"},
            {name: "马力",  isChecked:false, record: "engine"},
            {name: "归属车队",  isChecked:false, record: "fleet"},
            {name: "经营模式",  isChecked:false, record: "manageMode"},
            {name: "归属车队",  isChecked:false, record: "fleet"},
            {name: "备注",  isChecked:false, record: "remark"}
          ],
          activeName: '综合'
        };
      },
      methods: {
        handleClick(tab) {
          if(tab.label === '')
          console.log(tab.label);
        }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

