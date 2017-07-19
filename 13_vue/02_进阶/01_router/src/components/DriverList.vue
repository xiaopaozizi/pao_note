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
          <el-input v-model="searchForm.driver_code" placeholder="司机编号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchForm.driver_name" placeholder="司机姓名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchForm.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchForm.employment_status" placeholder="司机类型">
            <el-option
              v-for="item in driverTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="driverListHandle">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addBookHandle">增加</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据-->
      <el-table
        ref="multipleTable"
        :data="driverList"
        v-loading.body="loading"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
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
          prop="driver_code"
          sortable
          label="司机编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="司机姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="手机号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="身份证号码"
          width="160">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="公司简介"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="从业状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="入职日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="离职日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="绑定卡号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="driver_name"
          sortable
          label="备注"
          width="120">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button
              size="small"
              @click="editBookHandle(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="delBookHandle(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="page">
        <el-button type="danger" @click="delMoreBookHandle">批量删除</el-button>
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <!--新增和编辑对话框-->
      <el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="书名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
            <el-input v-model="form.author" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出版日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.date"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth" prop="desc">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form.desc">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBookHandle('ruleForm')">提 交</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    /*
     `id`  '司机id',
     `driver_code`'司机编号',
     `driver_name`  '司机姓名',
     `driver_name_code`  '司机姓名code',
     `telphone` '手机号(司机登入账号)',
     `id_card`  '身份证号',
     `rel_companyInfo_id`  '关联公司id',
     `customer_simple_name`  '公司简称',
     `employment_status`  '从业状态',
     `start_date` '开始时间',
     `end_date` '离职时间',
     `bind_card` '绑定卡号',
     `remark`  '备注',
     `password` '司机密码',
     `open_id` '微信司机openid',
    * */
    import { reqDriverList, reqAddBook, reqEditBook, reqDelBook, reqDelMoreBook } from '@/api/api'
    export default {
      data(){
        return {
          // 是否显示表格加载的loading
          loading : false,
          // 查询书名
          bookname : '',
          // 页码
          pageNo : 1,
          // 每页多少条
          pageSize : 10,
          // 分页总数
          total : 0,
          // 书籍列表
          driverList: [
            {
              id : 100,
              driver_code : '1000007',
              driver_name : '王建军',
              telphone : '18312345678',
              id_card : '411524199809097865',
              customer_simple_name : '建军公司',
              employment_status : 2,
              start_date : '1976-06-26',
              end_date : '1986-06-29',
              bind_card : '6228480402564890018 ',
              remark : '我的王建军，打我呀'
            },
            {
              id : 100,
              driver_code : '1000007',
              driver_name : '王建军',
              telphone : '18312345678',
              id_card : '411524199809097865',
              customer_simple_name : '建军公司',
              employment_status : 2,
              start_date : '1976-06-26',
              end_date : '1986-06-29',
              bind_card : '6228480402564890018 ',
              remark : '我的王建军，打我呀'
            },
            {
              id : 100,
              driver_code : '1000007',
              driver_name : '王建军',
              telphone : '18312345678',
              id_card : '411524199809097865',
              customer_simple_name : '建军公司',
              employment_status : 2,
              start_date : '1976-06-26',
              end_date : '1986-06-29',
              bind_card : '6228480402564890018 ',
              remark : '我的王建军，打我呀'
            },
            {
              id : 100,
              driver_code : '1000007',
              driver_name : '王建军',
              telphone : '18312345678',
              id_card : '411524199809097865',
              customer_simple_name : '建军公司',
              employment_status : 2,
              start_date : '1976-06-26',
              end_date : '1986-06-29',
              bind_card : '6228480402564890018 ',
              remark : '我的王建军，打我呀'
            }
          ],
          // 是否显示对话框
          dialogFormVisible : false,
          // 是否编辑书籍
          isEditBook : false,
          // 对话框---表单字段
          form: {
            id : '',
            name: '',
            author: '',
            date: '',
            desc: ''
          },
          // 表单字段验证规则
          rules: {
            name : [
              { required: true, message: '请输入书籍名称', trigger: 'blur' },
              { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
            author : [
              { required: true, message: '请输入作者', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            desc : [
              { required: true, message: '请输入书籍简介', trigger: 'blur' },
              { min: 6, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
          },
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
          // 所有司机类型
          driverTypes: [
            {
              value: 1,
              label: '在职'
            },
            {
              value: 2,
              label: '离职'
            },
            {
              value: 3,
              label: '黑名单'
            }
          ],
          // 搜索表单的字段
          searchForm : {
            driver_code : '',
            driver_name : '',
            telphone : '',
            employment_status : ''
          }
        }
      },
      methods : {
        handleSelectionChange(val) {
          // 赋值选择的书籍
          this.multipleSelection = val;

        },
        editBookHandle(index, row) {
          // 编辑赋值
          this.form = row;
          // 当取消编辑的时候，要将isEditBook = false
          this.isEditBook = true;
          this.dialogFormVisible = true;
        },
        // 单条删除
        delBookHandle(index, row) {
          this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
            // 确认删除
            let delParam = {
              id : row.id
            }
            reqDelBook(delParam).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.bookList = res.book;
            })
          })
        },
        // 批量删除
        delMoreBookHandle(){
          // 将选中的书籍的id提交
          let ids = this.multipleSelection.map(item => item.id).toString();
          let delMoreParam = {
            ids : ids
          }
          reqDelMoreBook(delMoreParam).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.bookList = res.book;
          })
        },
        // 切换页数
        handleCurrentChange(val) {
          this.pageNo = val;
          this.driverListHandle();
        },
        // 司机列表
        driverListHandle(){
          this.loading = true;
          let driverListParams = {
            //bookname : this.bookname,
            cPage : this.pageNo,
            pSize : this.pageSize
          }
          reqDriverList(driverListParams).then(res => {
            console.log(res);
            return;
            this.loading = false;
            this.total = res.total;
            this.bookList = res.book;
          })
        },
        // 添加或者编辑书籍
        addBookHandle(formName){
          this.$refs[formName].validate( valid => {
            if(valid){
              this.form.date = this.formatDate(this.form.date);
              let addBookParam = { book : this.form };
              // 看看是编辑还是添加
              if(this.isEditBook) {
                reqEditBook(addBookParam).then(res => {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                })
              } else {
                reqAddBook(addBookParam).then(res => {
                  this.bookList = res.bookList;
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                });
              }
              this.dialogFormVisible = false;
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
        this.driverListHandle();
        var a = new Date().getTime();
        console.log(this.formatDate(a))
      }
    }
</script>

