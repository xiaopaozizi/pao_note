<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from "vue";
  import "../node_modules/ag-grid/dist/styles/ag-grid.css"
  import "../node_modules/ag-grid/dist/styles/theme-fresh.css"
export default {
  name: 'app'
}
</script>

<style>
  @import "../static/css/main.css";
  @import "../static/css/color-blue.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  input[type=file] {
    display: none!important;
  }
</style>
