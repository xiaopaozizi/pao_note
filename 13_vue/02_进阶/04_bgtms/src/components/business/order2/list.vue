<template>
   <div class="order">
     <!--查询框-->
     <el-row style="margin-top: 6px">
       <el-col :span="6" style="padding-top: 5px">
         <el-radio-group v-model="tabsRadio" @change="radioChange">
           <el-radio label="">综合</el-radio>
           <el-radio label="处理中">处理中</el-radio>
           <el-radio label="未收款">未收款</el-radio>
         </el-radio-group>
       </el-col>

       <el-col :span="14">
         <el-radio-group v-model="searchForm.timeRadio" @change="dateRadioChange" style="margin-right: 25px">
           <el-radio label="今天">今天</el-radio>
           <el-radio label="明天">明天</el-radio>
           <el-radio label="后天">后天</el-radio>
         </el-radio-group>
         <el-date-picker
           v-model="searchForm.date"
           size="small"
           type="daterange"
           align="right"
           placeholder="选择日期范围"
           @change="setChangedValue"
           range-separator=" ~ "
         >
         </el-date-picker>
         <el-button type="primary" size="small" @click="searchBtn">查询</el-button>
       </el-col>
       <el-col :span="4" class="btn-sty">

         <ag-grid-filter :tableData="agGridFilterData.bigHeader" :type="type"></ag-grid-filter>

         <el-button type="primary" @click="$router.push('/business/orderAdd')" size="small">新增</el-button>
       </el-col>
     </el-row>
     <list-table ref="refListTable"  @seletClk="parentSelect"></list-table>
     <!--统计区域-->
     <el-row>
       <el-col :span="6">总数:</el-col>
       <el-col :span="6">处理中</el-col>
       <el-col :span="6">未收款</el-col>

     </el-row>
     <!--tables切换区域-->
     <tabs :selectData="selectDataTable" @editSucData="editSucData" @delData="delData" :refshRow="editSucData"></tabs>
   </div>
</template>

<script>
  import listTable from './listTable.vue'
  import api from '@/api/api'
  import tabs from './listTabs.vue'
  import agGridFilter from '@/components/common/ag-grid-filter'
  import Tool from '@/api/tool'
    export default {
      name: 'order',
      components : {
        "list-table": listTable,
        'tabs' : tabs,
        'ag-grid-filter' : agGridFilter
      },
      data() {
        return {
          // ag-grid-filter的数据
          agGridFilterData :  this.$store.state.tableModule.caseOrder,
          type : 'bigHeader',
          //订单切换状态
          tabsRadio:'',
          //获取表格选中的参数
          selectDataTable: {},
          isShowInfo: false,

          searchForm: {
            date:'',
            dateStr:'',
            timeRadio:'今天',
            initFlag: true,
          }
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
          console.log(this.selectDataTable);
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
        //时间转换格式化
        setChangedValue(value){
          this.searchForm.dateStr = value;
          //页面首次加载成功后调用初始数据
          let params = {
            createDateQuery: value,
            orderStatus: this.tabsRadio
          };
          if(this.searchForm.initFlag){
            this.searchInterface(params);
            this.searchForm.initFlag = false;
          }
        },


        //今天、明天、后天 点击事件
        //列表切换状态
        dateRadioChange(val) {
         console.log(val);
          if(val ==='明天') {
            let stateDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24 );
            let endDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24);
            this.searchForm.date = [stateDate,endDate];
          } else if(val ==='后天') {
            let stateDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24 *2 );
            let endDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24 * 2);
            this.searchForm.date = [stateDate,endDate];
          }else if(val ==='今天') {
            let stateDate = new Date();
            let  endDate = new Date();
            this.searchForm.date = [stateDate,endDate];
          }
        },
        //查询
        searchBtn() {
           let params = {
             expdateQuery: this.searchForm.dateStr,
             orderStatus: this.tabsRadio
           }
          console.log(params);
          //调用查询接口
          this.searchInterface(params);
        },
        searchInterface(item){
          let self =  this;
          api.orderStatus(item)
            .then(function(res){
              console.log(res);
              self.$refs.refListTable.initData(res);
            })
            .catch(function(err) {})
        }
      },
      beforeMount(){
        let tool = new Tool();
        tool.setIte("caseOrder", "bigHeader", this.agGridFilterData.bigHeader);//把值存入
        tool.setIte("caseOrder", "littleHeader", this.agGridFilterData.littleHeader);//把值存入
      },
      mounted() {
        let stateDate = new Date();
        let endDate = new Date();
        this.searchForm.date = [stateDate,endDate];
      },
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
  .btn-sty *{
    float: right;
    margin-right: 8px;
  }
  .btn-sty {
    overflow: hidden;
  }
</style>

