<template>
  <div class="order-next">
    <el-row style="text-align: right">
      <el-col  :span="22"   >
        <el-button  @click="addxdOrder" size="small">添加</el-button>
        <el-button @click="editxdOrder" size="small">编辑</el-button>
        <el-button @click="onRemoveSelect" size="small">删除</el-button>
        <el-button @click="tkpaicheBtn" size="small">拖卡</el-button>
        <el-button @click="inValid" size="small">作废</el-button>
        <el-button @click="finishYd" size="small">完成</el-button>
      </el-col>
      <el-col :span="2" >
        <ag-grid-filter :tableData="defCol" :type="type"></ag-grid-filter>
      </el-col>


    </el-row>
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowClicked="tableClk"
                 :rowDoubleClicked="onDoubleClicked"


                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>

    <!--运单的新增-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="运单添加" v-model="addYdFormVisible" size="small">
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
            <el-form-item label="封号" prop="sealNo">
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
            <el-form-item label="计划重量(KG)" prop="planWeight">
              <el-input style="width:200px" v-model="addYdForm.planWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际重量(KG)" prop="realWeight">
              <el-input style="width:200px" v-model="addYdForm.realWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                style="width:200px"
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="addYdForm.remark">
              </el-input>
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
            <el-form-item label="封号" prop="sealNo">
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
            <el-form-item label="计划重量(KG)" prop="planWeight">
              <el-input style="width:200px" v-model="editYdForm.planWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际重量(KG)" prop="realWeight">
              <el-input style="width:200px" v-model="editYdForm.realWeight" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                style="width:200px"
                autosize
                placeholder="请输入内容"
                v-model="editYdForm.remark">
              </el-input>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="editYdSaveBtn">保存</el-button>
      </div>
    </el-dialog>
    <!--运单的托卡-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="拖卡" v-model="tuoKaFormVisible" size="small">
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
          <el-col :span="12" >
            <el-form-item label="备注">
              <el-input type="textarea" :rows="2"
                        v-model="tkForm.remark" style="width:200px"  size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="tkSaveBtn">保存</el-button>
      </div>
    </el-dialog>


    <!--详情弹出框-->

    <el-dialog :modal="false"  :close-on-click-modal="false"  title="详情" v-model="billFormVisible" size="large">
      <bill-details :doubleData="doubleData" :updateRow="updateRow"></bill-details>
    </el-dialog>

  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  import axios from 'axios'
  import Tool from '@/api/tool'
  import agGridFilter from '@/components/common/ag-grid-filter'
  import details from './billDetails'
  const neiP = '内排';
  const waiP = '外排';
  export default {
    props: ['selectData','activeName'],
    name: "order-next",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [],
        type : 'littleHeader',
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
          remark:''

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
          remark:''
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
          sendType: '内排',//排单方式
          options:[],
          transFleet:'', //接运方
          transFleetId:'',//接运方ID
          driverName:'',
          telephone1:'',
          driverPhone:'',
          driverTelphone:'',
          sendTruckId:'',
          truckId:'',
          driverId:'',
          plateNo:'',
          relPlateNo:'',
          fleet:'',
          shipperId:'',
          transFleetShow:false,
          plateNoShow:true,
          sendTypeDisabled: false,
          remark:''
        },
        tkFormRules: {

        },

        /*详情*/
        billFormVisible: false,
        doubleData: null,
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
      'ag-grid-filter' : agGridFilter,
      'bill-details': details
    },
    watch: {
      'selectData.xdOrderId': function(val) {
        if(this.activeName == '拖卡信息') {
          console.log(22222)
          this.getRowData();
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
      //改变表格自适应
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
        //   this.createRowData(xdtList);
      //  this.rowData = xdtList;
        this.createRowData(xdtList);
        this.gridOptions.api.sizeColumnsToFit();
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        let self =this;
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            billStatus: objTemp.billStatus,
            billType: objTemp.billType,
            ccPlace: objTemp.ccPlace,
            ccvNo: objTemp.ccvNo,
            destination: objTemp.destination,
            destinationDate: objTemp.destinationDate,
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
            relOrderId: objTemp.relOrderId,
            relTransFleetId: objTemp.relTransFleetId,
            relTruckId: objTemp.relTruckId,
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
            driverTep: self.isStringHandle(objTemp.driverName +'/' + objTemp.driverTelephone)
          })
        }
        this.rowData = rowData;
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
          if(this.defCol[i].isChecked) {
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
        if(params.review == '已审核'){
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
      getRowData() {
        console.log();
        let self = this;
        let params =  {
          relOrderId: this.selectData.xdOrderId,
          relXdOrderCode: this.selectData.orderCode
        };
        api.tkGetOrderList(params)
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
        this.rowData.unshift(objTemp);

        console.log(objTemp.xdTkBillId);
       /* this.gridOptions.api.forEachNode( function (node) {
          if (node.data.xdTkBillId == objTemp.xdTkBillId) {
            console.log('我是运单');
            console.log(node.data.xdTkBillId, );

            node.setSelected(true);
          }
        });*/
    /*    var newStore = this.rowData.slice();
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
      //接运方模糊搜索接口
      shipperInfoSearch(queryString, callback) {
        let self = this;
        api.jieYunSearch(queryString)
          .then(function(res){
            console.log(res);
            let  data = res.data;
            let resultData = [];
            for(var objTemp of data){
              resultData.push({"key":objTemp.customerBaseId, "value":objTemp.custShortName});
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
          let    data  = res.data;
          let tkPcDataList = [];
          console.log(data);
          for(var objTemp of data){
            tkPcDataList.push({
              driverId: objTemp.driverId,
              driverName:objTemp.driverName,
              telephone1:objTemp.telephone1,
              fleet:objTemp.fleet,
              relFleetId:objTemp.relFleetId,
              tractorNo:objTemp.tractorNo,
              relTruckId: objTemp.truckBaseId,
              driver: objTemp.driverName + '/' + objTemp.telephone1,
              //value:objTemp.tractorNo + '/' + objTemp.driverName + '/' + objTemp.telephone1
              value: objTemp.memCode  +  '/' + objTemp.tractorNo
            });
          }
          callback(tkPcDataList);
          console.log(tkPcDataList);
        }).catch(function(err){
          console.log(err);

        })
      },
      //车牌号下拉选中函数
      plateNoSelect(item) {
        this.tkForm.plateNo = item.value;
        this.tkForm.relPlateNo = item.tractorNo;
        this.tkForm.driverTelphone = item.driver;
        this.tkForm.fleet = item.fleet;
        this.tkForm.driverName = item.driverName;
        this.tkForm.driverId = item.driverId;
        this.tkForm.driverPhone = item.telephone1;
        this.tkForm.transFleetId = item.relFleetId;
        this.tkForm.truckId = item.relTruckId;
        console.log(this.tkForm)
      },
      //司机的模糊搜索
      driverTelphoneSearch(queryString, callback) {
        let self = this;
        api.getDriverTelphoneSearch(queryString).then(function (res) {
          let data = res.data;
          let resultData = [];
          for(var objTemp of data){
            resultData.push({
              key:objTemp.driverId,
              value:objTemp.driverName + '/' + objTemp.telephone1,
              telephone: objTemp.telephone1,
              driverName:objTemp.driverName

            });
          }
          callback(resultData);

        }).catch(function(err){


        })
      },
      //司机下拉选中事件
      driverTelphoneSelect(item){
        this.tkForm.driverName = item.driverName;
        this.tkForm.driverId = item.key;
        this.tkForm.driverPhone = item.telephone;
      },
      //业务箱型下拉框
      teuTypeHandle() {
        let self = this;
        api.selectBusTypeHandle('tuetype')
          .then(function (res) {
            let  selectData = [];
            let data  = res.data;
            console.log(data);
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
            let selectData = [];
            let data  = res.data;
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
      //判断字符串为空
      isStringHandle(item) {
        if(item.indexOf('null') ===0) {
          return ' ';
        }else {
          return item;
        }
      },
      //装拆点模糊查询
      destinationpointSearch(queryString, callback) {
        let self =this;
        if( queryString != '' ){
          api.getDestinationPointSearch(queryString)
            .then(function (res) {
              let data = res.data;
              let resultData = [];
              for(var objTemp of data){
                resultData.push({
                  "key":objTemp.destinationPointId,
                  "value": self.isStringHandle(objTemp.address + '/' + objTemp.contactPeopleOne + '/' + objTemp.mobilePhoneOne)});
              }
              callback(resultData);
            })
            .catch(function(err){


            })
        }else{
          console.log('为空值')
        }

      },
      //点击添加按钮
      addxdOrder() {
        console.log(this.selectData);
         this.addYdFormVisible = true;
        this.addYdForm.getClpPlace = this.selectData.getClpPlace ;
        this.addYdForm.downClpPlace = this.selectData.downClpPlace;
        this.addYdForm.downClpPlace = this.selectData.downClpPlace;
        this.addYdForm.destination = this.selectData.destination;

      },
      //添加运单保存的接口
      addYdSaveBtn() {
        let self = this;
        let params = {
          relXdOrderCode:this.selectData.orderCode,
          relOrderId:this.selectData.xdOrderId,
          sendBillInfo: this.selectData.shipperInfo,
          sendBillId: this.selectData.shipperId,
          teuType: this.addYdForm.teuType,
          teuNo: this.addYdForm.teuNo ,
          sealNo: this.addYdForm.sealNo,
          getClpPlace: this.addYdForm.getClpPlace,
          downClpPlace: this.addYdForm.downClpPlace,
          destination:this.addYdForm.destination ,
          destinationDateStr:this.formatDate(this.addYdForm.destinationDateStr),
          planWeight: this.addYdForm. planWeight,
          realWeight: this.addYdForm.realWeight,
          destinationPoint: this.addYdForm.destinationPoint,
          remark: this.addYdForm.remark
        };
        console.log(params);
        api.tkAddSubmit(params).then(function (res) {
          let  data  = res.data;
          self.addNewRow(data);
          self.addYdFormVisible = false; //让新增dialog进行关闭
          self.$emit("interFace",self.selectData.xdOrderId);
        }).catch(function(err){

        })
      },
      //编辑按钮
      editxdOrder(){
        let selectRows = this.gridOptions.api.getSelectedNodes();;

       if(selectRows.length === 1) {
         this.selectData.shipperInfo = this.selectNowData.sendBillInfo;
         this.selectData.shipperId = this.selectNowData.sendBillId;
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
         this.editYdForm.remark = this.selectNowData.remark;
         this.editYdFormVisible = true;
       }
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
          destinationDateStr:this.formatDate(this.editYdForm.destinationDateStr),
          planWeight: this.editYdForm. planWeight,
          realWeight: this.editYdForm.realWeight,
          destinationPoint: this.editYdForm.destinationPoint,
          remark: this.editYdForm.remark
        };
        console.log(params);
        api.tkEditSubmit(params).then(function (res) {
          self.getRowData();
          self.editYdFormVisible = false;
         self.$emit("interFace",self.selectData.xdOrderId);
        }).catch(function(err){
          console.log(err);
        })
      },
      //删除按钮
      onRemoveSelect() {
        let self = this;
        let selectRows = this.gridOptions.api.getSelectedRows();
        if(selectRows.length === 0 ) {
          self.$alert('请选择一条数据','信息',{
            confirmButtonText: '确定',
          })
        }else if( selectRows.length === 1  ) {
          api.tkDelSubmit(self.selectNowData.xdTkBillId).then(function (res) {
            self.getRowData();
            self.$emit("interFace",self.selectData.xdOrderId);
          }).catch(function(err){
          })
        }
        console.log(this.selectNowData.xdTkBillId);

      },
      //判断字符串为空
      isStringHandle(item) {
        if(item.indexOf('null') ===0) {
          return ' ';
        }else if(item.indexOf('undefined') ===0){
          return ' ';
        }else {
          return item;
        }
      },
      //点击托卡按钮的函数
      tkpaicheBtn() {
        let self = this;
        let selectedRows  = this.gridOptions.api.getSelectedRows();

        if(selectedRows.length == 1) {
          self.tkForm.sendType = self.selectNowData.doBillType; //排单方式
          self.tkForm.transFleet = self.selectNowData.receiveBillInfo; //接运方
          self.tkForm.transFleetId = self.selectNowData.receiveBillId; //接运方ID
          self.tkForm.remark =  self.selectNowData.remark; //备注
          self.tkForm.plateNo = self.selectNowData.plateNo ; //车牌号
          self.tkForm.truckId =self.selectNowData.relTruckId; //车牌ID
          self.tkForm.driverTelphone = self.isStringHandle(self.selectNowData.driverName + '/' + self.selectNowData.driverTelephone); //低级手机/电话
          self.tkForm.driverId =   self.selectNowData.relDriverId; //司机Id
          self.tkForm.fleet = self.selectNowData.transFleet;
          self.tkForm.sendTruckId = self.selectNowData.sendTruckId;

          if( self.selectNowData.doBillType == null || self.selectNowData.doBillType == '内排') {
            this.tuoKaFormVisible = true;
            this.tkForm.plateNoShow = true;
            this.tkForm.transFleetShow = false;
            this.tkForm.sendTypeDisabled = false;
            this.tkForm.sendType = '内排';
          }else {
            this.tuoKaFormVisible = true;
            this.tkForm.plateNoShow = false;
            this.tkForm.transFleetShow = true;
            this.tkForm.sendType = '外排';

          }

        } else if( selectedRows.length > 1) {
          this.tuoKaFormVisible = true;
          this.tkForm.plateNoShow = false;
          this.tkForm.transFleetShow = true;
          this.tkForm.sendTypeDisabled = true;
          this.tkForm.sendType = '外排';
        }else {
          self.$alert('请选择一条数据','信息',{
            confirmButtonText: '确定',
          })
        }

      },
      //保存托卡
      tkSaveBtn() {
        let self = this;
        let tkWp = {
          sendType: this.tkForm.sendType,
          transFleet:this.tkForm.transFleet,
          relTransFleetId:this.tkForm.transFleetId,
          remark: this.tkForm.remark,
          sendTruckId:this.tkForm.sendTruckId,
        };
        let tkNp = {
          sendTruckId:this.tkForm.sendTruckId,
          sendType: this.tkForm.sendType,
          transFleet:this.tkForm.fleet,
          relTransFleetId:this.tkForm.transFleetId,
          driverName:this.tkForm.driverName,
          plateNo: this.tkForm.relPlateNo,
          relDriverId: this.tkForm.driverId,
          driverTelephone:this.tkForm.driverPhone,
          relTruckId: this.tkForm.truckId,
          remark:  this.tkForm.remark
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
              self.getRowData();
              self.tuoKaFormVisible = false;
             // self.$refs['tkForm'].resetFields();
              //数据清空
              self.restData();
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
              self.getRowData();
              self.tuoKaFormVisible = false;
             // self.$refs['tkForm'].resetFields();
              //数据清空
              self.restData();
            })
            .catch(function(err){
              console.log(err);

            });
        }

      },
//清空数据函数
      restData() {
         this.tkForm.transFleet= '';
        this.tkForm.transFleetId= '';
        this.tkForm.driverName= '';
        this.tkForm.telephone1= '';
        this. tkForm.driverPhone= '';
        this.tkForm.driverTelphone= '';
        this.tkForm.truckId= '';
        this.tkForm.driverId= '';
        this.tkForm.plateNo= '';
        this.tkForm.fleet= '';
        this.tkForm.shipperId= '';
        this.tkForm.remark= '';
      },
      //作废按钮操作
      inValid() {
        let self = this ;
        let selectedRows  = this.gridOptions.api.getSelectedRows();
/*        for(let i=0; i<selectedRows.length;i++){
            selectedRows[i].xdTkBillId
        }*/
        if(selectedRows[0].billStatus == '作废') {
          this.$alert('此单子已经作废，请勿重复作废', '', {
            confirmButtonText: '确定'
          })
        }else {
          api.tkOrderStateChange(selectedRows[0].xdTkBillId,'作废')
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
        if(selectedRows[0].billStatus == '完成') {
          this.$alert('此单子已经完成，请勿重复完成', '', {
            confirmButtonText: '确定'
          })
        }else {
          api.tkOrderStateChange(selectedRows[0].xdTkBillId,'完成')
            .then(function (res) {
              self.getRowData();
            })
            .catch(function(err) {

              console.log(err)
            })
        }
      },

      /*=================*/
      onDoubleClicked(item) {
        this.billFormVisible = true;

        console.log(item.data);
        this.doubleData = item.data;
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
    },
    mounted() {
      let tool = new Tool();
      this.defCol = tool.getIte('caseOrder').littleHeader;

      console.log(33333,this.defCol);
      this.getRowData();
      this.teuTypeHandle();
      this.sendTypeHandle();
      this.gridOptions.api.sizeColumnsToFit();

     this.createColumnDefs();
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

