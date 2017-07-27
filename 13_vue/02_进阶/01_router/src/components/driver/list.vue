<template>
    <div id="driverList">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>司机管理</el-breadcrumb-item>
        <el-breadcrumb-item>司机列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--查询和新增-->
      <el-form :inline="true" class="search-form">
        <el-form-item label="">
          <el-input v-model="searchForm.driverCode" placeholder="司机编号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchForm.driverName" placeholder="司机姓名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchForm.telphone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchForm.employmentStatus" placeholder="司机类型">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
            <el-option label="黑名单" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="driverListHandle">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="$router.push('/driver/add')">增加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >编辑</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >删除</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据-->
      <el-table
        ref="multipleTable"
        :data="dataList"
        v-loading.body="loading"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="driverCode"
          sortable
          label="司机编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driverName"
          sortable
          label="司机姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="telphone"
          sortable
          label="手机号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="idCard"
          sortable
          label="身份证号码"
          width="160">
        </el-table-column>
        <el-table-column
          prop="customerSimpleName"
          sortable
          label="公司简介"
          width="120">
        </el-table-column>
        <el-table-column
          prop="employmentStatus"
          sortable
          label="从业状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startDate"
          sortable
          label="入职日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="endDate"
          sortable
          label="离职日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="bindCard"
          sortable
          label="绑定卡号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          sortable
          label="备注"
          width="120">
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="page">
        <el-button type="danger">批量删除</el-button>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    import { reqDriverList } from '@/api/api'
    export default {
      data(){
        return {
          // 是否显示表格加载的loading
          loading : false,
          // 页码
          pageNo : 1,
          // 每页多少条
          pageSize : 5,
          // 分页总数
          total : 0,
          // 书籍列表
          dataList: [
          ],
          // 对话框---label宽度
          formLabelWidth: '80px',
          multipleSelection: [],
          // 发布时间选择器----快捷方式
          pickerOptions1: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          // 搜索表单的字段
          searchForm : {
            driverCode : '',
            driverName : '',
            telphone : '',
            employmentStatus : ''
          }
        }
      },
      methods : {
        // 切换页数
        handleCurrentChange(val) {
          this.pageNo = val;
          this.dataListHandle();
        },
        // 司机列表
        driverListHandle(){
          //this.loading = true;
          let dataListParams = {
            driverCode : this.searchForm.driverCode,
            driverName : this.searchForm.driverName,
            telphone : this.searchForm.telphone,
            employmentStatus : this.searchForm.employmentStatus,
            cPage : this.pageNo,
            pSize : this.pageSize
          }
          reqDriverList(dataListParams).then(res => {
            // 如果成功
            if(res.status === 'success'){
              this.loading = false;
              this.total = res.totals;
              this.dataList = res.data;
            }
          })
        },
        // 格式化时间
        formatDate(str){
          let d = new Date(str);
          let iYear = d.getFullYear();
          let iMonth = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1;
          let iDate = d.getDate();
          let iHour = d.getHours();
          let iMinute = d.getMinutes();
          let iSec = d.getSeconds();
          return iYear + '-' + iMonth + '-' + iDate + ' ' + iHour + ':' + iMinute + ':' + iSec;
        }
      },
      mounted(){
        //this.driverListHandle();

      }
    }
</script>

