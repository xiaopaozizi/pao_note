<template>
  <div class="waybill">
    <el-row style="padding-top: 6px">
      <el-col :span="8" style="padding-top: 5px">
        <el-radio-group v-model="tabsRadio" @change="radioChange" >
          <el-radio label="">综合</el-radio>
          <el-radio label="待排车">待排车</el-radio>
          <el-radio label="运输中">运输中</el-radio>
          <el-radio label="未审核">未审核</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="14" >
        <el-radio-group v-model="searchForm.timeRadio"  @change="dateRadioChange" style="margin-right: 25px">
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
      <el-col :span="2" style="text-align: right">
        <ag-grid-filter   :tableData="agGridFilterData.bigHeader" :type="'bigHeader'"></ag-grid-filter>
      </el-col>
    </el-row>
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
                 :sortingOrder="['asc','desc']"
                 :floatingFilter="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
    <!--切换框-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="运单信息" name="运单信息">
         <base-info :showData="selectNowData" :activeName="activeName" :updateRow="updateRow"  ref="tkBaseInfo"></base-info>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="订单信息">
           <show-info :showData="selectNowData" :activeName="activeName" ref="tkOrderInfo"></show-info>
      </el-tab-pane>
      <el-tab-pane label="费用信息" name="费用信息">
         <edit-fee :showData="selectNowData" :activeName="activeName" ref="tkFee"></edit-fee>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="上传图片">
        <show-img></show-img>
      </el-tab-pane>
