<template>
  <div class="grid" style="">
      <el-button @click="addCarBtn" size="small">新增</el-button>
      <el-button @click="bindCarBtn" size="small">绑挂</el-button>
      <el-button  size="small" @click="cancelBindBtn">解挂</el-button>
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
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
                 :floatingFilter="true"
                 :rowData="rowData">
    </ag-grid-vue>
    <div>
      总条数: {{totals}} 条
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="车头信息" name="车头信息">
        <el-button @click="editCarBtn" v-show="isDetails" size="small">编辑</el-button>
        <el-button @click="saveCarBtn" v-show="!isDetails"   size="small">保存</el-button>
        <el-button @click="delCarBtn" v-show="isDetails"  size="small">删除</el-button>
        <el-button @click="cancelCarBtn" v-show="!isDetails"  size="small"> 取消</el-button>
        <div v-show="isDetails">
          <el-form :model="showForm"  label-width="140px">
            <el-row  class="col-height-show">
              <el-col :span="6">
                <el-form-item label="车头牌号">
                  <span>{{showForm.tractorNo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="助记码">
                  <span>{{showForm.memCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="登记公司" >
                  <span>{{showForm.owner}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌型号" prop="model">
                  <span>{{showForm.model}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="自重(KG)">
                  <span>{{showForm.selfWeight}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
              <el-form-item label="马力(匹)" prop="engine">
                <span>{{showForm.engine}}</span>
              </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="登记日期">
                  <span>{{showForm.registerDateStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年审日期">
                  <span>{{showForm.quarterlyDateStr}}</span>
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
<!--              <el-col :span="6" >
                <el-form-item label="年审日期">
                  <span>{{showForm.nextReturnDueStr}}</span>
                </el-form-item>
              </el-col>-->
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
                <el-form-item label="车架号">
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
            <el-row class="col-height">
              <el-col :span="6">
                <el-form-item label="车头牌号"  prop="tractorNo">
                  <el-input v-model="editForm.tractorNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="助记码"  prop="tractorNo">
                  <el-input v-model="editForm.memCode" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="登记公司" prop="owner">
                  <el-input v-model="editForm.owner" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂牌型号" prop="model">
                  <el-input v-model="editForm.model" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="自重(KG)" prop="selfWeight">
                  <el-input v-model="editForm.selfWeight" placeholder="请输入内容"  value="number"  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="马力(匹)" prop="engine">
                  <el-input v-model="editForm.engine" placeholder="请输入内容" :maxlength="18"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="登记日期" prop="registerDateStr">
                  <el-date-picker
                    v-model="editForm.registerDateStr"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年审日期" prop="quarterlyDateStr">
                  <el-date-picker
                    v-model="editForm.quarterlyDateStr"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                  >
                  </el-date-picker>
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
                  <el-select v-model="editForm.fuelType" placeholder="请选择">
                    <el-option
                      v-for="item in editForm.fuelTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                </el-form-item>
              </el-col>
           <!--   <el-col :span="6" >
                <el-form-item label="年审日期" prop="nextReturnDueStr">
                  <el-date-picker
                    v-model="editForm.nextReturnDueStr"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>-->
              <el-col :span="6" >
                <el-form-item label="车辆类型" prop="truckType">
                  <el-select v-model="editForm.truckType" placeholder="请选择">
                    <el-option
                      v-for="item in addForm.truckTypeOptions"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="轴数" prop="rollerNum">
                  <el-select v-model="editForm.rollerNum" placeholder="请选择">
                    <el-option
                      v-for="item in addForm.rollerNumOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
                <el-form-item label="车架号"  prop="licenseNo">
                  <el-input v-model="editForm.licenseNo" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="归属车队"  prop="fleet">
                  <el-select v-model="editForm.fleet"  clearable placeholder="请选择">
                    <el-option
                      v-for="item in editForm.options2"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经营模式"  prop="manageMode">
                  <el-select v-model="editForm.manageMode" placeholder="请选择">
                    <el-option
                      v-for="item in editForm.manageModeOptions"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
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
    <el-dialog :modal="false"  @close="addHandClose"  :close-on-click-modal="false"  title="新增" v-model="dialogFormVisible" size="large">
      <el-form :model="addForm"  label-width="140px" :rules="addFormRules"  ref="addForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="车头牌号"  prop="tractorNo">
              <el-input v-model="addForm.tractorNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="助记码"  prop="memCode">
              <el-input v-model="addForm.memCode" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记公司" prop="owner">
              <el-input v-model="addForm.owner" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="厂牌型号" prop="model">
              <el-input v-model="addForm.model" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="自重(KG)" prop="selfWeight">
              <el-input v-model="addForm.selfWeight" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="马力(匹)" prop="engine">
              <el-input v-model="addForm.engine" placeholder="请输入内容" :maxlength="18"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记日期" prop="registerDateStr">
                <el-date-picker
                  v-model="addForm.registerDateStr"
                  format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  :editable="false"
                >
                </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年审日期" prop="quarterlyDateStr">
              <el-date-picker
                v-model="addForm.quarterlyDateStr"
                format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                :editable="false"
              >
              </el-date-picker>
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
              <el-select v-model="addForm.fuelType" placeholder="请选择">
                <el-option
                  v-for="item in addForm.fuelTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="车辆类型" prop="truckType">
              <el-select v-model="addForm.truckType" placeholder="请选择">
                <el-option
                  v-for="item in addForm.truckTypeOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="轴数" prop="rollerNum">
              <el-select v-model="addForm.rollerNum" placeholder="请选择">
                <el-option
                  v-for="item in addForm.rollerNumOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
            <el-form-item label="车架号"  prop="licenseNo">
              <el-input v-model="addForm.licenseNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属车队"  prop="fleet">
              <el-select v-model="addForm.fleet"  clearable placeholder="请选择" @change="valueChange">
                <el-option
                  v-for="item in addForm.options2"
                  :key="item.value"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经营模式"  prop="manageMode">
              <el-select v-model="addForm.manageMode" placeholder="请选择">
                <el-option
                  v-for="item in addForm.manageModeOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
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

    <!--司机驾驶车辆号弹出框-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="绑挂" v-model="bindFormVisible" size="small">
      <el-form :model="bindForm"  label-width="100px" :rules="bindRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="挂车号">
              <el-autocomplete
                style="width:200px"
                v-model="bindForm.plateNo"
                placeholder="请输入内容"
                :fetch-suggestions="plateNoSearch"
                @select="plateNoSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="bindSaveBtn">保存</el-button>
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
          {name: "车头牌号", id: 0, isChecked:true, record: "tractorNo"},
         {name: "车辆助记码", id: 1, isChecked:false, record: "memCode"},
          {name: "登记公司*", id: 2, isChecked:false, record: "owner"},
          {name: "厂牌型号", id: 8, isChecked:false, record: "model"},
          {name: "自重(KG)", id: 3, isChecked:false, record: "selfWeight"},
          {name: "马力(匹)*", id: 4, isChecked:false, record: "engine"},
          {name: "登记日期", id: 5, isChecked:false, record: "registerDateStr"},
          {name: "年审日期", id: 6, isChecked:false, record: "quarterlyDateStr"},
         // {name: "年审日期", id: 6, isChecked:false, record: "annualInspPeriod"},
          {name: "燃料类型", id: 6, isChecked:false, record: "fuelType"},
          {name: "车辆类型*", id: 6, isChecked:false, record: "truckType"},
          {name: "轴数", id: 6, isChecked:false, record: "rollerNum"},
          {name: "进港证号", id: 6, isChecked:false, record: "enterPortNo"},
          {name: "白卡号", id: 6, isChecked:false, record: "bondedTruckNo"},
          {name: "车架号", id: 6, isChecked:false, record: "licenseNo"},
          {name: "状态", id: 6, isChecked:false, record: "status"},
          {name: "挂车号", id: 6, isChecked:false, record: "trailerNo"}
        ],
        activeName: '车头信息',
        dialogFormVisible:false,
        //车头新增数据
        addForm : {
          tractorNo:'',//车牌号
          memCode:'',//助记码
          owner:'', //登记公司
          model:'', //厂牌型号
          selfWeight:'', //自重
          engine:'',//马力(匹)
          registerDateStr:'',//登记日期
          quarterlyDateStr:'',//年审日期
          fuelType:'',//燃料类型
          truckType:'',//车辆类型
          rollerNum:'',//轴数
          enterPortNo:'',//进港证号
          bondedTruckNo:'',//白卡号
          licenseNo:'',//车架号
          status:'有效',//状态
          fleet:'',//归属车队
          relFleetId:'',//关联车队ID
          manageMode:'',//经营模式
          remark:'',//备注
          options:[],
          options2:[],
          manageModeOptions:[],
          truckTypeOptions:[],
          fuelTypeOptions:[
            {
              value: '油',
              label: '油'
            },
            {
              value: '气',
              label: '气'
            }
          ],
          rollerNumOptions:[
            {
              value: '2',
              label: '2'
            },
            {
              value: '3',
              label: '3'
            },
            {
              value: '4',
              label: '4'
            }
          ],
          customerBaseId:''
        },
        addFormRules: {
          fleet: [
            { required: true, message: '请输入车队', trigger: 'blur',type: 'number' }
          ],
        },
        //车头显示数据
        showForm : {
          tractorNo:'',//车牌号
          memCode:'',//助记码
          owner:'', //登记公司
          model:'', //厂牌型号
          selfWeight:'', //自重(KG)
          engine:'',//马力(匹)
          registerDateStr:'',//登记日期
          quarterlyDateStr:'',//年审日期
          fuelType:'',//燃料类型
          truckType:'',//车辆类型
          rollerNum:'',//轴数
          enterPortNo:'',//进港证号
          bondedTruckNo:'',//白卡号
          licenseNo:'',//车架号
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
          memCode:'',//助记码
          owner:'', //登记公司
          model:'', //厂牌型号
          selfWeight:'', //自重(KG)
          engine:'',//马力(匹)
          registerDateStr:'',//登记日期
          quarterlyDateStr:'',//年审日期
          fuelType:'',//燃料类型
          truckType:'',//车辆类型
          rollerNum:'',//轴数
          enterPortNo:'',//进港证号
          bondedTruckNo:'',//白卡号
          licenseNo:'',//车架号
          status:'',//状态
          fleet:'',//归属车队
          manageMode:'',//经营模式
          remark:'',//备注
          relFleetId:'',//关联车队ID
          options:[],
          options2:[],
          manageModeOptions:[],
          truckTypeOptions:[],
          fuelTypeOptions:[
            {
              value: '油',
              label: '油'
            },
            {
              value: '气',
              label: '气'
            }
          ],
          rollerNumOptions:[
            {
              value: '2',
              label: '2'
            },
            {
              value: '3',
              label: '3'
            },
            {
              value: '4',
              label: '4'
            }
          ],

        },
        editFormRules: {},
        //
        selectData:null,
        totals:'',
        //绑定框
        bindFormVisible: false,
        bindForm:{
          plateNo: '',
          trailerId:'',  //挂车ID
          truckId:'',  //车头ID
          tractorNo: '', //车头号
          guaNumber:'' //挂车号
        },
        bindRules: {},
      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
    },
    watch: {
      'activeNameMsg': function() {
        if(this.activeNameMsg === '车辆'){
          console.log('22555');
          this.getRowData();
          this.gridOptions.api.sizeColumnsToFit();
        }

      },
      'selectData.truckBaseId':function(val,oldVal) {
        this.showFormMsg(val);
      }
    },
    methods: {
      //转日期格式
      formatDate(date) {
        if(!date) {
          return '';
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
      rowDataChanged() {
        let self = this;
        if(this.rowData != null && this.rowData.length > 0){
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
        console.log('开始初始化数据=============');
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
            createDateStr: objTemp.createDateStr,
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
            quarterlyDateStr: objTemp.quarterlyDateStr,
            registerDateStr: objTemp.registerDateStr,
            relFleetId: objTemp.relFleetId,
            remark: objTemp.remark,
            rollerNum: objTemp.rollerNum,
            selfWeight: objTemp.selfWeight,
            status: objTemp.status,
            tractorNo: objTemp.tractorNo,
            truckBaseId: objTemp.truckBaseId,
            truckType: objTemp.truckType,
            twoLevelMainDateStr: objTemp.twoLevelMainDateStr
          })
        }
        this.rowData = rowData;
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
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
            self.totals = res.length;
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
      //归属车队查询
      //车牌号模糊搜索
      fleetSearch(queryString, callback) {
        let self = this;
        api.fleetCarSearch(queryString)
          .then(function (res) {
            console.log(res);
            let  data  = res.data;
            let resultData = [];
            for(var objTemp of data){
              resultData.push({
                customerBaseId:objTemp.customerBaseId,
                value:objTemp.custShortName
              })
            }
            callback(resultData);

          }).catch(function(err){
          console.log(err);

        })
      },
      showCarType() {
        let self = this;
        api.selectBusTypeHandle( 'truck_type')
          .then(function (res) {
            let selectData = [];
            let  data  = res.data;
            console.log(res);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.editForm.truckTypeOptions = selectData;
            self.addForm.truckTypeOptions = selectData;
          })
          .catch(function(err){

          })
      },
      //经营模式下拉框
      jinModel() {
        let self = this;
        api.selectBusTypeHandle('manage_mode')
          .then(function (res) {
            console.log('我是经营模式');
            console.log(res);
            let selectData = [];
            let  data  = res.data;

            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.editForm.manageModeOptions = selectData;
            self.addForm.manageModeOptions = selectData;
          })
          .catch(function(err){

          })
      },

      //数据刷新
      refreshView() {
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.gridOptions.api.removeItems(selectedNodes);
        this.getRowData();
      },
      //增加表格数据
      addNewRow(objTemp){
        this.getRowData();
/*        var newStore = this.rowData.slice();
        newStore.unshift(objTemp);
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里*/
      },

      //车牌号模糊搜索
      plateNoSearch(queryString, callback) {
        let self = this;
        api.guaCarSearchList(queryString).then(function (res) {
          let    data  = res.data;
           let tkPcDataList = [];
           console.log(data);
          for(var objTemp of data){
            tkPcDataList.push({
              trailerId: objTemp.trailerId,
              value: objTemp.tractorNo,
              tractorNo: objTemp.tractorNo
            });
          }
          callback(tkPcDataList);
        }).catch(function(err){
          console.log(err);

        })
      },
      //车牌号下拉选中函数
      plateNoSelect(item) {
        this.bindForm.trailerId = item.trailerId;
        this.bindForm.guaNumber = item.tractorNo;
      },

      //绑定挂车
       bindCarBtn() {
         let self = this;
         let selectRows = this.gridOptions.api.getSelectedRows();
         let nowData = selectRows[0];


         if(selectRows.length !=0 ) {
           if( !nowData.trailerNo) {
             self.bindFormVisible = true ;
             self.bindForm.truckId = selectRows[0].truckBaseId;
             self.bindForm.tractorNo = selectRows[0].tractorNo;
             console.log(selectRows);
           }else{
             this.$alert('该车辆已经绑定，无须重复绑定', '信息', {
               confirmButtonText: '确定'
             })
           }
         } else {
           this.$alert('请选择一条数据进行绑定挂车', '信息', {
             confirmButtonText: '确定'
           })
         }
       },
      //挂车保存
      bindSaveBtn() {
        let params = {
          relTruckId: this.bindForm.truckId,
          relTrailerId:  this.bindForm.trailerId,
          truckNo: this.bindForm.tractorNo,
          trailerNo: this.bindForm. guaNumber,
        };
        console.log(params);
        this.bindCarInterface(params);
      },
      //绑定挂车接口
      bindCarInterface(params) {
        let self =this;
        api.bindGuaCar(params)
          .then(function(res) {
            console.log(res.data);
          self.successBindHandle(res.data);
          })
          .catch(function(err) {})
      },
      //绑定成功处理的函数
      successBindHandle(item) {
        this.bindFormVisible = false ;
        this.updateRow(item);
        for(let objectTep in this.bindForm) {
          this.bindForm[objectTep] = '';
        }
        console.log(this.bindForm);
      },

      //取消绑定按钮
      cancelBindBtn() {
        let self = this;
        let selectRows = this.gridOptions.api.getSelectedRows();
        let nowData = selectRows[0];
       if(nowData.trailerNo  != '') {
         let params = {
           relTruckId: nowData.truckBaseId
         };
         this.$confirm('确认取消绑定?', '提示', {
             type: 'warning'
           })
           .then(function() {
             self.cancelCarInterface(params);
           });
       }else  {
         this.$alert('该车辆未绑定挂车', '信息', {
           confirmButtonText: '确定'
         })
       }
      },
      //j解绑接口
      cancelCarInterface(params) {
        let self =this;
        api.cancelGuaCar(params)
          .then(function(res) {
           self.cancelCarHandle(res.data);
          })
          .catch(function(err) {

          })
      },
//解绑成功后处理的函数
      cancelCarHandle(item) {
         console.log(item);
          this.updateRow(item);
      },

      //新增取消
      addHandClose() {
        this.$refs['addForm'].resetFields();
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
      //关联车队
      showCarState() {
        let self = this;
        api.fleetRelSelect( '接运')
          .then(function (res) {
            let selectData = [];
            let  data  = res;
            console.log("999999");
            console.log(res);
            for (let objTemp of data) {
              selectData.push({key:objTemp.customerBaseId,"value":objTemp.custShortName })
            }
            console.log(selectData);
            self.editForm.options2 = selectData;
            self.addForm.options2 = selectData;
          })
          .catch(function(err){

          })
      },
      valueChange(key) {
        this.addForm.relFleetId = key;
      },
      valueChange2(key) {
        this.editForm.relFleetId = key;
      },

      //保存
      addSaveBtn() {
        let self = this;
        this.$refs.addForm.validate(function(valid){
          if(valid) {
            let params = {
              tractorNo:self.addForm.tractorNo,//车牌号
              memCode:self.addForm.memCode,//助记码
              owner:self.addForm.owner, //登记公司
              model:self.addForm.model, //厂牌型号
              selfWeight:self.addForm.selfWeight, //自重(KG)
              engine:self.addForm.engine,//马力(匹)
              registerDateStr:self.formatDate(self.addForm.registerDateStr),//登记日期
              quarterlyDateStr:self.formatDate(self.addForm.quarterlyDateStr),//年审日期
              fuelType:self.addForm.fuelType,//燃料类型
              truckType:self.addForm.truckType,//车辆类型
              rollerNum:self.addForm.rollerNum,//轴数
              enterPortNo:self.addForm.enterPortNo,//进港证号
              bondedTruckNo:self.addForm.bondedTruckNo,//白卡号
              licenseNo:self.addForm.licenseNo,//车架号
              status:self.addForm.status,//状态
              fleet:self.addForm.fleet,//归属车队
              relFleetId:self.addForm.relFleetId,//关联车队ID
              manageMode:self.addForm.manageMode,//经营模式
              remark:self.addForm.remark//备注
            };
            console.log(params);
            self.carHeaderAddInterface(params)
          }
        });

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
        this.$refs['addForm'].resetFields();
        this.dialogFormVisible = false;
        this.addNewRow(item)
      },
      //删除按钮
      delCarBtn() {
        let self = this;
        let selectRows = this.gridOptions.api.getSelectedRows();
       console.log(selectRows);
        if(this.selectData == null || !selectRows ) {
          this.$alert('请选择一条数据', '信息', {
            confirmButtonText: '确定'
          })
        } else {
          this.$confirm('确认删除该记录吗?', '提示', {
              type: 'warning'
            })
            .then(function() {
              let params = {
                truckBaseId: self.selectData.truckBaseId
              };
              api.carHeaderDel(params)
                .then(function(res) {
                  self.refreshView();
                  for(let item in self.showForm) {
                    self.showForm[item] = '';
                  }
                })
                .catch(function (err) {
                  console.log(err);

                })
            })


        }
      },
      //编辑按钮
      editCarBtn() {
        if(this.selectData != null ) {
          this.isDetails = false;
        }else{
          this.$alert('请选择一条数据', '信息', {
            confirmButtonText: '确定'
          })
        }


      },
      //保存按钮
      saveCarBtn() {
        let self = this;
        console.log(this.editForm.relFleetId)
        let params = {
          truckBaseId: this.selectData.truckBaseId,
          tractorNo:this.editForm.tractorNo,//车牌号
          memCode:this.editForm.memCode,//助记码
          owner:this.editForm.owner, //登记公司
          model:this.editForm.model, //厂牌型号
          selfWeight:this.editForm.selfWeight, //自重(KG)(KG)
          engine:this.editForm.engine,//马力(匹)
         registerDateStr: self.formatDate(this.editForm.registerDateStr),//登记日期
          quarterlyDateStr: self.formatDate(this.editForm.quarterlyDateStr),//年审日期
          fuelType:this.editForm.fuelType,//燃料类型
          truckType:this.editForm.truckType,//车辆类型
          rollerNum:this.editForm.rollerNum,//轴数
          enterPortNo:this.editForm.enterPortNo,//进港证号
          bondedTruckNo:this.editForm.bondedTruckNo,//白卡号
          licenseNo:this.editForm.licenseNo,//车架号
          status:this.editForm.status,//状态
          fleet:this.editForm.fleet,//归属车队
          relFleetId:this.editForm.relFleetId,//关联车队ID
          manageMode:this.editForm.manageMode,//经营模式
          remark:this.editForm.remark//备注
        };
        console.log(params);
       this.saveCarInterface(params);
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
              console.log(self.editForm[showJson]);
            };
            console.log('编辑表单');
            console.log(self.editForm);
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
      this.createColumnDefs();
    },
    mounted() {
      this.getRowData();
      this.showState();//加载状态
      this.showCarState();
      this.showCarType();
      console.log('经营模式');
      this.jinModel();
      console.log('经营模式');
      this.gridOptions.api.sizeColumnsToFit();
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
  .col-height .el-col {
    height:40px ;
  }
  .col-height .el-col .el-input {
    width:200px ;
  }
  .col-height .el-col .el-select {
    width:200px ;
  }
  .col-height .el-col .el-select {
    width:200px ;
  }
  .col-height-show .el-col {
    height: 32px ;
  }
</style>
