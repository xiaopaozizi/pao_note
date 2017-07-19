<template>
   <div class="tabs-list">
     <el-tabs v-model="activeName">
       <el-tab-pane label="基本信息" name="基本信息">
         <!--基本信息显示-->
         <el-button @click="editFormBtn" v-if="displayForm">编辑</el-button>
         <el-button @click="saveFormBtn" v-if="!displayForm">保存</el-button>
         <el-button @click="delFormBtn">删除</el-button>
         <el-button @click="cancelFormBtn" v-if="!displayForm">取消</el-button>
           <div v-if="displayForm">
             <el-form :model="showForm"  label-width="100px">
               <el-row>
                 <el-col :span="8">
                   <el-form-item label="客户简称">
                     <span>{{showForm.custShortName}}</span>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item label="结算方简称">
                     <span>{{showForm.settleAccountsShortName}}</span>
                   </el-form-item>
                 </el-col>
                 <el-col :span="6">
                   <el-form-item label="状态">
                     <span >{{showForm.status}}</span>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="16">
                   <el-form-item label="客户名称">
                     <span>{{showForm.custFullName}}</span>
                   </el-form-item>
                 </el-col>
                 <el-col :span="6">
                   <el-form-item label="客户类型">
                     <span>{{showForm.custType}} </span>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="16">
                   <el-form-item label="办公地点">
                     <span >{{showForm.officeAddr}}</span>
                   </el-form-item>
                 </el-col>
                 <el-col :span="6">
                   <el-form-item label="业务员">
                     <span>{{showForm.tcustomerSales}}</span>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="8">
                   <el-form-item label="负责人">
                     <span>{{showForm.principal}}</span>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item label="手机">
                     <span>{{showForm.mobilephone}}</span>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="8">
                   <el-form-item label="固话">
                     <span>{{showForm.telephone}}</span>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item label="邮箱">
                     <span>{{showForm.email}}</span>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="16">
                   <el-form-item label="备注">
                     <span>{{showForm.remark}}</span>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-form>
           </div>
           <div v-if="!displayForm">
             <el-form :model="editForm"  label-width="100px">
               <el-row>
                 <el-col :span="8">
                   <el-form-item label="客户简称">
                     <el-input v-model="editForm.custShortName" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item label="结算方简称">
                     <el-input v-model="editForm.settleAccountsShortName" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="6">
                   <el-form-item label="状态">
                     <el-select v-model="editForm.status"  placeholder="请选择">
                       <el-option
                         v-for="item in editForm.options3"
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
                     <el-input v-model="editForm.custFullName" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="6">
                   <el-form-item label="客户类型">
                     <el-select v-model="editForm.custType" multiple placeholder="请选择">
                       <el-option
                         v-for="item in editForm.options2"
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
                     <el-input v-model="editForm.officeAddr" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="6">
                   <el-form-item label="业务员">
                     <el-input v-model="editForm.tcustomerSales" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="8">
                   <el-form-item label="负责人">
                     <el-input v-model="editForm.principal" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item label="手机">
                     <el-input v-model="editForm.mobilephone" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="8">
                   <el-form-item label="固话">
                     <el-input v-model="editForm.telephone" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item label="邮箱">
                     <el-input v-model="editForm.email" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="16">
                   <el-form-item label="备注">
                     <el-input v-model="editForm.remark" placeholder="请输入内容"></el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-form>
           </div>
       </el-tab-pane>
       <el-tab-pane label="银行账户" name="银行账户"> </el-tab-pane>
       <el-tab-pane label="取(交)单点" name="取(交)单点"> </el-tab-pane>
       <el-tab-pane label="联系人" name="联系人"> </el-tab-pane>
       <el-tab-pane label="装拆点" name="装拆点"> </el-tab-pane>
     </el-tabs>
   </div>
</template>

