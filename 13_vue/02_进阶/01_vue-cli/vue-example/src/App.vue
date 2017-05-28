<template>
  <div id="app">
    <div class="nav-box">
      <ul class="nav">
        <router-link
          event="click"
          exact
          :to="item.url"
          tag="li"
          v-for="item in navs">
          <i :class="item.icon"></i>
          <span>{{item.text}}</span>
        </router-link>
      </ul>
    </div>
    <!--文档---左边侧边栏-->
    <router-view name="slider"></router-view>
    <router-view class="center"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      navs : [
        {
          url : '/',
          icon : 'fa fa-home',
          text : '首页'
        },
        {
          url : '/document',
          icon : 'fa fa-book',
          text : '文档'
        },
        {
          url : '/about',
          icon : 'fa fa-glass',
          text : '关于'
        }
      ]
    }
  }
}
</script>

<style>

</style>
