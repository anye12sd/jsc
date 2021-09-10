<template>
  <div class="pcdrive">
    <div class="cen">
      <div class="line">
        <div class="themeline">
          <span class="theme">产业情况</span>
        </div>
        <div class="each" style="height: 31%">
          <component :is="allmodel[0]"></component>
        </div>
        <div class="each" style="height: 62%">
          <component :is="allmodel[2]"></component>
        </div>
<!--        <div class="each" style="height: 31%">-->
<!--          <component :is="allmodel[3]"></component>-->
<!--        </div>-->
      </div>
      <div class="midline">
        <div class="menu" ref="each">
          <div
              v-for="(k, index) in opt"
              :key="k.name"
              :class="0 == index ? 'op' : 'op light'"
              @click="changtype(index)"
          >
            <img :src="k.img" alt=" " />
            <div>{{ k.name }}</div>
          </div>
        </div>
        <div class="down">
          <div class="themeline">
            <span class="theme">GDP预测</span>
          </div>
          <div class="each">
            <component :is="allmodel[6]" style="height:49%;"></component>
          </div>
        </div>
        <div class="down">
          <div class="themeline">
            <span class="theme">碳排放总量排行</span>
          </div>
          <div class="each">
            <component :is="allmodel[4]" style="height:49%;"></component>
            <component :is="allmodel[7]" style="height:49%;"></component>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="themeline">
          <span class="theme">企业综合</span>
        </div>
      </div>
      <!--
      <div class="line">
        <div class="each" style="width: 30%">
          <component :is="allmodel[0]"></component>
        </div>
        <div class="each menu" ref="each" style="width: 38%">
          <div
            v-for="(k, index) in opt"
            :key="k.name"
            :class="current == index ? 'op' : 'op light'"
            @click="changtype(index)"
          >
            <img :src="k.img" alt=" " />
            <div>{{ k.name }}</div>
          </div>
        </div>
        <div class="each" style="width: 30%" v-if="!enterpriseDetail">
          <component :is="allmodel[1]" @showEnterprise="showEnterprise"></component>
        </div>
        <div class="each detail-component" style="width: 30%; height: 308%; position: relative; z-index: 1001" v-else>
          <component :is="allmodel[8]" :enterpriseNameProp="enterpriseName" @hideEnterprise="hideEnterprise"></component>
        </div>
      </div>
      <div class="line">
        <div class="each" style="width: 30%; height: 204%">
          <component :is="allmodel[2]"></component>
        </div>
        <div class="each" style="width: 38%">
          <component :is="allmodel[3]"></component>
        </div>
        <div class="each" style="width: 30%" :class="!enterpriseDetail ? 'componentShow' : 'componentHide'">
          <component :is="allmodel[4]" @showEnterprise="showEnterprise"></component>
        </div>
      </div>
      <div class="line">
        <div class="each" style="width: 30%; opacity: 0; position: relative; z-index: -1">

        </div>
        <div class="each" style="width: 38%">
          <component :is="allmodel[6]"></component>
        </div>
        <div class="each" style="width: 30%" :class="!enterpriseDetail ? 'componentShow' : 'componentHide'">
          <component :is="allmodel[7]" ></component>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import f1 from "@/assets/img/f1.png";
import f2 from "@/assets/img/f2.png";
import f3 from "@/assets/img/f3.png";
import f4 from "@/assets/img/f4.png";
import { portaluser } from "@/api/list.js";
import Birth from "../../components/subpage/birth.vue";

