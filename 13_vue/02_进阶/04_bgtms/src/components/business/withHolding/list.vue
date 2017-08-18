<template>
  <div class="holding">
    <!--查询模块-->
    <el-row style="padding-top: 6px">
      <el-col :span="14" >
        <el-radio-group v-model="searchForm.timeRadio"  @change="dateRadioChange" style="margin-right: 25px">
          <el-radio label="今天">今天</el-radio>
          <el-radio label="明天">明天</el-radio>
          <el-radio label="后天">后天</el-radio>
        </el-radio-group>
        <el-date-picker
          v-model="searchForm.date"
          size="small"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          @change="setChangedValue"
          range-separator=" ~ "
        >
        </el-date-picker>
        <el-button type="primary" size="small" @click="searchBtn">查询</el-button>
      </el-col>
      <el-col :span="2" :offset="8" style="text-align: right">
        <ag-grid-filter   :tableData="agGridFilterData.bigHeader" :type="'bigHeader'"></ag-grid-filter>
      </el-col>
    </el-row>
    <!--表格模块-->
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
                 :sortingOrder="['asc','desc']"
                 :floatingFilter="true"
                 rowSelection="multiple"
                 :rowData="rowData">
    </ag-grid-vue>
    <!--tabs模块-->
    <el-button
      size="small"
      @click="addTab(editableTabsValue2)"
    >
      add tab
    </el-button>
    <el-tabs v-model="editableTabsValue2" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >

        <keep-alive>
          <!--:is 动态切换组件-->
          <div :is="current" ></div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  <!--  <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="预提信息" name="预提信息">

      </el-tab-pane>
      <el-tab-pane label="排车信息" name="排车信息">

      </el-tab-pane>
      <el-tab-pane label="费用信息" name="费用信息">

      </el-tab-pane>
      <el-tab-pane label="上传图片" name="上传图片">

      </el-tab-pane>
    </el-tabs>-->
  </div>
</template>

<script>
  import {AgGridVue} from "ag-grid-vue";
  import api from '@/api/api'
  import Tool from '@/api/tool'
  import agGridFilter from '@/components/common/ag-grid-filter'
  import withHolding from './withHoldingMsg'
  import arrangeCar from './arrangeCarMsg'
  import fee from './feeMsg'
var dateSS = [

]
    export default {
      name: 'holding',
      data() {
        return {
         rowData: [],
         columnDefs:[],
         defCol: [],
          agGridFilterData :  this.$store.state.tableModule.caseWithHolding,
          activeName:'预提信息',
          searchForm: {
            date:'',
            dateStr:'',
            timeRadio:'今天',
            initFlag: true,
          },
          editableTabsValue2: '1',
          editableTabs2: [{
            title: '预提信息',
            name: '1',
            //content: 'Tab 1 content'
          }, {
            title: '排车信息',
            name: '2',
          //  content: 'Tab 2 content'
          }],
          tabIndex: 2,
          /*tabs对应现实的模板*/
          current: 'with-holding-msg',
        }
      },
      components: {
        "ag-grid-vue": AgGridVue,
        'ag-grid-filter' : agGridFilter,
        'with-holding-msg': withHolding,
        'arrange-car': arrangeCar,
        'fee': fee
      },
      methods: {
        //创建表头数据
        createColumnDefs() {//生成表格表头
          /*表头内容显示数据数组*/
          let tableCol = this.defCol;
          /*表头对应显示的数据内容field*/
          for(var i=0; i < tableCol.length; i++){
            if(tableCol[i].isChecked){
              this.columnDefs.push(
                {
                  headerName: tableCol[i].name,
                  field: tableCol[i].record,
                  filter: tableCol[i].filterType,
                  suppressMenu: true,
                  suppressFilter: false,
                  checkboxSelection: tableCol[i].checkBox,
                  headerCheckboxSelection: tableCol[i].checkBox
                }
              )
            }
          }
        },
        //点击一行执行的函数
        clickRowHandle(item) {
          console.log('我是点击函数');
          console.log(item.data);
          //this.selectNowData = item.data;
        },
        handleClick() {

        },
        //时间转换格式化
        setChangedValue(value){
          this.searchForm.dateStr = value;
          let params =  {
            destinationDateQuery:  value,
            billStatus:  this.tabsRadio
          };
          if(this.searchForm.initFlag){
            this.searchForm.initFlag = false;
          }
        },
        //列表切换状态
        dateRadioChange(val) {
          console.log(val);
          if(val ==='明天') {
            let stateDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24 );
            let endDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24);
            this.searchForm.date = [stateDate,endDate];
          } else if(val ==='后天') {
            let stateDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24 *2 );
            let endDate = (new Date()).setTime(new Date().getTime() + 3600 * 1000 * 24 * 2);
            this.searchForm.date = [stateDate,endDate];
          }else if(val ==='今天') {
            let stateDate = new Date();
            let  endDate = new Date();
            this.searchForm.date = [stateDate,endDate];
          }
        },
        searchBtn()  {
          let params =  {
            destinationDateQuery:  this.searchForm.dateStr,
            billStatus:  this.tabsRadio
          };
          //查询接口
        },

        addTab(targetName) {
          let newTabName = ++this.tabIndex + '';
          console.log(newTabName);
          this.editableTabs2.push({
            title: newTabName,
            name: newTabName,

          });
        },
        handleClick(tab) {
          console.log(tab.name);
          switch(tab.name) {
            case "1" :
              return this.current = 'with-holding-msg';
            case "2" :
              return this.current = 'arrange-car';
            case "3":
               return this.current = 'fee' ;

            default: return true;
          }
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
        let tool = new Tool();
        tool.setIte("caseWithHolding", "bigHeader", this.agGridFilterData.bigHeader);//把值存入
        this.defCol = tool.getIte('caseWithHolding').bigHeader;
        this.createColumnDefs();
      },
      mounted() {
        let stateDate = new Date();
        let endDate = new Date();
        this.searchForm.date = [stateDate,endDate];
       // this.gridOptions.api.sizeColumnsToFit();
      },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

