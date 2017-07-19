<template>
  <div class="grid" style="">
      <el-button @click="addCarBtn">新增</el-button>
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-fresh" id="myGrid"
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
    <el-tabs v-model="activeName">
      <el-tab-pane label="车头信息" name="车头信息">
        <el-button @click="editCarBtn" v-show="isDetails">编辑</el-button>
        <el-button @click="saveCarBtn" v-show="!isDetails">保存</el-button>
        <el-button @click="delCarBtn" v-show="isDetails">删除</el-button>
        <el-button @click="cancelCarBtn" v-show="!isDetails">取消</el-button>
        <div v-show="isDetails">
          <el-form :model="showForm"  label-width="140px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="车头牌号">
                  <span>{{showForm.tractorNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所有人" >
                  <span>{{showForm.owner}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌型号" prop="model">
                  <span>{{showForm.model}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="自重">
                  <span>{{showForm.selfWeight}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
              <el-form-item label="马力" prop="engine">
                <span>{{showForm.engine}}</span>
              </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="登记日期">
                  <span>{{showForm.registerDate}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="季审日期">
                  <span>{{showForm.quarterlyDate}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态">
                  <span>{{showForm.status}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="燃料类型">
                  <span>{{showForm.fuelType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="年审日期">
                  <span>{{showForm.nextReturnDueStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="车辆类型">
                  <span>{{showForm.truckType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="轴数" prop="rollerNum">
                  <span>{{showForm.rollerNum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进港证号" >
                  <span>{{showForm.enterPortNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="白卡号">
                  <span>{{showForm.bondedTruckNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="行驶证号">
                  <span>{{showForm.licenseNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="归属车队">
                  <span>{{showForm.fleet}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经营模式">
                  <span>{{showForm.manageMode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注" >
                  <span>{{showForm.remark}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div v-show="!isDetails">
          <el-form :model="editForm"  label-width="140px" :rules="editFormRules"  ref="editForm">
            <el-row>
              <el-col :span="6">
                <el-form-item label="车头牌号"  prop="tractorNo">
                  <el-input v-model="editForm.tractorNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所有人" prop="owner">
                  <el-input v-model="editForm.owner" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌型号" prop="model">
                  <el-input v-model="editForm.model" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="自重" prop="selfWeight">
                  <el-input v-model="editForm.selfWeight" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="马力" prop="engine">
                  <el-input v-model="editForm.engine" placeholder="请输入内容" :maxlength="18"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="登记日期" prop="registerDate">
                  <el-input v-model="editForm.registerDate" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="季审日期" prop="quarterlyDate">
                  <el-input v-model="editForm.quarterlyDate" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" prop="status">
                  <el-select v-model="editForm.status"  clearable placeholder="请选择">
                    <el-option
                      v-for="item in editForm.options"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="燃料类型"  prop="fuelType">
                  <el-input v-model="editForm.fuelType" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="年审日期" prop="nextReturnDueStr">
                  <el-date-picker
                    v-model="editForm.nextReturnDueStr"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="车辆类型" prop="truckType">
                  <el-input v-model="editForm.workNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="轴数" prop="rollerNum">
                  <el-input v-model="editForm.rollerNum" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="进港证号"  prop="enterPortNo">
                  <el-input v-model="editForm.enterPortNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="白卡号"  prop="bondedTruckNo">
                  <el-input v-model="editForm.bondedTruckNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="行驶证号"  prop="licenseNo">
                  <el-input v-model="editForm.licenseNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="归属车队"  prop="fleet">
                  <el-input v-model="editForm.fleet" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经营模式"  prop="manageMode">
                  <el-input v-model="editForm.manageMode" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注"  prop="remark">
                  <el-input v-model="editForm.remark" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="司机新增" v-model="dialogFormVisible" size="large">
      <el-form :model="addForm"  label-width="140px" :rules="addFormRules"  ref="addForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="车头牌号"  prop="tractorNo">
              <el-input v-model="addForm.tractorNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所有人" prop="owner">
              <el-input v-model="addForm.owner" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="厂牌型号" prop="model">
              <el-input v-model="addForm.model" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="自重" prop="selfWeight">
              <el-input v-model="addForm.selfWeight" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="马力" prop="engine">
              <el-input v-model="addForm.engine" placeholder="请输入内容" :maxlength="18"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记日期" prop="registerDate">
              <el-input v-model="addForm.registerDate" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="季审日期" prop="quarterlyDate">
              <el-input v-model="addForm.quarterlyDate" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="addForm.status"  clearable placeholder="请选择">
                <el-option
                  v-for="item in addForm.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="燃料类型"  prop="fuelType">
              <el-input v-model="addForm.fuelType" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="6" >-->
            <!--<el-form-item label="年审日期" prop="nextReturnDueStr">-->
              <!--<el-date-picker-->
                <!--v-model="addForm.nextReturnDueStr"-->
                <!--type="date"-->
                <!--placeholder="选择日期"-->
                <!--:editable="false"-->
                <!--&gt;-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="6" >
            <el-form-item label="车辆类型" prop="truckType">
              <el-input v-model="addForm.workNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="轴数" prop="rollerNum">
              <el-input v-model="addForm.rollerNum" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进港证号"  prop="enterPortNo">
              <el-input v-model="addForm.enterPortNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="白卡号"  prop="bondedTruckNo">
              <el-input v-model="addForm.bondedTruckNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行驶证号"  prop="licenseNo">
              <el-input v-model="addForm.licenseNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属车队"  prop="fleet">
              <el-input v-model="addForm.fleet" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经营模式"  prop="manageMode">
              <el-input v-model="addForm.manageMode" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注"  prop="remark">
              <el-input v-model="addForm.remark" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addSaveBtn">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";
  import api from '../../../api/api'
  export default {
    props: ['getDataForm','activeNameMsg'],
    name: "grid",
    data() {
      return {
        gridOptions: {getRowNodeId: function(data) { return data.chargeOffId; }},
        columnDefs: [],
        rowData: null,
        defCol: [
          {name: "车牌号", id: 0, isChecked:true, record: "tractorNo"},
          {name: "车辆助记码", id: 1, isChecked:false, record: "memCode"},
          {name: "所有人*", id: 2, isChecked:false, record: "owner"},
          {name: "厂牌型号", id: 8, isChecked:false, record: "model"},
          {name: "自重", id: 3, isChecked:false, record: "selfWeight"},
          {name: "马力*", id: 4, isChecked:false, record: "engine"},
          {name: "登记日期", id: 5, isChecked:false, record: "registerDate"},
          {name: "季审日期", id: 6, isChecked:false, record: "quarterlyDate"},
          {name: "年审日期", id: 6, isChecked:false, record: "annualInspPeriod"},
          {name: "燃料类型", id: 6, isChecked:false, record: "fuelType"},
          {name: "车辆类型*", id: 6, isChecked:false, record: "truckType"},
          {name: "轴数", id: 6, isChecked:false, record: "rollerNum"},
          {name: "进港证号", id: 6, isChecked:false, record: "enterPortNo"},
          {name: "白卡号", id: 6, isChecked:false, record: "bondedTruckNo"},
          {name: "行驶证号", id: 6, isChecked:false, record: "licenseNo"},
          {name: "状态", id: 6, isChecked:false, record: "status"},
        ],
        activeName: '车头信息',
        dialogFormVisible:false,
        //车头新增数据
        addForm : {
          tractorNo:'',//车牌号
          owner:'', //所有人
          model:'', //厂牌型号
          selfWeight:'', //自重
          engine:'',//马力
          registerDate:'',//登记日期
          quarterlyDate:'',//季审日期
          fuelType:'',//燃料类型
          truckType:'',//车辆类型
          rollerNum:'',//轴数
          enterPortNo:'',//进港证号
          bondedTruckNo:'',//白卡号
          licenseNo:'',//行驶证号
          status:'',//状态
          fleet:'',//归属车队
          relFleetId:'',//关联车队ID
          manageMode:'',//经营模式
          remark:'',//备注
          options:[]


        },
        addFormRules: {},
        //车头显示数据
        showForm : {
          tractorNo:'',//车牌号
          owner:'', //所有人
          model:'', //厂牌型号
          selfWeight:'', //自重
          engine:'',//马力
          registerDate:'',//登记日期
          quarterlyDate:'',//季审日期
          fuelType:'',//燃料类型
          truckType:'',//车辆类型
          rollerNum:'',//轴数
          enterPortNo:'',//进港证号
          bondedTruckNo:'',//白卡号
          licenseNo:'',//行驶证号
          status:'',//状态
          fleet:'',//归属车队
          relFleetId:'',//关联车队ID
          manageMode:'',//经营模式
          remark:''//备注
        },
        isDetails:true,
        //车头编辑数据
        editForm : {
          tractorNo:'',//车牌号
          owner:'', //所有人
          model:'', //厂牌型号
          selfWeight:'', //自重
          engine:'',//马力
          registerDate:'',//登记日期
          quarterlyDate:'',//季审日期
          fuelType:'',//燃料类型
          truckType:'',//车辆类型
          rollerNum:'',//轴数
          enterPortNo:'',//进港证号
          bondedTruckNo:'',//白卡号
          licenseNo:'',//行驶证号
          status:'',//状态
          fleet:'',//归属车队
          relFleetId:'',//关联车队ID
          manageMode:'',//经营模式
          remark:'',//备注
          options:[],

        },
        editFormRules: {},
        //
        selectData:null,
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    watch: {
      'activeNameMsg': function() {
        if(this.activeNameMsg === '车头登记'){
          this.getRowData();
        }

      },
      'selectData.truckBaseId':function(val,oldVal) {
        this.showFormMsg(val);
      }
    },
    methods: {
      //初始化
      initData(xdtList){
        console.log('开始初始化数据=============')
        console.log(xdtList);
//        this.gridOptions.api.setRowData(xdtList);//将数据插入到表格里面
//        this.createRowData(xdtList);
        this.rowData = xdtList;
      },
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            annualInspPeriod: objTemp.annualInspPeriod,
            bondedTruckNo: objTemp.bondedTruckNo,
            createDate: objTemp.createDate,
            createUser: objTemp.createUser,
            engine: objTemp.engine,
            enterPortNo: objTemp.enterPortNo,
            fleet: objTemp.fleet,
            fuelType: objTemp.fuelType,
            licenseNo: objTemp.licenseNo,
            manageMode: objTemp.manageMode,
            memCode: objTemp.memCode,
            model: objTemp.model,
            owner: objTemp.owner,
            quarterlyDate: objTemp.quarterlyDate,
            registerDate: objTemp.registerDate,
            relFleetId: objTemp.relFleetId,
            remark: objTemp.remark,
            rollerNum: objTemp.rollerNum,
            selfWeight: objTemp.selfWeight,
            status: objTemp.status,
            tractorNo: objTemp.tractorNo,
            truckBaseId: objTemp.truckBaseId,
            truckType: objTemp.truckType,
            twoLevelMainDate: objTemp.twoLevelMainDate
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
        var selectData = item.node.data;
         this.selectData = item.node.data;
       // this.$emit("seletClk",selectData);

      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
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
      getRowData(state) {
        let self = this;

        api.carHeaderListShow()
          .then(function(res) {
            console.log(res);
            self.initData(res);
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
      //新增车辆按钮
      addCarBtn() {
        this.dialogFormVisible = true;
      },
      //存储状态
      showState() {
        let self = this;
        api.selectBusTypeHandle( 'status')
          .then(function (res) {
            let selectData = [];
            let  data  = res.data;
            console.log(data);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.editForm.options = selectData;
            self.addForm.options = selectData;
          })
          .catch(function(err){

          })
      },

      //保存
      addSaveBtn() {
       let params = {
         tractorNo:this.addForm.tractorNo,//车牌号
         owner:this.addForm.owner, //所有人
         model:this.addForm.model, //厂牌型号
         selfWeight:this.addForm.selfWeight, //自重
         engine:this.addForm.engine,//马力
//         registerDate:this.addForm.registerDate,//登记日期
//         quarterlyDate:this.addForm.quarterlyDate,//季审日期
         fuelType:this.addForm.fuelType,//燃料类型
         truckType:this.addForm.truckType,//车辆类型
         rollerNum:this.addForm.rollerNum,//轴数
         enterPortNo:this.addForm.enterPortNo,//进港证号
         bondedTruckNo:this.addForm.bondedTruckNo,//白卡号
         licenseNo:this.addForm.licenseNo,//行驶证号
         status:this.addForm.status,//状态
         fleet:this.addForm.fleet,//归属车队
         relFleetId:this.addForm.relFleetId,//关联车队ID
         manageMode:this.addForm.manageMode,//经营模式
         remark:this.addForm.remark//备注
       };
        this.carHeaderAddInterface(params)
      },
      //调用新增的接口
      carHeaderAddInterface(params) {
        let self = this;
        api.carHeaderAdd(params)
          .then(function(res) {
            console.log('成功后的回调');
            console.log(res.data);
            self.successAddHandle(res.data);
          })
          .catch(function(err) {
            console.log(err)
          })
      },
      //新增成功后的回调
      successAddHandle(item) {
        this.dialogFormVisible = false;
        this.addNewRow(item)
      },
      //删除按钮
      delCarBtn() {
        let self = this;
        let selectRows = this.gridOptions.api.getSelectedRows();

        if(this.selectData == null) {
          alert('请选择一条数据！')
        } else {
          let params = {
            truckBaseId: this.selectData.truckBaseId
          };
          api.carHeaderDel(params)
            .then(function(res) {
              self.refreshView();
            })
            .catch(function (err) {
              console.log(err);

            })

        }
      },
      //编辑按钮
      editCarBtn() {
        this.isDetails = false;

      },
      //保存按钮
      saveCarBtn() {
        let params = {
          truckBaseId: this.selectData.truckBaseId,
          tractorNo:this.editForm.tractorNo,//车牌号
          owner:this.editForm.owner, //所有人
          model:this.editForm.model, //厂牌型号
          selfWeight:this.editForm.selfWeight, //自重
          engine:this.editForm.engine,//马力
//          registerDate:this.editForm.registerDate,//登记日期
//          quarterlyDate:this.editForm.quarterlyDate,//季审日期
          fuelType:this.editForm.fuelType,//燃料类型
          truckType:this.editForm.truckType,//车辆类型
          rollerNum:this.editForm.rollerNum,//轴数
          enterPortNo:this.editForm.enterPortNo,//进港证号
          bondedTruckNo:this.editForm.bondedTruckNo,//白卡号
          licenseNo:this.editForm.licenseNo,//行驶证号
          status:this.editForm.status,//状态
          fleet:this.editForm.fleet,//归属车队
          relFleetId:this.editForm.relFleetId,//关联车队ID
          manageMode:this.editForm.manageMode,//经营模式
          remark:this.editForm.remark//备注
        };
        this.saveCarInterface(params)
      },
      //保存接口
      saveCarInterface(params) {
        let self = this;
        api.carHeaderMod(params)
          .then(function(res) {
            console.log('成功后返回的值');
            console.log(res);
            self.successSave(res.data);
          })
          .catch(function(err) {
            console.log(err);

          })
      },
      //保存成功后的回调函数
      successSave(item) {
        console.log('我是成功后的回调');
        this.isDetails = true;
        this.showForm = item;
        this.updateRow(item); //更新当前表格数据
      },

      //取消按钮
      cancelCarBtn() {
        this.isDetails = true;
      },
      //单机显示列表 数据
      showFormMsg(val) {
        let self = this;
        let params = {
          truckBaseId: val
        };
        api.carHeaderListShow(params)
          .then(function(res) {
            console.log(res);
            let showData = res[0];
            for(let showJson in showData) {
              self.showForm[showJson] = showData[showJson];
              self.editForm[showJson] = showData[showJson];
            }
          })
          .catch(function(err) {

          })
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
      this.showState();//加载状态
    },
    destroyed(){
      console.log("destroyed" + new Date());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*  .grid {
      text-align: center;
    }*/
</style>
