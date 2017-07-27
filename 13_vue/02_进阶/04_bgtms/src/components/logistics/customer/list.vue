<template>
   <div class="customer">
     <div style="margin-top: 10px"></div>
     <el-row>
       <!--header-->
       <el-col :span="24">
         <div style="float: left;">
           <el-button type="primary" size="small">
             <i class="fa fa-share fa-lg" aria-hidden="true"></i>
             导出
           </el-button>
           <el-button type="primary" size="small" @click="addBtn">
             <i class="fa fa-plus"aria-hidden="true"></i>
             新增
           </el-button>
         </div>
       </el-col>
     </el-row>
     <!--查询框-->
     <el-row>
       <el-form  :inline="true" :model="searchForm"  label-width="100px">
         <el-row>
           <el-col :span="6">
             <el-form-item label="客户简称">
               <el-autocomplete
                 v-model="searchForm.customerBaseInfo"
                 placeholder="请输入内容"
                 :fetch-suggestions="customerQuerySearch"
                 @select="customerHandleSelect"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="状态">
               <el-select v-model="searchForm.state" clearable placeholder="请选择">
                 <el-option
                   v-for="item in searchForm.options2"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="客户类型">
               <el-select v-model="searchForm.custType" clearable placeholder="请选择">
                 <el-option
                   v-for="item in searchForm.custTypeOptions"
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
     <list-table :tableData="tableData" ref="refListTable" @seletClk="parentSelect"></list-table>
     <!--账户新增弹出框-->
     <el-dialog :modal="false"  :close-on-click-modal="false"  title="客户新增" v-model="dialogFormVisible" size="large">
       <el-form :model="addForm"  label-width="100px">
           <el-row>
             <el-col :span="8">
               <el-form-item label="客户简称">
                 <el-input v-model="addForm.custShortName" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="8">
               <el-form-item label="结算方简称">
                 <el-input v-model="addForm.settleAccountsShortName" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="6">
               <el-form-item label="状态">
                 <el-select v-model="addForm.status"  placeholder="请选择">
                   <el-option
                     v-for="item in addForm.options3"
                     :key="item.value"
                     :label="item.value"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="16">
               <el-form-item label="客户名称">
                 <el-input v-model="addForm.custFullName" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="6">
               <el-form-item label="客户类型">
                 <el-select v-model="addForm.custType" multiple placeholder="请选择">
                   <el-option
                     v-for="item in addForm.options2"
                     :key="item.value"
                     :label="item.value"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="16">
               <el-form-item label="办公地点">
                 <el-input v-model="addForm.officeAddr" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="6">
               <el-form-item label="业务员">
                 <el-input v-model="addForm.tcustomerSales" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="8">
               <el-form-item label="负责人">
                 <el-input v-model="addForm.principal" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="8">
               <el-form-item label="手机">
                 <el-input v-model="addForm.mobilephone" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="8">
               <el-form-item label="固话">
                 <el-input v-model="addForm.telephone" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="8">
               <el-form-item label="邮箱">
                 <el-input v-model="addForm.email" placeholder="请输入内容"></el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="16">
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
     <!--客户tabs-->
     <customer-tabs :selectData="selectData" @editSucData="editSucData" @delData="delData"></customer-tabs>

   </div>
</template>

