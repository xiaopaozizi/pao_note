<template>
  <div class="list" >
    <!--查询框-->
    <div class="container-fluid">
      <div class="row" >
        <div class="col-sm-12">
          <div style="float: left;">
            <p class="icon-inline">
              <i class="fa fa-share fa-lg" aria-hidden="true" style="cursor: pointer"></i>
              <span style="font-size: 4px!important;">导出</span>
            </p>
            <p class="icon-inline" @click="addWriteBtn">
              <i class="fa fa-plus" aria-hidden="true" style="cursor: pointer"></i>
              <span>新增</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <el-row>
      <el-form  :inline="true" :model="searchForm"  label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="收付通知号">
              <el-autocomplete
                v-model="searchForm.noticeNum"
                :fetch-suggestions="noticeNumQuerySearch"
                @select="xzNumberHandleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算方简称">
              <el-autocomplete
                v-model="searchForm.shipper"
                placeholder="请输入内容"
                :fetch-suggestions="shipQuerySearch"
                @select="shipperInfoHandleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制单日期">
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                range-separator=" ~ "
                @change="setChangedValue"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="listSearchBtn">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="收付类型">
              <el-select v-model="searchForm.rpType" placeholder="请选择" @visible-change="showContent">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form-item>
      </el-form>
    </el-row>
    <!--合计内容-->
    <el-row :gutter="20">
      <el-col :span="6">应收合计:</el-col>
      <el-col :span="6">应付合计:</el-col>
      <el-col :span="6">合计金额:</el-col>
    </el-row>
    <!--表格内容-->
    <bill-table :tableData="tableData" ref="refListTable" @seletClk="parentSelect"></bill-table>

    <!--新增弹出框-->
    <el-dialog :modal="false"  @close="handleClose" :close-on-click-modal="false"  :title="dialogData.title" v-model="dialogFormVisible" :size="dialogData.size">
      <add-form  ref="refAddForm" :closedAddDialog="closedAddDialog" :xzListShow="xzListShow" :dialogType="dialogType"></add-form>
      <div slot="footer">
        <el-button type="primary" @click="noticeAddSave">保存</el-button>
      </div>
    </el-dialog>

    <!--切换框-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="账单详情" name="账单详情">
        <el-button @click="noticeEditBtn" v-show="isDetailShow">编辑</el-button>
        <el-button @click="noticeSaveBtn" v-show="!isDetailShow">保存</el-button>
        <el-button @click="noticeCancelBtn" v-show="!isDetailShow">取消</el-button>
        <div v-show="isDetailShow">
          <notice-details :tableData="tableDetailsData" :selectNowData="selectNowData"></notice-details>
        </div>
        <div v-show="!isDetailShow">
          <add-form  ref="noticeAddForm" :getDataForm="selectNowData" :dialogType="dialogType2" :noticeShow="noticeShow"></add-form>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
<!---->
</template>

