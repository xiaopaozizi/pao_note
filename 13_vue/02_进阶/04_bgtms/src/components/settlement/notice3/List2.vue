<template>
  <div class="list" >
    <!--合计内容-->
    <el-row>
      <el-col :span="10"  class="searchText">
        <span class="blue">应收合计:{{ totalCollect }}</span>
        <span class="red">应付合计:{{ totalPay}}</span>
        <span>合计金额:{{ totalCount }}</span>
      </el-col>
      <el-col :span="14">
        <span>制单日期:</span>
        <el-date-picker
          v-model="searchForm.date"
          size="small"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          range-separator=" ~ "
          @change="setChangedValue"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="listSearchBtn"  size="small">查询</el-button>
      </el-col>
    </el-row>
    <!--表格内容-->
    <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowClicked="clickRowHandle"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 :floatingFilter="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
    <!--切换框-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="通知详情" name="通知详情">
        <el-button @click="editBtn"  v-show="isDetailShow"  size="small">编辑</el-button>
        <div v-show="isDetailShow">
          <show-details :selectRowData="selectRowData" ref="refDetailsTable"></show-details>
        </div>
        <div v-show="!isDetailShow">
          <edit-details ref="refEditTable" :selectRowData="selectRowData" :showStatus="showStatus" :getParentData="getRowData"></edit-details>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
<!---->
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import showDetails from "./showDetailsTable";
  import editDetails from "./editTable";
  import api from '@/api/api'
  export default {
    name: 'list',
    components : {
      "ag-grid-vue": AgGridVue,
      "show-details" : showDetails,
      "edit-details" : editDetails,
    },
    data() {
      return {
        //总结
        totalCollect:0,
        totalPay :0,
        totalCount :0,

        //table
        gridOptions: {

        },
        columnDefs: [],
        rowData: null,
        defCol:[
          {name: "收付通知号", record: "receiptPaymentCode"},
          {name: "收付类型", record: "receiptPaymentType"},
          {name: "结算方简称",record: "settleAccountsShortName"},
          {name: "结算方全称",record: "settleAccountsFullName"},
          {name: "金额",  record: "money"},
          {name: "计划日期", record: "waybillNum"},
          {name: "提交人", record: "shipper"},
          {name: "备注", record: "remark"},
          {name: "打印次数",record: "carnum"},
          {name: "收付日期", record: "driver"}
        ],
        //查询搜索表单
        searchForm: {
          dateStr:'', //传给后台的时间日期
          date: '',  //前台显示的时间日期
          initFlag: true
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

        //tabs切换框
        activeName:'通知详情',
        isDetailShow:true,
        selectRowData: null
      }
    },
    methods: {
      //创建表头
      createColumnDefs() {//生成表格表头
        let self = this;
        let header = this.defCol;
        /*表头对应显示的数据内容field*/
        for(let  i=0; i < header.length; i++){
            self.columnDefs.push(
              {
                headerName: header[i].name,
                field: header[i].record,
                suppressMenu: false,
                filter:header[i].filterText,
                suppressFilter: false,
              }
            )
          }
      },
      //创建数据
      createRowData(xdtList) {//生成表格数据函数
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            createDate: objTemp.createDate,
            createDateQuery: objTemp.createDateQuery,
            createUser: objTemp.createUser,
            modDate: objTemp.modDate,
            modUser: objTemp.modUser,
            money: objTemp. money,
            printCount: objTemp.printCount,
            receiptPaymentCode: objTemp.receiptPaymentCode,
            receiptPaymentId: objTemp.receiptPaymentId,
            receiptPaymentType: objTemp.receiptPaymentType,
            relSettleAccountsId: objTemp.relSettleAccountsId,
            remark: objTemp.remark,
            settleAccountsFullName: objTemp.settleAccountsFullName,
            settleAccountsShortName: objTemp.settleAccountsShortName
          })
        }
        this.rowData = rowData;
      },
      //初始化数据
      initData(xdtList){
       let self = this;
        xdtList.forEach(function(node, index){
          if(node.money  < 0 ) {
            self.totalPay += node.money;
          } else if(node.money > 0) {
            self.totalCollect += node.money;
          }else  {

          }
          console.log(node.money);

        });
        this.totalCount = this.totalCollect + this.totalPay;
        this.createRowData(xdtList);
        this.rowStyle();
      },
      //获取行样式
      rowStyle() {
        this.gridOptions.getRowStyle = function(params){
          if(  !params.data.receiptPaymentCode ) {
            return {color:'red'}
          } else{
            return {color:'blue'}
          }
        };
      },
      clickRowHandle(item) {
        console.log('我是点击函数');
        console.log(item.data);
        this.selectRowData =  item.data;
        this.$emit("seletClk", item.data);
      },

      //控制详情的显示 与编辑
       showStatus() {
         this. isDetailShow = true;
         this.$refs.refDetailsTable.getCostList(this.selectRowData.receiptPaymentId);
       },
      //时间转换格式化
      setChangedValue(value){
        this.searchForm.dateStr = value;
        //页面首次加载成功后调用初始数据
        let params = {
          createDateQuery: value
        };
        if(this.searchForm.initFlag){
          this.getRowData(params);
          this.searchForm.initFlag = false;
        }
      },

      //账单列表查询
      listSearchBtn() {
        let self = this;
        let params = {
          createDateQuery: this.searchForm.dateStr
        };
        this.getRowData(params);
      },
      //账单编辑按钮
      editBtn() {
        if(!this.selectRowData) {
          this.$alert('请选择一条数据', '标题', {
            confirmButtonText: '确定'
          });

        }else {
            this.isDetailShow = false;
          let params = {
            relReceiptPaymentId: this.selectRowData.receiptPaymentId,
          };
          this.$refs.refEditTable.getCostList(params);



        //  this.$refs.refEditTable.selectPaymentNo(this.selectRowData.monthlyStatementId);
        }

      },

      //获取表格数据并且初始化
      getRowData(params) {
        let self = this;
        api.noticeListShow(params)
          .then(function(res) {
            console.log('我是初始化表格数据');
            console.log(res);
            let  data  = res.data;
            self.initData(data);
          })
          .catch(function(err) {
            console.log(err);

          })
      },
    },
    beforeMount() {
      this.gridOptions = {
        context: {
          componentParent: this
        },
        localeText: {
          page: '页',
          more: '更多',
          to: '到',
          of: '总共',
          next: '下一页',
          last: '最后一页',
          first: '第一页',
          previous: '上一页',
          loadingOoo: '正在加载....',
          noRowsToShow: '没有找到您想要的数据...',
          // for number filter
          contains: '包含',
          notContains: '不包含',
          startsWith:'开始',
          endsWith: '结束',
          equals: '等于',
          notEqual: '不等于',
          lessThan: '小于',
          greaterThan: '大于',
          filterOoo: '请输入您要过滤的内容',
        }
      };
     this.createColumnDefs();

    },
    mounted() {
      this.getRowData('');
      this.gridOptions.api.sizeColumnsToFit();
      var stateDate = (new Date()).setTime(new Date().getTime() - 3600 * 1000 * 24 * 7);
      var endDate = new Date();
      this.searchForm.date = [stateDate,endDate];
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .searchText {
    padding-top: 8px;

  }
  .searchText span {
    display: inline-block;
    padding-right: 25px;;
  }
  .blue{
    color: blue;
  }
  .red {
    color: red;
  }
</style>

