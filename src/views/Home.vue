<template>
  <div class="home">
    This is HOME page
    <div class="pp">Hello</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: 'Home',
  data(){
    return {

    }
  },
  components: {
    // HelloWorld
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  .home{
    color: orange;
    .pp{
      color: red;
    }
  }
</style>
