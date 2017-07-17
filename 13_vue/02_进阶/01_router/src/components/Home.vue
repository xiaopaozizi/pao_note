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
                <el-dropdown-item><router-link :to="{ path: '/user/profile' }">个人信息</router-link></el-dropdown-item>
                <el-dropdown-item><router-link :to="{ path: '/user/modPwd' }">修改密码</router-link></el-dropdown-item>
                <el-dropdown-item divided @click.native="logoutHandle">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
      </el-col>
      <!--中间-->
      <el-col :span="24" class="main">
        <!--左边导航-->
        <el-col :span="isFoldMenu ? 0 : 3" v-show ="!isFoldMenu" class="main-nav">
          <!--导航条-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            router
            theme="dark">
            <!--遍历路由信息，如果是showMenu的则拿出来-->
            <template v-for="(item,index) in $router.options.routes" v-if="item.showMenu">
              <!--无leaf属性的（leaf单一的叶子节点），即有子菜单的-->
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCol"></i> {{item.name}}</template>
                <!--遍历子菜单-->
                <el-menu-item :index="item2.path" v-for="(item2, index2) in item.children">{{item2.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item
                :index="item.children[0].path"
                v-else-if="item.leaf && item.children && item.children.length"
                ><i :class="item.iconCol"></i> {{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <!--右边内容-->
        <el-col :span="isFoldMenu ? 24 : 21" class="main-content">
          <transition mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-col>
      </el-col>
    </el-row>
</template>

<script>
    export default {
      data(){
        return {
          // 是否折叠菜单
          isFoldMenu : false,
        }
      },
      methods:{
        // 关闭或打开左侧导航菜单
        closeFoldMenu(){
          this.isFoldMenu = !this.isFoldMenu;
        },
        // 退出系统
        logoutHandle(){
          let _this = this;
          this.$confirm('确认关闭？', '提示').then( () => {

            // 情况seesionStorage('access-user'),并且跳转路由
            window.sessionStorage.removeItem('access-user');
            _this.$router.push({ path : '/login' })
          }).catch(() => {
              console.log(2222) });
          }
      }

    }
</script>