const modulesFiles = require.context(
  "../../components/subpage/econom",
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
  name: "pcdrive2",
  data() {
    return {
      widper: 1,
      heiper: 1,
      total: 1,
      current: 1,
      page: 1,
      num: [
        {
          id: 1,
          ke: "a",
        },
        {
          id: 2,
          ke: "b",
        },
        {
          id: 3,
          ke: "c",
        },
      ],
      opt: [
        {
          name: "幸福民生",
          img: f1,
          category_id: 1,
        },
        {
          name: "经济发展",
          img: f4,
          category_id: 6,
        },
        {
          name: "社会治理",
          img: f2,
        },
        {
          name: "生态文明",
          img: f3,
        },
      ],
      currentPage: 1,
      models: [],
      allmodel: [
          "industry",
          "enterpriseInfo",
          "invest",
          "carbon",
          "enterpriseScore",
          "comEducation",
          "GDP",
          "enterpriseRisk",
          "enterpriseDetail"
      ],
      enterpriseDetail: false,
      enterpriseName: ''
    };
  },
  mounted() {
    // this.changesize();
    // window.onresize = () => {
    //   this.changesize();
    // };
  },
  methods: {
    changtype(index) {
      if (index == 2 || index == 3) {
        this.$message({
          message: "此分类暂无",
          type: "warning",
        });
        return;
      }

      if (index == 0) {
        this.$router.push("/oridinaryUsers/pcdrive");
      }
    },
    changesize() {
      if (this.$refs.each) {
        let wid = this.$refs.each.clientWidth - 20;
        let hei = this.$refs.each.clientHeight - 8;
        this.widper = Math.floor((wid / 650) * 100) / 100;
        this.heiper = Math.floor((hei / 350) * 100) / 100;
      }
    },
    showEnterprise(name){
      this.enterpriseName = name
      this.enterpriseDetail = true
    },
    hideEnterprise(){
      this.enterpriseDetail = false
    }
  },
  components: {
    ...allpage,
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
      width: 24%;
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
      > .menu {
        width: 80%;
        height: 32%;
        margin: 0 auto;
        background-image: url("../../assets/img/mainbg.png");
        background-repeat: no-repeat;
        background-size: 85% 83%;
        background-position: center center;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        flex-wrap: wrap;
        box-shadow: none;
        background-color: transparent;
        > div:nth-child(1),
        > div:nth-child(4) {
          margin-bottom: 20px;
        }
        > div:nth-child(2),
        > div:nth-child(3) {
          margin-bottom: 0px;
        }
        > .light {
          opacity: 0.6;
        }
        > .op {
          width: 16%;
          font-family: SourceHanSerifSC-Heavy;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          img {
            width: 100%;
            cursor: pointer;
          }
          > div {
            cursor: pointer;
          }
        }
      }
      > .down {
        width: 49%;
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
// 旧式css
//.pcdrive {
//  height: 93%;
//  width: 100%;
//  .cen {
//    width: 97%;
//    height: 100%;
//    display: flex;
//    margin: 0 auto;
//    align-content: space-around;
//    flex-wrap: wrap;
//    > .line {
//      width: 100%;
//      height: 32%;
//      display: flex;
//      justify-content: space-between;
//      > .each {
//        height: 100%;
//        padding: 16px 10px 0 20px;
//        box-sizing: border-box;
//        background-color: rgba(6, 26, 62, 0.4);
//        box-shadow: inset 0 1px 3px 0 rgba(0, 255, 234, 0.5),
//          inset 0 0 11px 0 #00b7ff;
//        border-radius: 20px;
//      }
//      > .menu {
//        background-image: url("../../assets/img/mainbg.png");
//        background-repeat: no-repeat;
//        background-size: 85% 83%;
//        background-position: center center;
//        display: flex;
//        justify-content: space-around;
//        align-items: flex-end;
//        flex-wrap: wrap;
//        box-shadow: none;
//        background-color: transparent;
//        > div:nth-child(1),
//        > div:nth-child(4) {
//          margin-bottom: 20px;
//        }
//        > div:nth-child(2),
//        > div:nth-child(3) {
//          margin-bottom: 0px;
//        }
//        > .light {
//          opacity: 0.6;
//        }
//        > .op {
//          width: 16%;
//          font-family: SourceHanSerifSC-Heavy;
//          font-size: 18px;
//          color: #ffffff;
//          letter-spacing: 0;
//          text-align: center;
//          img {
//            width: 100%;
//            cursor: pointer;
//          }
//          > div {
//            cursor: pointer;
//          }
//        }
//      }
//    }
//  }
//}
//.componentShow{
//  opacity: 1;
//}
//.componentHide{
//  opacity: 0;
//}
//.detail-component{
//  padding: 16px 20px 0px 20px !important;
//}
</style>