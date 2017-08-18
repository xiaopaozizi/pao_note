<template>
 <div class="holding-msg">
   <el-form :model="showForm"  label-width="120px" >
     <el-row class="col-height-show">
       <el-col :span="6">
         <el-form-item label="箱型">
           <span>{{showForm.tkBillCode}}</span>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item label="提箱点">
           <span>{{showForm.billStatus}}</span>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item label="落箱点">
           <span>{{showForm.billType}}</span>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item label="箱号">
           <span>{{showForm.sendBillInfo}}</span>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item label="封号">
           <span>{{showForm.teuType}}</span>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item label="提箱时间">
           <span>{{showForm.teuNo}}</span>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item label="备注">
           <span>{{showForm.remark}}</span>
         </el-form-item>
       </el-col>
     </el-row>
   </el-form>
 </div>
</template>

<script>
    export default {
      name:'holding-msg',
      data() {
        return {
          showForm : {

          }
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-height-show .el-col {
    height:32px ;
  }
</style>

