<template>
    <div id="">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="司机编号" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.driverCode" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.driverName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.telphone" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.idCard" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="从业状态" :label-width="formLabelWidth" prop="name">
              <el-select v-model="dataForm.employmentStatus" placeholder="司机类型">
                <el-option label="在职" value="1"></el-option>
                <el-option label="离职" value="2"></el-option>
                <el-option label="黑名单" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="绑定卡号" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.bindCard" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职时间" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.startDate" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="离职时间" :label-width="formLabelWidth" prop="name">
              <el-input v-model="dataForm.endDate" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="name">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="dataForm.remark">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          // 对话框---表单字段
          dataForm: {
            driverCode : '',
            driverName : '',
            telphone : '',
            idCard : '',
            employmentStatus : '',
            bindCard : '',
            startDate : '',
            endDate : '',
            remark : '',
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
        }
      }
    }
</script>

<style>

</style>
