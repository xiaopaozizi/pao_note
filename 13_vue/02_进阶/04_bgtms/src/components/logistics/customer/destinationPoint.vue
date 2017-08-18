<template>
    <div class="destination-point">
      <el-row>
        <el-col>
           <el-button size="small" type="primary" @click="addBtn">新增</el-button>
           <el-button size="small" type="primary" @click="delBtn">删除</el-button>
        </el-col>
      </el-row>
      <ag-grid-vue style="height: 250px;width: 100%;" class="ag-blue"
                   :gridOptions="gridOptions"
                   :columnDefs="columnDefs"
                   :enableSorting="true"
                   :enableColResize="true"
                   :rowClicked="tableClk"
                   :suppressMenuFilterPanel="true"
                   :suppressMenuMainPanel="true"
                   :suppressMenuColumnPanel="true"
                   :toolPanelSuppressValues="true"
                   rowSelection="multiple"
                   :floatingFilter="true"
                   :cellEditingStarted="startEdit"
                   :cellEditingStopped="stopEdit"
                   :rowData="rowData">
      </ag-grid-vue>
    </div>
</template>
<script>
  import {AgGridVue} from "ag-grid-vue";
  import destination from './destination'
  import api from '@/api/api'
  export default {
    props: ['activeName','selectData'],
    name:'destination-point',
    components: {
      'ag-grid-vue' : AgGridVue
    },
    data()  {
      return {
        gridOptions: {

        },
        columnDefs:[],
        rowData:[],
        selectNowData:null,
      }
    },
    watch:{
      'selectData.customerBaseId':function  (val,oldVal) {
        let self = this;
        if(this.activeName === '装拆点') {
          console.log(self.selectData.customerBaseId);
          self.getList(val)
        }
      }
    },
    methods: {
      //创建表格头部数据
      createColumnDefs() {
        return [
          {
            headerName: "ID",
            field: "destinationPointId",
            hide:true
          },
          {
            headerName: "装拆点简称",
            field: "shortName",
            editable: true
          },
          {
            headerName: "路线",
            field: "line",
            editable: true
          },
          {
            headerName: "装拆地",
            field: "destinationPlace",
            cellEditorFramework: destination,
            editable: true,
            sortingOrder: ['asc','desc']
          },
          {
            headerName: "名称",
            field: "name",
            editable: true,
            hide:true
          },
          {
            headerName: "名称地址",
            field: "address",
            editable: true,
            cellEditor: 'largeText',
            cellEditorParams: {
              cols: '26',
              rows: '4'
            }
          },
          {
            headerName: "联系人1",
            field: "contactPeopleOne",
            editable: true
          },
          {
            headerName: "手机1",
            field: "mobilePhoneOne",
            editable: true
          },
          {
            headerName: "联系人2",
            field: "contactPeopleTwo",
            editable: true
          },
          {
            headerName: "手机2",
            field: "mobilePhoneTwo",
            editable: true
          },
          {
            headerName: "电话",
            field: "telephone",
            editable: true
          },
          {
            headerName: "状态",
            field: "status",
            editable: true,
            cellEditor: 'select',
            cellEditorParams:{
              values: ['有效', '无效']
            }
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
        ]
      },
      //创建表格数据
      createRowData(xdtList) {
//             this.gridOptions.api.setRowData(xdtList);
        this.rowData = xdtList ;
        this.gridOptions.api.sizeColumnsToFit();
      },
      //选中数据事件
      tableClk(item) {
        this.selectNowData = item.data;

      },
      //新增新按钮
      addBtn() {
        let self = this;
        var selectedRows  = this.gridOptions.api.getSelectedRows();
        let item  = {
          relCostomerId:self.selectData.customerBaseId,
         // status:'有效'
        }
        console.log(item);
       this.addInterface(item);
      },
      //新增接口****
      addInterface(item) {
        let self = this;
        api.destinationPointAdd(item)
          .then(function(res) {
            console.log(res);
            self.addSucessHand(res.data);
          })
          .catch(function(err){

          })
      },
      //新增成功后的操作函数****
      addSucessHand(item) {
        this.rowData.unshift(item);
      },
      //编辑
      startEdit(item) {
        let self =  this;
        console.log(item);
      },
      //停止编辑
      stopEdit(item) {
        let d = item.colDef.field;
        let params = {
          destinationPointId:item.data.destinationPointId
        };
        params[d] = item.value;

        console.log(params);
        /*调用编辑接口*/
      this.editCellInterface(params);
       // console.log(item);
      },
      //编辑接口
      editCellInterface(item) {
        api.destinationPointEdit(item)
          .then(function(res) {
            console.log(res);
          })
          .catch(function(err) {})
      },
      //删除
      delBtn() {
        let self = this;
        let  selectedNowRow  = this.gridOptions.api.getSelectedRows();
        console.log(selectedNowRow);
        if(selectedNowRow.length != 0) {
          let params = { destinationPointId: self.selectNowData.destinationPointId };
          let customerId = self.selectNowData.relCostomerId;
          console.log(self.selectNowData);
          this.$confirm('确认删除该记录吗?', '提示', {
              type: 'warning'
            })
            .then(function() {
              api.destinationPointDel(params)
                .then(function(res) {
                  console.log(res);
                  self.getList(customerId); //获取费用列表
                })
                .catch(function(err) {
                  console.log(err);
                })
            })
        }else  {
          self.$alert('请选择一条联系人数据','信息',{
            confirmButtonText: '确定'
          })
        }
      },

      //获取列表
      getList(id) {
        let self = this ;
        let params = {
          relCostomerId: id
        };
        api.destinationPointList(params)
          .then(function(res) {
            console.log(res);
           self.createRowData(res.data);
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
      this.columnDefs = this.createColumnDefs();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

