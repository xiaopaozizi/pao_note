<template>
  <div class="add-write">
<!--    <el-row>
      <el-form  :model="addSearchForm" ref="addSearchForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="制单日期">
              <el-date-picker
                size="small"
                v-model="addSearchForm.date"
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
            <el-button type="primary" @click="addSearchFormSubmit"  size="small">查询</el-button>
          </el-col>
          <el-col :span="10" >
                  <el-form-item label="备注">
                    <el-input type="textarea" :rows="2"
                              v-model="writeEditForm.remark" style="width:300px"  size="small"></el-input>
                  </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button @click="billSaveBtn"  size="small">保存</el-button>
            <el-button @click="billCancelBtn"  size="small">取消</el-button>
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
         <span>制单日期</span>
         <el-date-picker
           size="small"
           v-model="addSearchForm.date"
           type="daterange"
           align="right"
           placeholder="选择日期范围"
           range-separator=" ~ "
           @change="setChangedValue"
           :picker-options="pickerOptions2">
         </el-date-picker>
         <el-button type="primary" @click="addSearchFormSubmit"  size="small" style="margin-right: 30px">查询</el-button>
         <span>备注</span>
         <el-input type="textarea" :rows="1"
                   v-model="writeEditForm.remark" style="width:300px"  size="small"></el-input>
         <el-button @click="billSaveBtn"  size="small">保存</el-button>
         <el-button @click="billCancelBtn"  size="small">取消</el-button>
       </el-col>
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
        addSearchForm: {
          noticeNum: '', // 收付通知号
          rpType:'',
          monthlyStatementNo:'',
          monthlyStatementId:'',
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
      }
    },
    watch: {
      'addSearchForm.receiptPaymentId' :function(val,oldVal) {
        console.log('我 是watch函数');
        this.addSearchFormSubmit();
      }
    },
    methods: {
      //时间转换格式化
      setChangedValue(value){
        this.addSearchForm.dateStr = value;
      },

      //初始化数据
      initSearchForm() {
          //初始化方法
          this.addSearchForm.monthlyStatementNo = this.getDataForm.monthlyStatementNo;//账单ID
          this.addSearchForm.monthlyStatementId = this.getDataForm.monthlyStatementId;//账单ID
          this.addSearchForm.settleAccountsFullName = this.getDataForm.settleAccountsFullName;//结算人全称
          this.addSearchForm.shipper = this.getDataForm.settleAccountsShortName;   //结算方简称
          this.addSearchForm.shipperId = this.getDataForm.relSettleAccountsId; // 结算人Id.
          this.addSearchForm.disabled = true;
          this.addSearchForm.customType = false;
          this.$refs.addCostTable.selectPaymentNo(this.getDataForm.monthlyStatementId)
      },
      //表单查询
      addSearchFormSubmit() {
        console.log(this.addSearchForm.shipper);
        let self = this;
        let params = {
          relSettleAccountsId:this.addSearchForm.shipperId, // 结算人Id
          createDateQuery:this.addSearchForm.dateStr, //传给后台的时间日期
          costStatus:JSON.stringify(['未审核','已审核']) //传给后台的状态
        };
        if( self.addSearchForm.shipper == null ||   self.addSearchForm.shipper == ' ') {
          self.addSearchForm.shipperId = ' '
        }
        console.log(params);
        if(this.dialogType === 'edit') {
          api.zdTableList(params)
            .then(function(res) {
              let params = res;
              let arr =[];
              for(let i=0; i < params.length; i++ ) {
                if(params[i].costStatus != '已销账' && params[i].costStatus != '已通知' &&  params[i].costStatus != '已出帐') {
                  arr.push(params[i]);
                }
              }
              self.$refs.addCostTable.onGetSetRow(arr); //调用表格将获取 的 数据设置 到表格里

            })
            .catch(function(err) {
              console.log(err);
            })
        }else {
          api.zdTableList(params)
           .then(function(res) {
             console.log(res);
           let params = res;
           let arr = [];
           for(let i=0; i < params.length; i++ ) {
           if(params[i].costStatus != '已销账' && params[i].costStatus != '已通知' &&  params[i].costStatus != '已出帐') {
           arr.push(params[i]);
           }
           }
           self.$refs.addCostTable.initData(arr)
           })
           .catch(function(err) {
           console.log(err);
           })
        }
      },

      //取消的函数
      cancelHandle() {
        this.$refs.addCostTable.onClearRows();
      },
      //账单取消
      billCancelBtn() {
        this.billShow();
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
          relSettleAccountsId:this.getDataForm.relSettleAccountsId, // 结算人Id
          settleAccountsShortName:this.getDataForm.settleAccountsShortName, //结算人简称
          settleAccountsFullName:this.getDataForm.settleAccountsFullName, //结算人全称
          remark:  this.writeEditForm.remark, //备注
          costItemList: JSON.stringify(costItemIdList)
        };
        console.log(params);
        api.zdAddSave(params)
         .then(function(res) {
           console.log(res);
           self.xzListShow();
           self.$refs.addCostTable.getCostList();
           self.billShow();
         })
         .catch(function(err) {
         console.log(err);
         })
      },

      //账单按钮保存
      billSaveBtn() {
        this.addSave();
      },
      //账单保存
      addEditSave() {
        let self = this ;
        let selectedRows =  this.$refs.addCostTable.getSelectedRows();
        let costItemIdList = [];
        selectedRows.forEach(function(selectedRow, index) {  //循环遍历出客户ID
          costItemIdList.push(selectedRow);
        });
        console.log(costItemIdList);
        let params = {
          monthlyStatementId: this.addSearchForm.monthlyStatementId,
          relSettleAccountsId:this.addSearchForm.shipperId, // 结算人Id
          settleAccountsShortName:this.addSearchForm.shipper, //结算人简称
          settleAccountsFullName:this.addSearchForm.settleAccountsFullName, //结算人全称
          remark:  this.writeEditForm.remark, //备注
          costItemList: JSON.stringify(costItemIdList)
        };
        console.log(params);
        api.zdAddSave(params)
          .then(function(res) {
            console.log(res);
            self.billShow();
          })
          .catch(function(err) {

          })
      },
    },
    created() {

    },
    mounted(){

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
</style>


