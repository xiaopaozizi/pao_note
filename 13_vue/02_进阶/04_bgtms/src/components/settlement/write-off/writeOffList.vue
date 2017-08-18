<template>
  <div class="write-off-list" id="writeOffListId">
    <!--查询框-->
<!--    <el-row>
      <el-form  :model="writeSearchForm"  label-width="90px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="销账号">
              <el-autocomplete
                size="small"
                v-model="writeSearchForm.xzNum"
              :fetch-suggestions=" xzNumQuerySearch"
              @select="xzNumberHandleSelect"
            ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算方简称">
              <el-autocomplete
                size="small"
                v-model="writeSearchForm.shipper"
                placeholder="请输入内容"
                :fetch-suggestions="shipQuerySearch"
                @select="shipperInfoHandleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制单日期">
              <el-date-picker
                size="small"
                v-model="writeSearchForm.date"
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
            <el-button type="primary" @click="xzSearchBtn"  size="small">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="shenheBtn"  size="small">审核</el-button>
          </el-col>
        </el-row>
        </el-form-item>
      </el-form>
    </el-row>-->
    <!--合计内容-->
    <el-row :gutter="20">
      <el-col :span="6"  class="searchText">
        <span>应收合计:</span>
        <span>应付合计:</span>
        <span>合计金额:</span>
      </el-col>
      <el-col :span="18">
        <span>制单日期:</span>
        <el-date-picker
          size="small"
          v-model="writeSearchForm.date"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          range-separator=" ~ "
          @change="setChangedValue"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="xzSearchBtn"  size="small">查询</el-button>
        <el-button type="primary" @click="shenheBtn"  size="small">审核</el-button>
      </el-col>
    </el-row>
    <!--表格内容-->
    <bill-table :tableData="tableData" ref="writeListTable" @seletClk="parentSelect"></bill-table>

    <!--新增弹出框-->
    <el-dialog :modal="false"  @close="handleClose" :close-on-click-modal="false"  :title="dialogData.title" v-model="dialogFormVisible" :size="dialogData.size">
      <add-form  ref="noticeAddForm" :closedAddDialog="closedAddDialog" :xzListShow="xzListShow" :dialogType="dialogType"></add-form>
      <div slot="footer">
        <el-button type="primary" @click="noticeAddSave">保存</el-button>
      </div>
    </el-dialog>

    <!--切换框-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="销账详情" name="销账详情">
        <el-button @click="writeEditBtn" v-show="isDetailShow"  size="small">编辑</el-button>
        <div v-show="isDetailShow">
          <write-details  ref='billDetails'  :tableData="tableDetailsData" :selectNowData="selectNowData"></write-details>
        </div>
        <div v-show="!isDetailShow">
          <add-form  ref="noticeAddForm" :getDataForm="selectNowData"  :billShow="billShow"  :dialogType="dialogType2" :xzListShow="xzListShow"></add-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
<!---->
</template>

