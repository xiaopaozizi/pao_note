<template>
    <el-row id="home">
      <!--头部-->
      <el-col :span="24" class="header">
        <!--logo-->
        <a href="#" class="header-logo"><img src="../assets/logo.png"/></a>
        <!--标题-->
        <span class="header-title">小炮子子的后台管理系统</span>
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
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
          </el-menu>
        </el-col>
      </el-col>
    </el-row>
</template>

<script>
    export default {}
</script>

