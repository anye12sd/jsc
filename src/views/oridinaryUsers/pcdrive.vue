<template>
  <div class="pcdrive">
    <div class="cen">
      <div class="line">
        <div class="themeline">
          <span class="theme">幼儿主题</span>
        </div>
        <div class="each" style="height: 31%">
          <component :is="allmodel[0]"></component>
        </div>
        <div class="each" style="height: 31%">
          <component :is="allmodel[2]"></component>
        </div>
        <div class="each" style="height: 31%">
          <component :is="allmodel[3]"></component>
        </div>
      </div>
      <div class="midline">
        <menudemo></menudemo>
        <!-- <div class="menu" ref="each">
          <div
            v-for="(k, index) in opt"
            :key="k.name"
            :class="0 == index ? 'op now' : 'op'"
            @click="changtype(index)"
          >
            <img :src="k.img" alt=" " />
            <div>{{ k.name }}</div>
          </div>
        </div> -->
        <div class="down">
          <div class="themeline">
            <span class="theme">青少年主题</span>
          </div>
          <div class="each">
            <component :is="allmodel[5]" style="height:49%;"></component>
            <component :is="allmodel[1]" style="height:49%;"></component>
          </div>
        </div>
        <div class="down">
          <div class="themeline">
            <span class="theme">成年主题</span>
          </div>
          <div class="each">
            <component :is="allmodel[4]" style="height:49%;"></component>
            <component :is="allmodel[7]" style="height:49%;"></component>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="themeline">
          <span class="theme">老年主题</span>
        </div>
        <div class="each" style="height:94.5%;display: flex;flex-wrap: wrap;align-content: space-between;">
          <component :is="allmodel[6]" style="height:59%"></component>
          <component :is="allmodel[8]" style="height:40%"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import menudemo from './menudemo.vue'

const modulesFiles = require.context(
  "../../components/subpage/hap",
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
export default {
  name: "pcdrive",
  data() {
    return {
      
      allmodel: [
        "birth",
        "learn",
        "further",
        "kindGarden",
        "job",
        "comEducation",
        "disease",
        "peopleLiving",
        'life'
      ],
    };
  },
  mounted() {},
  methods: {
    
  },
  components: {
    ...allpage,menudemo
  },
};
</script>

<style scoped lang="less">
.pcdrive {
  height: 93%;
  width: 100%;
  .cen {
    width: 97%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    > .line {
      width: 24.9%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      > .each {
        width: 100%;
        padding: 13px 10px 0 15px;
        box-sizing: border-box;
        background-color: rgba(6, 26, 62, 0.4);
        box-shadow: inset 0 1px 3px 0 rgba(0, 255, 234, 0.5),
          inset 0 0 11px 0 #00b7ff;
        border-radius: 20px;
      }
      > .themeline {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4%;
      }
    }
    > .midline {
      width: 49.3333%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > .down {
        width: 49.6%;
        height: 68%;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        > .themeline {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 6%;
        }
        > .each {
          height: 92%;
          width: 100%;
          padding: 13px 10px 0 20px;
          box-sizing: border-box;
          background-color: rgba(6, 26, 62, 0.4);
          box-shadow: inset 0 1px 3px 0 rgba(0, 255, 234, 0.5),
            inset 0 0 11px 0 #00b7ff;
          border-radius: 20px;
          display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        }
      }
    }
  }
}
</style>