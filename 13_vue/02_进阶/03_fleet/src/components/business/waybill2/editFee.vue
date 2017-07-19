  <template>
    <div class="edit-fee">
          <el-button @click="addFeeBtn">新增</el-button>
          <el-button @click="delFeeBtn">删除</el-button>
            <span class="block">应收: {{ sum1 }}</span>
            <span class="block">应付: {{ sum2 }}</span>
           <span class="block">利润: {{ sum3 }}</span>

      <div style="width: 100%;">
        <ag-grid-vue style="width: 100%; height: 350px;" class="ag-fresh"
                     :gridOptions="gridOptions"
                     :rowClicked="tableClk"
                     :rowData="rowData"
                     :enableSorting="true"
                     :cellEditingStopped="stopEdit"
                     :itemsAdded="addItem"
                     :cellEditingStarted="startEdit">
        </ag-grid-vue>
      </div>
    </div>

</template>

<script>
    import Vue from "vue";
    import {AgGridVue} from "ag-grid-vue";
    import NumericEditorComponent from './NumericEditorComponent'
    import costNameComponent from './costNameComponent'
    import CostType from './costType'
    import SpecType from './specType'
    import api from '@/api/api'
    const  yingShou = '应收';
    const  yingFu = '应付';
    export default {
      props: ['showData','activeName'],
        name: 'edit-fee',
        data () {
            return {
                gridOptions: {
                  animateRows: true,
                  columnDefs : this.createColumnDefs(),
                  rowSelection: 'multiple',
                  sortingOrder: [null]
                },
                rowData:null,
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
        'showData': function () {
          this.getCostList();
        },
      },
      computed: {
        sum() {

        }
      },
        methods: {
          //获取行样式
          rowStyle() {
            this.gridOptions.getRowStyle = function(params){
              console.log('我是行样式');
              if(params.data.costType === yingShou) {
                return {color:'red'}
              } else if( params.data.costType === yingFu ) {
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
                    console.log(rowNode);
                  } else if(rowNode[objTemp].costType === yingFu) {
                    self.sum2 += rowNode[objTemp].money;
                    console.log(rowNode[objTemp].money);
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
            },
          //创建表格头部数据
            createColumnDefs() {
                return [
                    {
                      headerName: "费用ID",
                      field: "costItemId",
                    },
                    {
                      headerName: "类型",
                      field: "costType",
                      cellEditorFramework: CostType,
     /*                 cellStyle:function (params) {
                        if (params.value=='应收') {
                          console.log(params);
                          return {color: 'red'};
                        }
                      },*/
                      editable: true,
                      sortingOrder: ['asc','desc']
                    },
                    {
                      headerName: "结算方简称",
                      field: "settleAccountsShortName",
                      cellEditorFramework: NumericEditorComponent,
                      editable: true
                    },
                    {
                        headerName: "费用名称",
                        field: "costName",
                        cellEditorFramework: costNameComponent,
                        editable: true
                    },
                    {
                      headerName: "类别",
                      field: "specsModel",
                      cellEditorFramework: SpecType,
                      editable: true
                    },
                  {
                    headerName: "单价",
                    field: "unitPrice",
                    editable: true
                  },
                  {
                    headerName: "数量",
                    field: "number",
                    editable: true
                  },
                  {
                    headerName: "金额",
                    field: "money",
                    colId: "hh"
                  },
                  {
                    headerName: "审核",
                    field: "costStatus"
                  },
                  {
                    headerName: "备注",
                    field: "remark",
                    editable: true,
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
            var selectedRows  = this.gridOptions.api.getSelectedRows();
            if(this.showData != null ) {
              let costItem = {
                relBillId: self.showData.xdTkBillId, //托卡 的ID
                billCodes: self.showData.tkBillCode,
                number: 1, //数量
                settleAccountsShortName:self.showData.sendBillInfo,
                costType: yingShou
              };

              if(selectedRows.length === 1){
                costItem['costType'] = selectedRows[0].costType;  //类型
                costItem['settleAccountsShortName'] = selectedRows[0].settleAccountsShortName; //简称
                costItem['specsModel'] = selectedRows[0].specsModel; //类别
                costItem['unitPrice'] = selectedRows[0].unitPrice; //单价
                costItem['number'] = selectedRows[0].number; //数量
                costItem['money'] = selectedRows[0].money; //金额
                costItem['remark'] = selectedRows[0].remark; //备注
                costItem['costName'] = selectedRows[0].costName; //费用名称
              }
              this.addInterface(costItem);
              console.log('我 是没复制的值')
            }

          },
          //新增接口
          addInterface(params) {
            let self = this;
            console.log(params);
           api.costAdd(params)
             .then(function (res) {
               /*成功 新增以后前台插入一条数据*/
               self.rowData.push(res.data);
               self.addInsertData(res.data);
             })
             .catch(function(err) {

           })
          },
          //成功后返回的函数
          addInsertData(costItem) {
            console.log('我是成功后返回的数据add');
            console.log(this.rowData);
            let self = this;
            var newStore = self.rowData.slice();
            newStore.push(costItem);
            this.gridOptions.api.setRowData(newStore); //将数据设置到表格数据里
            let num =  self.rowData.length;
            self.gridOptions.api.setFocusedCell(num-1, 'costType');
            self.gridOptions.api.startEditingCell({
              rowIndex:num-1,
              colKey: 'costType',
            });
          },
          //点击当前行的数据
          tableClk(item) {//获取表格选中的个数
            this.selectNowData = item.node.data;
            console.log(this.selectNowData);
          },
          //开始编辑行数据触发函数
          startEdit(item) {
            console.log('开始编辑');
            console.log(item);
            let self =  this;
            let costStatus = item.data.costStatus;

            if(costStatus != '未审核') {
               console.log('我 是审核 状态');
              //item.colDef.editable = false;
            }
          },
          stopEdit(item) {
            console.log('我已经停止编辑');
            console.log(item);
            let self = this;
            let d = item.colDef.field;
            let costItem = {costItemId:item.data.costItemId};

            if(d === 'settleAccountsShortName'){
              costItem['settleAccountsFullName'] = item.data.settleAccountsFullName;
              costItem['relSettleAccountsId'] = item.data.relSettleAccountsId;
            }else if(d === 'unitPrice') {
              console.log('我是应付金额');
              if( item.data.costType === yingFu) {
                item.data.unitPrice =  -item.data.unitPrice ;
                costItem['unitPrice']  =   item.data.unitPrice;
              }else if (  item.data.costType === yingShou ) {
                costItem['unitPrice']  =   item.value;
              }
              costItem['money'] = item.data.unitPrice * item.data.number;
              item.data.money = costItem['money'];
              this.costEditInterface(costItem);
              this.gridOptions.api.refreshRows([item.node]);
              console.log(item.node);
            }else if( d === 'number') {
              costItem['number']  =   item.value;
              costItem['money'] = item.data.unitPrice * item.data.number;
              item.data.money = costItem['money'];
              this.costEditInterface(costItem);
              this.gridOptions.api.refreshRows([item.node]);
              console.log(item.node);
            }else {
              //编辑当前想后台传数据
              costItem[d] = item.value;
              this.costEditInterface(costItem);
            }

            console.log(costItem);


          },
          setCustomData(data){
            console.log('是我==============');
          },
          //编辑函数接口
          costEditInterface(params) {
            api.costEdit(params)
              .then(function(res) {

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
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
              })
              .then(function() {
                api.costDel(params)
                  .then(function(res) {
                    self.getCostList(); //获取费用列表
                  })
                  .catch(function(err) {
                    console.log(err);

                  })
              })
          },
          //获取费用的列表
          getCostList() {
            let self = this ;
            let params = {
              relBillId: this.showData.xdTkBillId
            };
            console.log(params);
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

        },
        mounted() {

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

