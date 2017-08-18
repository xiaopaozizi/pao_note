<template>
  <div class="add-write">
    <!--查询框-->
<!--    <el-row>
      <el-form   :model="addSearchFrom" ref="addSearchFrom" label-width="100px">
        <el-row>
  &lt;!&ndash;        <el-col :span="6">
            <el-form-item label="销账号">
              <el-input :disabled="true"
                        v-model="addSearchFrom.xzNum"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算方简称">
              <el-autocomplete
                v-model="addSearchFrom.shipper"
                :disabled="addSearchFrom.disabled"
                placeholder="请输入内容"
                :fetch-suggestions="shipQuerySearch"
                @select="shipperInfoHandleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>&ndash;&gt;
          <el-col :span="6">
            <el-form-item label="制单日期">
              <el-date-picker
                v-model="addSearchFrom.date"
                size="small"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                range-separator=" ~ "
                @change="setChangedValue"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="费用状态">
              <el-select   size="small"  v-model="addSearchFrom.costType" multiple placeholder="请选择" @visible-change="showContent">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账单号">
              <el-autocomplete
                size="small"
                v-model="addSearchFrom.zdNum"
                :fetch-suggestions="zdNumQuerySearch"
                @select="selectChange"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="addSearchFromSubmit"  size="small">查询</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="saveBtn"  size="small">保存</el-button>
            <el-button @click="cancelBtn"  size="small">取消</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="通知号">
              <el-autocomplete
                v-model="addSearchFrom.noticeNum"
                size="small"
                :fetch-suggestions="noticeNumQuerySearch"
                @select="selectChange2"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>-->
    <!--合计内容-->
    <el-row>
      <el-col :span="8" class="searchText">
        <span>应收合计:{{yShou}}</span>
        <span>应付合计:{{yFu}}</span>
        <span>合计金额:{{yShou + yFu }}</span>
      </el-col>
      <el-col :span="16">
        <el-form   :model="addSearchFrom" ref="addSearchFrom" label-width="100px">
          <el-row class="col-height-show">
            <el-col :span="9">
              <el-form-item label="制单日期">
                <el-date-picker
                  v-model="addSearchFrom.date"
                  size="small"
                  type="daterange"
                  align="right"
                  placeholder="选择日期范围"
                  range-separator=" ~ "
                  @change="setChangedValue"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="费用状态">
                <el-select   size="small"  v-model="addSearchFrom.costType" multiple placeholder="请选择" @visible-change="showContent">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align: center">
              <el-button type="primary" @click="addSearchFromSubmit"  size="small">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row >
      <el-form  :inline="true" :model="writeEditForm" ref="writeEditForm" label-width="100px">
        <el-row  class="col-height-show">
          <el-col  :xs="8" :sm="6" :md="6" :lg="6">
            <el-form-item label="销账类型">
              <el-select v-model="writeEditForm.xzType" @change="selectXzType" clearable placeholder="请选择" size="small">
                <el-option
                  v-for="item in xzOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="6" :md="6" :lg="6" v-show="writeEditForm.accountDisplay"  >
            <el-form-item label="关联账号">
              <el-autocomplete
                size="small"
                v-model="writeEditForm.account"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col  :xs="8" :sm="6" :md="6" :lg="6">
            <el-form-item label="销账日期">
              <el-date-picker
                size="small"
                v-model="writeEditForm.realDate"
                type="date"
                placeholder="选择日期"
                @change="setChangedValue2"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col  :xs="8" :sm="6" :md="6" :lg="6">
            <el-form-item label="备注">
              <el-input type="textarea" :rows="1"
                        size="small"
                        v-model="writeEditForm.remark" style="width:200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :xs="8" :sm="6" :md="6" :lg="6">
            <el-button @click="saveBtn"  size="small">保存</el-button>
            <el-button @click="cancelBtn"  size="small">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <!--表格内容-->
    <add-table :tableData="tableData" ref="addCostTable" @seletClk="selectClick" :getDataForm="getDataForm"></add-table>


  </div>
  <!---->
</template>

