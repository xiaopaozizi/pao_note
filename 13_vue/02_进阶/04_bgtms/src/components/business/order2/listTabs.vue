<template>
  <div class="tabs-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="基本信息">
        <!--基本信息显示-->
        <el-button @click="editFormBtn" v-if="displayForm"  size="small">编辑</el-button>
        <el-button @click="saveFormBtn" v-if="!displayForm"  size="small">保存</el-button>
        <!--<el-button @click="delFormBtn" v-if="displayForm">删除</el-button>-->
        <el-button @click="cancelFormBtn" v-if="!displayForm" size="small">取消</el-button>
        <div v-if="displayForm">
        <el-form :model="showForm"  label-width="140px" >
          <el-row class="col-height-show">
            <el-col :span="6">
              <el-form-item label="状态">
                <span>{{showForm.orderStatus}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制单时间">
                <span>{{showForm.createDateStr}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录入人">
                <span>{{showForm.createUser}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单号">
                <span>{{showForm.orderCode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="托运方">
                <span>{{showForm.shipperInfo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人/电话">
                <span>{{showForm.contactPeople}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户单号" prop="customerCode">
                <span>{{showForm.customerCode}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="装拆期限">
                <span>{{showForm.expdateStr}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="类型">
                <span>{{showForm.busType}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提单号">
                <span>{{showForm.billNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="船名航次">
                <span>{{showForm.vesselVoyage}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="截关日期">
                <span>{{showForm.cyClosingDayStr}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源">
                <span>{{showForm.orderSource}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="装拆地">
                <span>{{showForm.destination}}</span>
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
              <el-form-item label="船公司">
                <span>{{showForm.shippingCompany}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门">
                <span>{{showForm.department}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务员">
                <span>{{showForm.salesman}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="箱量">
                <span>{{showForm.teuTypeCount}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="备注">
                <span>{{showForm.remark}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

   <!--       <el-form :model="showForm">
            <el-row class="show-style">
              <el-col :span="6">
                <label>状态</label>
                <span>{{showForm.orderStatus}}</span>
              </el-col>
              <el-col :span="6">
                <label>制单时间</label>
                <span>{{showForm.createDateStr}}</span>
              </el-col>
              <el-col :span="6">
                <label>录入人</label>
                <span>{{showForm.createUser}}</span>
              </el-col>
              <el-col :span="6">
                <label>订单号</label>
                <span>{{showForm.orderCode}}</span>
              </el-col>
              <el-col :span="6">
                <label>托运方</label>
                <span>{{showForm.shipperInfo}}</span>
              </el-col>
              <el-col :span="6">
                <label>联系人/电话</label>
                <span>{{showForm.contact}}</span>
              </el-col>
              <el-col :span="6">
                <label>客户单号</label>
                <span>{{showForm.customerCode}}</span>
              </el-col>
              <el-col :span="6">
                <label>装拆期限</label>
                <span>{{showForm.expdateStr}}</span>
              </el-col>
              <el-col :span="6">
                <label>类型</label>
                <span>{{showForm.busType}}</span>
              </el-col>
              <el-col :span="6">
                <label>提单号</label>
                <span>{{showForm.billNumber}}</span>
              </el-col>
              <el-col :span="6">
                <label>船名航次</label>
                <span>{{showForm.vesselVoyage}}</span>
              </el-col>
              <el-col :span="6">
                <label>截关日期</label>
                <span>{{showForm.cyClosingDayStr}}</span>
              </el-col>
              <el-col :span="6">
                <label>来源</label>
                <span>{{showForm.orderSource}}</span>
              </el-col>
              <el-col :span="6">
                <label>装拆地</label>
                <span>{{showForm.destination}}</span>
              </el-col>
              <el-col :span="6">
                <label>提箱点</label>
                <span>{{showForm.getClpPlace}}</span>
              </el-col>
              <el-col :span="6">
                <label>进箱点</label>
                <span>{{showForm.downClpPlace}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <label>船公司</label>
                <span>{{showForm.shippingCompany}}</span>
              </el-col>
              <el-col :span="6">
                <label>部门</label>
                <span>{{showForm.department}}</span>
              </el-col>
              <el-col :span="6">
                <label>业务员</label>
                <span>{{showForm.salesman}}</span>
              </el-col>
              <el-col :span="6">
                <label>箱量</label>
                <span>{{showForm.teuTypeCount}}</span>
              </el-col>
              <el-col :span="6">
                <label>备注</label>
                <span>{{showForm.remark}}</span>
              </el-col>
            </el-row>

          </el-form>-->
      </div>
        <div v-if="!displayForm">
          <el-form :model="editForm"  label-width="140px" :rules="editFormRules"  ref="editForm">
            <el-row class="col-height">
              <el-col :span="8">
                <el-form-item label="状态"  prop="orderStatus">
                 <span>{{editForm.orderStatus}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="制单时间"  prop="createDateStr" id="color">
                  <span>{{editForm.createDateStr}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="录入人">
                  <span>{{showForm.createUser}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="订单号">
                  <span>{{showForm.orderCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="托运方"  prop="shipperInfo" id="color">
                  <el-autocomplete
                    style="width:245px"
                    v-model="editForm.shipperInfo"
                    placeholder="请输入内容"
                    :fetch-suggestions="shipperInfoQuerySearch"
                    @select="shipperInfoSelectHandle"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <el-form-item label="联系人/电话"  prop="contact" >
                <el-autocomplete
                  style="width:245px"
                  v-model="editForm.contact"
                  placeholder="请输入内容"
                  :fetch-suggestions="contactQuerySearch"
                  @select="contactSelectHandle"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
              <el-col :span="8">
                <el-form-item label="客户单号" prop="customerCode">
                  <el-input style="width:245px" v-model="editForm.customerCode" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="装拆期限" prop="expdateStr">
                  <el-date-picker
                    style="width:245px"
                    v-model="editForm.expdateStr"
                    type="date"
                    placeholder="选择日期"
                    :editable="false"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="busType">
                  <el-select style="width:245px" v-model="editForm.busType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in editForm.options"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提单号" prop="billNumber">
                  <el-input style="width:245px" v-model="editForm.billNumber" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="船名航次" prop="vesselVoyage">
                  <el-autocomplete
                    style="width:245px"
                    v-model="editForm.vesselVoyage"
                    placeholder="请输入内容"
                    :fetch-suggestions="vesselVoyageSearch"
                    @select="vesselHandleSelect"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="截关日期" prop="cyClosingDayStr">
                  <el-date-picker
                    style="width:245px"
                    v-model="editForm.cyClosingDayStr"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源"  prop="orderSource">
                  <el-select style="width:245px" v-model="editForm.orderSource" clearable placeholder="请选择">
                    <el-option
                      v-for="item in editForm.orderSourceOptions"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="装拆地" prop="destination">
                  <el-autocomplete
                    style="width:245px"
                    v-model="editForm.destination"
                    placeholder="请输入内容"
                    :fetch-suggestions="destinationQuerySearch"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="提箱点" prop="getClpPlace">
                  <el-autocomplete
                    style="width:245px"
                    v-model="editForm.getClpPlace"
                    placeholder="请输入内容"
                    :fetch-suggestions="getClpPlaceQuerySearch"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="进箱点" prop="downClpPlace">
                  <el-autocomplete
                    style="width:245px"
                    v-model="editForm.downClpPlace"
                    placeholder="请输入内容"
                    :fetch-suggestions="downClpPlaceQuerySearch"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="船公司" prop="shippingCompany">
                  <el-autocomplete
                    style="width:245px"
                    v-model="editForm.shippingCompany"
                    placeholder="请输入内容"
                    :fetch-suggestions="shippingCompanyQuerySearch"
                  ></el-autocomplete>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="部门" prop="department">
                  <el-input style="width:245px" v-model="editForm.department" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务员"  prop="salesman">
                  <el-input style="width:245px" v-model="editForm.salesman" placeholder="请输入内容" :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="箱量" prop="teuTypeCount">
                  <span>{{editForm.teuTypeCount}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注"  prop="remark">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="editForm.remark"
                    placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="拖卡信息" name="拖卡信息">
        <tk-msg :selectData="selectData"   :activeName="activeName" ref="tkMsg" @interFace="msgInterface"></tk-msg>
       <!--<tk-msg :selectData="selectData"   :activeName="activeName" ref="tkMsg"></tk-msg>-->
      </el-tab-pane>
      <el-tab-pane label="费用信息" name="费用信息">
        <show-fee :selectData="selectData"  :activeName="activeName" ref="showFee"></show-fee>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="上传图片">
        <show-img></show-img>
      </el-tab-pane>
 <!--     <el-tab-pane label="日志信息" name="日志信息">
         <show-journal></show-journal>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import api from '@/api/api'
  import tkMsg from './addOrder2.vue'
//  import showFee from './showFee.vue'
  import showFee from './showFeeTable'
  import showImg from './upload-img.vue'
  import journal from './journal.vue'

  export default {
    components: {
      'tk-msg': tkMsg,
      'show-fee': showFee,
      'show-img': showImg,
      'show-journal':journal
    },
    props:['selectData'],
    name: 'tabs-list',
    data() {
      return {
        //日期禁止选择以前的日期
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        //客户tabs
        activeName: '基本信息',
        //客户编辑列表
        //司机新增表单
        editForm: {
          shipperInfo:'',//托运方
          shipperId:'', //托运方ID
          customerCode: '',//客户单号
          expdateStr: '', //装拆期限
          busType: '', //类型
          options:[],
          billNumber: '',//提单号
          vesselVoyage: '', //船名航次
          cyClosingDayStr: '',//截关日期
          orderSource: '', //来源
          orderSourceOptions:[],
          destination: '', //装拆地
          getClpPlace: '', //提箱点
          downClpPlace: '', //进箱点
          shippingCompany: '', //船公司
          department: '',//部门
          contact:'', //联系人
          contactId:'',//联系人ID
          salesman: '', //业务员
          remark: '', //备注
          orderStatus: '',
          teuTypeCount: '', //箱量
          xdOrderId:'', //箱单ID
          createDateStr:'', //制单时间
          createUser:'', //录入人
          orderCode:'' //订单号
        },
        //计步器
        num1:'',
        num2:'',
        num3:'',
        num4:'',
        num5:'',
        editFormRules:{
          shipperInfo: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
        },
        showForm: {
          customerCode:'',//客户单号
          orderStatus:'',//状态
          createDateStr:'', //制单时间
          createUser: '',//录入人
          orderCode: '', //订单号
          shipperInfo: '', //托运方
          contactPeople:'', //联系人
          contactId:'',//联系人ID
          expdateStr:'',  //装拆期限
          busType: '',//类型
          billNumber: '', //提单号
          vesselVoyage:'',//船名航次
          cyClosingDayStr: '',//截关日期
          orderSource: '', //来源
          destination: '', //装拆地
          getClpPlace: '', //提箱点
          downClpPlace: '', //进箱点
          shippingCompany: '', //船公司
          department: '',//部门
          salesman: '', //业务员
          remark: '', //备注
          teuTypeCount: '' //箱量
        },
        //显示与编辑
        displayForm: true,

        /*===================*/
        //下单成功后获取订单ID
        xdOrderId:'',
        orderCode:'',
        paramData: {
          shipperInfo: '',//托运方
          shipperId:'',
        }
      }
    },
    watch: {
      'selectData.xdOrderId':function () {
        console.log(this.selectData.xdOrderId);
        this.showFormMsg(this.selectData);
      }
    },
    methods: {
      test() {
        console.log(this.selectData);
      },
      //时间戳
     getLocalTime(nS) {
            let  nsTime =  nS /  1000;
             return new Date(parseInt(nsTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      },
      /*===========*/
      //托运方的模糊搜索
      shipperInfoQuerySearch(queryString,callback) {
        let self = this;
        api.customerSearch(queryString)
          .then(function(res){
            api.customerSearch(queryString)
              .then(function(res){
                callback(res);
              })
              .catch(function(err){
              });
          })
          .catch(function(err){

          });
      },
      //托运方选中事件
      shipperInfoSelectHandle(item) {
        this.editForm.shipperId = item.key;
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
            self.editForm.options =  selectArry;
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
              console.log("tttttt");
              self.cmhc = [];
              let data   = res.data; //快速获取JSON对象
              for(var objTemp of data){
                self.cmhc.push({"key":objTemp.portCloseDateStr,"value":objTemp.engdescription + '/' + objTemp.voyage});
              }
              console.log(self.cmhc)
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
        this.editForm.cyClosingDayStr = item.key
      },
      //联系人模糊查询
      contactQuerySearch(queryString,callback) {
        let self = this;
        api.getShipperInfoContactSearch({
            searchStr: queryString,
            relCostomerId: this.editForm.shipperId
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
        this.editForm.contactId = item.key;
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
            self.editForm.orderSourceOptions = orderSource
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
              console.log(err.data);


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
              console.log(err)


            })
        }else{
          console.log('为空值')
        }
      },
      /*==============*/

      //转日期格式
      formatDate(date) {
        if(date === '') {
          return date;
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
      accountTypeChange() {},
      //编辑按钮
      editFormBtn() {
        console.log(this.selectData);
        if(this.selectData.xdOrderId != null) {

          this.displayForm = false ;
        }else {
          this.$alert('请选择一条数据', '标题', {
            confirmButtonText: '确定'
          });
        }
      },
      //保存
      saveFormBtn() {
        let self = this;
        this.$refs.editForm.validate(function(valid){
          if(valid) {
            let params = {
              shipperInfo: self.editForm.shipperInfo,//托运方
              shipperId: self.editForm.shipperId, //托运方ID
              orderCode: self.editForm.orderCode, //订单号
              customerCode: self.editForm.customerCode,//客户单号,
              expdateStr: self.formatDate(self.editForm.expdateStr) , //装拆期限
              busType: self.editForm.busType, //类型
              contactPeople:self.editForm.contact, //联系人
              relContactId: self.editForm.contactId, //联系人ID
              billNumber: self.editForm.billNumber,//提单号
              vesselVoyage: self.editForm.vesselVoyage, //船名航次
              cyClosingDayStr: self.formatDate(self.editForm.cyClosingDayStr),//截关日期
              orderSource: self.editForm.orderSource, //来源
              destination: self.editForm.destination, //装拆地
              getClpPlace: self.editForm.getClpPlace, //提箱点
              downClpPlace: self.editForm.downClpPlace, //进箱点
              shippingCompany: self.editForm.shippingCompany, //船公司
              department: self.editForm.department,//部门
              salesman: self.editForm.salesman, //业务员
              remark: self.editForm.remark, //备注
              orderStatus: self.editForm.orderStatus,
              xdOrderId:self.editForm.xdOrderId,
              teuTypeCount: self.editForm.teuTypeCount
            };
           // console.log(params);
            api.xdOrderEdit(params)
              .then(function(res) {
                let data = res.data;
                console.log(data);
                self.$emit('editSucData',data); //将返回的值传给父级 让 其跟新表格数据
                self.displayForm = true;
                for(let item in self.showForm) {
                  self.showForm[item] = data[item];
                }
                console.log(self.showForm);
              })
              .catch(function(err) {

              })
          }
        });
      },
      //单机显示列表 数据
      showFormMsg(item) {
            let showData = item;
            for(let showJson in showData) {
              this.showForm[showJson] = showData[showJson];
              this.editForm[showJson] = showData[showJson];
            }
      },
      //删除按钮
      delFormBtn() {
        let self = this;
        let params = {
          driverId : this.selectData.driverId
        };
        api.driverDel(params)
          .then(function(res) {
            console.log(res);
            if(res.status === 'success') {
              self.$emit('delData');
              for(let item in self.showForm) {
                self.showForm[item] = '';
              }
            }
          })
          .catch(function(err) {


          })
      },
      //取消按钮
      cancelFormBtn() {
        this.displayForm = true ;
      },
      //tabs选中事件
      handleClick(tab) {
        let self = this;
        if(tab.label === '拖卡信息') {
         // self.$router.push('/business/orderAdd');
           self.$refs.tkMsg.getRowData(this.selectData.xdOrderId)
        } else if( tab.label === '费用信息') {
          self.$refs. showFee.test(this.selectData.xdOrderId)
        }else if( tab.label === '基本信息') {
          self.msgInterface(self.selectData.xdOrderId);
        }
         console.log(tab.label)
      },
      msgInterface(item) {
        console.log('464989879887');
        let self = this;
        let params = {
          xdOrderId: item
        };
        api.orderStatus(params)
          .then(function(res) {
            let objData = res[0];
            console.log(objData);
            self.showFormMsg(objData);
            self.$emit('editSucData',objData); //将返回的值传给父级 让 其跟新表格数据
          })
          .catch(function(err) {})
      },


      /*============*/
    },
    mounted(){
     // this.showState();
      this.busTypeHandle();
      this.orderSourceChange(); //来源
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .show-style label {
    display: inline-block;
    width: 86px;
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
    height: 32px ;
  }
</style>
