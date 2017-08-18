<template>
 <div class="base-msg">
     <el-button @click="editCarBtn" v-show="isDetails" size="small">编辑</el-button>
     <el-button @click="saveCarBtn" v-show="!isDetails"   size="small">保存</el-button>
     <el-button @click="delCarBtn" v-show="isDetails"  size="small">删除</el-button>
     <el-button @click="cancelCarBtn" v-show="!isDetails"  size="small"> 取消</el-button>
     <div v-show="isDetails">
       <el-form :model="showForm"  label-width="110px">
         <el-row  class="col-height-show">
           <el-col :span="6">
             <el-form-item label="挂车号">
               <span>{{showForm.tractorNo}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="登记日期">
               <span>{{showForm.registerDateStr}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="厂牌型号" prop="model">
               <span>{{showForm.model}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="自重" >
               <span>{{showForm.selfWeight}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
             <el-form-item label="轴数" prop="rollerNum">
               <span>{{showForm.rollerNum}}</span>
             </el-form-item>
           </el-col>

           <el-col :span="6">
             <el-form-item label="年审日期">
               <span>{{showForm.annualInspPeriodStr}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="状态">
               <span>{{showForm.status}}</span>
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
       <el-form :model="editForm"  label-width="110px" :rules="editFormRules"  ref="editForm">
         <el-row class="col-height">
           <el-col :span="6">
             <el-form-item label="挂车号"  prop="tractorNo">
               <el-input v-model="editForm.tractorNo" placeholder="请输入内容"></el-input>
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
             <el-form-item label="厂牌型号" prop="model">
               <el-input v-model="editForm.model" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="自重(KG)" prop="selfWeight">
               <el-input v-model="editForm.selfWeight" placeholder="请输入内容"  value="number"  ></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
             <el-form-item label="轴数" prop="rollerNum">
               <el-select v-model="editForm.rollerNum" placeholder="请选择">
                 <el-option
                   v-for="item in editForm.rollerNumOptions"
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
                 v-model="editForm.annualInspPeriodStr"
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
             <el-form-item label="备注"  prop="remark">
               <el-input v-model="editForm.remark" placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
     </div>
  </div>
</template>

<script>
  import api from '@/./api/api'
    export default {
      props:['selectNowData','updateRow','selectRows'],
      name:'base-msg',
      data() {
         return {
           //车头显示数据
           showForm : {
             tractorNo:'',//车牌号
             registerDateStr:'',//登记日期
             model:'', //厂牌型号
             selfWeight:'', //自重
             rollerNum:'',//轴数
             annualInspPeriodStr:'',//年审日期
             status:'有效',//状态
             remark:'',//备注
           },
           isDetails:true,
           //车头编辑数据
           editForm : {
             tractorNo:'',//车牌号
             registerDateStr:'',//登记日期
             model:'', //厂牌型号
             selfWeight:'', //自重
             rollerNum:'',//轴数
             annualInspPeriodStr:'',//年审日期
             status:'',//状态
             remark:'',//备注
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
           editFormRules: {},
         }
      },
      watch: {
        'selectNowData.trailerId':function(val,oldVal) {
          console.log(val);
          this.showFormMsg(val);
        }
      },
      methods: {
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
            })
            .catch(function(err){

            })
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
        //单机显示列表 数据
        showFormMsg(val) {
          let self = this;
          let params = {
            trailerId: val
          };
          api.guaCarListShow(params)
            .then(function(res) {
              console.log(res);
              let showData = res[0];
              for(let showJson in showData) {
                self.showForm[showJson] = showData[showJson];
                self.editForm[showJson] = showData[showJson];
                console.log(self.editForm[showJson]);
              };
              console.log('编辑表单');
            })
            .catch(function(err) {

            })
        },
        //编辑按钮
        editCarBtn() {
          if(this.selectNowData != null ) {
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
            trailerId: this.selectNowData.trailerId,
            tractorNo:this.editForm.tractorNo,//车牌号
            model:this.editForm.model, //厂牌型号
            selfWeight:this.editForm.selfWeight, //自重(KG)(KG)
            registerDateStr: self.formatDate(this.editForm.registerDateStr),//登记日期
            annualInspPeriodStr: self.formatDate(this.editForm.annualInspPeriodStr),//年审日期
            rollerNum:this.editForm.rollerNum,//轴数
            status:this.editForm.status,//状态
            remark:this.editForm.remark//备注
          };
          console.log(params);
          this.saveCarInterface(params);
        },
        //保存接口
        saveCarInterface(params) {
          let self = this;
          api.guaCarEdit(params)
            .then(function(res) {
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

        //删除按钮
        delCarBtn() {
          let self = this;
          if(this.selectNowData == null) {
            this.$alert('请选择一条数据', '信息', {
              confirmButtonText: '确定'
            })
          }else {
            let selectRows = this.selectNowData.trailerId;
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
              })
              .then(function() {
                let params = {
                  trailerId: selectRows
                };
                api.guaCarDel(params)
                  .then(function(res) {
                    self.refreshViewParent();
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
        //调用父级删除
        refreshViewParent() {
          this.$emit("seletClk",'1');
        }
      },
      mounted() {
        this.showState();
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-height-show .el-col {
    height: 32px ;
  }
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
</style>