<script>
  import api from '../../../api/api'
  import addTable from './addTable.vue'
  export default {
    name: 'add-write',
    props:['closedAddDialog','getDataForm','xzListShow','dialogType','billShow'],
    components : {
      'add-table' : addTable
    },
    data() {
      return {
        tableData : [
          {name: "", id: 0, isChecked:true, record: "", checkBox:true},
          {name: '单号', isChecked:true, record: "billCodes"},
          {name: '产生日期', isChecked:true, record: "createDateStr"},
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
          {name: "通知号",isChecked:true, record: "receiptPaymentNo"},
          {name: "销账号",isChecked:true, record: "chargeOffNo"},
        ],

        //应收、应付合计
        yShou:0,
        yFu: 0,
        //查询搜索表单
        addSearchFrom: {
          noticeNum: '', // 收付通知号
          rpType:'',
          state: 1, //客户类型
          settleAccountsFullName:'',//结算人全称
          shipper:'', //结算人简称
          shipperId: '', // 结算人Id
          dateStr:'', //传给后台的时间日期
          date: '',  //前台显示的时间日期
          initFlag: true,
          remark:'',
          /*=====*/
          costType:[],
          zdNum:'', //账单号
          zdNumId: '', //账单ID
          realDate: '', //销账日期
          receiptPaymentId: '', //通知ID
          disabled:false,   //控制结算客户编辑与禁止
          customType:true  //控制客户类型的显示隐藏
        },
        //销账 编辑的表单
        writeEditForm:{
          xzType:'', //销账类型
          realDate:'', //销账 日期
          realDateStr:'', //销账 日期
          remark:'', //销账备注
          account:'', //关联账号
          accountDisplay:false,
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
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        //收付通知下拉框
        options: [],
        //销账类型存储内容
        xzOptions: [],
        //销账Id
      }
    },
    watch: {

    },
    methods: {
      //账单号模糊查询
      zdNumQuerySearch(queryString,callback){
        let self = this;
        if( queryString != '' ){
          api.zdNumSearch(queryString)
            .then(function (res) {
              let data = res.data;
              console.log(data);
              let resultData = [];
              for(var objTemp of data){
                resultData.push({id:objTemp.monthlyStatementId, "value":objTemp.monthlyStatementNo});
              }
              callback(resultData);
            })
            .catch(function(err){

            })
        }else{
          console.log('为空值')
        }
      },
      //账单的下拉选中事件
      selectChange(item){
        this.addSearchFrom.zdNumId = item.id
      },
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
      //收付通知的下拉选中事件
      selectChange2(item){
        this.addSearchFrom.receiptPaymentId = item.id
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
                custFullName: objTemp.custFullName,
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
        this.addSearchFrom.shipper = item.value; //将结算人简称赋值
        this.addSearchFrom.shipperId = item.key;//结算人Id赋值
        this.addSearchFrom.settleAccountsFullName = item.custFullName;//结算人全称赋值
      },
      //收付通知下来框显示
      showContent() {
        let self = this;
        api.selectBusTypeHandle( 'coststatus')
          .then(function (res) {
            const selectData = [];
            let data  = res.data;
            console.log(data);
            for (let objTemp of data) {
              if(objTemp.value < 5) {
                selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
              }
            }
            console.log(selectData);
            self.options = selectData
          })
          .catch(function(err){

          })
      },
      //时间转换格式化
      setChangedValue(value){
        this.addSearchFrom.dateStr = value;
      },
      setChangedValue2(value){
        this.writeEditForm.realDateStr = value;
      },

      //初始化数据
      initSearchForm() {
        if(this.dialogType === 'add'){
          console.log(this.addSearchFrom);
          this.addSearchFrom.receiptPaymentId = "";
          this.addSearchFrom.settleAccountsFullName ="";//结算人全称
          this.addSearchFrom.shipper = "";   //结算方简称
          this.addSearchFrom.shipperId =  ""; // 结算人Id.
          this.addSearchFrom.date = '';
          this.$refs.addCostTable.clearRowData(); //清空表格数据
        }else if(this.dialogType === 'edit'){
          //初始化方法
          console.log('我是getfrom');
          this.addSearchFrom.xzNum = this.getDataForm.chargeOffNo, //销账号
          this.addSearchFrom.settleAccountsFullName = this.getDataForm.settleAccountsFullName;//结算人全称
          this.addSearchFrom.shipper = this.getDataForm.settleAccountsShortName;   //结算方简称
          this.addSearchFrom.shipperId = this.getDataForm.relSettleAccountsId; // 结算人Id.
          this.writeEditForm.xzType  = this.getDataForm.chargeOffType; //销账类型
          this.writeEditForm.account = this.getDataForm.account;  //关联账户
          this.writeEditForm.remark  =this.getDataForm.remark ; //备注
          this.addSearchFrom.disabled = true;
          this.addSearchFrom.customType = false;
          this.$refs.addCostTable.selectPaymentNo(this.getDataForm.chargeOffNo)
        }
      },
      //销账类型下拉框显示
      showXzType() {
        let self = this;
        api.selectBusTypeHandle( 'cotype')
          .then(function (res) {
            const selectData = [];
            let data  = res.data;
            console.log(data);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.xzOptions = selectData
          })
          .catch(function(err){

          })
      },
      //销账选中那个的事件
      selectXzType(value){
         if(value === '卡号' || value === '账户') {
            this.writeEditForm.accountDisplay = true;
         }else  {
           this.writeEditForm.accountDisplay = false;
         }
      },
      //表单查询
      addSearchFromSubmit() {
        let self = this;
        if(!this.addSearchFrom.noticeNum) {
          self.addSearchFrom.receiptPaymentId = '';
        };
        if(!this.addSearchFrom.zdNum) {
          self.addSearchFrom.zdNumId = '';
        };
        let params = {
          relSettleAccountsId:this.addSearchFrom.shipperId, // 结算人Id
          createDateQuery:this.addSearchFrom.dateStr, //传给后台的时间日期
          monthlyStatementId: this.addSearchFrom.zdNumId,  //账单ID
          costStatus: JSON.stringify(this.addSearchFrom.costType),//费用状态
          relReceiptPaymentId: this.addSearchFrom.receiptPaymentId //通知号ID
        };
        console.log(params);
  /*      if(this.dialogType === 'edit') {
          api.zdTableList(params)
            .then(function(res) {
              let params = res;
              let arr = [];
              for(let i=0; i < params.length; i++ ) {
                if(params[i].costStatus != '已销账') {
                  arr.push(params[i]);
                }
              }
              self.$refs.addCostTable.onGetSetRow(arr)
            })
            .catch(function(err) {
              console.log(err);

            })
        }else{
          api.zdTableList(params)
            .then(function(res) {
              let params = res;
              let arr = [];
              for(let i=0; i < params.length; i++ ) {
                if(params[i].costStatus != '已销账') {
                  arr.push(params[i]);
                }
              }
              self.$refs.addCostTable.initData(arr);
            })
            .catch(function(err) {
              console.log(err);

            })
        }*/


      },
      //费用统计
      selectClick(item){
        let self = this;
        let yingShou = [];
        self.yShou = 0;
        self.yFu = 0;
        item.forEach(function(selectedRow, index) {
          yingShou.push(selectedRow.money);
          if(selectedRow.costType == '应收'){
            self.yShou += yingShou[index];
          }else if(selectedRow.costType == '应付') {
            self.yFu += yingShou[index];
          }
        });
      },
      //销账保存
      addSave() {
        let self = this ;
        let selectedRows =  this.$refs.addCostTable.getSelectedRows();
        let costItemIdList = [];
        selectedRows.forEach(function(selectedRow, index) {  //循环遍历出客户ID
          costItemIdList.push(selectedRow);
        });
        console.log(costItemIdList);
        let params = {
          relSettleAccountsId:this.addSearchFrom.shipperId, // 结算人Id
          settleAccountsShortName:this.addSearchFrom.shipper, //结算人简称
          settleAccountsFullName:this.addSearchFrom.settleAccountsFullName, //结算人全称
          remark:  this.writeEditForm.remark, //备注
          chargeOffType: this.writeEditForm.xzType, //销账类型
          account:this.writeEditForm.account,
          realDateStr:this.writeEditForm.realDateStr, //销账日期
          costItemList: JSON.stringify(costItemIdList)
        };
        console.log(params);
        api.xzAddSave(params)
         .then(function(res) {
           self.xzListShow();
           self.$refs.addCostTable.getCostList();
           self.billShow();

         })
         .catch(function(err) {
         console.log(err);
         })
      },

      //按钮保存
      saveBtn() {
        this.addSave();
      },
      //取消
      cancelBtn() {
        this.billShow();
      }
    },
    created() {

    },
    mounted(){
       this.showXzType();


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .add-bill .icon-inline {
    cursor: pointer;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    background-color: lightblue;
    margin-top: 5px;
  }
  .searchText {
    padding-top: 8px;

  }
  .searchText span {
    display: inline-block;
    padding-right: 25px;;
  }
  .col-height-show .el-col {
    height: 40px ;
  }
</style>


