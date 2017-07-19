<template>
  <div class="waybill">

    <el-row style="margin-top: 20px">
      <el-radio-group v-model="tabsRadio" @change="radioChange">
        <el-radio label="">综合</el-radio>
        <el-radio label="1-待排车">待排车</el-radio>
        <el-radio label="2-运输中">运输中</el-radio>
        <el-radio label="3-未审核">未审核</el-radio>
      </el-radio-group>
    </el-row>
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-fresh" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowClicked="tableClk"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
    <!--切换框-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="运单信息" name="运单信息">
         <base-info :showData="selectNowData" :activeName="activeName" :updateRow="updateRow" ref="tkBaseInfo"></base-info>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="订单信息">
           <show-info ref="showInfo" :showData="selectNowData" :activeName="activeName"></show-info>
      </el-tab-pane>
      <el-tab-pane label="费用信息" name="费用信息">
         <edit-fee :showData="selectNowData" :activeName="activeName"></edit-fee>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="上传图片">
        <show-img></show-img>
      </el-tab-pane>
      <el-tab-pane label="日志信息" name="日志信息">
        <show-journal></show-journal>
      </el-tab-pane>
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
  import axios from 'axios'
  const neiP = '1-内排';
  const waiP = '2-外排';
  export default {
    name: "waybill",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [
//          {name: '', isChecked:true, record: "",checkBox:true,},
          {name: '运单号', isChecked:true, record: "tkBillCode"},
          {name: "运单状态", isChecked:true, record: "billStatus"},
          {name: "运单类型", isChecked:true,record: "billType"},
          {name: "箱型", isChecked:true, record: "teuType"},
          {name: "箱号", isChecked:true, record: "teuNo"},
          {name: "铅封号", isChecked:true, record: "sealNo"},
          {name: "提箱点",isChecked:true, record: "getClpPlace"},
          {name: "进箱点",isChecked:true, record: "downClpPlace"},
          {name: "装拆地",isChecked:true, record: "destination"},
          {name: "是否需要白卡", isChecked:true, record: "needCcv"},
          {name: "监管点", isChecked:true, record: "ccPlace"},
          {name: "白卡号", isChecked:true, record: "ccvNo"},
          {name: "装拆点", isChecked:true, record: "destinationPoint"},
          {name: "装拆时间",isChecked:true, record: "destinationDate"},
          {name: "计划重量",isChecked:true, record: "planWeight"},
          {name: "实际重量",isChecked:true, record: "realWeight"},
          {name: "托运方", isChecked:true, record: "sendBillInfo"},
          {name: "接运方",isChecked:true, record: "receiveBillInfo"},
          {name: "排单方式",isChecked:true, record: "doBillType"},
          {name: "车牌号",isChecked:true, record: "plateNo"},
          {name: "司机/手机",isChecked:true, record: "driverTelphone"}
        ],
        /*表单的输出*/
        //订单切换状态
        tabsRadio:'',
        //tabs
        activeName: '运单信息',
        //存储选中的数据
        selectNowData:null,
        //选中的行数
        selectNowRows:null,

      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
      'show-img': showImg,
      'show-journal':journal,
      'base-info' : info,
      'show-info': showXd,
      'edit-fee': editFee
    },
    watch: {

    },
    methods: {
      //初始化
      initData(xdtList){
        console.log('开始初始化数据=============')
        console.log(xdtList);
        //       this.gridOptions.api.setRowData(xdtList);//将数据插入到表格里面
//        this.rowData = this.gridOptions.api.setRowData(xdtList);
        //   this.createRowData(xdtList);
        this.rowData = xdtList
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            account: objTemp.account,
            accountNo: objTemp.accountNo,
            allowDriveType: objTemp.allowDriveType,
            bank: objTemp.bank,
            bankAddr: objTemp.bankAddr,
            bindingTruckNo: objTemp.bindingTruckNo,
            contactAddr: objTemp.contactAddr,
            createDate: objTemp.createDate,
            createUser: objTemp.createUser,
            driverHeadPic: objTemp.driverHeadPic,
            driverId: objTemp.driverId,
            driverLicenseEnd: objTemp.driverLicenseEnd,
            driverLicenseStart: objTemp.driverLicenseStart,
            driverName: objTemp.driverName,
            familyTel: objTemp.familyTel,
            fleet: objTemp.fleet,
            idAddr: objTemp.idAddr,
            idCard: objTemp.idCard,
            medicalCheck: objTemp.medicalCheck,
            medicalCheckDate: objTemp.medicalCheckDate,
            nextReturnDue: objTemp.nextReturnDue,
            relFleetId: objTemp.relFleetId,
            remark: objTemp.remark,
            status: objTemp.status,
            telephone1: objTemp.telephone1,
            telephone2: objTemp.telephone2,
            usualAddr: objTemp.usualAddr,
            workNo: objTemp.workNo,
            workNoEnd: objTemp.workNoEnd,
            workNoStart: objTemp.workNoStart
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
      onCellClicked(event) {//选中哪一条 对应的数据显示
        console.log(event);
      },
      tableClk(item) {//获取表格选中的个数
        var rowCount = this.gridOptions.api.getSelectedNodes();
        let selectedRows  = this.gridOptions.api.getSelectedRows();
        this.selectNowData = item.node.data;
        console.log(this.selectNowData);

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
            self.initData(res)
          })
          .catch(function(err) {
            console.log('表格加载');
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
        console.log(item);
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
          console.log('9999');
        }else if(tab.label == '') {

        }
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
        }
      };
      this.createColumnDefs();
    },
    mounted() {
      this.getRowData();
    },
    destroyed(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*  .grid {
      text-align: center;
    }*/
</style>

