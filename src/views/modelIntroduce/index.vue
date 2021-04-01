<template>
  <div class="modelIntroduce">
    <div class="page">
      <h1 class="bigtit">模型介绍管理</h1>
      <div class="addnew" @click="addNew" v-if="ismanaga">新增模型</div>
      <div class="in">
        <div>
          <label for="mm">模型名称</label>
          <input type="text" id="mm" placeholder="请输入模型名称" />
        </div>
        <div>
          <input type="text" placeholder="查询输入" class="se" />
          <div class="searchlogo">
            <img :src="search" alt="图片丢失" />
          </div>
        </div>
      </div>
    </div>
    <div class="type">
      <div
        v-for="(k, index) in type"
        :key="index"
        :class="current == index ? 'active' : ''"
        @click="chose(index)"
      >
        {{ k }}
      </div>
    </div>
    <div v-for="(k, index) in content" :key="index" class="item">
      <div class="inside">
        <div :class="'first ' + (index % 2 == 1 ? 'imgright' : '')">
          <div v-if="index % 2 == 0" class="itemtit">
            <span>{{ k.tit }}</span>
            <span @click="changeModel(k)"  v-if="ismanaga">编辑</span>
          </div>
          <div v-if="index % 2 == 0" class="con">{{ k.con }}</div>
          <img v-else :src="k.img" />
        </div>
        <div :class="'second ' + (index % 2 == 0 ? 'imgleft' : '')">
          <div v-if="index % 2 == 1" class="itemtit">
            <span>{{ k.tit }}</span>
            <span @click="changeModel(k)"  v-if="ismanaga">编辑</span>
          </div>
          <div v-if="index % 2 == 1" class="con">{{ k.con }}</div>
          <img v-else :src="k.img" />
        </div>
      </div>
    </div>
    <modify
      v-if="showModify"
      @justHide="justHide"
      :changeAble="waitchange"
      @changeConfirm="justHide"
    ></modify>
  </div>
</template>

<script>
import search from "@/assets/search.png";
import modify from "./modify";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "modelIntroduce",
  data() {
    return {
      search,
      type: ["分类1", "分类1", "分类1", "分类1", "分类1"],
      ismanaga:false,
      current: 0,
      showModify: false,
      waitchange: false,
      content: [
        {
          tit: "水电使用分析",
          con:
            "结合水气数据统计并分析全县月、季度、年度的使用量趋势。结合水气数据、地理信息数据统计并分析各区域水气使用量及整体趋势。",
          img: require("../../assets/modelIntro/ok.png"),
        },
        {
          tit: "水电使用分析",
          con:
            "结合水气数据统计并分析全县月、季度、年度的使用量趋势。结合水气数据、地理信息数据统计并分析各区域水气使用量及整体趋势。",
          img: require("../../assets/modelIntro/ok.png"),
        },
        {
          tit: "水电使用分析",
          con:
            "结合水气数据统计并分析全县月、季度、年度的使用量趋势。结合水气数据、地理信息数据统计并分析各区域水气使用量及整体趋势。",
          img: require("../../assets/modelIntro/ok.png"),
        },
        {
          tit: "水电使用分析",
          con:
            "结合水气数据统计并分析全县月、季度、年度的使用量趋势。结合水气数据、地理信息数据统计并分析各区域水气使用量及整体趋势。",
          img: require("../../assets/modelIntro/ok.png"),
        },
      ],
    };
  },
  components: {
    modify,
  },
  computed: {
    ...mapState("config", ["3"]),
  },
  watch:{
    3(){
      
      this.ismanaga = this[3]
      console.log(this[3],this.ismanaga)
    }
  },
  methods: {
    chose(idx) {
      this.current = idx;
    },
    addNew() {
      this.showModify = true;
    },
    justHide() {
      this.showModify = false;
      this.waitchange = false;
    },
    changeModel(k) {
      this.showModify = true;
      this.waitchange = k;
    },
  },
};
</script>

<style scoped lang="less">
.modelIntroduce {
  width: 100%;
  // height: 92.6%;
  background: #ffffff;
  box-sizing: border-box;
  .page {
    // height: 27%;
    height: 220px;
    position: relative;
    background-image: url("../../assets/modelIntro/topbg.png");
    background-size: cover;
    overflow: hidden;
    .bigtit {
      font-family: PingFangSC-Semibold;
      font-size: 46px;
      color: #ffffff;
      letter-spacing: 2.04px;
      text-align: center;
      margin-top: 10px;
    }
    .addnew {
      width: 229px;
      height: 50px;
      line-height: 50px;
      background: rgba(67, 151, 255, 0.85);
      border-radius: 2px;
      margin: 20px auto 0 auto;
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0.89px;
      text-align: center;
      cursor: pointer;
    }
    .in {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 17%;
      background: rgba(0, 63, 137, 0.4);
      display: flex;
      input {
        outline: none;
        height: 25px;
      }
      .searchlogo {
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 1px solid #017cf8;
        width: auto;
        background: #017cf8;
        border-radius: 2px;
        position: relative;
        /* top: 1px; */
        height: 25px;
        width: 38px;
        text-align: center;
        // opacity: 1;
        img {
          display: inline-block;
          margin: 0 auto;
        }
      }
      label {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #f5f0f0;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
      input {
        background: rgba(12, 52, 103, 0.37);
        border: 1px solid #a7cbfc;
        border-radius: 2px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #9ac4ff;
        padding-left: 10px;
      }
      .se {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .in > div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .type {
    width: 1000px;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #cacaca;
    div {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #6c6c6c;
      box-sizing: border-box;
      padding: 10px 20px;
      cursor: pointer;
    }
    .active {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #000000;
      border-bottom: 4px solid #016cf0;
    }
  }
  .item {
    width: 100%;
    .inside {
      width: 1000px;
      height: 200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        // width: 200px;
        height: 85%;
        // width: 100%;
        max-height: 100%;
        max-width: 100%;
      }
      .itemtit {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;
      }
      .itemtit > span:nth-of-type(1) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 24px;
        color: #000000;
      }
      .itemtit > span:nth-of-type(2) {
        cursor: pointer;
        text-align: right;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #016cf0;
      }
      .con {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        letter-spacing: 1px;
      }
    }
  }
  .inside > div {
    height: 200px;
    width: 40%;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    div {
      width: 100%;
    }
  }
  .inside > .imgleft {
    justify-content: flex-end;
  }
  .inside > .imgright {
    justify-content: flex-start;
  }
  .item:nth-of-type(2n) {
    background-color: #fff;
  }
  .item:nth-of-type(2n + 1) {
    background-color: #f7f9fb;
  }
}
</style>