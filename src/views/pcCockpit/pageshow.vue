<template>
  <div class="pageshow">
    <div v-for="k in eles" :key="k.componentName">
      <component :is="k.componentName" v-if="k.componentName"></component>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
// import industrialChange from "@/components/subpage/industrialChange";
const modulesFiles = require.context(
  "../../components/subpage",
  true,
  /\.vue$/
);
let allpage = {};
modulesFiles.keys().forEach((path) => {
  let arr = path.split("/");
  let name = arr[arr.length - 1].split(".")[0]; //组件名称
  let c = modulesFiles(path); //组件实例
  allpage[name] = c.default;
}, {});

// import * as all from "@/components/subpage";
export default {
  name: "pageshow",
  components: {
    ...allpage,
  },
  data() {
    return {
      eles: [
        //   工业产值历年变化
        // {
        //   eleId: "one",
        //   type: "one",
        //   componentName: "industrialChange",
        // },
        // // 义务教育
        // {
        //   eleId: "two",
        //   type: "two",
        //   componentName: "comEducation",
        // },
        // 出生
        {
          eleId: "three",
          type: "three",
          componentName: "birth",
        },
        // // 历年师资配比变化情况
        // {
        //   eleId: "four",
        //   type: "four",
        //   componentName: "teacher",
        // },
        // // 学前
        // {
        //   eleId: "five",
        //   type: "five",
        //   componentName: "further",
        // },
        // // 升学
        // {
        //   eleId: "six",
        //   type: "six",
        //   componentName: "learn",
        // },
        // // 幼儿园预警
        // {
        //   eleId: "seven",
        //   type: "seven",
        //   componentName:'kindGarden'
        // },
        // // 就业
        // {
        //   eleId: "eight",
        //   type: "eight",
        //   componentName:"job"
        // },
        // 婚姻
        // {
        //   eleId:"nine",
        //   type:"nine",
        //   componentName:"marriage"
        // },
        // 民生诉求
        // {
        //   eleId: "ten",
        //   type: "ten",
        //   componentName:"peopleLiving"
        // },
        // // 热词
        // {
        //   eleId:"eleven",
        //   type:"eleven",
        //   componentName:"hotword"
        // },
        // // 疾病
        // {
        //   eleId:"twelve",
        //   type:"twelve",
        //   componentName:"disease"
        // },
        // // 三高
        // {
        //   eleId:"thirteen",
        //   type:"thirteen",
        //   componentName:"threeHigh"
        // },
        // // 社会保障，低收入人群保障
        // {
        //   eleId:"fourteen",
        //   type:'fourteen',
        //   componentName:"social"
        // },
        // // 寿命
        // {
        //   eleId:"fifteen",
        //   type:"fifteen",
        //   componentName:"life"
        // },
        // 产业比重情况
        // {
        //   eleId:"sixteen",
        //   type:"sixteen",
        //   componentName:"industryShare"
        // },
        // // 招商引资
        // {
        //   eleId:"seventeen",
        //   type:"seventeen",
        //   componentName:"attractInvestment"
        // },
        // // 固定资产投资 
        // {
        //   componentName:"fixedAssets"
        // },
        // // 企业信息 
        // {
        //   componentName:"enterpriseInformation"
        // },
        // // 企业综合评分 
        // {
        //   componentName:"scoreOfEnterprises"
        // },
        // // 评分企业TOP排名 
        // {
        //   componentName:"topRanking"
        // },
        // 企业动态 以下未写
        {
          componentName:"enterpriseNews"
        },
        // 企业评分预警
        {
          componentName:"earlyWarning"
        }
      ],
    };
  },
  beforeDestroy(){
    // document.querySelector(".pcCockpit").classList.remove("ck")
  },
  mounted() {
    this.init();
    // document.querySelector(".pcCockpit").classList.add("ck")
  },
  
  methods: {
    init() {},
  },
};
</script>
<style>
/* .ck {
  padding: 20px 0 0 0 !important;
} */
</style>

<style scoped lang="less">
.pageshow {
  // height: 91%;
  height: 88%;
  // min-height: 88%;
  padding: 0 30px 20px 30px;
  overflow-y: scroll;
   overflow: overlay;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #011c2f;
  position: absolute;
  width: 100%;
  left: 0;
  box-sizing: border-box;
}
.pageshow > div {
  width: 49.4%;
  height: 350px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 1);
}
.pageshow > div:nth-of-type(2n) {
  margin-left: 0.5%;
}
</style>