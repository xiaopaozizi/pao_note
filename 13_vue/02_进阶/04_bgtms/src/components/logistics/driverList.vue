<template>
   <div class="account">
     <div style="margin-top: 10px"></div>
     <!--查询框-->
 <!--    <el-row>
       <el-form  :model="searchForm"  label-width="100px">
         <el-row>
           <el-col :span="6">
             <el-form-item label="司机/手机">
               <el-autocomplete
                 class="inline-input"
                 size="small"
                 v-model="searchForm.driver"
                 :fetch-suggestions="driverQuerySearch"
                 placeholder="请输入内容"
                 :trigger-on-focus="false"
                 @select="driverHandleSelect"
               ></el-autocomplete>
             </el-form-item>

           </el-col>
           <el-col :span="6">
             <el-form-item label="状态">
               <el-select  size="small"  v-model="searchForm.state" @change="accountTypeChange" clearable placeholder="请选择">
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
             <el-button type="primary" @click="listSearchBtn" size="small">查询</el-button>
           </el-col>
         </el-row>
         </el-form-item>
       </el-form>
     </el-row>-->
     <el-button @click="addBtn" size="small">新增</el-button>
     <el-button @click="bindCarNoBtn" size="small">驾驶车辆</el-button>
     <el-button @click="cancelCarNoBtn" size="small">取消驾驶</el-button>
     <list-table :tableData="tableData" ref="refListTable" @seletClk="parentSelect"  @selectNow="selectNow"></list-table>
     <!--账户新增弹出框-->
     <el-dialog :modal="false"   @close="addHandClose"   :close-on-click-modal="false"  title="司机新增" v-model="dialogFormVisible" size="large">
       <el-form :model="addForm"  label-width="140px" :rules="addFormRules"  ref="addForm">
         <el-row>
           <el-col :span="6">
             <el-form-item label="姓名"  prop="driverName" id="color">
               <el-input v-model="addForm.driverName" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="常用手机" prop="telephone1">
               <el-input v-model="addForm.telephone1" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="备用手机" prop="telephone2">
               <el-input v-model="addForm.telephone2" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="家属电话" prop="familyTel">
               <el-input v-model="addForm.familyTel" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="6">
             <el-form-item label="身份证号" prop="idCard">
               <el-input v-model="addForm.idCard" placeholder="请输入内容" :maxlength="18"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="身份证地址" prop="idAddr">
               <el-input v-model="addForm.idAddr" placeholder="请输入内容"></el-input>
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
         </el-row>
         <el-row>
           <el-col :span="6">
             <el-form-item label="准驾车型"  prop="allowDriveType">
               <el-input v-model="addForm.allowDriveType" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
           </el-col>
           <el-col :span="6" >
             <el-form-item label="驾驶证有效期" prop="driverLicenseEndStr">
               <el-date-picker
                 v-model="addForm.driverLicenseEndStr"
                 type="date"
                 placeholder="选择日期"
                 :editable="false"
               >
               </el-date-picker>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
             <el-form-item label="年审日期" prop="nextReturnDueStr">
               <el-date-picker
                 v-model="addForm.nextReturnDueStr"
                 type="date"
                 placeholder="选择日期"
                 :editable="false"
               >
               </el-date-picker>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="6" >
           <el-form-item label="资格证号" prop="workNo">
             <el-input v-model="addForm.workNo" placeholder="请输入内容"></el-input>
           </el-form-item>
         </el-col>
           <el-col :span="6">
           </el-col>
           <el-col :span="6" >
             <el-form-item label="资格证有效期" prop="workNoEndStr">
               <el-date-picker
                 v-model="addForm.workNoEndStr"
                 type="date"
                 placeholder="选择日期"
                 :editable="false"
                 >
               </el-date-picker>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="驾驶车辆"  prop="bindingTruckNo">
               <el-autocomplete
                 v-model="addForm.bindingTruckNo"
                 :fetch-suggestions="plateNoSearch"
                 placeholder="请输入内容"
                 @select="carHandleSelect"
               ></el-autocomplete>

             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="12" >
             <el-form-item label="常住地址" prop="usualAddr">
               <el-input v-model="addForm.usualAddr" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="通讯地址"  prop="contactAddr">
               <el-input v-model="addForm.contactAddr" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col  :span="12">
             <el-form-item label="备注" prop="remark">
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 2, maxRows: 4}"
                 placeholder="请输入内容"
                 v-model="addForm.remark">
               </el-input>
             </el-form-item>

           </el-col>
         </el-row>
       </el-form>
       <div slot="footer">
         <el-button type="primary" @click="addSaveBtn">保存</el-button>
       </div>
     </el-dialog>
     <!--司机驾驶车辆号弹出框-->
     <el-dialog :modal="false"  :close-on-click-modal="false"  title="驾驶车辆号" v-model="editDialogFormVisible" size="small">
       <el-form :model="editForm"  label-width="100px" :rules="editFormRules"  ref="editForm">
         <el-row>
           <el-col :span="12">
             <el-form-item label="姓名" prop="driverName">
               <el-input v-model="editForm.driverName" :disabled="true" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="常用手机" prop="telephone1">
               <el-input v-model="editForm.telephone1" :disabled="true" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="驾驶车辆" prop="bindingTruckNo">
               <el-autocomplete
                 v-model="editForm.bindingTruckNo"
                 :fetch-suggestions="plateNoSearch"
                 placeholder="请输入内容"
                 @select="carHandleSelect"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="备注" prop="remark">
               <el-input v-model="editForm.remark" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
       <div slot="footer">
         <el-button type="primary" @click="bindSaveBtn">保存</el-button>
       </div>
     </el-dialog>
     <!--司机驾驶车辆号弹出框-->
     <el-dialog :modal="false"  :close-on-click-modal="false"  title="解绑车牌" v-model="cancelFormVisible" size="small">
       <el-form :model="cancelForm"  label-width="100px" :rules="cancelRules">
         <el-row>
           <el-col :span="12">
             <el-form-item label="取消类型" prop="type">
               <el-select v-model="cancelForm.type"  clearable placeholder="请选择">
                 <el-option
                   v-for="item in cancelForm.options"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="24">
             <el-form-item label="原因" prop="remark">
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 2, maxRows: 4}"
                 v-model="cancelForm.remark"
                 placeholder="请输入内容">
               </el-input>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
       <div slot="footer">
         <el-button type="primary" @click="cancelPlateNoBtn">保存</el-button>
       </div>
     </el-dialog>


     <!--司机切换框-->
    <tabs-list :selectData="selectDataTable" @editSucData="editSucData" @delData="delData"></tabs-list>



   </div>
