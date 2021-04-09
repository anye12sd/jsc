<template>
  <div class="loading">
      <h1>登录中</h1>
  </div>
</template>

<script>
import { tologin } from "@/api/user.js";
export default {
  name: "loading",
  data() {
    return {
      identity: {
        1: "系统管理员",
        2: "单位管理员",
        3: "普通用户",
        4: "模型开发人员",
      },
    };
  },
  mounted() {
    // 获取身份
    tologin().then((res) => {
        console.log(res)
        
    });
    
  },
};
</script>

<style scoped lang="less">
.loading {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
}
</style>