<template>
    <div id="login">
      <el-dialog title="系统登录" :visible.sync="dialogFormVisible" :show-close="showClose" :close-on-click-modal="closeOnClickModal">
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
              :loading="isLogining"
              @click="loginHandle('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import {requestLogin} from '@/api/api'
    export default {
      data() {
        return {
          // 是否显示对话框
          dialogFormVisible : true,
          // 是否显示关闭对话款的按钮
          showClose : false,
          // 是否通过点击遮罩关闭对话框
          closeOnClickModal : false,
          // 表单字段
          ruleForm : {
            username: 'xiaopaozizi',
            password : '123456'
          },
          // 表单字段验证规则
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
          // 表单input之前label的宽度
          formLabelWidth: '20%',
          // 是否选择记住密码的复选框
          checked : true,
          // 是否正在登录
          isLogining : false
        };
      },
      methods : {
        // 提交登录
        loginHandle(formName){
          this.isLogining = true;
          this.$refs[formName].validate((valid) => {
              // 如果表单验证的字段都通过，则继续，否则返回false
              if (valid) {
                // 发送post请求
                let loginParams = {
                  username : this.ruleForm.username,
                  password : this.ruleForm.password
                }
                requestLogin(loginParams).then(res => {
                  let {code, msg, user } = res;
                  // 登录失败，500；成功：200
                  if(code !== 200) {
                    // 失败提示
                    this.$message({
                      message : msg,
                      type : 'error'
                    })
                  } else {
                    // 记录sesssion，跳转页面
                    console.log(user);
                    window.sessionStorage.setItem('access-user', JSON.stringify(user));
                    this.$router.push({ path : '/' });
                  }
                  this.isLogining = false;
                });
              } else {
                return false;
              }
          });
        }
      }
    }
</script>

