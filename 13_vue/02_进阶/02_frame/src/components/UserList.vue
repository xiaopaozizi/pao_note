<template>
    <div id="userList">
      <!--面包削导航-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--查询表单-->
      <el-form :inline="true" class="search-form">
        <el-form-item label="">
          <el-input v-model="username" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUserList">查询</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据-->
      <el-table
        :data="tableData"
        v-loading.body="loading"
        style="width: 100%"
        highlight-current-row
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="index"
          label="#"
          width="80">
        </el-table-column>

        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>

        <el-table-column
          prop="sex"
          label="性别"
          :formatter="formatSex"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="生日"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="地址">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    import { reqUserList } from '@/api/api'
    export default {
      data(){
        return {
          // 查询表单字段-----姓名
          username : '',
          // 表格加载之前的样式
          loading : false,
          // 表格数据
          tableData: []
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        formatSex(row, col){
          return row.sex === true ? '男' : '女';
        },
        searchUserList(){
          let userListParams = {
            username : this.username
          }
          this.loading = true;
          reqUserList(userListParams).then((res) => {
            this.loading = false;
            this.tableData = res.data;
          })

        }
      },
      mounted(){
        this.searchUserList();
      }
    }
</script>


