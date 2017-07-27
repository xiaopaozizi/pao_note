<template>
   <div class="account">
     <div style="margin-top: 10px"></div>
     <!--查询框-->
     <el-row>
       <el-form   :model="searchForm"  label-width="100px">
         <el-row>
           <el-col :span="6">
             <el-form-item label="账户类型">
               <el-select v-model="searchForm.accountType" @change="accountTypeChange" clearable placeholder="请选择">
                 <el-option
                   v-for="item in searchForm.options"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="状态">
               <el-select v-model="searchForm.state" @change="accountTypeChange" clearable placeholder="请选择">
                 <el-option
                   v-for="item in searchForm.options2"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="2">
             <el-button type="primary" @click="listSearchBtn">查询</el-button>
           </el-col>
         </el-row>
         </el-form-item>
       </el-form>
     </el-row>
     <el-button @click="addBtn">新增</el-button>
     <el-button @click="editBtn">编辑</el-button>
     <el-button @click="delBtn">删除</el-button>
     <list-table :tableData="tableData" ref="refListTable" @seletClk="parentSelect"></list-table>
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
             <el-form-item label="银行地址">
               <el-input v-model="addForm.bankAddress" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="联系人">
               <el-input v-model="addForm.contact" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="手机">
               <el-input v-model="addForm.telphone" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="银行电话">
               <el-input v-model="addForm.bankTel" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="状态">
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



   </div>
</template>

<script>
  import listTable from './listTable.vue'
  import api from '../../../api/api'
    export default {
      name: 'account',
      components : {
        "list-table": listTable
      },
      data() {
        return {
          tableData:[
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
          searchForm: {
            accountType:'',//账户类型
            options:[],//存储账户类型数据
            state:'', //状态
            options2: [] //存储状态数据
          },
          dialogFormVisible:false,
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
          //获取表格选中的参数
          selectData: null,
        }
      },
      methods: {
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
        //父级控制事件
        parentSelect(item) {
          this.selectData = item;
        },
        //查询按钮
        listSearchBtn() {
          let self = this;
          let params = {
            accountType: this.searchForm.accountType,
            status: this.searchForm.state
          };
          api.accountListShow(params)
            .then(function(res) {
              self.$refs.refListTable.getRowData();
            })
            .catch(function(err) {

            })

        },
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
              if(res.data.status === 'fail') {
                alert(res.data.message)
              } else if(res.data.status === 'success') {
                self.dialogFormVisible = false;
                self.$refs.refListTable.getRowData();
              }
            })
            .catch(function(err) {
              console.log(err);
            })
        },
        //编辑按钮
        editBtn() {
          if(this.selectData != null) {
            this.editDialogFormVisible = true;
            this.editForm = Object.assign({}, this.selectData);
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
              self.$refs.refListTable.getRowData();
            })
            .catch(function(err) {

            })
        },
        //删除按钮
        delBtn() {
          let self = this;
           if(this.selectData === null) {
             alert('请选择一条数据！')
           } else {
             let params = {
               accountInfoId: this.selectData.accountInfoId
             };
             api.accountDel(params)
               .then(function(res) {
                 if(res.data.status === 'fail') {
                   self.$message({
                     showClose: true,
                     message: res.data.message,
                     type: 'error'
                   });
                 }else if(res.data.status === 'success') {
                   self.$message({
                     showClose: true,
                     customClass:'postion',
                     message: '账号已经删除',
                     type: 'success'
                   });
                   self.$refs.refListTable.getRowData();
                 }
               })
               .catch(function (err) {

               })

           }

        }
      },
      mounted(){
        this.showAccountType(); //加载账户类型
        this.showState(); //存储状态
        this.$refs.refListTable.getRowData();
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

