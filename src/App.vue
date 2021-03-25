<template>
  <div id="app">
      <topbar></topbar>
      <router-view></router-view>
    </div>
</template>

<script>
import topbar from '@/components/topbar.vue';

export default {
  name:"app",
  data(){
    return{

    }
  },
  components: {
    topbar
  }
}
</script>


<style>
body,
html {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
* {
  margin: 0;
  padding: 0;
}

</style>

<style scoped lang="less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  background-color: #f0f2f9;
}
@media screen and (max-height:750px) {
  #app{
    height: 754px;
  }
}
@media screen and (max-width:1500px) {
  #app{
    width: 1520px;
  }
}
// @media screen and (max-aspect-ratio: 16/10)
</style>
