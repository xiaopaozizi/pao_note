<template>
  <div class="grid" style="">
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
          v-model="searchForm.date"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          range-separator=" ~ "
          @change="setChangedValue"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click="searchFormBtn"  size="small" style="margin-right: 30px">查询</el-button>
        <span>备注</span>
        <el-input type="textarea" :rows="1"
                  v-model="editForm.remark" style="width:300px"  size="small"></el-input>
        <el-button @click="addSaveBtn"  size="small">保存</el-button>
        <el-button @click="cancelBtn"  size="small">取消</el-button>
      </el-col>
    </el-row>
    <ag-grid-vue style="height: 350px;width: 100%;" class="ag-blue" id="myGrid"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :enableSorting="true"
                 :enableColResize="true"
                 :rowSelected="selectClick"
                 :suppressMenuFilterPanel="true"
                 :suppressMenuMainPanel="true"
                 :suppressMenuColumnPanel="true"
                 :toolPanelSuppressValues="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
  </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api';
  export default {
    props: ["selectRowData","showStatus","getParentData"],
    name: "grid",
    data() {
      return {
        gridOptions: null,
        columnDefs: [],
        rowData: null,
        defCol: [
          {name: "", id: 0, isChecked:true, record: "", checkBox:true},
          {name: '单号', isChecked:true, record: "billCodes",filterText: 'text'},
          {name: '产生日期', isChecked:true, record: "createDateStr",filterText: 'text'},
          {name: "结算方简称", isChecked:true, record: "settleAccountsShortName",filterText: 'text'},
          {name: "结算方全称", isChecked:true, record: "settleAccountsFullName",filterText: 'text'},
          {name: "账单号", isChecked:true, record: "monthlyStatementNo",filterText: 'text'},
          {name: "费用状态", isChecked:true, record: "costStatus",filterText: 'text'},
          {name: "收付", isChecked:true,record: "costType",filterText: 'text'},
          {name: "费用名称", isChecked:true, record: "costName",filterText: 'text'},
          {name: "类别", isChecked:true, record: "costName",filterText: 'text'},
          {name: "单价", isChecked:true, record: "unitPrice",filterText: 'text'},
          {name: "数量", isChecked:true, record: "number",filterText: 'text'},
          {name: "金额",isChecked:true, record: "money",filterText: 'text'},
          {name: "备注",isChecked:true, record: "remark",filterText: 'text'},
          {name: "业务类型",isChecked:true, record: "",filterText: 'text'},
          {name: "客户单号", isChecked:true, record: "specsModel",filterText: 'text'},
          {name: "箱型", isChecked:true, record: "teuType",filterText: 'text'},
          {name: "实际重量", isChecked:true, record: "realWeigh",filterText: 'text'},
          {name: "箱号", isChecked:true, record: "teuNo",filterText: 'text'},
          {name: "车牌号", isChecked:true, record: "plateNo",filterText: 'text'},
          {name: "装拆地",isChecked:true, record: "destination",filterText: 'text'},
          {name: "通知号",isChecked:true, record: "receiptPaymentNo",filterText: 'text'},
          {name: "销账号",isChecked:true, record: "chargeOffNo",filterText: 'text'},
        ],

        //应收、应付合计
        yShou:0,
        yFu: 0,
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

        editForm: {
          remark:''
        }

      }
    },
    components: {
      "ag-grid-vue": AgGridVue
    },
    watch: {
/*      "selectRowData.monthlyStatementId" :function (val,oldVal)  {
        let params = {
          relMonthlyStatementId: val,
        };
        this.getCostList(params);
      }*/
    },
    methods: {
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
      //改变表格自适应
      rowDataChanged() {
        let self = this;
        if(this.rowData != null && this.rowData.length > 0){
          console.log('我已经加载完');
          setTimeout(function(){
            self.autoColumns();
          },100)

        }
      },
      autoColumns() {
        var allColumnIds = [];
        this.columnDefs.forEach( function(columnDef) {
          allColumnIds.push(columnDef.field);
        });
        this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
      },
      //获取行样式
      rowStyle() {
        this.gridOptions.getRowStyle = function(params){
          if(params.data.unitPrice < 0) {
            return {color:'red'}
          } else if( params.data.unitPrice > 0 ) {
            return {color:'blue'}
          }
        };
      },
      //初始化
      initData(xdtList){
        let self =this;
   //     this.gridOptions.api.setRowData([]);
        this.createRowData(xdtList);
        this.rowStyle();
        this.gridOptions.api.sizeColumnsToFit();

        this.selectPaymentNo(this.selectRowData.monthlyStatementId);
      },
      createRowData(xdtList) {//生成表格数据函数
        let self= this;
        const rowData = [];
        rowData.splice(0,rowData.length);
        for(let objTemp of xdtList) {
          rowData.push({
            billCodes:objTemp.billCodes,
            billType:objTemp.billType,
            chargeOffDate:objTemp.chargeOffDate,
            chargeOffNo:objTemp.chargeOffNo,
            costItemId:objTemp.costItemId,
            costName:objTemp.costName,
            costSource:objTemp.costSource,
            costStatus:objTemp.costStatus,
            costType:objTemp.costType,
            createDateStr: objTemp.createDateStr,
            createDateQuery:objTemp.createDateQuery,
            createUser:objTemp.createUser,
            customerCode:objTemp.customerCode,
            destination:objTemp.destination,
            money:objTemp.money,
            monthlyStatementDate:objTemp.monthlyStatementDate,
            monthlyStatementNo:objTemp.monthlyStatementNo,
            number:objTemp.number,
            plateNo:objTemp.plateNo,
            receiptPaymentDate:objTemp.receiptPaymentDate,
            receiptPaymentCode:objTemp.receiptPaymentCode,
            receiptPaymentType:objTemp.receiptPaymentType,
            receiptPaymentNo:objTemp.receiptPaymentNo,
            receiptPaymentId:objTemp.receiptPaymentId,
            relBillId:objTemp.relBillId,
            relChargeOffId:objTemp.relChargeOffId,
            relMonthlyStatementId:objTemp.relMonthlyStatementId,
            relReceiptPaymentId:objTemp.relReceiptPaymentId,
            relSettleAccountsId:objTemp.relSettleAccountsId,
            remark:objTemp.remark,
            settleAccountsFullName:objTemp.settleAccountsFullName,
            settleAccountsShortName:objTemp.settleAccountsShortName,
            specsModel:objTemp.specsModel,
            teuNo:objTemp.teuNo,
            teuType:objTemp.teuType,
            unitPrice:objTemp.unitPrice,
          })
        }
        this.rowData = rowData;
        console.log('第二部')
      },
      createColumnDefs() {//生成表格表头
        /*表头内容显示数据数组*/
        let tableCol = this.defCol;
        /*表头对应显示的数据内容field*/
        for(var i=0; i < tableCol.length; i++){
          this.columnDefs.push(
            {
              headerName: tableCol[i].name,
              field: tableCol[i].record,
              suppressMenu: false,
              suppressFilter: false,
              checkboxSelection: tableCol[i].checkBox,
              headerCheckboxSelection: tableCol[i].checkBox
            }
          )
        }
      },
      //让其默认选中
      selectPaymentNo(item) {
        console.log('我是香醋暗中');
        let self = this;
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.api.forEachNode( function (node) {
          if (node.data.relMonthlyStatementId === item) {
            node.setSelected(true);
          }
        });
      },
      //将新行设置到网格中
      onGetSetRow(rows) {
        //增加表格数据
        console.log('我是rows');
        console.log( this.rowData);
        let  newStore = this.rowData.slice();
        for(let i=0; i<rows.length; i++) {
          newStore.push(rows[i]);
        }
        this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里
        this.selectPaymentNo(this.selectRowData.monthlyStatementId);
      },
      //将插入的的表格数据变为空
      onClearRows() {
        let self = this;
        this.rowData = [];
        this.gridOptions.api.forEachNode( function (node) {
         if(node.selected === false) {
         console.log(node);
         self.gridOptions.api.removeItems(node);
         //            this.gridOptions.api.refreshView()
         }
         });
      },
      //获取查询费用列表
      getCostList(item) {
        let self = this;
        api.zdTableList(item)
          .then(function(res) {
            console.log(res);
            self.initData(res);
          })
          .catch(function(err) {

          })
      },
      //获取初始化的表格数据
      getCostListSe(item) {
        let self = this;
        api.zdTableList(item)
          .then(function(res) {
            console.log(res);
            self.onGetSetRow(res);
          })
          .catch(function(err) {

          })
      },

      //费用统计
      selectClick(item){
        let  selectedRows  = this.gridOptions.api.getSelectedRows();
        let self = this;
        let yingShou = [];
        self.yShou = 0;
        self.yFu = 0;
        selectedRows.forEach(function(selectedRow, index) {
          yingShou.push(selectedRow.money);
          if(selectedRow.costType == '应收'){
            self.yShou += yingShou[index];
          }else if(selectedRow.costType == '应付') {
            self.yFu += yingShou[index];
          }
        });
      },
      //时间转换格式化
      setChangedValue(value){
        this.searchForm.dateStr = value;
      },
      //查询按钮
      searchFormBtn() {
        let self = this;
        let params = {
          relSettleAccountsId: this.selectRowData.relSettleAccountsId,
          createDateQuery: this.searchForm.dateStr,
          costStatus:JSON.stringify(['未审核','已审核']) //传给后台的状态
        };
        console.log(params);
        this.getCostListSe(params);
      },

      //保存
      addSaveBtn() {
        let self = this ;
        let selectedRows =  this.gridOptions.api.getSelectedRows();
        let costItemIdList = [];
        selectedRows.forEach(function(selectedRow, index) {  //循环遍历出客户ID
          costItemIdList.push(selectedRow);
        });
        console.log(costItemIdList);
        let params = {
          relSettleAccountsId:this.selectRowData.relSettleAccountsId, // 结算人Id
          settleAccountsShortName:this.selectRowData.settleAccountsShortName, //结算人简称
          settleAccountsFullName:this.selectRowData.settleAccountsFullName, //结算人全称
          remark:  this.editForm.remark, //备注
          costItemList: JSON.stringify(costItemIdList)
        };
        console.log(params);
        //保存的接口

         this.addInterface(params);
      },
      //保存接口
      addInterface(params) {
        let self = this;
        api.zdAddSave(params)
          .then(function(res) {
            console.log(res);
            let params = {
              relSettleAccountsId: self.selectRowData.relSettleAccountsId,
            };
            self.getParentData();
            self.getCostList(params);
            self.showStatus();
          })
          .catch(function(err) {
            console.log(err);
          })
      },

      //取消按钮
      cancelBtn() {
        this.showStatus();
        //this.onClearRows();
      }
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
        }
      };
      this.createColumnDefs();
    },
    mounted() {

    }
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
</style>




