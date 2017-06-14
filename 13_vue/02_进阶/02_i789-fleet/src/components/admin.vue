<template>
  <div id="admin">
    <!--一级菜单-->
    <div class="top">
      <el-row type="flex">
        <el-col :span="4" class="fleet">高德车队 <span class="fa fa-truck"></span></el-col>
        <el-col :span="16">
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">箱单</el-menu-item>
            <el-menu-item index="2">后勤</el-menu-item>
            <el-menu-item index="3">结算</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4" class="user">
          <ul class="nav navbar-nav" >
            <li>
              <span><img alt="image" class="img-circle user-logo" src="../assets/img/img.jpg" /></span>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">章鱼哥 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a>个人中心</a></li>
                <li><a href="#">设置</a></li>
                <li role="separator" class="divider"></li>
                <li><a>退出</a></li>
              </ul>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <!--二级菜单-->
    <div class="main">
      <div class="left">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
          <el-menu-item index="1">订单</el-menu-item>
          <el-menu-item index="2">运单</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        content
      </div>
    </div>
    <!--顶部-->
    <div class="bottom">
      <ul>
        <li>标题1<span class="fa fa-times"></span></li>
        <li>标题1<span class="fa fa-times"></span></li>
        <li>标题1<span class="fa fa-times"></span></li>
        <li>标题1<span class="fa fa-times"></span></li>
        <li>标题1<span class="fa fa-times"></span></li>
        <li>标题1<span class="fa fa-times"></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #admin{
    display: flex;
    flex-direction: column;
    width:100%;
    height:100%;
  }
  .top{
    height:auto;
    width : 100%;
  }
  .top .fleet {
    background : #324157;
    color : #fff;
    font-size:20px;
    text-indent: 1em;
    line-height:60px;
  }
  .top .fleet span{
    color:#fff;
    font-size:30px;
    margin-left:-15px;
  }
  .top .user{
    background : #324157;
    color : #fff;
    line-height:60px;
  }
  .top .user .dropdown{
    height:60px;
    line-height:60px;
  }
  .top .user .dropdown>a {
    height:60px;
    line-height:30px;
  }
  .nav>li>a{
    color:#fff;
  }
  .nav>li>a:focus, .nav>li>a:hover {
    text-decoration: none;
    background-color: #324157;
    color:#fff;
  }
  .nav .open>a, .nav .open>a:focus, .nav .open>a:hover {
    background-color: #324157;
    color: #fff;
  }
  .top .user .submenu-title:hover .submenu-content{
    display: block;
  }
  .top .user li {
    height:100%;
  }
  .top .user-logo {
    width:40px;
    height:40px;
    margin: 5px 10px ;
  }
  .main {
    height:100%;
    background : yellow;
    display:flex;
  }
  .main .left {
    width : 6%;
    height : 100%;
    background : #324157;
  }
  .main .right {
    width : 94%;
    height : 100%;
    background : #fff;
  }
  .bottom {
    height:7%;
    background : #fff;
    color : #000;
  }
  .bottom ul{
    width:100%;
    height:100px;
    line-height:55px;
    display:flex;
    flex-direction: row;
  }
  .bottom ul li{
    list-style: none;
    background : #324157;
    color : #fff;
    width:100px;
    text-align: center;;
    border-right: 2px solid #fff;
  }
  .bottom ul li span {
    margin-left:5px;
    font-size:16px;
    cursor: pointer;
  }


</style>
