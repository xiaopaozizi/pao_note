<template>
    <el-row id="home">
      <!--头部-->
      <el-col :span="24" class="header">
        <!--logo-->
        <el-col :span="1"><a href="#" class="header-logo"><img src="../../assets/logo.png"/></a></el-col>
        <!--标题-->
        <el-col :span="2"><span class="header-title">张三车队</span></el-col>

        <!--折叠按钮-->
        <el-col :span="1">
          <div class="header-fold">
            <i class="iconfont icon-menufold" v-show="!isFoldMenu" @click="closeFoldMenu"></i>
            <i class="iconfont icon-menuunfold" v-show="isFoldMenu" @click="closeFoldMenu"></i>
          </div>
        </el-col>
        <el-col :offset="1" :span="16">
          <el-menu theme="dark" :default-active="mainMenuActive" class="header-nav" mode="horizontal" router>
            <template v-for="(item,index) in $router.options.routes" v-if="item.showMenu">
              <el-menu-item
                :index="item.children[0].path"
              ><i :class="item.iconCol" ></i> {{item.name}}</el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <!--右侧下拉菜单-->
        <el-col :span="3">
          <div class="header-right">
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
        </div>
        </el-col>
      </el-col>
      <!--中间-->
      <el-col :span="24" class="main">
        <!--左边导航-->
        <el-col :span="isFoldMenu ? 0 : 2" v-show ="!isFoldMenu" class="main-nav">
          <!--导航条-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            router
            theme="dark">
            <template v-for="(item,index) in $router.options.routes" v-if="item.showMenu">
              <el-menu-item :index="item2.path" v-for="(item2, index2) in item.children" v-if="item.name == $route.meta.parent">{{item2.name}}</el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <!--右边内容-->
        <el-col :span="isFoldMenu ? 24 : 22" class="main-content">
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
          // 默认主菜单
          mainMenuActive : '/admin',
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
      },



    }
</script>

