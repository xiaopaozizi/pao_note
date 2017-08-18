  <template>
    <div class="edit-fee">
          <el-button @click="addFeeBtn">新增</el-button>
          <el-button @click="delFeeBtn">删除</el-button>
            <span class="block">应收: {{ sum1 }}</span>
            <span class="block">应付: {{ sum2 }}</span>
           <span class="block">利润: {{ sum3 }}</span>

      <div style="width: 100%;">
        <ag-grid-vue style="width: 100%; height: 350px;" class="ag-blue"
                     :gridOptions="gridOptions"
                     :columnDefs="columnDefs"
                     :rowClicked="tableClk"
                     :rowData="rowData"
                     :enableSorting="true"
                     :cellEditingStopped="stopEdit"
                     :itemsAdded="addItem"
                     :animateRows="true"
                     rowSelection="multiple"
                     :cellEditingStarted="startEdit">
        </ag-grid-vue>
      </div>
    </div>

</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import NumericEditorComponent from './NumericEditorComponent'
    import costNameComponent from './costNameComponent'
    import SpecType from './specType'
    import api from '@/api/api'
    const  yingShou = '应收';
    const  yingFu = '应付';
    export default {
      props: ['showData','activeName'],
        name: 'edit-fee',
        data () {
            return {
                gridOptions: null,
                columnDefs : [],
                rowData:[],
                immutableStore : [],
                selectNowData:null,
                sum1: null,
                sum2: null,
                sum3: null
            }
        },
        components: {
            'ag-grid-vue': AgGridVue,
        },
      watch: {
        'showData.xdTkBillId': function (val,oldVal) {
          let self = this;
          if(this.activeName == '费用信息') {
            console.log('执行的数据')
            self.getCostList(val);
          }

        },
      },
      computed: {
        sum() {

        }
      },
        methods: {
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
          //获取统计信息
          getStatistics() {
            let self = this;
            this.sum1= 0;
            this.sum2 = 0;
            this.sum3 = 0;
            let  rowNode = this.rowData;
             for(let objTemp in rowNode ) {
                  if(rowNode[objTemp].costType  === yingShou) {
                    self.sum1 += rowNode[objTemp].money;

                  } else if(rowNode[objTemp].costType === yingFu) {
                    self.sum2 += rowNode[objTemp].money;
                  }
             }
             this.sum3 = this.sum1 + this.sum2;
          },
          //创建表格数据
            createRowData(xdtList) {
//             this.gridOptions.api.setRowData(xdtList);
              this.rowData = xdtList ;
              this. getStatistics();
              this.rowStyle();
              this.gridOptions.api.sizeColumnsToFit();
            },
          //创建表格头部数据
            createColumnDefs() {
                return [
                  {
                    headerName: "费用ID",
                    field: "costItemId",
                    hide:true
                  },
                  {
                    headerName: "类型",
                    field: "costType",
                    colId: "lx"
                    /*                 cellStyle:function (params) {
                     if (params.value=='应收') {
                     console.log(params);
                     return {color: 'red'};
                     }
                     },*/
//                    editable: true,
                  },
                  {
                    headerName: "结算方简称",
                    field: "settleAccountsShortName",
                    cellEditorFramework: NumericEditorComponent,
                    editable: function(node){
                      let  a = node.node.data.costStatus;
                      let self= this;
                      if(a == '未审核') {
                        return true;
                      }else {
                        console.log('我是编辑的 数据');
                        console.log(node);
                      }
                    }
                  },
                  {
                    headerName: "费用名称",
                    field: "costName",
                    cellEditorFramework: costNameComponent,
                    editable: function(node){
                      let  a = node.node.data.costStatus;
                      let self= this;
                      if(a == '未审核') {
                        return true;
                      }else {
                        console.log('我是编辑的 数据');
                        console.log(node);
                      }
                    }
                  },
                  {
                    headerName: "单价",
                    field: "unitPrice",
                    editable: function(node){
                      let  a = node.node.data.costStatus;
                      let self= this;
                      if(a == '未审核') {
                        return true;
                      }else {
                        console.log('我是编辑的 数据');
                        console.log(node);
                      }
                    }
                  },
                  {
                    headerName: "数量",
                    field: "number",
                    editable: function(node){
                      let  a = node.node.data.costStatus;
                      let self= this;
                      if(a == '未审核') {
                        return true;
                      }else {
                        console.log('我是编辑的 数据');
                        console.log(node);
                      }
                    }
                  },
                  {
                    headerName: "金额",
                    field: "money",
                    colId: "hh"
                  },
                  {
                    headerName: "类别",
                    field: "specsModel",
//                    cellEditorFramework: SpecType,
                    editable: function(node){
                      let  a = node.node.data.costStatus;
                      let self= this;
                      if(a == '未审核') {
                        return true;
                      }else {
                        console.log('我是编辑的 数据');
                        console.log(node);
                      }
                    }
                  },
                  {
                    headerName: "审核",
                    field: "costStatus"
                  },
                  {
                    headerName: "备注",
                    field: "remark",
                    editable: function(node){
                      let  a = node.node.data.costStatus;

                      if(a == '未审核') {
                        return true;
                      }else {
                        let self= this;
                        alert('费用已审核');
                      }
                    },
                    cellEditor: 'largeText',
                    cellEditorParams: {
                      cols: '26',
                      rows: '4'
                    }
                  },
                  {
                    headerName: "对账号",
                    field: "monthlyStatementNo",
                    width: 250
                  },
                  {
                    headerName: "通知号",
                    field: "receiptPaymentNo",
                  },
                  {
                    headerName: "销账号",
                    field: "chargeOffNo",
                  },
                ]
            },
          //点击新增按钮
          addFeeBtn() {
            let self = this;
            console.log(this.showData);
            if(this.showData != null ) {
              let  selectedRows  = this.gridOptions.api.getSelectedRows();
              let costItem = { //应付初始值
                relBillId: self.showData.xdTkBillId, //托卡 的ID
                billCodes: self.showData.tkBillCode,
                number: 1, //数量
                relSettleAccountsId: self.showData.sendBillId,
                costType: yingShou
              };
              let costItem2 = {//应收初始值
                relBillId: self.showData.xdTkBillId, //托卡 的ID
                billCodes: self.showData.tkBillCode,
                number: 1, //数量
                relSettleAccountsId: self.showData.relTruckId,
                costType: yingFu
              };
                 if(selectedRows.length === 0 ) { //没有选中费用表格数据的新增
                   console.log(costItem);
                   console.log(costItem2);
                   self.addInterface(costItem);
                   self.addInterface(costItem2);
                 }else if(selectedRows.length === 1) { //当选择费用表格里面的一条数据进行新增
                   costItem['costType'] = selectedRows[0].costType;  //类型
                   costItem['settleAccountsShortName'] = selectedRows[0].settleAccountsShortName; //简称
                   costItem['relSettleAccountsId'] = selectedRows[0].relSettleAccountsId; //ID
                   costItem['specsModel'] = selectedRows[0].specsModel; //类别
                   costItem['unitPrice'] = selectedRows[0].unitPrice; //单价
                   costItem['number'] = selectedRows[0].number; //数量
                   costItem['money'] = selectedRows[0].money; //金额
                   costItem['remark'] = selectedRows[0].remark; //备注
                   costItem['costName'] = selectedRows[0].costName; //费用名称
                   console.log(costItem);
                  self.addInterface(costItem);
                 }
            }
          },
          //新增接口
          addInterface(params) {
            let self = this;
            console.log(params);
           api.costAdd(params)
             .then(function (res) {
               if(res.status === 'fail') {
                 this.$alert('系统出错', '警告！', {
                   confirmButtonText: '确定'
                 })
                 } else {
                 /*成功 新增以后前台插入一条数据*/
                   self.addInsertData(res.data);
               }
             })
             .catch(function(err) {
           })
          },
          //新增成功后返回的函数
          addInsertData(item) {
            this.rowData.push(item); //将成功后的参数插入
          },

          alertHand() {
            this.$alert('该条费用 已经审核，不能删除', '信息', {
              confirmButtonText: '确定'
            })
          },

          //点击当前行的数据
          tableClk(item) {//获取表格选中的参数
            this.selectNowData = item.data;
          },
          //开始编辑行数据触发函数
          startEdit(item) {
            let self =  this;
            let costStatus = item.data.costStatus;
            console.log('开始新增');
            if(costStatus != '未审核') {
               console.log('我 是审核 状态');
            }
          },
          stopEdit(item) {
            console.log('我已经停止编辑');
            console.log(item.data);
            let self = this;
            let d = item.colDef.field;
            let costItem = {costItemId:item.data.costItemId};
            if(d === 'settleAccountsShortName') {
              costItem['settleAccountsFullName'] = item.data.settleAccountsFullName;
              costItem['relSettleAccountsId'] = item.data.relSettleAccountsId;
              costItem[d] = item.value;
              console.log(11111111,costItem);
              this.costEditInterface(costItem,item.data);
            }else if(d === 'unitPrice' || d === 'number') {
              costItem[d]  =   item.value;
              costItem['money'] = item.data.unitPrice * item.data.number;
              item.data.money = costItem['money'];
              console.log(222222,costItem);
              this.costEditInterface(costItem,item.data);
            }else{
              costItem[d] = item.value;
              console.log(3333333,costItem);
              this.costEditInterface(costItem,item.data);
            }
          },
          setCustomData(data){
            console.log('是我==============');
          },
          updateRow(row,data){
            console.log('我是update');
            console.log(data);
      //      this.getCostList(this.showData.xdTkBillId);
      //      let selectedRow = this.gridOptions.api.getSelectedRows();
            for( let  objShow in row) {
              data[objShow] =  row[objShow];
            }
            this.gridOptions.api.refreshView();
            console.log('成功');
          },
          //编辑函数接口
          costEditInterface(params,data) {
            let self =this;
            console.log(params,data);
            api.costEdit(params)
              .then(function(res) {
                console.log('我是成功编辑以后返回的结果集');
                self.updateRow(res.data,data);
              })
              .catch(function(err) {
                console.log(err);
              })
          },
          addItem() {
            console.log('新增一行触发');
          },
          //删除
          delFeeBtn() {
            let self = this;
            let params = { costItemId: this.selectNowData.costItemId };
            let state = this.selectNowData.costStatus;
            if(state == '未审核') {
              self.$confirm('确认删除该记录吗?', '提示', {
                  type: 'warning'
                })
                .then(function() {
                  api.costDel(params)
                    .then(function(res) {
                      self.getCostList(self.showData.xdTkBillId); //获取费用列表
                    })
                    .catch(function(err) {
                      console.log(err);

                    })
                })
            }else {
              this.$alert('该条费用 已经审核，不能删除', '信息', {
                confirmButtonText: '确定'
              })
            }

          },
          //获取费用的列表
          getCostList(xdTkBillId) {
            let self = this ;
            let params = {
              relBillId: xdTkBillId
            };
            api.costList(params)
              .then(function(res) {
                self.createRowData(res);
              })
              .catch(function(err) {
                console.log(err.data);

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
            }
          };
          this.columnDefs = this.createColumnDefs();
        },
        mounted() {
          this.gridOptions.api.sizeColumnsToFit();
        }
    }
</script>

  <style scoped>
   .block {
     display: inline-block;
     width: 150px;
     padding-left: 30px;
   };
   .rag-green {
     background-color: lightgreen;
   }
  </style>