<script>
  import NoticeTable from './listTable.vue'
  import details from './listDetailTable.vue'
  import add from './addList.vue'
  import api from '../../../api/api'
  export default {
    name: 'list',
    components : {
    "bill-table": NoticeTable,
      'add-form': add,
      'notice-details':details
    },
    data() {
      return {
        tableData : [
          {name: "收付通知号", id: 0, isChecked:true, record: "receiptPaymentCode"},
          {name: "收付类型", id: 1, isChecked:false, record: "receiptPaymentType"},
          {name: "结算方简称", id: 2, isChecked:false, record: "settleAccountsShortName"},
          {name: "结算方全称", id: 8, isChecked:false, record: "settleAccountsFullName"},
          {name: "金额", id: 3, isChecked:false, record: "money"},
          {name: "计划日期", id: 4, isChecked:false, record: "waybillNum"},
          {name: "提交人", id: 5, isChecked:false, record: "shipper"},
          {name: "备注", id: 6, isChecked:false, record: "remark"},
          {name: "打印次数", id: 7, isChecked:false, record: "carnum"},
          {name: "收付日期", id: 7, isChecked:false, record: "driver"}
        ],
        //查询搜索表单
        searchForm: {
          noticeNum: '', // 收付通知号
          receiptPaymentId:'',//收付通知ID
          chargeOffId:'', //销账号ID
          rpType:'',
          state: 1, //客户类型
          settleAccountsFullName:'',//结算人全称
          shipper:'', //结算人简称
          shipperId: '', // 结算人Id
          dateStr:'', //传给后台的时间日期
          date: '',  //前台显示的时间日期
          initFlag: true
        },
        dialogFormVisible: false,
        dialogData: {
          title : '新增收付通知',
          size : 'full'
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
        //收付通知下拉框
        options: [],
        //存放审核ID
        chargeOffId:'',
        //
        dialogType:'add',
        dialogType2:'edit',
        tableDetailsData : [
          {name: '单号', isChecked:true, record: "billCodes"},
          {name: '产生日期', isChecked:true, record: "createDate"},
          {name: "结算方简称", isChecked:true, record: "settleAccountsShortName"},
          {name: "结算方全称", isChecked:true, record: "settleAccountsFullName"},
          {name: "账单号", isChecked:true, record: "monthlyStatementNo"},
          {name: "费用状态", isChecked:true, record: "costStatus"},
          {name: "收付", isChecked:true,record: "costType"},
          {name: "费用名称", isChecked:true, record: "costName"},
          {name: "单价", isChecked:true, record: "unitPrice"},
          {name: "数量", isChecked:true, record: "number"},
          {name: "金额",isChecked:true, record: "money"},
          {name: "备注",isChecked:true, record: "remark"},
          {name: "业务类型",isChecked:true, record: ""},
          {name: "客户单号", isChecked:true, record: "customerCode"},
          {name: "箱型", isChecked:true, record: "teuType"},
          {name: "箱号", isChecked:true, record: "teuNo"},
          {name: "车牌号", isChecked:true, record: "plateNo"},
          {name: "装拆地",isChecked:true, record: "destination"},
        ],
        //存储父表格点击选中的数据
        selectNowData:null,
        activeName:'账单详情',
        //编辑与显示
        isDetailShow:true,

      }
    },
    methods: {
      //时间戳转换为时间
      unixChange(unix) {
        let unixTimestamp = unix;
        let  newDate = new Date();
        newDate.setTime(unixTimestamp /1000);
        let  commonTime = newDate.toLocaleString();
        return commonTime;
      },
      //销账 号模糊查询
      //收付通知号模糊 查询
      noticeNumQuerySearch(queryString,callback) {
        let self = this;
        if( queryString != '' ){
          api.noticeNumberSearch(queryString)
            .then(function (res) {
              let data = res.data;
              console.log(data);
              let resultData = [];
              for(var objTemp of data){
                resultData.push({id:objTemp.receiptPaymentId, "value":objTemp.receiptPaymentCode});
              }
              callback(resultData);
            })
            .catch(function(err){

            })
        }else{
          console.log('为空值')
        }
      },
      //销账号下拉选择
      xzNumberHandleSelect(item) {
        this.searchForm.chargeOffId = item.id;
      },
      //结算方的模糊搜索
      shipQuerySearch(queryString,callback) {
        let self = this;

        api.getShipperInfoSearch({
            searchStr: queryString
          })
          .then(function(res){
            console.log(res.data);
            var data = res.data;
            var resultData = [];
            for(var objTemp of data){
              resultData.push({
                "key":objTemp.customerBaseId,
                custShortName: objTemp.custShortName,
                "value":objTemp.custShortName
              });
            }
            callback(resultData);

          })
          .catch(function(err){

          });
      },
      //结算框下拉框选中事件
      shipperInfoHandleSelect(item) {
          self.searchForm.shipper = item.custShortName; //将结算人简称赋值
          self.searchForm.shipperId = item.key;//结算人Id赋值
          self.searchForm.settleAccountsFullName = item.value;//结算人全称赋值
      },
      //收付通知下来框显示
      showContent() {
        let self = this;
        api.selectBusTypeHandle( 'rptype')
          .then(function (res) {
            console.log(res);
            const selectData = [];
            let  data  = res.data;
            console.log(data);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.options = selectData
          })
          .catch(function(err){

          })
      },
      //时间转换格式化
      setChangedValue(value){
        this.searchForm.dateStr = value;
        //页面首次加载成功后调用初始数据
        let params = {
          createDateQuery: value
        };
        if(this.searchForm.initFlag){
          this.$refs.refListTable.getRowData(params);
          this.searchForm.initFlag = false;
        }
      },
      //新增通知单
      addWriteBtn(){
        this.dialogFormVisible = !this.dialogFormVisible;
        this.$refs.refAddForm.initSearchForm();
      },
      //关闭diallog
      handleClose() {
        console.log(11111);
      },
      //关闭新增弹出框的方法
      closedAddDialog() {
        this.dialogFormVisible = false;
      },

      xzListShow() {
        this.$refs.refListTable.getRowData()
      },
      //点击通知新增保存
      noticeAddSave() {
       this.$refs.refAddForm.addSave();
      },
      //通知列表查询
      listSearchBtn() {
        let self = this;
        let params = {
          relReceiptPaymentId: this.searchForm.receiptPaymentId,
          receiptPaymentType:this.searchForm.rpType,
          relSettleAccountsId : this.searchForm.shipperId,
          createDateQuery: this.searchForm.dateStr
        };
        api.noticeListShow(params)
          .then(function(res) {
            self.$refs.refListTable.initData(res.data);
          })
          .catch(function(err){
            console.log(err);

          })
      },
      //选中当前的表格
      parentSelect(item) {
        this.selectNowData = item[0];
        this.selectNowData.chargeOffDate  = this.unixChange(item[0].chargeOffDate)
        console.log('我是父组件传过来的数据');
        console.log(item);
      },
      //tabs编辑按钮
      noticeEditBtn() {
        this.isDetailShow = false;
        this.$refs.noticeAddForm.initSearchForm();
      },
      noticeSaveBtn() {
        this.$refs.refAddForm.addSave();
      },
      //收付通知显示页面
      noticeShow() {
        this.isDetailShow = true;
      },
      //收付通知取消
      noticeCancelBtn() {
        this.isDetailShow = true;
      }
    },
    mounted() {
      var stateDate = (new Date()).setTime(new Date().getTime() - 3600 * 1000 * 24 * 7);
      var endDate = new Date();
      this.searchForm.date = [stateDate,endDate];
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list .icon-inline {
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    background-color: lightblue;
    margin-top: 5px;
  }
</style>

