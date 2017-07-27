<template>
   <div class="order">
     <el-button type="primary" @click="$router.push('/business/orderAdd')">新增</el-button>
     <!--查询框-->
     <el-row style="margin-top: 20px">
       <el-col :span="8">
         <el-radio-group v-model="tabsRadio" @change="radioChange">
           <el-radio label="">综合</el-radio>
           <el-radio label="处理中">处理中</el-radio>
           <el-radio label="未收款">未收款</el-radio>
         </el-radio-group>
       </el-col>
       <el-col :span="2" :offset="14" style="text-align: right">
         <ag-grid-filter></ag-grid-filter>
       </el-col>
     </el-row>
     <list-table ref="refListTable" @seletClk="parentSelect"></list-table>
     <!--统计区域-->
     <el-row>
       <el-col :span="6">总数:</el-col>
       <el-col :span="6">处理中</el-col>
       <el-col :span="6">未收款</el-col>

     </el-row>
     <!--tables切换区域-->
     <tabs :selectData="selectDataTable" @editSucData="editSucData" @delData="delData"></tabs>
   </div>
</template>

<script>
  import listTable from './listTable.vue'
  import api from '@/api/api'
  import tabs from './listTabs.vue'
  import agGridFilter from '@/components/common/ag-grid-filter'
    export default {
      name: 'order',
      components : {
        "list-table": listTable,
        'tabs' : tabs,
        'ag-grid-filter' : agGridFilter
      },
      data() {
        return {
          //订单切换状态
          tabsRadio:'',
          //获取表格选中的参数
          selectDataTable: {},
          isShowInfo: false,
        }
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
        //父级控制事件
        parentSelect(item) {
          this.selectDataTable = item;
        },
        //列表切换状态
        radioChange(val) {
          this.$refs.refListTable.getRowData(val)
        },
        //获取tabs编辑成功以后的数据
        editSucData(item) {
          this.$refs.refListTable.updateRow(item)
        },
        //表单删除让table数据刷新
        delData() {
          this.$refs.refListTable.refreshView();
        },
      }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .account .icon-inline {
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    background-color: lightblue;
    margin-top: 5px;
  }
</style>

