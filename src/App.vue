<template>
  <div id="app">
      <topbar></topbar>
      <router-view></router-view>
    </div>
</template>

<script>
import topbar from '@/components/topbar.vue';
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {aaaa,bbbb,cccc,dddd} from "@/api/user.js"
export default {
  name:"app",
  data(){
    return{

    }
  },
  mounted(){
    // console.log(this.isLogin)
    // aaaa().then(res=>{
    //   console.log("aaaa",res)
    // })
    // bbbb().then(res=>{
    //   console.log("bbbb",res)
    // })
    // cccc().then(res=>{
    //   console.log("cccc",res)
    // })
    // dddd().then(res=>{
    //   console.log("dddd",res)
    // })
  },
  components: {
    topbar
  },
  computed:{
    ...mapState('config',['isLogin'])
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
@media screen and (max-height:720px) {
  #app{
    height: 1000px;
  }
}
@media screen and (max-width:1500px) {
  #app{
    width: 1520px;
  }
}
// @media screen and (max-aspect-ratio: 16/10)
</style>
