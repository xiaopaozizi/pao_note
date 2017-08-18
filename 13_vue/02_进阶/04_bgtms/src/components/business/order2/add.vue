<template>
   <div class="add" style="margin-left: -20px;">
     <div v-if="nextShow">
       <el-form :model="addForm"  label-width="90px" :rules="addFormRules"  ref="addForm">
         <el-row>
           <el-col :span="6">
             <el-form-item label="托运方"  prop="shipperInfo" id="color">
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.shipperInfo"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="shipperInfoQuerySearch"
                 @select="shipperInfoSelectHandle"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="联系人/电话"  prop="contact" >
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.contact"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="contactQuerySearch"
                 @select="contactSelectHandle"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="客户单号" prop="customerCode">
               <el-input style="width:245px" v-model="addForm.customerCode" size="small"   placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="类型" prop="busType">
               <el-select style="width:245px" v-model="addForm.busType"  size="small" clearable placeholder="请选择">
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
             <el-form-item label="提单号" prop="billNumber">
               <el-input style="width:245px" v-model="addForm.billNumber"  size="small"  placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="船名航次" prop="vesselVoyage">
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.vesselVoyage"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="vesselVoyageSearch"
                 @select="vesselHandleSelect"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="截关日期" prop="cyClosingDayStr">
               <el-date-picker
                 style="width:245px"
                 v-model="addForm.cyClosingDayStr"
                 size="small"
                 type="date"
                 placeholder="选择日期时间">
               </el-date-picker>

             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="来源"  prop="orderSource">
               <el-select style="width:245px" v-model="addForm.orderSource"   size="small"  clearable placeholder="请选择">
                 <el-option
                   v-for="item in addForm.orderSourceOptions"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="6" >
             <el-form-item label="装拆地" prop="destination">
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.destination"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="destinationQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
             <el-form-item label="提箱点" prop="getClpPlace">
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.getClpPlace"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="getClpPlaceQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
             <el-form-item label="进箱点" prop="downClpPlace">
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.downClpPlace"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="downClpPlaceQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
           <el-col :span="6" >
             <el-form-item label="船公司" prop="shippingCompany">
               <el-autocomplete
                 style="width:245px"
                 v-model="addForm.shippingCompany"
                 size="small"
                 placeholder="请输入内容"
                 :fetch-suggestions="shippingCompanyQuerySearch"
               ></el-autocomplete>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="6" >
             <el-form-item label="部门" prop="department">
               <el-input style="width:245px" v-model="addForm.department"  size="small"  placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="业务员"  prop="salesman">
               <el-input style="width:245px" v-model="addForm.salesman"  size="small"  placeholder="请输入内容" :maxlength="11"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="6">
             <el-form-item label="装拆期限" prop="expdateStr">
               <el-date-picker
                 style="width:245px"
                 v-model="addForm.expdateStr"
                 size="small"
                 type="date"
                 placeholder="选择日期"
                 :editable="false"
               >
               </el-date-picker>
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="24" >
             <el-form-item label="箱量" prop="teuTypeCount2">
               <el-row>
                 <el-col :span="3">
                   <p>20GP</p>
                   <el-input-number size="small" v-model="teuTypeCount2.num1" :min="0" :max="25"></el-input-number>
                 </el-col>
                 <el-col :span="3">
                   <p>2*20GP</p>
                   <el-input-number size="small" v-model="teuTypeCount2.num2" :min="0" :max="25"></el-input-number>
                 </el-col>
                 <el-col :span="3">
                   <p>40GP</p>
                   <el-input-number size="small" v-model="teuTypeCount2.num3" :min="0" :max="25"></el-input-number>
                 </el-col>
                 <el-col :span="3">
                   <p>40HQ</p>
                   <el-input-number size="small" v-model="teuTypeCount2.num4" :min="0" :max="25"></el-input-number>
                 </el-col>
                 <el-col :span="3">
                   <p>45HQ</p>
                   <el-input-number size="small" v-model="teuTypeCount2.num5"  :min="0" :max="25"></el-input-number>
                 </el-col>
               </el-row>

             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="12">
             <el-form-item label="备注"  prop="remark">
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 2, maxRows: 4}"
                 v-model="addForm.remark"
                 placeholder="请输入内容"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
     </div>
     <div v-if="!nextShow">
       <step-next  :selectData="selectData"></step-next>
     </div>
     <div  style="text-align: center">
       <el-button v-if="nextShow" type="primary" @click="addSaveBtn" size="small">完成</el-button>
       <el-button v-if="nextShow"  type="primary" @click="goOnBtn" size="small">排单</el-button>
       <el-button  @click="returnStep" v-if="!nextShow" type="info" size="small">返回基本信息</el-button>
       <el-button  @click="cancelStep"  type="warning" size="small">取消</el-button>
     </div>
   </div>