<script>
  import listTable from './listTable.vue'
  import Tabs from './tabsList.vue'
  import api from '../../../api/api'
    export default {
      name: 'customer',
      components : {
        "list-table": listTable,
        'customer-tabs': Tabs
      },
      data() {
        return {
          tableData:[
            {name: '客户简称', isChecked:true, record: "custShortName"},
            {name: "客户全称", isChecked:true,record: "custFullName"},
            {name: "客户类型", isChecked:true, record: "custType"},
            {name: "办公地点", isChecked:true, record: "officeAddr"},
            {name: "手机",isChecked:true, record: "mobilephone"},
            {name: "固话",isChecked:true, record: "telephone"},
            {name: '邮箱', isChecked:true, record: "email"},
            {name: "备注",isChecked:true, record: "remark"},
            {name: "状态",isChecked:true, record: "status"},
          ],
          searchForm: {
            customerBaseInfo:'', //客户简称
            customerBaseInfoId:'', //客户简称ID
            state:'', //状态
            options2: [], //存储状态数据
            custType:'', //客户类型
            custTypeOptions: [] //存储客户类型数据
          },
          dialogFormVisible:false,
          //客户新增表单
          addForm: {
            custShortName:'', //客户简称
            settleAccountsShortName:'', //结算方简称
            status:'1-有效', //状态
            options3: [], //状态的存储数据
            custFullName:'',//客户全称
            custType:[],//客户类型
            options2:[],
            tcustomerSales:'',//业务员
            officeAddr:'', //办公地点
            principal:'', //负责人
            mobilephone:'', //手机
            telephone:'',//固话
            email:'', //邮箱
            remark:'' //备注
          },
          //获取表格选中的参数
          selectData: null,
          //车牌号存储数据
          carNoData: '',
          //基本信息编辑成功后的数据存储
          scuEditData: null

        }
      },
      methods: {
        //客户名称模糊搜索
        customerQuerySearch(queryString,callback) {
          let self = this;
            api.customerSearch(queryString)
              .then(function(res){
                console.log(res);
                var data = res.data;
                var resultData = [];
                for(var objTemp of data){
                  resultData.push({
                    "key":objTemp.customerBaseId,
                    "value":objTemp.custShortName
                  });
                }
                callback(resultData);
              })
              .catch(function(err){

              });
        },
        //客户简称下拉框选中事件
        customerHandleSelect(item) {
          this.searchForm.customerBaseInfoId = item.key;//
          this.searchForm.customerBaseInfo = item.value;//
        },
        //客户类型
        showContent() {
          let self = this;
          api.selectBusTypeHandle( 'custtype')
            .then(function (res) {
              const selectData = [];
              let data  = res.data;
              console.log(data);
              for (let objTemp of data) {
                selectData.push({id:objTemp.comDicId,"value":objTemp.display,label:objTemp.value })
              }
              self.addForm.options2 = selectData;
              self.searchForm.custTypeOptions  = selectData;
            })
            .catch(function(err){

            })
        },
        //存储状态
        showState() {
          let self = this;
          api.selectBusTypeHandle( 'status')
            .then(function (res) {
              const selectData = [];
              let data = res.data;
              for (let objTemp of data) {
                selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
              }
              console.log(selectData);
              self.addForm.options3 = selectData;
              self.searchForm.options2 = selectData;
            })
            .catch(function(err){

               })
        },
        //父级控制事件
        parentSelect(item) {
          this.selectData = item;

        },
        //获取tabs编辑成功以后的数据
        editSucData(item) {
          this.$refs.refListTable.updateRow(item)
        },
        //查询按钮
        listSearchBtn() {
          let self = this;
          if(this.searchForm.customerBaseInfo == '') {
           this.searchForm.customerBaseInfoId = ''
           }
          let params = {
            customerBaseId:this.searchForm.customerBaseInfoId,
            custType: this.searchForm.custType,
            status: this.searchForm.state
          };
          console.log(params);
          api.customerListShow(params)
            .then(function(res) {
              self.$refs.refListTable.initData(res)
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
          let params = {
            custShortName: this.addForm.custShortName, //客户简称
            settleAccountsShortName: this.addForm.settleAccountsShortName, //结算方简称
            status:this.addForm.status, //状态
            custFullName:this.addForm.custFullName,//客户全称
            custType:(this.addForm.custType).join(','),//客户类型
            tcustomerSales:this.addForm.tcustomerSales,//业务员
            officeAddr:this.addForm.officeAddr, //办公地点
            principal:this.addForm.principal, //负责人
            mobilephone:this.addForm.mobilephone, //手机
            telephone:this.addForm.telephone,//固话
            email:this.addForm.email, //邮箱
            remark:this.addForm.remark //备注
          }
          console.log(params.custType);
          api.customerAdd(params)
            .then(function(res) {
              self.dialogFormVisible = false;
            })
            .catch(function(err) {
              console.log(err);

//              self.$refs.refListTable.getRowData();
            })
        },
        //表单删除让table数据刷新
        delData() {
          this.$refs.refListTable.refreshView();
        }


      },
      mounted(){
        this.showState(); //存储状态
        this.showContent(); //客户类型
        this.$refs.refListTable.getRowData();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .customer .icon-inline {
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    background-color: lightblue;
    margin-top: 5px;
  }
</style>

