<template>
   <div class="base-info">
     <!--基本信息显示-->
     <el-row>
       <el-col>
         <el-button @click="tkpaicheBtn"  v-show="tkShowBtn" v-if="isShowInfo" size="small">排车</el-button>
         <el-button @click="tkSaveBtn"  v-show="!tkShowBtn" size="small">保存</el-button>
         <el-button @click="tkCancelBtn"  v-show="!tkShowBtn" size="small">取消</el-button>
         <el-button @click="tkEditMsgBtn"  v-show="isShowInfo" v-if="tkShowBtn" size="small">编辑信息</el-button>
         <el-button @click="tkEditSaveBtn"  v-show="!isShowInfo" v-if="tkShowBtn" size="small">保存</el-button>
         <el-button @click="cancelTkBtn"  v-show="!isShowInfo" v-if="tkShowBtn" size="small">取消</el-button>
       </el-col>
     </el-row>
     <div v-if="displayForm">
       <el-form :model="showForm"  label-width="140px" >
         <el-row class="col-height-show">
           <el-col :span="6">
             <el-form-item label="排单方式">
               <span>{{showForm.doBillType}}</span>
               </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="车牌号">
               <span>{{showForm.plateNo}}</span>
              </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="司机/手机">
               <span>{{showForm.driverTelphone}}</span>
              </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="承运车队">
               <span>{{showForm.transFleet}}</span>
              </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="接运方">
               <span>{{showForm.receiveBillInfo}}</span>
              </el-form-item>
           </el-col>
         </el-row>
       </el-form>
     </div>
     <div v-if="!displayForm">
       <el-form :model="tkForm"  label-width="140px" :rules="tkFormRules"  ref="tkForm">
         <el-row  class="col-height">
           <el-col :span="6">
             <el-form-item label="排单方式"  prop="sendType"  >
               <el-select style="width:200px" :disabled="tkForm.sendTypeDisabled"  size="small"  v-model="tkForm.sendType" @change="sendTypeChange" clearable placeholder="请选择">
                 <el-option
                   v-for="item in tkForm.options"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="6" v-if="tkForm.transFleetShow">
             <el-form-item label="接运方" prop="receiveBillInfo">
               <el-autocomplete
                 style="width:200px"
                 v-model="tkForm.receiveBillInfo"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="shipperInfoSearch"
                 @select="shipperInfoSelect"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6" v-if="tkForm.plateNoShow">
             <el-form-item label="车牌号" prop="plateNo">
               <el-autocomplete
                 style="width:200px"
                 v-model="tkForm.plateNo"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="plateNoSearch"
                 @select="plateNoSelect"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6" v-if="tkForm.plateNoShow">
             <el-form-item label="司机/手机" prop="driverTelphone">
               <el-autocomplete
                 style="width:200px"
                 v-model="tkForm.driverTelphone"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="driverTelphoneSearch"
                 @select="driverTelphoneSelect"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6" v-if="tkForm.plateNoShow">
             <el-form-item label="承运车队" prop="transFleet">
               <el-input style="width:200px" :disabled="true" v-model="tkForm.transFleet"  :maxlength="11"  size="small"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
     </div>


     <div v-if="otherInfo">
       <el-form :model="showForm"  label-width="140px" >
         <el-row class="col-height-show">
           <el-col :span="6">
             <el-form-item label="运单号">
               <span>{{showForm.tkBillCode}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="运单状态">
               <span>{{showForm.billStatus}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="运单类型">
               <span>{{showForm.billType}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="托运方">
               <span>{{showForm.sendBillInfo}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="箱型">
               <span>{{showForm.teuType}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="箱号">
               <span>{{showForm.teuNo}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="铅封号">
               <span>{{showForm.sealNo}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="提箱点">
               <span>{{showForm.getClpPlace}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="进箱点">
               <span>{{showForm.downClpPlace}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="装拆地">
               <span>{{showForm.destination}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="装拆点">
               <span>{{showForm.destinationPoint}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="装拆时间">
               <span>{{showForm.destinationDateStr}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="计划重量">
               <span>{{showForm.planWeight}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="实际重量">
               <span>{{showForm.realWeight}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="备注">
               <span>{{showForm.remark}}</span>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
        <!-- <el-row class="show-style">
           <el-col :span="8">
             <label >运单号</label>
               <span>{{showForm.tkBillCode}}</span>
           </el-col>
           <el-col :span="8">
             <label >运单状态</label>
               <span>{{showForm.billStatus}}</span>
           </el-col>
           <el-col :span="8">
             <label >运单类型</label>
               <span>{{showForm.billType}}</span>
           </el-col>
           <el-col :span="8">
             <label >托运方</label>
               <span>{{showForm.sendBillInfo}}</span>
           </el-col>
           <el-col :span="8">
             <label >箱型</label>
               <span>{{showForm.teuType}}</span>
           </el-col>
           <el-col :span="8">
             <label >箱号</label>
               <span>{{showForm.teuNo}}</span>
           </el-col>
           <el-col :span="8">
             <label >铅封号</label>
               <span>{{showForm.sealNo}}</span>
           </el-col>
           <el-col :span="8">
             <label >提箱点</label>
               <span>{{showForm.getClpPlace}}</span>
           </el-col>
           <el-col :span="8">
             <label >进箱点</label>
               <span>{{showForm.downClpPlace}}</span>
           </el-col>
           <el-col :span="8">
             <label >装拆地</label>
               <span>{{showForm.destination}}</span>
           </el-col>
           <el-col :span="8">
             <label >装拆点</label>
               <span>{{showForm.destinationPoint}}</span>
           </el-col>
           <el-col :span="8">
             <label >装拆时间</label>
               <span>{{showForm.destinationDateStr}}</span>
           </el-col>
           <el-col :span="8">
             <label >计划重量</label>
               <span>{{showForm.planWeight}}</span>
           </el-col>
           <el-col :span="8">
             <label >实际重量</label>
               <span>{{showForm.realWeight}}</span>
           </el-col>
           <el-col :span="8">
             <label >备注</label>
               <span>{{showForm.remark}}</span>
           </el-col>
         </el-row>-->
     </div>
     <div v-if="!otherInfo">
       <el-form :model="otherForm"  label-width="140px" :rules="otherForm"  ref="otherForm">
         <el-row  class="col-height">
           <el-col :span="8">
             <el-form-item label="运单号">
               <span>{{showForm.tkBillCode}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="运单状态">
               <span>{{showForm.billStatus}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="运单类型">
               <span>{{showForm.billType}}</span>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="托运方">
               <span>{{otherForm.sendBillInfo}}</span>
             </el-form-item>
           </el-col>

           <el-col :span="8">
             <el-form-item label="箱型" prop="teuType">
               <el-select style="width:200px" v-model="otherForm.teuType" clearable placeholder="请选择">
                 <el-option
                   v-for="item in otherForm.options"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="箱号" prop="teuNo">
               <el-input style="width:200px" v-model="otherForm.teuNo" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="铅封号" prop="sealNo">
               <el-input style="width:200px" v-model="otherForm.sealNo" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="8" >
             <el-form-item label="提箱点" prop="getClpPlace">
               <el-autocomplete
                 style="width:200px"
                 v-model="otherForm.getClpPlace"
                 placeholder="请输入内容"
                 :fetch-suggestions="getClpPlaceQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="8" >
             <el-form-item label="进箱点" prop="downClpPlace">
               <el-autocomplete
                 style="width:200px"
                 v-model="otherForm.downClpPlace"
                 placeholder="请输入内容"
                 :fetch-suggestions="downClpPlaceQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="8" >
             <el-form-item label="装拆地" prop="destination">
               <el-autocomplete
                 style="width:200px"
                 v-model="otherForm.destination"
                 placeholder="请输入内容"
                 :fetch-suggestions="destinationQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="装拆时间" prop="destinationDateStr">
               <el-date-picker
                 style="width:200px"
                 v-model="otherForm.destinationDateStr"
                 type="date"
                 placeholder="选择日期"
                 :editable="false"
               >
               </el-date-picker>
             </el-form-item>
           </el-col>
           <el-col :span="8" >
             <el-form-item label="装拆点" prop="destinationPoint">
               <el-autocomplete
                 style="width:500px"
                 v-model="otherForm.destinationPoint"
                 placeholder="请输入内容"
                 :fetch-suggestions="destinationpointSearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="计划重量" prop="planWeight">
               <el-input style="width:200px" v-model="otherForm.planWeight" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="实际重量" prop="realWeight">
               <el-input style="width:200px" v-model="otherForm.realWeight" placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>

           <el-col :span="8">
             <el-form-item label="备注">
               <span>{{otherForm.remark}}</span>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
     </div>

   </div>
</template>

<script>
  import api from '@/api/api'
  import axios from 'axios'
  const neiP = '内排';
  const waiP = '外排';
    export default {
      props:['showData','activeName','updateRow'],
      name: 'base-info',
      data() {
        return {
          displayForm: true, //表单显示隐藏
          otherInfo: true,
          //运单显示
          showForm : {
            doBillType: '',//排单方式
            plateNo:'', //车牌号
            driverTelphone:'', //手机号
            receiveBillInfo: '', //接运方
            receiveBillId:'', //接运方ID
            fleet:'', ///承运车队
            tkBillCode:'', //运单号
            billStatus:'',//运单状态
            billType:'', //运单类型
            teuType:'', //箱型
            teuNo:'',  //箱号
            seaNo:'', //铅封号
            getClpPlace:'', //提箱点
            downClpPlace:'', //进箱点
            destination:'', //装拆地
            destinationPoint:'', //装拆点
            destinationDateStr:'', //装拆时间
            planWeight:'', //计划重量
            realWeight:'', //实际重量
            send_bill_info:'', //托运方
            sendBillId: '', //托运方id
            remark:'', //备注
            transFleet:'',//承运车队
            transFleetShow:false,
            plateNoShow:true,
            sendTypeDisabled: false,
          },
          isShowInfo:true,
          tkShowBtn: true,
          //排车表单编辑
          tkForm:{
            sendType: '内排',//排单方式
            options:[],
            transFleet:'',
            transFleetId:'',
            receiveBillInfo:'',
            driverName:'',
            telephone1:'',
            driverPhone:'',
            driverTelphone:'',
            driverId:'',
            plateNo:'',
            fleet:'', ///承运车队
            relFleetId:'',//承运车队ID
            shipperId:'',
            transFleetShow:false,
            plateNoShow:true,
            sendTypeDisabled: false,
          },
          tkFormRules: {

          },
          //其他信息编辑
          //排车表单编辑
          otherForm: {
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
            sendBillInfo:'',
            sendBillId:'',
          },
          otherFormRules:{
            shipperInfo: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
          },
        }
      },
      watch:{
        'showData' : function() {
          let self= this ;
          if(this.activeName == '运单信息'){
            self.showInfoMsg();
          }

        }
      },
      methods: {
        /*==========*/
        //转日期格式
        formatDate(date) {
          if (date === '') {
            return date;
          } else {
            let start = new Date(date);
            let y = start.getFullYear();
            let m = start.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = start.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
          }

        },
        //转日期+时间的格式
        formatDateTime(date) {
          if (date === '') {
            return date;
          } else {
            let start = new Date(date);
            let y = start.getFullYear();
            let m = start.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = start.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = start.getHours();
            h = h < 10 ? '0' + h : h;
            let z = start.getMinutes();
            z = z < 10 ? '0' + z : z;
            let s = start.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + m + '-' + d + ' ' + h + ':' + z + ':' + s;
          }

        },
        //托运方模糊搜索接口
        shipperInfoSearch(queryString, callback) {
          let self = this;
          api.customerSearch(queryString)
            .then(function(res){
              callback(res);
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
          api.getPlateNoSearch(queryString).then(function (res) {
            let  data  = res.data
            let tkPcDataList = [];
            for (var objTemp of data) {
              tkPcDataList.push({
                driverId: objTemp.driverId,
                driverName: objTemp.driverName,
                telephone1: objTemp.telephone1,
                fleet: objTemp.fleet,
                relFleetId: objTemp.relFleetId,
                tractorNo: objTemp.tractorNo,
                driver: objTemp.driverName + '/' + objTemp.telephone1,
                value: objTemp.tractorNo + '/' + objTemp.driverName + '/' + objTemp.telephone1
              });
            }
            callback(tkPcDataList);

          }).catch(function (err) {

          })
        },
        //车牌号下拉选中函数
        plateNoSelect(item) {
          this.tkForm.plateNo = item.tractorNo;
          this.tkForm.driverTelphone = item.driver;
          this.tkForm.transFleet = item.fleet;
          this.tkForm.relFleetId = item.relFleetId;
          this.tkForm.driverName = item.driverName;
          this.tkForm.driverId = item.driverId;
          this.tkForm.driverPhone = item.telephone1;
          console.log(item)
        },
        //司机的模糊搜索
        driverTelphoneSearch(queryString, callback) {
          let self = this;
          api.getDriverTelphoneSearch(queryString).then(function (res) {
            let  data = res.data;
            let resultData = [];
            for (var objTemp of data) {
              resultData.push({
                key: objTemp.driverId,
                value: objTemp.driverName + '/' + objTemp.telephone1,
                telphone: objTemp.telephone1,
                driverName: objTemp.driverName

              });
            }
            callback(resultData);

          }).catch(function (err) {

          })
        },
        //司机下拉选中事件
        driverTelphoneSelect(item){
          this.tkForm.driverName = item.driverName;
          this.tkForm.driverId = item.key;
          this.tkForm.driverPhone = item.telphone;
        },
        //排单方式下拉接口
        sendTypeHandle() {
          let self = this;
          api.selectBusTypeHandle('pctype')
            .then(function (res) {
              const selectData = [];
              let data  = res.data;
              console.log(data)
              for (let objTemp of data) {
                selectData.push({key: objTemp.value, "value": objTemp.display, label: objTemp.value})
              }
              self.tkForm.options = selectData
            })
            .catch(function (err) {

            })


        },
        //排单方式下拉值改变
        sendTypeChange(item){
          console.log(item);
          if (item == neiP) {
            this.tkForm.transFleetShow = false;
            this.tkForm.plateNoShow = true;
          } else if (item == waiP) {
            this.tkForm.plateNoShow = false;
            this.tkForm.transFleetShow = true;
          }
        },
        //业务箱型下拉框
        teuTypeHandle() {
          let self = this;
          api.selectBusTypeHandle('tuetype')
            .then(function (res) {
              let selectData = [];
              let  data  = res.data;
              console.log(data)
              for (let objTemp of data) {
                selectData.push({"value": objTemp.display})
              }
              self.otherForm.options = selectData;
            })
            .catch(function (err) {


            })


        },
        //装拆地模糊查询
        destinationQuerySearch(queryString, callback) {
          if (queryString != '') {
            api.getDestinationSearch(queryString)
              .then(function (res) {
                let data = res.data;
                let resultData = [];
                for (var objTemp of data) {
                  resultData.push({
                    "key": '',
                    "value": objTemp.province + '/' + objTemp.city + '/' + objTemp.district + '/' + objTemp.town
                  });
                }
                callback(resultData);
              })
              .catch(function (err) {

              })
          } else {
            console.log('为空值')
          }

        },
        //提箱点的模糊查询
        getClpPlaceQuerySearch(queryString, callback) {
          if (queryString != '') {
            api.getClpPlaceSearch(queryString, 2)
              .then(function (res) {
                var data = res.data;
                var resultData = [];
                for (var objTemp of data) {
                  resultData.push({"key": '', "value": objTemp.memCode + '/' + objTemp.area});
                }
                callback(resultData);

              })
              .catch(function (err) {


              })
          } else {
            console.log('为空值')
          }
        },
        //进箱点模糊查询
        downClpPlaceQuerySearch(queryString, callback) {
          if (queryString != '') {

            api.getClpPlaceSearch(queryString, 1)
              .then(function (res) {
                var data = res.data;
                var resultData = [];
                for (var objTemp of data) {
                  resultData.push({"key": '', "value": objTemp.memCode + '/' + objTemp.area});
                }
                callback(resultData);

              })
              .catch(function (err) {


              })
          } else {
            console.log('为空值')
          }
        },
        //装拆点模糊查询
        destinationpointSearch(queryString, callback) {
          if (queryString != '') {
            api.getDestinationPointSearch(queryString)
              .then(function (res) {
                let data = res.data;
                let resultData = [];
                for (var objTemp of data) {
                  resultData.push({
                    "key": objTemp.destinationPointId,
                    "value": objTemp.address + '/' + objTemp.contactPeopleOne + '/' + objTemp.mobilePhoneOne
                  });
                }
                callback(resultData);
              })
              .catch(function (err) {


              })
          } else {
            console.log('为空值')
          }

        },
        /*=========*/
        showInfoMsg() {
          let self = this;
          if (this.activeName === '运单信息') {
            for (let objTemp in self.showData) {
              self.showForm[objTemp] = this.showData[objTemp];
              self.tkForm[objTemp] = this.showData[objTemp];
            }
            if(!this.showData.driverName) {
              self.showForm.driverTelphone ='';
              self.tkForm.driverTelphone = '';
            }else {
              self.showForm.driverTelphone = this.showData.driverName + '/' + this.showData.driverTelephone;
              self.tkForm.driverTelphone = this.showData.driverName + '/' + this.showData.driverTelephone;
            }
          }
        },
        //点击排车按钮
        tkpaicheBtn() {
          let self = this;
          if(this.showForm.doBillType === '外排') {
            self.displayForm = false;
            self.tkShowBtn = false;
            self.tkForm.plateNoShow = false;
            self.tkForm.transFleetShow = true;
            self.tkForm.sendType = '外排';//排单方式
          } else {
            self.displayForm = false;
            self.tkShowBtn = false;
          }
        },
        //保存托卡
        tkSaveBtn() {
          let self = this;
          let tkWp = {
            sendType: this.tkForm.sendType,
            transFleet: this.tkForm.receiveBillInfo, //
            relTransFleetId: this.tkForm.transFleetId
          };
          let tkNp = {
            sendType: this.tkForm.sendType, //排单方式
            transFleet: this.tkForm.transFleet, //承运车队
            relTransFleetId: this.tkForm.relFleetId, //承运方id
            driverName: this.tkForm.driverName, //司机名字
            plateNo: this.tkForm.plateNo,   //车牌号
            relDriverId: this.tkForm.driverId, //司机ID
            driverTelephone: this.tkForm.driverPhone //司机电话
          };
          let tkData = [this.showData];
          console.log(tkNp);
          console.log(tkWp);
          console.log(JSON.stringify(tkData));

          if (this.tkForm.sendType == waiP) {
            axios({
              method: 'post',
              url: '/sendtruck/settruck',
              timeout: 5000,
              params: {
                sendTruck: JSON.stringify(tkWp),
                xdTkBillList: JSON.stringify(tkData)
              },
              responseType: 'json'
            })
              .then(function (res) {
                console.log(res);
                self.backShowData(self.showData.xdTkBillId);
              })
              .catch(function (err) {
                console.log(err);

              });
          } else if(this.tkForm.sendType == neiP) {
            axios({
              method: 'post',
              url: '/sendtruck/settruck',
              timeout: 5000,
              params:{
                sendTruck: JSON.stringify(tkNp),
                xdTkBillList: JSON.stringify(tkData)
              },
              responseType: 'json'
            }).then(function(res){
              self.backShowData(self.showData.xdTkBillId);
              })
              .catch(function(err){
                console.log(err);
              });
          }

        },
        //保存成功后返回的数据
        backShowData(item) {
          let self = this;
          api.ydIdSearch(item)
            .then(function(res){
              let  data  = res.data;
              self.updateRow(data);
              self.displayForm = true;
              self.tkShowBtn = true;
              for(let item in self.showForm) {
                self.showForm[item] = data[item];
              }
              self.showForm.driverTelphone = data.driverName + '/' + data.driverTelphone;
          })
            .catch(function(err){

            });

        },
        //取消按钮
        tkCancelBtn() {
          this.displayForm = true;
          this.tkShowBtn = true;
        },
        //编辑信息
        tkEditMsgBtn() {
          if(this.showData){
              this.otherInfo = false;
              this.isShowInfo = false;
              for(let objTemp in this.showData ) {
                this.otherForm[objTemp] = this.showData[objTemp];
              }
          }

        },
        //编辑信息保存
        tkEditSaveBtn() {
            let self = this;
            let params = {
              xdTkBillId: this.otherForm.xdTkBillId,
              sendBillInfo: this.otherForm.sendBillInfo,
              sendBillId: this.otherForm.sendBillId,
              teuType: this.otherForm.teuType,
              teuNo: this.otherForm.teuNo ,
              sealNo: this.otherForm.sealNo,
              getClpPlace: this.otherForm.getClpPlace,
              downClpPlace: this.otherForm.downClpPlace,
              destination: this.otherForm.destination ,
              destinationDateStr: this.formatDate(this.otherForm.destinationDateStr),
              planWeight: this.otherForm.planWeight,
              realWeight: this.otherForm.realWeight,
              destinationPoint: this.otherForm.destinationPoint
            };
            console.log(params);
            api.tkEditSubmit(params)
             .then(function (res) {
               let data  = res.data;
               self.updateRow(data);
               self.otherInfo = true;
               self.isShowInfo = true;
               for(let item in self.showForm) {
                 self.showForm[item] = data[item];
               }
            }).catch(function(err){
              console.log(err);

            })
      },
        //取消按钮
        cancelTkBtn() {
          this.otherInfo = true;
          this.isShowInfo = true;
        }

     },
      mounted() {
        this.sendTypeHandle();
        this.teuTypeHandle();
      },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show-label label{
  width: 120px;
  text-align: right;
}
.show-label span {
  text-indent: 20px;
}
.show-style label {
  display: inline-block;
  width: 140px;
  text-align: right;
}
.show-style span {
  display: inline-block;
  text-indent: 10px;
}
.col-height .el-col {
    height:40px ;
  }
.col-height-show .el-col {
  height:32px ;
}
</style>