</template>

<script>
  import listTable from './driverListTable.vue'
  import Tabs from './driverTabsList.vue'
  import api from '../../api/api'
    export default {
      name: 'account',
      components : {
        "list-table": listTable,
        'tabs-list': Tabs
      },
      data() {
        return {
          //日期禁止选择以前的日期
          pickerOptions0: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          },

          tableData:[
            {name: '姓名', isChecked:true, record: "driverName"},
            {name: "身份证号", isChecked:true,record: "idCard"},
            {name: "身份证地址", isChecked:true, record: "idAddr"},
            {name: "常用手机", isChecked:true, record: "telephone1"},
            {name: "备用手机",isChecked:true, record: "telephone2"},
            {name: "年审日期",isChecked:true, record: "nextReturnDueStr"},
            {name: "状态",isChecked:true, record: "status"},
            {name: '准驾车型', isChecked:true, record: "allowDriveType"},
            {name: "资格证号",isChecked:true, record: "workNo"},
            {name: "备注",isChecked:true, record: "remark"},
            {name: "驾驶车辆",isChecked:true, record: "bindingTruckNo"}
          ],
          searchForm: {
            driver:'', //司机
            driverId:'',//司机Id
            state:'', //状态
            options2: [] //存储状态数据
          },
          dialogFormVisible:false,
          editDialogFormVisible: false,
          cancelFormVisible: false,
          cancelForm: {
            type:'',//类型
            remark:'', //备注
            options:[],
          },
          cancelRules: {},
          //司机新增表单
          addForm: {
            driverName:'', //姓名
            idCard:'',//身份证号
            idAddr:'', //身份证地址
            telephone1:'',//常用手机
            telephone2:'',//备用手机
            familyTel: '', //家属电话
            usualAddr:'', //常住地址
            contactAddr:'',//通讯地址
            nextReturnDueStr:'',//年审日期
            status:'有效',//状态
            bindingTruckNo:'', //驾驶车辆
            allowDriveType:'',//准驾车型
            driverLicenseEndStr:'',//驾驶证有效期止
            workNo:'', //从业资格证号
            workNoEndStr:'',//从业资格证有效期止
            truckBaseId:'', //绑定的车牌号ID
            remark:'' // 备注
          },
          addFormRules:{
            driverName: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
   /*         telephone1: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号码', trigger: 'blur' },
            ],*/
   /*         idCard:[
              { required: true, message: '请输入司机身份证号', trigger: 'blur'},
              {pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/, message: '请输入正确的身份证号码', trigger: 'blur'}
            ]*/
          },

          //司机驾驶车辆表单
          editForm: {
            driverId:'',//司机ID
            driverName:'', //姓名
            telephone1:'',//电话1
            telephone2:'',//电话2
            usualAddr:'', //常住地址
            bindingTruckNo:'', //驾驶车辆
            remark:'', //备注
            truckBaseId:'',//chepaihaoID
            options:[]
          },
          editFormRules:  {

          },
          //获取表格选中的参数
          selectDataTable: null,
          //车牌号存储数据
          carNoData: ''

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
        //时间戳转化成日期格式
         unix(un) {
           let  unixTimestamp = new Date(un / 1000);
           let  commonTime = unixTimestamp.toLocaleString();
         },
        //司机模糊查询
        driverQuerySearch(queryString, callback) {
          api.getDriverTelphoneSearch(queryString).then(function (res) {
            let data = res.data;
            let resultData = [];
            for(var objTemp of data){
              resultData.push({
                key:objTemp.driverId,
                value:objTemp.driverName + '/' + objTemp.telephone1,
                telphone: objTemp.telephone1,
                driverName:objTemp.driverName
              })
            }
            callback(resultData);

          }).catch(function(err){
              console.log(err);

             })
        },
        //司机下拉选中
        driverHandleSelect(item) {
          this.searchForm.driverId = item.key;
        },
        //存储状态
        showState() {
          let self = this;
          api.selectBusTypeHandle( 'status')
            .then(function (res) {
              let selectData = [];
              let data = res.data;
              console.log(data);
              for (let objTemp of data) {
                selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
              }
              self.searchForm.options2 = selectData;
              self.editForm.options = selectData;
              self.addForm.options = selectData;

            })
            .catch(function(err){

               })
        },
        //取消类型接口
        showCancelType() {
          let self = this;
          api.selectBusTypeHandle( 'unbindtype')
            .then(function (res) {
              let selectData = [];
              let  data  = res.data;
              for (let objTemp of data) {
                selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
              }
              self.cancelForm.options = selectData;
            })
            .catch(function(err){

            })
        },
        accountTypeChange() {},
        //车牌号模糊搜索
        plateNoSearch(queryString, callback) {
          let self = this;
          api.driverBindNo(queryString)
            .then(function (res) {
              console.log(res);
              let  data  = res.data;
              let resultData = [];
              for(var objTemp of data){
                resultData.push({
                  truckBaseId:objTemp.truckBaseId,
                  value:objTemp.tractorNo
                })
              }
              callback(resultData);

          }).catch(function(err){
            console.log(err);

          })
        },
        carHandleSelect(val) {
            this.editForm.truckBaseId = val.truckBaseId;//车牌号ID赋值
            this.addForm.truckBaseId = val.truckBaseId;//车牌号ID赋值
        },
        //父级控制事件
        parentSelect(item) {
          this.selectDataTable = item;
          console.log(this.selectDataTable);
        },
        //获取tabs编辑成功以后的数据
        editSucData(item) {
          console.log(item);
          this.$refs.refListTable.updateRow(item)
        },
        //表单删除让table数据刷新
        delData() {
          this.$refs.refListTable.refreshView();
        },
        //查询按钮
        listSearchBtn() {
          let self = this;
          if(this.searchForm.driver ===''){
            this.searchForm.driverId = ''
          }
          let params = {
            driverId: this.searchForm.driverId,
            status: this.searchForm.state
          };
          api.driverListShow(params)
            .then(function(res) {
              self.$refs.refListTable.setRowData(res)
            })
            .catch(function(err) {

            })

        },
        //新增取消关闭
        addHandClose(done) {
          console.log(2222)
         this.$refs['addForm'].resetFields();
//          done();
        },
        //新增按钮
        addBtn() {
          this.dialogFormVisible = true;
        },
        //新增保存按钮
        addSaveBtn() {
          let self = this;
          this.$refs.addForm.validate(function(valid){
            if(valid) {
               let params = {
               driverName: self.addForm.driverName, //姓名
               idCard: self.addForm.idCard,//身份证号
               idAddr: self.addForm.idAddr, //身份证地址
               telephone1: self.addForm.telephone1,//常用手机
               telephone2: self.addForm.telephone2,//备用手机
               familyTel: self.addForm.familyTel, //家属电话
               usualAddr: self.addForm.usualAddr, //常住地址
               contactAddr: self.addForm.contactAddr,//通讯地址
               nextReturnDueStr: self.formatDate(self.addForm.nextReturnDueStr),//年审日期
               status: self.addForm.status,//状态
               bindingTruckNo: self.addForm.bindingTruckNo, //驾驶车辆
               relTruckId: self.addForm.truckBaseId,
               allowDriveType: self.addForm.allowDriveType,//准驾车型
               driverLicenseEndStr: self.formatDate(self.addForm.driverLicenseEndStr),//驾驶证有效期止
               workNo: self.addForm.workNo, //从业资格证号
               workNoEndStr: self.formatDate(self.addForm.workNoEndStr),//从业资格证有效期止
               remark:  self.addForm.remark
               };
               if(params.bindingTruckNo  != '' &&  params. relTruckId == '') {
                self.$alert('请不要自创车牌,请选择查询条件里面的车牌号码再进行保存', '车牌信息', {
                   confirmButtonText: '确定'
                 });
               } else {
                 api.driverAdd(params)
                   .then(function(res) {
                     let data  = res.data;
                     console.log(data);
                     self.$refs['addForm'].resetFields();
                     self.addForm.truckBaseId = '';
                     self.dialogFormVisible = false;
                     self.$refs.refListTable.addNewRow(data);
                   })
                   .catch(function(err) {
                   })
               }
    /*           api.driverAdd(params)
                .then(function(res) {
                  let data  = res.data;
                  console.log(data);
                  self.$refs['addForm'].resetFields();
                  self.dialogFormVisible = false;
                  self.$refs.refListTable.addNewRow(data);
                })
                .catch(function(err) {

                })*/
            }
          });

        },
        //驾驶车辆按钮
        bindCarNoBtn() {
          let self = this;
          let isBinding = this.selectDataTable.bindingTruckNo; //获取表格车牌号
          if(isBinding) {
            console.log(isBinding);
            this.$alert('此司机已有车辆在驾驶，不能重复绑定', '驾驶车辆信息', {
              confirmButtonText: '确定'
            })
            } else if(isBinding == "" || isBinding == null || isBinding == undefined) {
            this.editDialogFormVisible = true;
            this.editForm.driverName = this.selectDataTable.driverName; //姓名
            this.editForm.telephone1 = this.selectDataTable.telephone1;//电话1
            this.editForm.driverId = this.selectDataTable.driverId;//电话1
          }
        },
        //驾驶车辆保存按钮
        bindSaveBtn() {
          let self = this;
          let params = {
            relDriverId:this.editForm.driverId,//司机ID
            relTruckId:this.editForm.truckBaseId, //车牌号ID
            bindTruckNo:this.editForm.bindingTruckNo, //绑定的车牌号
            bindDriver:this.editForm.driverName //绑定的司机
          };
          console.log(params);
          api.driverBindNoAdd(params)
            .then(function(res) {
              let data  = res.data;
              self.$refs['editForm'].resetFields();
              self.editDialogFormVisible = false;
              self.$refs.refListTable.updateRow(data)
            })
            .catch(function(err) {
              console.log(err);

            })
        },
        //
        selectNow() {

        },
        //取消驾驶按钮
        cancelCarNoBtn() {
          let isBinding = this.selectDataTable.bindingTruckNo;
          if(isBinding){
            this.showCancelType();//取消状态
            this.cancelFormVisible = true;
          }else {
            this.$alert('此司机没有车辆在驾驶', '解绑车牌信息', {
              confirmButtonText: '确定'
            })
          }
        },
        //取消驾驶保存按钮
        cancelPlateNoBtn() {
          let self = this;
          let params = {
            relDriverId: this.selectDataTable.driverId, //司机的ID
            bindTruckNo: this.selectDataTable.bindingTruckNo, //司机的ID
            unbindType: this.cancelForm.type,  //取消类型
            unbindReason: this.cancelForm.remark // 取消原因
          };
          if(params.unbindType == '') {
            self.$alert('您必须选择取消类型', '信息', {
              confirmButtonText: '确定'
            })
          } else{
            console.log(params);
            api.driverCancelPlateNo(params)
              .then(function(res) {
                let  data  = res.data;
                self.cancelFormVisible = false;
                self.cancelForm.type = '';
                self.cancelForm.remark  = '';
                self.$refs.refListTable.updateRow(data);

              })
              .catch(function(err) {
              })
          }


        },
        //删除按钮
        delBtn() {
          let self = this;
           if(this.selectDataTable === null) {
             alert('请选择一条数据！')
           } else {
             let params = {
               driverId: this.selectDataTable.driverId
             };
             api.driverDel(params)
               .then(function() {
                 self.$refs.refListTable.refreshView();
               })
               .catch(function (err) {

               })

           }

        },
        //tabs切换函数
        handleClick(tab, event) {
          console.log(tab, event);
        }

      },
      mounted(){
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
  .test {
    color: red;
  }
</style>

