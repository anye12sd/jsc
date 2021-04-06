<template>
  <div class="pageshow">
    <div v-for="k in eles" :key="k.eleId" :id="k.eleId">
      <component :is="k.componentName" v-if="k.componentName"></component>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
// import industrialChange from "@/components/subpage/industrialChange";
const modulesFiles = require.context('../../components/subpage', true, /\.vue$/);
let allpage = {}
 modulesFiles.keys().forEach((path) => {
    let name = path.split("/")[1].split(".")[0]; //组件名称
    let c = modulesFiles(path) //组件实例
    allpage[name] = c.default
},{});

// import * as all from "@/components/subpage";
export default {
  name: "pageshow",
  components: {
    ...allpage
  },
  data() {
    return {
      eles: [
        //   工业产值历年变化
        {
          eleId: "one",
          type: "one",
          componentName:"industrialChange"
        },
        // 义务教育
        {
          eleId: "two",
          type: "two",
          componentName:"comEducation"
        },
        // 出生
        {
          eleId: "three",
          type: "three",
          componentName:"birth"
        },
        // 历年师资配比变化情况
        {
          eleId: "four",
          type: "four",
          componentName:"teacher"
        },
        {
          eleId: "five",
          type: "five",
        },
        {
          eleId: "six",
          type: "six",
        },
        {
          eleId: "seven",
          type: "seven",
        },
        {
          eleId: "eight",
          type: "eight",
        },
        {
          eleId: "ten",
          type: "ten",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
  },
};
</script>

<style scoped lang="less">
.pageshow {
  height: 91%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.pageshow>div{
    width: 49.4%;
    height: 350px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 1);
}
.pageshow>div:nth-of-type(2n){
    margin-left: 0.5%;
}
</style>