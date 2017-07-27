<template>
  <div class="journal">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作信息">
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
  export default {
    name: 'journal',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '3243'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上45'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '543543'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '45345'
        }]
      }
    }
  }




</script>
<style>
  .journal{
    font-style:normal;
  }
  #pao-sort-row .pao-nav {
    margin:20px;
    height : 36px;
  }
  #pao-sort-row .pao-nav button {
    float : right;
    margin-left:10px;
  }

</style>

