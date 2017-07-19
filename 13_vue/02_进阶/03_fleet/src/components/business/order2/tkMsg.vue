
<template>
  <div class="tk-msg">
    <el-row style="text-align: right">
      <el-button  @click="addxdOrder">添加</el-button>
      <el-button @click="editxdOrder">编辑</el-button>
      <el-button @click="onRemoveSelect">删除</el-button>
      <el-button @click="tkpaicheBtn">托卡</el-button>
      <el-button @click="inValid">作废</el-button>
      <el-button @click="finishYd">完成</el-button>
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

    <!--运单的新增-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="运单新增" v-model="addYdFormVisible" size="small">
      <el-form :model="addYdForm"  label-width="140px" :rules="addYdFormRules"  ref="addYdForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="托运方"  prop="shipperInfo">
              {{ selectData.shipperInfo }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="箱型" prop="teuType">
              <el-select style="width:200px" v-model="addYdForm.teuType" clearable placeholder="请选择">
                <el-option
                  v-for="item in addYdForm.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="箱号" prop="teuNo">
              <el-input style="width:200px" v-model="addYdForm.teuNo" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="铅封号" prop="sealNo">
              <el-input style="width:200px" v-model="addYdForm.sealNo" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="提箱点" prop="getClpPlace">
              <el-autocomplete
                style="width:200px"
                v-model="addYdForm.getClpPlace"
                placeholder="请输入内容"
                :fetch-suggestions="getClpPlaceQuerySearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="进箱点" prop="downClpPlace">
              <el-autocomplete
                style="width:200px"
                v-model="addYdForm.downClpPlace"
                placeholder="请输入内容"
                :fetch-suggestions="downClpPlaceQuerySearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="装拆地" prop="destination">
              <el-autocomplete
                style="width:200px"
                v-model="addYdForm.destination"
                placeholder="请输入内容"
                :fetch-suggestions="destinationQuerySearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装拆时间" prop="destinationDateStr">
              <el-date-picker
                style="width:200px"
                v-model="addYdForm.destinationDateStr"
                type="date"
                placeholder="选择日期"
                :editable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item label="装拆点" prop="destinationPoint">
              <el-autocomplete
                style="width:500px"
                v-model="addYdForm.destinationPoint"
                placeholder="请输入内容"
                :fetch-suggestions="destinationpointSearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划重量" prop="planWeight">
              <el-input style="width:200px" v-model="addYdForm.planWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际重量" prop="realWeight">
              <el-input style="width:200px" v-model="addYdForm.realWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="addYdSaveBtn">保存</el-button>
      </div>
    </el-dialog>
    <!--运单的编辑-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="运单编辑" v-model="editYdFormVisible" size="small">
      <el-form :model="editYdForm"  label-width="140px" :rules="editYdFormRules"  ref="editYdForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="托运方"  prop="shipperInfo">
              {{ selectData.shipperInfo }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="箱型" prop="teuType">
              <el-select style="width:200px" v-model="editYdForm.teuType" clearable placeholder="请选择">
                <el-option
                  v-for="item in editYdForm.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="箱号" prop="teuNo">
              <el-input style="width:200px" v-model="editYdForm.teuNo" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="铅封号" prop="sealNo">
              <el-input style="width:200px" v-model="editYdForm.sealNo" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="提箱点" prop="getClpPlace">
              <el-autocomplete
                style="width:200px"
                v-model="editYdForm.getClpPlace"
                placeholder="请输入内容"
                :fetch-suggestions="getClpPlaceQuerySearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="进箱点" prop="downClpPlace">
              <el-autocomplete
                style="width:200px"
                v-model="editYdForm.downClpPlace"
                placeholder="请输入内容"
                :fetch-suggestions="downClpPlaceQuerySearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="装拆地" prop="destination">
              <el-autocomplete
                style="width:200px"
                v-model="editYdForm.destination"
                placeholder="请输入内容"
                :fetch-suggestions="destinationQuerySearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装拆时间" prop="destinationDateStr">
              <el-date-picker
                style="width:200px"
                v-model="editYdForm.destinationDateStr"
                type="date"
                placeholder="选择日期"
                :editable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item label="装拆点" prop="destinationPoint">
              <el-autocomplete
                style="width:500px"
                v-model="editYdForm.destinationPoint"
                placeholder="请输入内容"
                :fetch-suggestions="destinationpointSearch"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划重量" prop="planWeight">
              <el-input style="width:200px" v-model="editYdForm.planWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际重量" prop="realWeight">
              <el-input style="width:200px" v-model="editYdForm.realWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="editYdSaveBtn">保存</el-button>
      </div>
    </el-dialog>
    <!--运单的托卡-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="托卡" v-model="tuoKaFormVisible" size="small">
      <el-form :model="tkForm"  label-width="140px" :rules="tkFormRules"  ref="tkForm">
        <el-row>
          <el-col :span="12" >
            <el-form-item label="排单方式"  prop="sendType" >
              <el-select style="width:200px" :disabled="tkForm.sendTypeDisabled" v-model="tkForm.sendType" @change="sendTypeChange" clearable placeholder="请选择">
                <el-option
                  v-for="item in tkForm.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="tkForm.transFleetShow">
            <el-form-item label="接运方" prop="transFleet">
              <el-autocomplete
                style="width:200px"
                v-model="tkForm.transFleet"
                placeholder="请输入内容"
                :fetch-suggestions="shipperInfoSearch"
                @select="shipperInfoSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="tkForm.plateNoShow">
            <el-form-item label="车牌号" prop="plateNo">
              <el-autocomplete
                style="width:200px"
                v-model="tkForm.plateNo"
                placeholder="请输入内容"
                :fetch-suggestions="plateNoSearch"
                @select="plateNoSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="tkForm.plateNoShow">
            <el-form-item label="司机/手机" prop="driverTelphone">
              <el-autocomplete
                style="width:200px"
                v-model="tkForm.driverTelphone"
                placeholder="请输入内容"
                :fetch-suggestions="driverTelphoneSearch"
                @select="driverTelphoneSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="tkForm.plateNoShow">
            <el-form-item label="承运车队" prop="fleet">
              <el-input style="width:200px" :disabled="true" v-model="tkForm.fleet"  :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="tkSaveBtn">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  import axios from 'axios'
  const neiP = '1-内排';
  const waiP = '2-外排';
  export default {
    props: ['selectData'],
    name: "tk-msg",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [
          {name: '', isChecked:true, record: "",checkBox:true,},
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
        addYdFormVisible:false, //运单新增显示
        addYdForm: {
          teuType: '',
          options:[],
          teuNo: '',
          sealNo:'',
          getClpPlace:'',
          downClpPlace:'',
          destination: '',
          destinationDateStr:'',
          expdateStr:'',
          planWeight:'',
          realWeight:'',
          destinationPoint:'',
        },
        addYdFormRules:{
          shipperInfo: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
        },
        //运单编辑
        editYdFormVisible: false,//运单编辑的显示
        editYdForm: {
          teuType: '',
          options:[],
          teuNo: '',
          sealNo:'',
          getClpPlace:'',
          downClpPlace:'',
          destination: '',
          destinationDateStr:'',
          expdateStr:'',
          planWeight:'',
          realWeight:'',
          destinationPoint:'',
          xdTkBillId:'',
          shipperInfo:'',
          shipperId:'',
        },
        editYdFormRules:{
          shipperInfo: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
        },
        selectNowData:null,
        //运单托卡
        tuoKaFormVisible: false,
        tkForm:{
          sendType: '1-内排',//排单方式
          options:[],
          transFleet:'',
          transFleetId:'',
          driverName:'',
          telephone1:'',
          driverPhone:'',
          driverTelphone:'',
          driverId:'',
          plateNo:'',
          fleet:'',
          shipperId:'',
          transFleetShow:false,
          plateNoShow:true,
          sendTypeDisabled: false,
        },
        tkFormRules: {

        }
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    watch: {
      'selectData.xdOrderId': function(val) {
        console.log(this.selectData);
        this.getRowData(val);
      }
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
        var selectedRows  = this.gridOptions.api.getSelectedRows();
        this.selectNowData = item.node.data;
        console.log(this.selectNowData)
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        let selectedRows  = this.gridOptions.api.getSelectedRows();
        console.log(selectedRows);
//        return this.gridOptions.api.getSelectedRows();
      },
      //双击事件
      onRowDoubleClicked(event) {
        this.detailDialogFormVisible = !this.detailDialogFormVisible;
        let params = event.data;
        if(params.review == '2-已审核'){
          this.editTable = false;
        }else {
          this.editTable = true;
        }
        console.log(params);
        this.getDataForm = params;
      },
      detailDialogClosed() {
        this.detailShow = true;
      },
      //获取表格数据并且初始化
      getRowData(val) {
        console.log();
        let self = this;
        let params =  {
          relOrderId: val,
          relXdOrderCode: this.selectData.orderCode
        };
        api.tkGetOrderList(params)
          .then(function(res) {
            console.log('表格加载');
            console.log(res);
            self.initData(res)
          })
          .catch(function(err) {

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
        this.rowData.unshift(objTemp);
/*        console.log(this.rowData);
        var newStore = this.rowData.slice();
        newStore.unshift(objTemp);
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里*/
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
            var data = res.data;
            var resultData = [];
            for(var objTemp of data){
              resultData.push({"key":objTemp.shipperId, "value":objTemp.custShortName + '/' + objTemp.contactPeople + '/' + objTemp.mobilephoneOne});
            }
            callback(resultData);
          })
          .catch(function(err){

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
          let    data  = res.data;
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
        }).catch(function(err){
          console.log(err);

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
            self.addYdForm.options = selectData
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
            let  data  = res.data;
            const selectData = [];
            console.log(data);
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
      //点击添加按钮
      addxdOrder() {
        this.addYdFormVisible = true;
      },
      //添加运单保存的接口
      addYdSaveBtn() {
        let self = this;
        let params = {
          sendBillInfo: this.selectData.shipperInfo,
          sendBillId: this.selectData.shipperId,
          teuType: this.addYdForm.teuType,
          teuNo: this.addYdForm.teuNo ,
          sealNo: this.addYdForm.sealNo,
          getClpPlace: this.addYdForm.getClpPlace,
          downClpPlace: this.addYdForm.downClpPlace,
          destination:this.addYdForm.destination ,
          destinationDateStr:this.addYdForm.destinationDateStr,
          planWeight: this.addYdForm. planWeight,
          realWeight: this.addYdForm.realWeight,
          destinationPoint: this.addYdForm.destinationPoint
        };
        console.log(params);
        api.tkAddSubmit(params).then(function (res) {
          let  data  = res.data;
          self.addNewRow(data);
          self.addYdFormVisible = false; //让新增dialog进行关闭
        }).catch(function(err){
          console.log(err);

        })
      },
      //编辑按钮
      editxdOrder(){
        this.editYdForm.shipperInfo = this.selectNowData.sendBillInfo;
        this.editYdForm.shipperId = this.selectNowData.sendBillId;
        this.editYdForm.teuType = this.selectNowData.teuType;
        this.editYdForm.teuNo = this.selectNowData.teuNo;
        this.editYdForm.sealNo = this.selectNowData.sealNo;
        this.editYdForm.getClpPlace = this.selectNowData.getClpPlace;
        this.editYdForm.downClpPlace = this.selectNowData.downClpPlace;
        this.editYdForm.destination = this.selectNowData.destination;
        this.editYdForm.destinationDateStr = this.selectNowData.destinationDateStr;
        this.editYdForm. planWeight =  this.selectNowData.planWeight;
        this.editYdForm.realWeight = this.selectNowData.realWeight;
        this.editYdForm.destinationPoint = this.selectNowData.destinationPoint;
        this.editYdForm.xdTkBillId = this.selectNowData.xdTkBillId;
        this.editYdFormVisible = true;
      },
      //编辑保存
      editYdSaveBtn() {
        let self = this;
        let params = {
          xdTkBillId:this.editYdForm.xdTkBillId,
          sendBillInfo: this.selectData.shipperInfo,
          sendBillId: this.selectData.shipperId,
          teuType: this.editYdForm.teuType,
          teuNo: this.editYdForm.teuNo ,
          sealNo: this.editYdForm.sealNo,
          getClpPlace: this.editYdForm.getClpPlace,
          downClpPlace: this.editYdForm.downClpPlace,
          destination:this.editYdForm.destination ,
          destinationDateStr:this.editYdForm.destinationDateStr,
          planWeight: this.editYdForm. planWeight,
          realWeight: this.editYdForm.realWeight,
          destinationPoint: this.editYdForm.destinationPoint
        };
        api.tkEditSubmit(params).then(function (res) {
          self.getRowData();
          self.editYdFormVisible = false;
        }).catch(function(err){
          console.log(err);

        })
      },
      //删除按钮
      onRemoveSelect() {
        let self = this;
        api.tkDelSubmit(this.selectNowData.xdTkBillId).then(function (res) {
          console.log(res);
          self.getRowData();
        }).catch(function(err){

        })
      },

      //点击托卡按钮的函数
      tkpaicheBtn() {
        let selectedRows  = this.gridOptions.api.getSelectedRows();
        if(selectedRows.length == 1) {
          this.tuoKaFormVisible = true;
          this.tkForm.plateNoShow = true;
          this.tkForm.transFleetShow = false;
          this.tkForm.sendTypeDisabled = false;
          this.tkForm.sendType = '1-内排';
        } else if( selectedRows.length > 1) {
          this.tuoKaFormVisible = true;
          this.tkForm.plateNoShow = false;
          this.tkForm.transFleetShow = true;
          this.tkForm.sendTypeDisabled = true;
          this.tkForm.sendType = '2-外排';
        }
        /*  if(selectedRows.length == 1){
         this.dialogTk.dialogTempVisible =! this.dialogTk.dialogTempVisible;
         let rowData = Object.assign({},this.dialogDataTkOrder.DefaultValue)
         this.dialogDataTkOrder.DefaultValue.sendType  = '1-内排';
         this.dialogDataTkOrder.DefaultValue.transFleet  = this.selectNum[0].data.receiveBillInfo;
         this.dialogDataTkOrder.fields[1].display = false;

         }else if(this.selectNum.length > 1) {
         this.dialogTk.dialogTempVisible =! this.dialogTk.dialogTempVisible;
         this.dialogDataTkOrder.fields[0].disabled = true;
         this.dialogDataTkOrder.fields[1].display = true;
         this.dialogDataTkOrder.fields[2].display = false;
         this.dialogDataTkOrder.fields[3].display = false;
         this.dialogDataTkOrder.fields[4].display = false;
         this.dialogDataTkOrder.DefaultValue.sendType  = '2-外排'
         }*/

      },
      //保存托卡
      tkSaveBtn() {
        let self = this;
        let tkWp = {
          sendType: this.tkForm.sendType,
          transFleet:this.tkForm.transFleet,
          relTransFleetId:this.tkForm.transFleetId
        };
        let tkNp = {
          sendType: this.tkForm.sendType,
          transFleet:this.tkForm.fleet,
          relTransFleetId:this.tkForm.transFleetId,
          driverName:this.tkForm.driverName,
          plateNo: this.tkForm.plateNo,
          relDriverId: this.tkForm.driverId,
          driverTelephone:this.tkForm.driverPhone
        };
        let tkData = this.gridOptions.api.getSelectedRows();


        console.log(tkNp);
        console.log(tkWp);
        console.log(JSON.stringify(tkData));

        if(this.tkForm.sendType == waiP) {
          axios({
            method: 'post',
            url: '/sendtruck/settruck',
            timeout:5000,
            params:{
              sendTruck:JSON.stringify(tkWp),
              xdTkBillList: JSON.stringify(tkData)
            },
            responseType: 'json'
          })
            .then(function(res){
              console.log(res);
              self.getRowData();
              self.tuoKaFormVisible = false;
              self.$refs['tkForm'].resetFields();
            })
            .catch(function(err){
              console.log(err);

            });
        }else if(this.tkForm.sendType == neiP) {
          axios({
            method: 'post',
            url: '/sendtruck/settruck',
            timeout:5000,
            params:{
              sendTruck:JSON.stringify(tkNp),
              xdTkBillList: JSON.stringify(tkData)
            },
            responseType: 'json'
          }).
            then(function(res){
              console.log(res);
              self.getRowData();
              self.tuoKaFormVisible = false;
              self.$refs['tkForm'].resetFields();
            })
            .catch(function(err){
              console.log(err);

            });
        }

      },

      //作废按钮操作
      inValid() {
        let self = this ;
        let selectedRows  = this.gridOptions.api.getSelectedRows();
        /*        for(let i=0; i<selectedRows.length;i++){
         selectedRows[i].xdTkBillId
         }*/
        if(selectedRows[0].billStatus == '5-作废') {
          this.$alert('此单子已经作废，请勿重复作废', '', {
            confirmButtonText: '确定'
          })
        }else {
          api.tkOrderStateChange(selectedRows[0].xdTkBillId,'5-作废')
            .then(function (res) {
              self.getRowData();
            })
            .catch(function(err) {

              console.log(err)
            })
        }

      },
      //完成按钮操作
      finishYd() {
        let self = this ;
        let selectedRows  = this.gridOptions.api.getSelectedRows();
        console.log(selectedRows[0].xdTkBillId);
        if(selectedRows[0].billStatus == '4-完成') {
          this.$alert('此单子已经完成，请勿重复完成', '', {
            confirmButtonText: '确定'
          })
        }else {
          api.tkOrderStateChange(selectedRows[0].xdTkBillId,'4-完成')
            .then(function (res) {
              self.getRowData();
            })
            .catch(function(err) {

              console.log(err)
            })
        }
      },

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
      this.teuTypeHandle();
      this.sendTypeHandle();
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