<!--      <el-tab-pane label="日志信息" name="日志信息">
        <show-journal></show-journal>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  import showImg from './upload-img.vue'
  import journal from './journal.vue'
  import info from './ydBaseInfo.vue'
  import showXd from './showXdInfo.vue'
  import editFee from './editFee.vue'
  import agGridFilter from '@/components/common/ag-grid-filter'
  import Tool from '@/api/tool'
  import axios from 'axios'
  const neiP = '内排';
  const waiP = '外排';
  export default {
    name: "waybill",
    data() {
      return {
        // ag-grid-filter的数据
        agGridFilterData :  this.$store.state.tableModule.caseTransform,
        type:'bigHeader',
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [],
        /*表单的输出*/
        //订单切换状态
        tabsRadio:'',
        //tabs
        activeName: '运单信息',
        //存储选中的数据
        selectNowData:null,
        //选中的行数
        selectNowRows:null,
        searchForm: {
          date:'',
          dateStr:'',
          timeRadio:'今天',
          initFlag: true,
        }

      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
      'show-img': showImg,
      'show-journal':journal,
      'base-info' : info,
      'show-info': showXd,
      'edit-fee': editFee,
      'ag-grid-filter' : agGridFilter
    },
    watch: {

    },
    methods: {
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
        console.log('开始初始化数据=============')
        console.log(xdtList);
        //       this.gridOptions.api.setRowData(xdtList);//将数据插入到表格里面
//        this.rowData = this.gridOptions.api.setRowData(xdtList);
        this.createRowData(xdtList);
       // this.rowData = xdtList
      },
      //判断字符串为空
      isStringHandle(item) {
          if(item.indexOf('null') ===0) {
            return ' ';
          }else {
            return item;
          }
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            billStatus: objTemp.billStatus,
            billType: objTemp.billType,
            ccPlace: objTemp.ccPlace,
            ccvNo: objTemp.ccvNo,
            destination: objTemp.destination,
            destinationDateStr: objTemp.destinationDateStr,
            destinationPoint: objTemp.destinationPoint,
            doBillType: objTemp.doBillType,
            downClpPlace: objTemp.downClpPlace,
            driverName: objTemp.driverName,
            driverTelephone: objTemp.driverTelephone,
            getClpPlace: objTemp.getClpPlace,
            needCcv: objTemp.needCcv,
            planWeight: objTemp.planWeight,
            plateNo: objTemp.plateNo,
            realWeight: objTemp.realWeight,
            receiveBillId: objTemp.receiveBillId,
            receiveBillInfo: objTemp.receiveBillInfo,
            relDriverId: objTemp.relDriverId,
            relTruckId: objTemp.relTruckId,
            relOrderId: objTemp.relOrderId,
            relTransFleetId: objTemp.relTransFleetId,
            relXdOrderCode: objTemp.relXdOrderCode,
            remark: objTemp.remark,
            sealNo: objTemp.sealNo,
            sendBillId: objTemp.sendBillId,
            sendBillInfo: objTemp.sendBillInfo,
            sendBillMark: objTemp.sendBillMark,
            sendTruckId: objTemp.sendTruckId,
            teuNo: objTemp.teuNo,
            teuType: objTemp.teuType,
            tkBillCode: objTemp.tkBillCode,
            transFleet: objTemp.transFleet,
            xdTkBillId: objTemp.xdTkBillId,
            driverTep: this. isStringHandle(objTemp.driverName +'/' + objTemp.driverTelephone)
          })
        }
        this.rowData = rowData;
        console.log('我是创建表格table');
        console.log(rowData);
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
          if(tableCol[i].isChecked){
            this.columnDefs.push(
              {
                headerName: tableCol[i].name,
                field: tableCol[i].record,
                filter: tableCol[i].filterType,
                suppressMenu: true,
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
        console.log(item.data);
        this.selectNowData = item.data;
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        let selectedRows  = this.gridOptions.api.getSelectedRows();
        //return this.gridOptions.api.getSelectedRows();
      },
      //获取表格数据并且初始化
      getRowData(val) {
        console.log();
        let self = this;
        let params =  {
            billStatus:  val
        };
        api.tkOrderQueryList(params)
          .then(function(res) {
            console.log('我事实上+++');
            console.log(res);
            self.initData(res)
          })
          .catch(function(err) {
            console.log(err);

          })
      },
      updateRow(row){
        console.log('我是表格单条数据');
        var oldRows = this.gridOptions.api.getSelectedRows();
        for(let showJson in row) {
          console.log(row[showJson]);
          oldRows[0][showJson] = row[showJson];
        }
        this.gridOptions.api.refreshView();
      },
      //数据刷新
      refreshView() {
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.gridOptions.api.refreshView();
      },
      //增加表格数据
      addNewRow(objTemp){
        console.log('我是rowData');
        console.log(this.rowData);
        var newStore = this.rowData.slice();
        newStore.unshift(objTemp);
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里
      },

      /*表单事件*/
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
      //托运方模糊搜索接口
      shipperInfoSearch(queryString, callback) {
        let self = this;
        api.getShipperInfoSearch({
            searchStr: queryString
          })
          .then(function(res){
            console.log(res);
          })
          .catch(function(err){
            var data = err.data.data;
            var resultData = [];
            for(var objTemp of data){
              resultData.push({"key":objTemp.shipperId, "value":objTemp.custShortName + '/' + objTemp.contactPeople + '/' + objTemp.mobilephoneOne});
            }
            callback(resultData);
          });
      },
      //托运方下拉选择事件
      shipperInfoSelect(item) {
        this.tkForm.transFleetId = item.key;
      },
      //车牌号模糊搜索
      plateNoSearch(queryString, callback) {
        let self = this;
        api.getPlateNoSearch(queryString).then(function (res) {
          console.log(res.status);

        }).catch(function(err){
          console.log(err.data);
          let   { data } = err.data
          let tkPcDataList = [];
          for(var objTemp of data){
            tkPcDataList.push({
              driverId: objTemp.driverId,
              driverName:objTemp.driverName,
              telephone1:objTemp.telephone1,
              fleet:objTemp.fleet,
              relFleetId:objTemp.relFleetId,
              tractorNo:objTemp.tractorNo,
              driver: objTemp.driverName + '/' + objTemp.telephone1,
              value:objTemp.tractorNo + '/' + objTemp.driverName + '/' + objTemp.telephone1
            });
          }
          callback(tkPcDataList);
          console.log(data)
        })
      },
      //车牌号下拉选中函数
      plateNoSelect(item) {
        this.tkForm.plateNo = item.tractorNo;
        this.tkForm.driverTelphone = item.driver;
        this.tkForm.fleet = item.fleet;
        this.tkForm.driverName = item.driverName;
        this.tkForm.driverId = item.driverId;
        this.tkForm.driverPhone = item.telephone1;
        console.log(item)
      },
      //司机的模糊搜索
      driverTelphoneSearch(queryString, callback) {
        let self = this;
        api.getDriverTelphoneSearch(queryString).then(function (res) {
          let  data  = res.data;
          let resultData = [];
          for(var objTemp of data){
            resultData.push({
              key:objTemp.driverId,
              value:objTemp.driverName + '/' + objTemp.telephone1,
              telphone: objTemp.telephone1,
              driverName:objTemp.driverName

            });
          }
          callback(resultData);

        }).catch(function(err){
          console.log(err);


        })
      },
      //司机下拉选中事件
      driverTelphoneSelect(item){
        this.tkForm.driverName = item.driverName;
        this.tkForm.driverId = item.key;
        this.tkForm.driverPhone = item.telphone;
      },
      //业务箱型下拉框
      teuTypeHandle() {
        let self = this;
        api.selectBusTypeHandle('tuetype')
          .then(function (res) {
            let  selectData = [];
            let  data  = res.data;
            console.log(data)
            for (let objTemp of data) {
              selectData.push({"value":objTemp.display })
            }
            self.addYdForm.options = selectData;
            self.editYdForm.options = selectData;
          })
          .catch(function(err){


          })



      },
      //排单方式下拉接口
      sendTypeHandle() {
        let self = this;
        api.selectBusTypeHandle( 'pctype')
          .then(function (res) {
            const selectData = [];
            let data = res.data;
            console.log(data)
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            self.tkForm.options = selectData
          })
          .catch(function(err){

          })



      },
      //排单方式下拉值改变
      sendTypeChange(item){
        if(item == neiP ) {
          this.tkForm.transFleetShow = false;
          this.tkForm.plateNoShow = true;
        }else if(item == waiP) {
          this.tkForm.plateNoShow = false;
          this.tkForm.transFleetShow = true;
        }
      },
      //装拆地模糊查询
      destinationQuerySearch(queryString, callback) {
        if( queryString != '' ){
          api.getDestinationSearch(queryString)
            .then(function (res) {
              let data = res.data;
              let resultData = [];
              for(var objTemp of data){
                resultData.push({"key":'',"value":objTemp.province + '/' + objTemp.city + '/' + objTemp.district + '/' +objTemp.town});
              }
              callback(resultData);
            })
            .catch(function(err){

            })
        }else{
          console.log('为空值')
        }

      },
      //提箱点的模糊查询
      getClpPlaceQuerySearch(queryString, callback) {
        if( queryString != '' ){
          api.getClpPlaceSearch(queryString,2)
            .then(function (res) {
              var data = res.data;
              var resultData = [];
              for(var objTemp of data){
                resultData.push({"key":'',"value":objTemp.memCode + '/' + objTemp.area});
              }
              callback(resultData);
            })
            .catch(function(err){


            })
        }else{
          console.log('为空值')
        }
      },
      //进箱点模糊查询
      downClpPlaceQuerySearch(queryString, callback) {
        if( queryString != '' ){

          api.getClpPlaceSearch(queryString,1)
            .then(function (res) {
              var data = res.data;
              var resultData = [];
              for(var objTemp of data){
                resultData.push({"key":'',"value":objTemp.memCode + '/' + objTemp.area});
              }
              callback(resultData);
            })
            .catch(function(err){
              console.log(err);


            })
        }else{
          console.log('为空值')
        }
      },
      //装拆点模糊查询
      destinationpointSearch(queryString, callback) {
        if( queryString != '' ){
          api.getDestinationPointSearch(queryString)
            .then(function (res) {
              let data = res.data;
              let resultData = [];
              for(var objTemp of data){
                resultData.push({"key":objTemp.destinationPointId,"value":objTemp.address + '/' + objTemp.contactPeopleOne + '/' + objTemp.mobilePhoneOne});
              }
              callback(resultData);
            })
            .catch(function(err){
              console.log(err)


            })
        }else{
          console.log('为空值')
        }

      },

      /*==============*/
      //切换状态
      radioChange(val) {
        this.getRowData(val)
      },
      //点击tabs切换事件
      handleClick(tab) {
        let self = this;
        if(tab.label === '运单信息') {
          self.$refs.tkBaseInfo.showInfoMsg(self.selectNowData.relOrderId);
        }else if(tab.label ==='订单信息') {
          self.$refs.tkOrderInfo.showFormMsg(self.selectNowData.relOrderId);
        } else  if(tab.label === '费用信息') {
          self.$refs.tkFee.getCostList(self.selectNowData.xdTkBillId);
        }
      },
      //时间转换格式化
      setChangedValue(value){
        let self = this;
        this.searchForm.dateStr = value;
        let params =  {
          destinationDateQuery:  value,
          billStatus:  this.tabsRadio
        };
        if(this.searchForm.initFlag){
          self.billSearchInterface(params);
          self.searchForm.initFlag = false;
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
      searchBtn()  {
        let params =  {
          destinationDateQuery:  this.searchForm.dateStr,
          billStatus:  this.tabsRadio
        };
        //查询接口
        this.billSearchInterface(params)
      },
      billSearchInterface(item) {
        let self= this;
        api.tkOrderQueryList(item)
          .then(function(res) {
            self.initData(res);
          })
          .catch(function(err){})
      }
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
      let tool = new Tool();
      tool.setIte("caseTransform", "bigHeader", this.agGridFilterData.bigHeader);//把值存入
    },
    mounted() {
      //存入数据
        let tool = new Tool();
        this.defCol = tool.getIte('caseTransform').bigHeader;
        this.createColumnDefs();
        let stateDate = new Date();
        let endDate = new Date();
        this.searchForm.date = [stateDate,endDate];
      this.getRowData('');
      this.gridOptions.api.sizeColumnsToFit();
/*
    :rowDataChanged="rowDataChanged"
*/
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

