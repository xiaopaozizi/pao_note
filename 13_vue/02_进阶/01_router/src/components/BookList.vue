<template>
    <div id="bookList">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--查询和新增-->
      <el-form :inline="true" class="search-form">
        <el-form-item label="">
          <el-input v-model="bookname" placeholder="书名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="bookListHandle">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据-->
      <el-table
        ref="multipleTable"
        :data="bookList"
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
          width="80">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="props">
            <el-col :span="24" class="table-desc-title">[图书简介]</el-col>
            <el-col :span="24" class="table-desc-content">{{props.row.desc}}</el-col></template>
        </el-table-column>
        <el-table-column
          prop="name"
          sortable
          label="书名"
          width="300">
        </el-table-column>
        <el-table-column
          prop="author"
          sortable
          label="作者"
          width="200">
        </el-table-column>
        <el-table-column
          prop="date"
          label="出版日期"
          sortable
          width="200">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="操作">
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
    import { reqBookList, reqAddBook, reqEditBook, reqDelBook, reqDelMoreBook } from '@/api/api'
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
          bookList: [],
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
          this.bookListHandle();
        },
        // 书籍列表
        bookListHandle(){
          this.loading = true;
          let bookListParams = {
            bookname : this.bookname,
            pageNo : this.pageNo,
            pageSize : this.pageSize
          }
          reqBookList(bookListParams).then(res => {
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
        this.bookListHandle();
        var a = new Date().getTime();
        console.log(this.formatDate(a))
      }
    }
</script>

