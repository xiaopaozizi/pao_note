<template>
  <div class="list" >
    <!--合计内容-->
    <el-row>
      <el-col :span="14">
        <span>制单日期:</span>
        <el-date-picker
          v-model="searchForm.date"
          size="small"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          range-separator=" ~ "
          @change="setChangedValue"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="listSearchBtn"  size="small">查询</el-button>
      </el-col>
      <el-col :span="10" style="text-align: right">
        <el-button @click="addBtn" size="small" type="primary" >新增</el-button>
        <el-button @click="editBtn" size="small" type="primary" >编辑</el-button>
        <el-button @click="delBtn" size="small" type="primary" >删除</el-button>
      </el-col>
    </el-row>
    <!--表格内容-->
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
                 :floatingFilter="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>

    <!--账户新增弹出框-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="账户新增" v-model="dialogFormVisible" size="large">
      <el-form :model="addForm" :rules="addRules"  label-width="100px" ref="addForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="账户简称" prop="accountShortName">
              <el-input v-model="addForm.accountShortName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户名称" prop="accountFullName">
              <el-input v-model="addForm.accountFullName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户号"  prop="accountNo">
              <el-input v-model="addForm.accountNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行简称"  prop="bankShortName">
              <el-input v-model="addForm.bankShortName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行全称"  prop="bankFullName">
              <el-input v-model="addForm.bankFullName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户类型"  prop="accountType">
              <el-select v-model="addForm.accountType" @change="accountTypeChange" clearable placeholder="请选择">
                <el-option
                  v-for="item in addForm.options2"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行地址" prop="bankAddress">
              <el-input v-model="addForm.bankAddress" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人"  prop="contact">
              <el-input v-model="addForm.contact" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机"  prop="telphone">
              <el-input v-model="addForm.telphone" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行电话" prop="bankTel">
              <el-input v-model="addForm.bankTel" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="addForm.status" @change="accountTypeChange" clearable placeholder="请选择">
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
            <el-form-item label="备注">
              <el-input v-model="addForm.remark" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addSaveBtn">保存</el-button>
      </div>
    </el-dialog>
    <!--账户编辑弹出框-->
    <el-dialog :modal="false"  :close-on-click-modal="false"  title="账户详情" v-model="editDialogFormVisible" size="large">
      <el-form :model="editForm"  label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="账户简称">
              <el-input v-model="editForm.accountShortName" :disabled="true" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户名称">
              <el-input v-model="editForm.accountFullName" :disabled="true" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户号">
              <el-input v-model="editForm.accountNo" :disabled="true" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行简称">
              <el-input v-model="editForm.bankShortName" :disabled="true" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行全称">
              <el-input v-model="editForm.bankFullName" :disabled="true" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户类型">
              <el-select v-model="editForm.accountType" :disabled="true" @change="accountTypeChange" clearable placeholder="请选择">
                <el-option
                  v-for="item in editForm.options2"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行地址">
              <el-input v-model="editForm.bankAddress" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input v-model="editForm.contact" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机">
              <el-input v-model="editForm.telphone" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行电话">
              <el-input v-model="editForm.bankTel" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="editForm.status" @change="accountTypeChange" clearable placeholder="请选择">
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
            <el-form-item label="备注">
              <el-input v-model="editForm.remark" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="editSaveBtn">保存</el-button>
      </div>
    </el-dialog>


    <!--切换框-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="流水信息" name="流水信息">
<!--
       <el-button @click="editBtn"  v-show="isDetailShow"  size="small">编辑</el-button>
-->
        <div v-show="isDetailShow">
          <show-details :selectRowData="selectRowData" ref="refDetailsTable"></show-details>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
