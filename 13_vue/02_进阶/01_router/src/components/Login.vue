<template>
    <div id="login">
      <el-dialog title="系统登录" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth" class="remember-password-form-item">
            <el-checkbox v-model="checked" class="remember-password-checkbox">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button
              type="primary"
              class="loginBtn"
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-text="登录中..."
              @click="loginHandle('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          dialogFormVisible : true,
          ruleForm : {
            username: '',
            password : ''
          },
          rules: {
            username : [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
            password : [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
          },
          formLabelWidth: '20%',
          checked : true,
          fullscreenLoading : false,    // 全屏
        };
      },
      methods : {
        loginHandle(formName){

          this.$refs[formName].validate((valid) => {
              if (valid) {
                this.fullscreenLoading = true;
                this.$http
                .get('http://easy-mock.com/mock/596038ae9adc231f357bbb39/emptybox/login')
                .then(res => {
                  if(res.data.status === 'success'){
                    setTimeout(()=>{
                      this.fullscreenLoading = false;
                      this.$router.push('/');
                    }, 3000);
                  }
                }).catch()
              } else {
                return false;
              }
          });
        }
      }
    }
</script>

<style>
  #login .el-form-item{
    width:90%;
  }
  #login .remember-password-form-item{
    height:36px;
  }
  #login .remember-password-checkbox{
    position: absolute;
    left: 0;
  }
  #login .loginBtn{
    width:100%;
  }
</style>
