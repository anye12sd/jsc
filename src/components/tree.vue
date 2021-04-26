<template>
  <div class="diytree">
    <div v-for="(k, index) in data" :key="index" class="tree">
      <div>
        <div>
          <i class="treeicon iconfont icon-bianjimian"></i>
          <span class="treelabel">{{ k[defaultProps.label] }}</span>
        </div>
        <div>
          <i class="edit iconfont icon-bianjimian"></i>
          <i class="dele iconfont icon-shanchu"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/iconfont.css"
export default {
  name: "tree",
  data() {
    return {};
  },
  mounted() {
      console.log(this.data)
  },
  props: {
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "item",
          label: "category_name",
        };
      },
    },
    data: {
      type: Array,
      default: ()=>{
          return []
      },
    },
    deep: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped lang="less">
.diytree {
  width: 100%;
}
</style>