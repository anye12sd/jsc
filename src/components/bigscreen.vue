<template>
  <div class="big">
    <iframe
      src="http://10.21.197.236:9000/#/happinesspeople"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "bigscreen",
  data() {
    return {};
  },
};
</script>


<style scoped lang="less">
.big {
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>