<script>
  import NoticeTable from './writeOffListTable.vue'
  import add from './addWriteOff.vue'
  import details from './writeOffDetailTable.vue'
  import api from '@/api/api'
  export default {
    name: 'writeOffListId',
    components : {
    "bill-table": NoticeTable,
      'add-form': add,
      'write-details': details
    },
    data() {
      return {
        tableData : [
          {name: "销账号", id: 0, isChecked:true, record: "chargeOffNo"},
          {name: "收付", id: 1, isChecked:false, record: "receiptPaymentType"},
          {name: "结算方简称", id: 2, isChecked:false, record: "settleAccountsShortName"},
          {name: "结算方全称", id: 8, isChecked:false, record: "settleAccountsFullName"},
          {name: "收付金额", id: 3, isChecked:false, record: "money"},
          {name: "关联账户", id: 4, isChecked:false, record: "waybillNum"},
          {name: "备注", id: 5, isChecked:false, record: "shipper"},
          {name: "销账人", id: 6, isChecked:false, record: "currency"},
          {name: "销账时间", id: 7, isChecked:false, record: "chargeOffDateStr"},
          {name: "审核", id: 7, isChecked:false, record: "review"},
          {name: "审核人", id: 7, isChecked:false, record: "reviewUser"},
          {name: "审核时间", id: 7, isChecked:false, record: "reviewDateStr"}
        ],
        //查询搜索表单
        writeSearchForm: {
          zdNum:'', //账单号
          monthlyStatementId:'',//账单ID
          noticeNum: '', // 收付通知号
          receiptPaymentId: '',//收付通知ID
          xzNum:'', //销账号
          chargeOffId:'', //销账号ID
          rpType:'',
          costType:[], //费用状态
          options:[],
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
          title : '新增账单',
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
        isDetailShow:true,
        activeName:'销账详情',
        tableDetailsData:[
          {name: '单号', isChecked:true, record: "billCodes",filterText: 'text'},
          {name: '产生日期', isChecked:true, record: "createDateStr",filterText: 'text'},
          {name: "结算方简称", isChecked:true, record: "settleAccountsShortName",filterText: 'text'},
          {name: "结算方全称", isChecked:true, record: "settleAccountsFullName",filterText: 'text'},
          {name: "账单号", isChecked:true, record: "monthlyStatementNo",filterText: 'text'},
          {name: "费用状态", isChecked:true, record: "costStatus",filterText: 'text'},
          {name: "收付", isChecked:true,record: "costType",filterText: 'text'},
          {name: "费用名称", isChecked:true, record: "costName",filterText: 'text'},
          {name: "单价", isChecked:true, record: "unitPrice",filterText: 'text'},
          {name: "数量", isChecked:true, record: "number",filterText: 'text'},
          {name: "金额",isChecked:true, record: "money",filterText: 'text'},
          {name: "备注",isChecked:true, record: "remark",filterText: 'text'},
          {name: "业务类型",isChecked:true, record: "",filterText: 'text'},
          {name: "客户单号", isChecked:true, record: "customerCode",filterText: 'text'},
          {name: "箱型", isChecked:true, record: "teuType",filterText: 'text'},
          {name: "箱号", isChecked:true, record: "teuNo",filterText: 'text'},
          {name: "车牌号", isChecked:true, record: "plateNo",filterText: 'text'},
          {name: "装拆地",isChecked:true, record: "destination",filterText: 'text'},
          {name: "通知号",isChecked:true, record: "receiptPaymentNo",filterText: 'text'},
          {name: "销账号",isChecked:true, record: "chargeOffNo",filterText: 'text'},
        ],
        selectNowData:null,

      }
    },
    methods: {
      //销账 号模糊查询
      xzNumQuerySearch(queryString,callback){
        let self = this;
        if( queryString != '' ){
          api.xzNumberSearch(queryString)
            .then(function (res) {
              let data = res.data;
              console.log(data);
              let resultData = [];
              for(var objTemp of data){
                resultData.push({id: objTemp.chargeOffId,"value":objTemp.chargeOffNo});
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
        this.writeSearchForm.chargeOffId = item.id;
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
        this.writeSearchForm.shipper = item.value; //将结算人简称赋值
        this.writeSearchForm.shipperId = item.key;//结算人Id赋值
        this.writeSearchForm.settleAccountsFullName = item.custFullName;//结算人全称赋值
      },
      //收付通知下来框显示
      showContent() {
        let self = this;
        api.selectBusTypeHandle( 'coststatus')
          .then(function (res) {
            const selectData = [];
            let  data = res.data;
            console.log(data);
            for (let objTemp of data) {
              selectData.push({key:objTemp.value,"value":objTemp.display,label:objTemp.value })
            }
            console.log(selectData);
            self.writeSearchForm.options = selectData
          })
          .catch(function(err){

          })
      },
      //时间转换格式化
      setChangedValue(value){
        this.writeSearchForm.dateStr = value;
        //页面首次加载成功后调用初始数据
        let params = {
          createDateQuery: value
        };
        if(this.writeSearchForm.initFlag){
          this.$refs.writeListTable.getRowData(params);
          this.writeSearchForm.initFlag = false;
        }
      },
      //新增通知单
      addWriteBtn(){
        this.dialogFormVisible = !this.dialogFormVisible;
        this.$refs.noticeAddForm.initSearchForm();
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
        this.$refs.writeListTable.getRowData()
      },
      //点击通知新增保存
      noticeAddSave() {
       this.$refs.noticeAddForm.addSave();
      },
      //销账列表查询
      xzSearchBtn() {
        let self = this;
        if( !this.writeSearchForm.xzNum ) {
          self.writeSearchForm.chargeOffId = '';
        };
        if(!this.writeSearchForm.shipper) {
          self.writeSearchForm.shipperId = '';
        };
        let params = {
          relChargeOffId: this.writeSearchForm.chargeOffId, //销账单号ID
          createDateQuery: this.writeSearchForm.dateStr,//制单日期
          relSettleAccountsId: this.writeSearchForm.shipperId , // 结算人ID
          //costStatus: JSON.stringify(this.writeSearchForm.costType),//费用状态
        };
        console.log(params);
        api.xzListShow(params)
          .then(function(res) {
            let  data  = res.data;
            self.$refs.writeListTable.initData(data);
          })
          .catch(function(err){
            console.log(err.data);

          })
      },
      //内容审核
      shenheBtn() {
        let self = this;
          if(!this.selectNowData) {
            this.$alert('请选择一条数据', '标题', {
              confirmButtonText: '确定'
            });
          }else if(!this.selectNowData.chargeOffNo) {
            this.$alert('未销账的单子禁止审核', '标题', {
              confirmButtonText: '确定'
            });
          } else if (this.selectNowData.review ==  '已审核'){
            this.$alert('已经审核，无须重复审核', '标题', {
              confirmButtonText: '确定'
            });
          } else  {
            api.xzSh(this.chargeOffId)
              .then(function(res) {
                let data  = res.data;
                self.$refs.writeListTable.updateRow(data);
              })
              .catch(function(err) {
                //console.log(err);
                console.log("111111111111");
              })
          }

      },
      //选中当前的表格
      parentSelect(item) {
        if(this.isDetailShow) {
          this.chargeOffId = item.chargeOffId;
          this.selectNowData = item;
        }

      },
      //账单显示页面
      billShow() {
        this.isDetailShow = true;
        this.$refs.billDetails. getCostList(this.selectNowData.chargeOffId);
      },
      //点击编辑按钮
      writeEditBtn() {
       if(this.selectNowData.review != '已审核') {
         this.isDetailShow = false;
         this.$refs.noticeAddForm.initSearchForm();
       }else {
         this.$alert('该条记录已审核，无法再次编辑', '消息提示', {})

       }

      },
      //点击保存按钮
      writeSaveBtn() {
        this.$refs.noticeAddForm.addSave();
      }
    },
    mounted() {
      var stateDate = (new Date()).setTime(new Date().getTime() - 3600 * 1000 * 24 * 7);
      var endDate = new Date();
      this.writeSearchForm.date = [stateDate,endDate];
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .write-off-list .icon-inline {
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
</style>

