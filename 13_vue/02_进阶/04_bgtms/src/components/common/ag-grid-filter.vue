<template>
    <div id="">
      <el-popover
        ref="popover4"
        placement="right"
        width="800"
        v-model="isShowInfo"
        trigger="click">
        <el-table
          ref="table"
          :data="tableData"
          style="width: 100%"
          height="250"
        >
          <el-table-column
            label="选择"
            width="100"
          >
            <template scope="scope">
              <el-checkbox v-model="scope.row.isChecked"></el-checkbox>
            </template>
            >
          </el-table-column>
          <el-table-column
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="downMove(scope.$index, scope.row)" v-if="scope.$index > 0">上移</el-button>
              <el-button
                size="small"
                @click="upMove(scope.$index, scope.row)" v-if="scope.$index < tableData.length-1">下移</el-button>
            </template>

          </el-table-column>
        </el-table>
        <div style="text-align: right; margin: 10px 5px">
          <el-button type="primary" size="mini" @click="saveTitle">确定</el-button>
        </div>
      </el-popover>
      <el-button size="small" icon="menu" v-popover:popover4></el-button>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Tool from '@/api/tool'
    export default {
      props:['tableData', 'type'],
      data(){
        return {
          isShowInfo : false,
         // tableData : [],
        }
      },
    mounted(){
      let tool = new Tool();
      //this.tableData = tool.getIte('caseOrder').bigHeader;
      },
      methods:{
        downMove(index,item) { //上移
          this.tableData.splice(index,1);
          this.tableData.splice(index-1,0, item);
        },
        upMove(index, item) { //下移
          this.tableData.splice(index,1);
          this.tableData.splice(index+1,0, item);
        },
        saveTitle() { //重新刷新数据
          let tool = new Tool();
          let title = this.$route.name;
          switch(title){
            case '订单':
              tool.setIte("caseOrder", this.type, this.tableData);//把值存入
              break;
            case  '运单':
              tool.setIte("caseTransform", this.type, this.tableData);//把值存入
              break;
            case '预提' :
              tool.setIte("caseWithHolding", this.type, this.tableData);//把值存入
          }
          this.isShowInfo = false;
         this.$router.go(0);
        },
      }
    }
</script>

<style>

</style>