<!---->
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import showDetails from "./showDetailsTable";
  import editDetails from "./editTable";
  import api from '@/api/api'
  export default {
    name: 'list',
    components : {
      "ag-grid-vue": AgGridVue,
      "show-details" : showDetails,
      "edit-details" : editDetails,
    },
    data() {
      return {
        //总结
        totalCollect:0,
        totalPay :0,
        totalCount :0,

        //table
        gridOptions: {

        },
        columnDefs: [],
        rowData: null,
        defCol:[
         // {name: '账单ID', record: "monthlyStatementId"},
          {name: '账户简称', isChecked:true, record: "accountShortName"},
          {name: "开户名称", isChecked:true,record: "accountFullName"},
          {name: "账户号", isChecked:true, record: "accountNo"},
          {name: "银行简称", isChecked:true, record: "bankShortName"},
          {name: "银行全称",isChecked:true, record: "bankFullName"},
          {name: "账户类型",isChecked:true, record: "accountType"},
          {name: '银行地址', isChecked:true, record: "bankAddress"},
          {name: "联系人",isChecked:true, record: "contact"},
          {name: "手机",isChecked:true, record: "telphone"},
          {name: "银行电话",isChecked:true, record: "bankTel"},
          {name: "状态",isChecked:true, record: "status"},
          {name: "备注",isChecked:true, record: "remark"},
          {name: "录入人",isChecked:true, record: "createUser"},
          {name: "录入时间",isChecked:true, record: "createDate"},
        ],
        //查询搜索表单
        searchForm: {
          dateStr:'', //传给后台的时间日期
          date: '',  //前台显示的时间日期
          initFlag: true
        },
        //查询日期
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

        //tabs切换框
        activeName:'流水信息',
        isDetailShow:true,
        selectRowData: null,
        dialogFormVisible: false,
        editDialogFormVisible: false,
        //账户新增表单
        addForm: {
          accountShortName:'', //账户简称
          accountFullName:'',//开户名称
          accountNo:'', //账户号
          bankShortName:'',//银行简称
          bankFullName:'',//银行全称
          accountType:'', //账户类型
          bankAddress:'', //银行地址
          contact:'', //联系人
          telphone:'',//手机
          bankTel:'', //银行电话
          status:'1-有效',//状态
          remark:'', //备注
          options:[],
          options2:[]
        },
        //新增账户规则
        addRules: {
          //账户简称
          accountShortName:[
            { required: true, message: '请输入账户简称', trigger: 'blur' }
          ],
          //开户名称
          accountFullName:[
            { required: true, message: '请输入开户名称', trigger: 'blur' }
          ],
          //账户号
          accountNo:[
            { required: true,validator: this.checkAge, trigger: 'blur' }
          ],
          //银行简称
          bankShortName:[
            { required: true, message: '请输入银行简称', trigger: 'blur' }
          ],
          //银行全称
          bankFullName:[
            { required: true, message: '请输入银行全称', trigger: 'blur' }
          ],
          //账户类型
          accountType:[
            { required: true, message: '请输入账户类型', trigger: 'blur' }
          ]
        },
        //账户编辑表单
        editForm: {
          accountShortName:'', //账户简称
          accountFullName:'',//开户名称
          accountNo:'', //账户号
          bankShortName:'',//银行简称
          bankFullName:'',//银行全称
          accountType:'', //账户类型
          bankAddress:'', //银行地址
          contact:'', //联系人
          telphone:'',//手机
          bankTel:'', //银行电话
          status:'',//状态
          remark:'', //备注
          accountInfoId:'', //账户ID
          options:[],
          options2:[]
        },
      }
    },
    methods: {
      //创建表头
      createColumnDefs() {//生成表格表头
        let self = this;
        let header = this.defCol;
        /*表头对应显示的数据内容field*/
        for(let  i=0; i < header.length; i++){
            self.columnDefs.push(
              {
                headerName: header[i].name,
                field: header[i].record,
                suppressMenu: false,
                filter:header[i].filterText,
                suppressFilter: false,
              }
            )
          }
      },
      //创建数据
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            accountFullName: objTemp.accountFullName,
            accountInfoId:objTemp.accountInfoId,
            accountNo:objTemp.accountNo,
            accountShortName:objTemp.accountShortName,
            accountType:objTemp.accountType,
            bankAddress:objTemp.bankAddress,
            bankFullName:objTemp.bankFullName,
            bankShortName:objTemp.bankShortName,
            bankTel:objTemp.bankTel,
            companyInfo:objTemp.companyInfo,
            contact:objTemp.contact,
            createDate:objTemp.createDate,
            createUser:objTemp.createUser,
            relCompanyInfoId:objTemp.relCompanyInfoId,
            remark:objTemp.remark,
            status:objTemp.status,
            telphone:objTemp.telphone
          })
        }
        this.rowData = rowData;
      },
      //初始化数据
      initData(xdtList){
        this.createRowData(xdtList);
      },
      //获取行样式
      rowStyle() {
        this.gridOptions.getRowStyle = function(params){
          if(  !params.data.monthlyStatementNo ) {
            return {color:'red'}
          } else{
            return {color:'blue'}
          }
        };
      },
      clickRowHandle(item) {
        console.log('我是点击函数');
        console.log(item.data);
        this.selectRowData =  item.data;
        this.$emit("seletClk", item.data);
      },

      //控制详情的显示 与编辑
       showStatus() {
         this. isDetailShow = true;
         this.$refs.refDetailsTable.getCostList(this.selectRowData.monthlyStatementId);
       },
      //时间转换格式化
      setChangedValue(value){
        this.searchForm.dateStr = value;
        //页面首次加载成功后调用初始数据
        let params = {
          createDateQuery: value
        };
        if(this.searchForm.initFlag){
          this.getRowData(params);
          this.searchForm.initFlag = false;
        }
      },

      //账单列表查询
      listSearchBtn() {
        let self = this;
        let params = {
          createDateQuery: this.searchForm.dateStr
        };
        this.getRowData(params);
      },

      //获取表格数据并且初始化
      getRowData(params) {
        let self = this;
        api.accountListShow()
          .then(function(res) {
            console.log('我是初始化表格数据');
            console.log(res);

            self.initData(res);

          })
          .catch(function(err) {
            console.log(err);

          })
      },


      //自定义规则
      checkAge(rule, value, callback) {
        let self = this;
        if (!value) {
          return callback(new Error('账户号不能为空'));
        }
        setTimeout(function() {
          let params = {
            accountNo: self.addForm.accountNo
          };
          console.log(self.addForm.accountNo);
          api.accountAdd(params)
            .then(function (res) {
              if (res.data.status === 'fail') {
                callback(new Error(res.data.message));
              } else if (res.data.status === 'success') {
                callback();
              }
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            })
        },3000)
      },



      //账户类型下拉框显示
      showAccountType() {
        let self = this;
        api.selectBusTypeHandle( 'accounttype')
          .then(function (res) {
            let selectData = [];
            let  data  = res.data;
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            self.searchForm.options = selectData;
            self.addForm.options2 = selectData;
            self.editForm.options2 = selectData;
          })
          .catch(function(err){

          })
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
            self.searchForm.options2 = selectData;
            self.editForm.options = selectData;
            self.addForm.options = selectData;
          })
          .catch(function(err){
            console.log(err);
          })
      },
      accountTypeChange() {},

      //新增按钮
      addBtn() {
        this.dialogFormVisible = true;
      },
      //新增保存按钮
      addSaveBtn() {
        let self = this;
        console.log(this.addForm);
        api.accountAdd(this.addForm)
          .then(function(res) {
            console.log(res);
            if(res.status === 'fail') {
              alert(res.message)
            } else if(res.status === 'success') {
              self.dialogFormVisible = false;
              self.$refs['addForm'].resetFields();
              self.getRowData();
            }
          })
          .catch(function(err) {
            console.log(err);
          })
      },
      //编辑按钮
      editBtn() {
        if(!this.selectRowData) {
          this.$alert('请选择一条数据', '标题', {
            confirmButtonText: '确定'
          });
        }else {
          this.editDialogFormVisible = true;
          this.editForm = Object.assign({}, this.selectRowData);
          console.log(this.editForm);
        }
      },
      //编辑保存
      editSaveBtn() {
        let self = this;
        let params = {
          bankAddress:this.editForm.bankAddress,
          contact:this.editForm.contact,
          telphone:this.editForm.telphone,
          bankTel:this.editForm.bankTel,
          status:this.editForm.status,
          remark:this.editForm. remark,
          accountInfoId:this.editForm.accountInfoId
        };
        api.accountEdit(params)
          .then(function() {
            self.editDialogFormVisible = false;

            self.getRowData();
          })
          .catch(function(err) {

          })
      },
      //删除按钮
      delBtn() {
        let self = this;
        if(!this.selectRowData) {
          this.$alert('请选择一条数据', '标题', {
            confirmButtonText: '确定'
          });
        } else {
          let params = {
            accountInfoId: this.selectRowData.accountInfoId
          };
          api.accountDel(params)
            .then(function(res) {
              if(res.status === 'fail') {
                self.$alert(res.message, '标题', {
                  confirmButtonText: '确定'
                });
               /* self.$message({
                  showClose: true,
                  message: res.message,
                  type: 'error'
                });*/
              }else if(res.status === 'success') {
    /*            self.$alert('账号已经删除', '标题', {
                  confirmButtonText: '确定'
                });*/
                self.getRowData();
              }
            })
            .catch(function (err) {

            })

        }

      },
      //时间转换格式化
      setChangedValue(value){
        this.searchForm.dateStr = value;
        //页面首次加载成功后调用初始数据
        let params = {
          createDateQuery: value
        };
        if(this.searchForm.initFlag){
          this.getRowData(params);
          this.searchForm.initFlag = false;
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
          noRowsToShow: '没有找到您想要的数据...',
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
      this.showAccountType(); //加载账户类型
      this.showState(); //存储状态
      this.getRowData('');
      this.gridOptions.api.sizeColumnsToFit();
      var stateDate = (new Date()).setTime(new Date().getTime() - 3600 * 1000 * 24 * 7);
      var endDate = new Date();
      this.searchForm.date = [stateDate,endDate];
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .searchText {
    padding-top: 8px;

  }
  .searchText span {
    display: inline-block;
    padding-right: 25px;;
  }
  .blue{
    color: blue;
  }
  .red {
    color: red;
  }
</style>

