<template>
    <el-row id="home">
      <!--头部-->
      <el-col :span="24" class="header">
        <!--logo-->
        <a href="#" class="header-logo"><img src="../assets/logo.png"/></a>
        <!--标题-->
        <span class="header-title">小炮子子的后台管理系统</span>
        <!--折叠按钮-->
        <div class="header-fold">
          <i class="iconfont icon-menufold" v-show="!isFoldMenu" @click="closeFoldMenu"></i>
          <i class="iconfont icon-menuunfold" v-show="isFoldMenu" @click="closeFoldMenu"></i>
        </div>
        <!--右侧下拉菜单-->
        <div class="header-right">
          <el-col :offset="21" :span="3">
            <i class="iconfont icon-user"></i>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link loginer">
                小炮子子<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="#">个人信息</a></el-dropdown-item>
                <el-dropdown-item><a href="#">修改密码</a></el-dropdown-item>
                <el-dropdown-item divided><a href="#">退出系统</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
      </el-col>
      <!--中间-->
      <el-col :span="24" class="main">
        <el-col :span="3" class="main-nav">
          <!--导航条-->
          <el-menu
            v-show="!isFoldMenu"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            theme="dark">
            <el-menu-item index="1"><i class="iconfont icon-home"></i> 首页</el-menu-item>
            <el-menu-item index="2"><i class="iconfont icon-users"></i> 用户列表</el-menu-item>
            <el-submenu index="3">
              <template slot="title"><i class="iconfont icon-books"></i> 图书管理</template>
              <el-menu-item index="3-1">图书列表</el-menu-item>
              <el-menu-item index="3-2">图书分类</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="iconfont icon-setting1"></i> 设置</template>
              <el-menu-item index="4-1">个人信息</el-menu-item>
              <el-menu-item index="4-2">修改密码</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-col>
    </el-row>
</template>

<script>
    export default {
      data(){
        return {
          // 是否折叠菜单
          isFoldMenu : false
        }
      },
      methods:{
        closeFoldMenu(){
          this.isFoldMenu = !this.isFoldMenu;
        }
      }
    }
</script>