</template>

<script>
  import api from '@/api/api'
  import next from './addOrder2.vue'
    export default {
       name: 'add',
      components : {
        'step-next': next
      },
      data() {
        return {
          //新增表单
          addForm: {
            shipperInfo:'',//托运方
            shipperId:'', //托运方ID
            contact:'', //联系人
            contactId:'',//联系人ID
            customerCode: '',//客户单号
            expdateStr: '', //装拆期限
            busType: '', //类型
            options:[],
            billNumber: '',//提单号
            vesselVoyage: '', //船名航次
            cyClosingDayStr: '',//截关日期
            orderSource: '自揽', //来源
            orderSourceOptions:[],
            destination: '', //装拆地
            getClpPlace: '', //提箱点
            downClpPlace: '', //进箱点
            shippingCompany: '', //船公司
            department: '',//部门
            salesman: '', //业务员
            remark: '', //备注
            orderStatus: '处理中',
            teuTypeCount: '' //箱量
          },
          //计步器
          teuTypeCount2: {
            num1:'',
            num2:'',
            num3:'',
            num4:'',
            num5:'',
          },
          addFormRules:{
            shipperInfo: [
              { required: true, message: '请输入托运方', trigger: 'blur' }
            ],
          },
          nextShow: true,
          //下单成功后获取订单ID
          xdOrderId:'',
          orderCode:'',
          paramData: {
            shipperInfo: '',//托运方
            shipperId:'',
          },
          selectData:null,
        }
      },
      methods:{
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
        //转日期+时间的格式
        formatDateTime(date) {
          if(date === '') {
            return date;
          }else {
            let  start = new Date(date);
            let y = start.getFullYear();
            let m = start.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = start.getDate();
            d = d < 10 ? ('0' + d) : d;
            let  h = start.getHours();
            h = h < 10 ? '0' + h : h;
            let  z =  start.getMinutes();
            z = z < 10 ? '0' + z : z;
            let  s =  start.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + m + '-' + d + ' ' + h +':'+ z +':' + s;
          }

        },
        //托运方简称的模糊搜索
        shipperInfoQuerySearch(queryString,callback) {
          let self = this;
          api.customerSearch(queryString)
            .then(function(res){
              /* console.log(res);
               var data = res.data;
               var resultData = [];
               for(var objTemp of data){
               resultData.push(
               {"key":objTemp.customerBaseId, "value":objTemp.custShortName}
               );*/
              //console.log(res);
              // }
              callback(res);
            })
            .catch(function(err){

            });
        },
        //托运方选中事件
        shipperInfoSelectHandle(item) {
          console.log(item);
          this.addForm.shipperId = item.key;
        },
        //联系人模糊查询
        contactQuerySearch(queryString,callback) {
          let self = this;
          api.getShipperInfoContactSearch({
              searchStr: queryString,
              relCostomerId: this.addForm.shipperId
            })
            .then(function(res){
              console.log(res);
              let  data = res.data;
              console.log(data);
              let resultData = [];
              for(var objTemp of data){
                resultData.push(
                  {"key":objTemp.contactId, "value":objTemp.contactPeople +'/'+ objTemp.mobilephoneOne}
                );
              }
              callback(resultData);
            })
            .catch(function(err){

            });
        },
        //联系人下拉选中
        contactSelectHandle(item) {
          this.addForm.contactId = item.key;
          console.log(this.addForm.contactId);
        },
        //类型下拉框
        busTypeHandle() {
          let self = this;
          self.selectYw = [];
          api.selectBusTypeHandle('ywlx')
            .then(function (res) {
              let data = res.data;
              let selectArry = [];
              for (let objTemp of data) {
                selectArry.push({"value":objTemp.display })
              }
              self.addForm.options =  selectArry;
            })
            .catch(function(err){

            })
        },
        //船名航次模糊搜索接口
        vesselVoyageSearch(queryString, callback) {
          let self = this
          if( queryString != '' ){
            api.getVesselVoyageSearch(queryString)
              .then(function (res) {
                self.cmhc = [];
                let  data   = res.data; //快速获取JSON对象
                for(var objTemp of data){
                  self.cmhc.push({"key":objTemp.portCloseDateStr,"value":objTemp.engdescription + '/' + objTemp.voyage});
                }
                callback(self.cmhc);

              })
              .catch(function(err){

              })
          }else{
            console.log('为空值')
          }
        },
        //截关日期处理函数
        vesselHandleSelect(item) {
          this.addForm.cyClosingDayStr = item.key
        },
        //来源
        orderSourceChange() {
          let self = this;
          self.selectYw = [];
          api.selectBusTypeHandle('ddly')
            .then(function (res) {
              let data = res.data;
              let orderSource = [];
              for (let objTemp of data) {
                orderSource.push({"value":objTemp.display })
              }
              self.addForm.orderSourceOptions = orderSource
            })
            .catch(function(err){

            })



        },
        //装拆地模糊查询
        destinationQuerySearch(queryString, callback) {
          if( queryString != '' ){
            api.getDestinationSearch(queryString)
              .then(function (res) {
                let data = res.data;
                let resultData = [];
                for(var objTemp of data){
                  resultData.push({"key":'',"value":objTemp.province + '/' + objTemp.city + '/' + objTemp.district + '/' +objTemp.town});
                }
                callback(resultData);
              })
              .catch(function(err){

              })
          }else{
            console.log('为空值')
          }

        },
        //提箱点的模糊查询
        getClpPlaceQuerySearch(queryString, callback) {
          if( queryString != '' ){
            api.getClpPlaceSearch(queryString,2)
              .then(function (res) {
                var data = res.data;
                var resultData = [];
                for(var objTemp of data){
                  resultData.push({"key":'',"value":objTemp.memCode + '/' + objTemp.area});
                }
                callback(resultData);
              })
              .catch(function(err){


              })
          }else{
            console.log('为空值')
          }
        },
        //进箱点模糊查询
        downClpPlaceQuerySearch(queryString, callback) {
          if( queryString != '' ){

            api.getClpPlaceSearch(queryString,1)
              .then(function (res) {
                var data = res.data;
                var resultData = [];
                for(var objTemp of data){
                  resultData.push({"key":'',"value":objTemp.memCode + '/' + objTemp.area});
                }
                callback(resultData);

              })
              .catch(function(err){


              })
          }else{
            console.log('为空值')
          }
        },
        //船公司
        shippingCompanyQuerySearch(queryString, callback) {
          if( queryString != '' ){
            api.getShippingCompanySearch(queryString,'cgs')
              .then(function (res) {
                let data  = res.data;
                var resultData = [];
                for(var objTemp of data){
                  resultData.push({"key":'',"value":objTemp.value + '/' + objTemp.display});
                }
                callback(resultData);
              })
              .catch(function(err){


              })
          }else{
            console.log('为空值')
          }
        },
        //箱型转换
        countType() {
          let self = this;
          let  count  = [];
          if( self.teuTypeCount2.num1  != ' ' ){
            count.push(self.teuTypeCount2.num1 + '-' + '20GP')
          } else{}
          if( self.teuTypeCount2.num2  != ' ' ){
            count.push(self.teuTypeCount2.num2 + '-' + '2*20GP')
          } else{}
          if( self.teuTypeCount2.num3  != ' ' ){
            count.push(self.teuTypeCount2.num3 + '-' + '40GP')
          } else{}
          if( self.teuTypeCount2.num4  != ' ' ){
            count.push(self.teuTypeCount2.num4 + '-' + '40HQ')
          } else{}
          if( self.teuTypeCount2.num5 != ' ' ){
            count.push(self.teuTypeCount2.num5 + '-' + '45HQ')
          } else{}
          return count.join(",");
        },
        // 新增保存按钮
        addSaveBtn() {
          let self = this;
          this.$refs.addForm.validate(function(valid){
            if(valid) {
              let params = {
                shipperInfo: self.addForm.shipperInfo,//托运方
                shipperId: self.addForm.shipperId, //托运方ID
                contactPeople: self.addForm.contact, //联系人
                relContactId: self.addForm.contactId, //联系人ID
                customerCode: self.addForm.customerCode,//客户单号,
                expdateStr:self.formatDate(self.addForm.expdateStr) , //装拆期限
                busType: self.addForm.busType, //类型
                billNumber: self.addForm.billNumber,//提单号
                vesselVoyage: self.addForm.vesselVoyage, //船名航次
                cyClosingDayStr: self.formatDate(self.addForm.cyClosingDayStr),//截关日期
                orderSource: self.addForm.orderSource, //来源
                destination: self.addForm.destination, //装拆地
                getClpPlace: self.addForm.getClpPlace, //提箱点
                downClpPlace: self.addForm.downClpPlace, //进箱点
                shippingCompany: self.addForm.shippingCompany, //船公司
                department: self.addForm.department,//部门
                salesman: self.addForm.salesman, //业务员
                remark: self.addForm.remark, //备注
                orderStatus: '处理中',
                teuTypeCount: self.countType(),
              };
              console.log(params);
              api.addBaseInfo(params)
                .then(function(res) {
                  console.log(res);
                  let id  = res.data.xdOrderId;
                  self.$router.push('/business/order2/' + id);
                  self.$refs['addForm'].resetFields();
                })
                .catch(function(err) {

                })
            }
          });

        },
        //继续排车
        goOnBtn() {
          let self = this;
          let isNext = this.xdOrderId;
          if(isNext) {
            this.nextShow = false;
          } else {
            this.$refs.addForm.validate(function(valid){
              if(valid) {
                let params = {
                  shipperInfo: self.addForm.shipperInfo,//托运方
                  shipperId: self.addForm.shipperId, //托运方ID
                  contactPeople: self.addForm.contact, //联系人
                  relContactId: self.addForm.contactId, //联系人ID
                  customerCode: self.addForm.customerCode,//客户单号,
                  expdateStr:self.formatDate(self.addForm.expdateStr) , //装拆期限
                  busType: self.addForm.busType, //类型
                  billNumber: self.addForm.billNumber,//提单号
                  vesselVoyage: self.addForm.vesselVoyage, //船名航次
                  cyClosingDayStr: self.formatDate(self.addForm.cyClosingDayStr),//截关日期
                  orderSource: self.addForm.orderSource, //来源
                  destination: self.addForm.destination, //装拆地
                  getClpPlace: self.addForm.getClpPlace, //提箱点
                  downClpPlace: self.addForm.downClpPlace, //进箱点
                  shippingCompany: self.addForm.shippingCompany, //船公司
                  department: self.addForm.department,//部门
                  salesman: self.addForm.salesman, //业务员
                  remark: self.addForm.remark, //备注
                  orderStatus: '处理中',
                  teuTypeCount: self.countType(),
                };
                console.log(params);
                api.addBaseInfo(params)
                  .then(function(res) {
                    let data  = res.data;
                    console.log(data);
                    self.selectData = data;
                    self.xdOrderId = data.xdOrderId;
                    self.orderCode = data.orderCode;
                    self.paramData.shipperInfo = data.shipperInfo;
                    self.paramData.shipperId = data.shipperId;
                    self.nextShow = false;
                  })
                  .catch(function(err) {

                  })
              }
            });
          }

        },
        //返回基本信息
        returnStep() {
          this.nextShow = true;
        },
        //放弃操作
        cancelStep() {
          this.$router.push('/business/order2');
          this.nextShow = true;
          this.$refs['addForm'].resetFields();
/*          this.$refs.refListTable.getRowData('');*/
        },
        //关闭新增
        closeAdd() {
          this.dialogFormVisible = false;
          this.$refs['addForm'].resetFields();
        }
      },
        mounted(){
        this.busTypeHandle();//类型下拉框
        this.orderSourceChange(); //来源
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

