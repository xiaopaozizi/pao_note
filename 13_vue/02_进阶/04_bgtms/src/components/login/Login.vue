<template>
    <div class="login-wrap">
        <div class="ms-title">车队管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="companyCode">
                    <el-input v-model="ruleForm.companyCode" placeholder="公司代码"></el-input>
                </el-form-item>
              <el-form-item prop="telephone">
                <el-input v-model="ruleForm.telephone" placeholder="手机号码"></el-input>
              </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="loginHandle('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import api from '@/api/api'
    export default {
        name: "login-wrap",
        data: function(){
            return {
                ruleForm: {
                  companyCode: '',
                  telephone: '',
                  password : ''
                },
                rules: {
                  companyCode: [
                    { required: true, message: '请输入公司代码', trigger: 'blur' }
                  ],
                  telephone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                  ],
                  password: [
                      { required: true, message: '请输入密码', trigger: 'blur' }
                  ]
                }
            }
        },
        methods: {
            loginHandle(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                      console.log(self.ruleForm);
                      api.userLogin(self.ruleForm)
                        .then(function(res) {
                          if(res.status === 'success'){
                            self.$message({
                              message: '登录成功',
                              type: 'success'
                            });

                            // 存入session
                            window.sessionStorage.setItem('access-user', JSON.stringify(res.data));
                            //let id = 99;
                            self.$router.push('/business/order2/0');
                          } else {
                            self.$message({
                              message: '公司代码、手机号或密码错误',
                              type: 'error'
                            });
                          }
                        })
                    } else {
                      self.$message({
                        message: '请完善登录信息',
                        type: 'error'
                      });
                      return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:300px;
    margin:-150px 0 0 -160px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
</style>
