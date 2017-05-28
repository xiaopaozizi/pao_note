<template>
  <div>
    关于我们
    <hr/>
    <ul class="nav">
      <router-link
        exact
        tag="li"
        :to="item.url"
        v-for="item in navs"
      >
        <a>{{item.text}}</a>
      </router-link>
    </ul>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
      name : 'about',
      data(){
        return {
          navs : [
            {
              url : '/about',
              text : '学习'
            },
            {
              url : '/about/work',
              text : '工作'
            },
            {
              url : '/about/hobby',
              text : '爱好'
            },
          ]
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
