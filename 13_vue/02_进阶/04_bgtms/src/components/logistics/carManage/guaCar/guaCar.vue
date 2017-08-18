<template>
  <div class="gua-list" style="">
    <el-button  size="small" @click="addGuaCarBtn">新增</el-button>
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
                 :rowData="rowData">
    </ag-grid-vue>
    <el-tabs v-model="activeName">
      <el-tab-pane label="挂车信息" name="挂车信息">
             <base-msg :selectNowData="selectNowData" :updateRow="updateRow"  @seletClk="refreshView"></base-msg>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :modal="false"  @close="addHandClose"  :close-on-click-modal="false"  title="新增" v-model="dialogFormVisible" size="large">
      <el-form :model="addForm"  label-width="140px" :rules="addFormRules"  ref="addForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="挂车号"  prop="tractorNo">
              <el-input v-model="addForm.tractorNo" placeholder="请输入内容"></el-input>
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
            <el-form-item label="厂牌型号" prop="model">
              <el-input v-model="addForm.model" placeholder="请输入内容" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="自重(KG)" prop="selfWeight">
              <el-input v-model="addForm.selfWeight" placeholder="请输入内容"></el-input>
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
            <el-form-item label="年审日期" prop="annualInspPeriodStr">
              <el-date-picker
                v-model="addForm.annualInspPeriodStr"
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
  import api from '../../../../api/api'
  import msg from './baseMsg'
  export default {
    name: "gua-list",
    props:['activeNameMsg'],
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [
          {name: "挂车号", id: 0, isChecked:true, record: "tractorNo"},
          {name: "厂牌型号", id: 8, isChecked:false, record: "model"},
          {name: "自重(KG)", id: 3, isChecked:false, record: "selfWeight"},
          {name: "登记日期", id: 5, isChecked:false, record: "registerDateStr"},
          {name: "年审日期", id: 6, isChecked:false, record: "annualInspPeriodStr"},
          {name: "轴数", id: 6, isChecked:false, record: "rollerNum"},
       //   {name: "车架号", id: 6, isChecked:false, record: "licenseNo"},
          {name: "状态", id: 6, isChecked:false, record: "status"},
        ],  //
        /*=======*/
        activeName: '挂车信息',
        dialogFormVisible:false,
        //车头新增数据
        addForm : {
          tractorNo:'',//车牌号
          registerDateStr:'',//登记日期
          model:'', //厂牌型号
          selfWeight:'', //自重
          rollerNum:'',//轴数
          annualInspPeriodStr:'',//年审日期
          status:'有效',//状态
          remark:'',//备注
          fleet:'',//归属车队
          relFleetId:'',//关联车队ID
          manageMode:'',//经营模式
          options:[],
          options2:[],
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
        addFormRules: {
          fleet: [
            { required: true, message: '请输入车队', trigger: 'blur',type: 'number' }
          ],
        },
        selectNowData:null,

      }
    },
    components: {
      "ag-grid-vue": AgGridVue,
      'base-msg' : msg
    },
    watch: {
      'activeNameMsg': function() {
        if(this.activeNameMsg === '挂车登记'){
          console.log('22555');
          this.getRowData();
          this.gridOptions.api.sizeColumnsToFit();
        }
    },

    },
    methods: {
      //初始化
      initData(list){
        this.rowData = list;
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
          this.columnDefs.push(
            {
              headerName: tableCol[i].name, //表头的名字
              field: tableCol[i].record,
              suppressMenu: false,
              suppressFilter: false,
              checkboxSelection: tableCol[i].checkBox,
              headerCheckboxSelection: tableCol[i].checkBox
            }
          )
        }
      },
      tableClk(item) {//获取表格选中的个数
        var rowCount = this.gridOptions.api.getSelectedNodes(); //获取表格的节点数
        var selectedRows  = this.gridOptions.api.getSelectedRows(); //获取选中的列表 数据
        this.selectNowData = item.node.data; //获取data数据
      },
      //让父组件获取表格选中的个数
      getSelectedRows(){
        return this.gridOptions.api.getSelectedRows();
      },
      //双击事件
      onRowDoubleClicked(event) {

      },
      //获取表格数据并且初始化
      getRowData() {
        let self = this;
        console.log('调挂车数据');
        api.guaCarListShow()
          .then(function(res) {
            console.log(res);
            self.initData(res)
          })
          .catch(function(err) {

          })
      },
      //跟新列表数据
      updateRow(row){
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
        this.getRowData();
      },

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
            self.addForm.options = selectData;
          })
          .catch(function(err){

          })
      },
      //新增挂车按钮
      addGuaCarBtn() {
        this.dialogFormVisible = true;
      },
      //新增取消
      addHandClose() {
        this.$refs['addForm'].resetFields();
      },
      //保存
      addSaveBtn() {
        let self = this;
        this.$refs.addForm.validate(function(valid){
          if(valid) {
            let params = {
              tractorNo:self.addForm.tractorNo,//车牌号
              model:self.addForm.model, //厂牌型号
              selfWeight:self.addForm.selfWeight, //自重(KG)
              registerDateStr:self.formatDate(self.addForm.registerDateStr),//登记日期
              annualInspPeriodStr:self.formatDate(self.addForm.annualInspPeriodStr),//年审日期
              rollerNum:self.addForm.rollerNum,//轴数
              status:self.addForm.status,//状态
              remark:self.addForm.remark//备注
            };
            console.log(params);
          self.guaCarAddInterface(params)
          }
        });

      },
      //调用新增的接口
      guaCarAddInterface(params) {
        let self = this;
        api.guaCarAdd(params)
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
        this.addNewRow(item);
      },

    },
    beforeMount() {
      this.gridOptions = {
        context: {
          componentParent: this
        },
   /*     localeText: {
          page: '页',
          more: '更多',
          to: '到',
          of: '总共',
          next: '下一页',
          last: '最后一页',
          first: '第一页',
          previous: '上一页',
          loadingOoo: '正在加载....',
        }*/
      };
      this.createColumnDefs();
    },
    mounted() {
      this.showState();
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
</style>