<script>
  import api from '../../../api/api'
    export default {
      props:['selectData'],
      name: 'tabs-list',
      data() {
        return {
          //客户tabs
          activeName: '基本信息',
          //客户编辑列表
          editForm: {
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
          showForm: {
            custShortName:'', //客户简称
            settleAccountsShortName:'', //结算方简称
            status:'', //状态
            custFullName:'',//客户全称
            custType:'',//客户类型
            tcustomerSales:'',//业务员
            officeAddr:'', //办公地点
            principal:'', //负责人
            mobilephone:'', //手机
            telephone:'',//固话
            email:'', //邮箱
            remark:'' //备注
          },
          //显示与编辑
          displayForm: true,
        }
      },
      watch: {
        'selectData.customerBaseId':function () {
          this.showFormMsg();
        }
      },
      methods: {
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
              const selectData = [];
              let data  = res.data;
              for (let objTemp of data) {
                selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
              }
              self.editForm.editForm = selectData;
            })
            .catch(function(err){

            })
        },
        //编辑按钮
        editFormBtn() {
          this.displayForm = false ;
          this.selectData.custType = this.selectData.custType.split(",");
          console.log(this.selectData.custType)
        },
        //保存
        saveFormBtn() {
          let self = this;
//          this.displayForm = true ;
          let params = {
            customerBaseId: this.selectData.customerBaseId, //客户ID
            custShortName: this.editForm.custShortName, //客户简称
            settleAccountsShortName:this.editForm.settleAccountsShortName,//结算方简称
            status:this.editForm.status,//状态
            custFullName:this.editForm.custFullName,//客户全称
            custType:(this.editForm.custType).join(","),//客户类型
            tcustomerSales:  this.editForm.tcustomerSales,//业务员
            officeAddr:this.editForm.officeAddr, //办公地点
            principal:this.editForm.principal,//负责人
            mobilephone:this.editForm.mobilephone, //手机
            telephone:this.editForm.telephone,//固话
            email:this.editForm.email, //邮箱
            remark:this.editForm.remark//备注
          };
          console.log(params);
          api.customerEdit(params)
            .then(function(res) {
              let data  = res.data;
              self.$emit('editSucData',data); //将返回的值传给父级 让 其跟新表格数据
              self.displayForm = true;
              self.showForm = data;
            })
            .catch(function(err) {

            })


        },
        //单机显示列表 数据
         showFormMsg() {
           let self = this;
           let params = {
             customerBaseId: this.selectData.customerBaseId
           };
           api.customerListShow(params)
             .then(function(res) {
               console.log(res);
               let showData = res[0];
               for(let showJson in showData) {
                 self.showForm[showJson] = showData[showJson];
               }
               self.editForm.custShortName = showData.custShortName; //客户简称
               self.editForm.settleAccountsShortName = showData.settleAccountsShortName;//结算方简称
               self.editForm.status = showData.status;//状态
               self.editForm.custFullName = showData.custFullName;//客户全称
               self.editForm.custType = (showData.custType).split(",");//客户类型
               self.editForm.tcustomerSales= showData.tcustomerSales;//业务员
               self.editForm.officeAddr= showData.officeAddr; //办公地点
               self.editForm.principal= showData.principal; //负责人
               self.editForm.mobilephone= showData.mobilephone; //手机
               self.editForm.telephone= showData.telephone;//固话
               self.editForm.email= showData.email; //邮箱
               self.editForm.remark= showData.remark; //备注
             })
             .catch(function(err) {

              /* self.showForm.custShortName = showData.custShortName; //客户简称
               self.showForm.settleAccountsShortName = showData.settleAccountsShortName;//结算方简称
               self.showForm.status = showData.status;//状态
               self.showForm.custFullName = showData.custFullName;//客户全称
               self.showForm.custType = showData.custType;//客户类型
               self.showForm.tcustomerSales= showData.tcustomerSales;//业务员
               self.showForm.officeAddr= showData.officeAddr; //办公地点
               self.showForm.principal= showData.principal; //负责人
               self.showForm.mobilephone= showData.mobilephone; //手机
               self.showForm.telephone= showData.telephone;//固话
               self.showForm.email= showData.email; //邮箱
               self.showForm.remark= showData.remark; //备注*/
               /*====================*/

             })
         },
        //删除按钮
        delFormBtn() {
          let self = this;
          let params = {
            customerBaseId : this.selectData.customerBaseId
          };
          api.customerDel(params)
            .then(function(res) {
              if(res.status === 'success') {
                self.$emit('delData');
                for(let item in self.showForm) {
                  self.showForm[item] = '';
                }
              }
            })
            .catch(function(err) {
              console.log(err);

            })
        },
        //取消按钮
        cancelFormBtn() {
          this.displayForm = true ;
        }
      },
      mounted(){
        this.showState(); //存储状态
        this.showContent(); //客户类型
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

