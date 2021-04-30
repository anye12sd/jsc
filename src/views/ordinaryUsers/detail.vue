<template>
  <div class="detail">
    <div class="left">
      <div class="back" @click="goback">返回模型超市</div>
      <div class="model">
        <!-- <img
          :src="
            info.img_url
              ? 'http://10.21.197.237' + info.img_url
              : '@/assets/oridinary/modelIcon.png'
          "
          alt=""
        /> -->
        <div class="modulename">
          <img src="@/assets/oridinary/modelIcon.png" alt="" style="height:70%">
          <span>{{ modelInfo.modulename }}</span>
        </div>
        <div class="type">
          <div class="lo">
            <div
              v-for="(value, name) in leftopt"
              :key="name"
              @click="showdetail(name)"
              :class="active == name ? 'active' : ''"
            >
              {{ value }}
            </div>
          </div>
          <div class="ro">
            <div
              v-for="(value, name) in rightopt"
              :key="name"
              @click="showdetail(name)"
              :class="active == name ? 'active' : ''"
            >
              {{ value }}
            </div>
          </div>
        </div>
        <div class="bot">
          <div style="text-align: left; width: 100%">
            <span class="tit">所属单位</span>
            <span class="con">{{ modelInfo.get_branch_name }}</span>
          </div>
          <!-- <div style="text-align: left;width:50%;">
            <span class="tit">类型</span>
            <span class="con">{{ modelInfo.module_type }}</span>
          </div> -->
          <div style="text-align: left; width: 100%">
            <span class="tit">模型修改时间</span>
            <span class="con">{{ modelInfo.update_time }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="center"></div>
    <div class="right">
      <div class="icon"></div>
      <div class="title">{{ opt[active] }}</div>
      <div class="content">{{ info[active] }}</div>
    </div>
  </div>
</template>

<script>
import { introduce } from "@/api/list.js";
import { mapState } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      k: {
        name: "模型名称",
        branch: "质监局",
        type: "SQL类型",
        time: "2021-01-20 12:30:00",
      },
      info: {},
      active: "background",
      leftopt: {
        background: "模型背景",
        results: "应用成效",
        source: "数据来源",
      },
      rightopt: {
        result: "计算结果",
        logic: "处理逻辑",
        process: "加工过程",
      },
      opt: {
        background: "模型背景",
        results: "应用成效",
        source: "数据来源",
        result: "计算结果",
        logic: "处理逻辑",
        process: "加工过程",
      },
    };
  },
  computed: {
    ...mapState("jurisdiction", ["modelInfo"]),
  },
  mounted() {
    // console.log(this.$route.params, this.modelInfo);
    introduce(this.$route.params.id).then((res) => {
      // console.log(res);
      this.info = res.data.data;
    });
  },
  methods: {
    showdetail(name) {
      // console.log(name);
      this.active = name;
    },
    goback() {
      // this.$router.go(-1);
      this.$router.push("/oridinaryUsers/modelmarket");
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  height: 78%;
  width: 95%;
  margin: 1% auto 0 auto;
  box-sizing: border-box;
  padding: 5px 0;
  display: flex;
  .left {
    width: 48%;
    background: url("../../assets/oridinary/bigborder.png"),
      url("../../assets/oridinary/center.png");
    background-repeat: no-repeat, no-repeat;
    background-size: 100% 85%, 30% 40%;
    background-position: center center, 55% 67%;
    .back {
      height: 25px;
      line-height: 25px;
      font-family: SourceHanSansCN-Bold;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      text-shadow: 0 0 9px rgba(109, 227, 255, 0.59);
      padding-left: 20%;
      background: url("../../assets/oridinary/toback.png") no-repeat;
      background-position: 15% center;
      background-size: 32% 100%;
      cursor: pointer;
    }
    .model {
      width: 100%;
      height: 76%;
      margin-top: 6%;
      > img {
        display: block;
        height: 20%;
        margin: 0 auto;
      }
      > .modulename {
        height: 20%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #fff;
      }
      > .type {
        width: 80%;
        height: 50%;
        margin: 0 auto;
        display: flex;
        > div {
          width: 50%;
          display: flex;
          align-content: space-between;
          flex-wrap: wrap;
        }
        .lo {
          div {
            background: url("../../assets/oridinary/normalleft.png") no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            width: 45%;
            text-align: center;
            padding: 6px 0;
            cursor: pointer;
          }
          > div:nth-of-type(1) {
            margin-left: 20%;
          }
          > div:nth-of-type(2) {
            margin-left: 36%;
          }
          > div:nth-of-type(3) {
            margin-left: 52%;
          }
          > .active {
            background: url("../../assets/oridinary/checkleft.png") no-repeat;
            background-size: 100% 100%;
            background-position: center center;
          }
        }
        .ro {
          div {
            background: url("../../assets/oridinary/normalright.png") no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            width: 45%;
            text-align: center;
            padding: 6px 0;
            cursor: pointer;
          }
          > div:nth-of-type(1) {
            margin-left: 52%;
          }
          > div:nth-of-type(2) {
            margin-left: 36%;
          }
          > div:nth-of-type(3) {
            margin-left: 20%;
          }
          > .active {
            background: url("../../assets/oridinary/checkright.png") no-repeat;
            background-size: 100% 100%;
            background-position: center center;
          }
        }
        div {
          font-family: SourceHanSansCN-Regular;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0;
          text-shadow: 0 2px 1px #072026;
        }
      }
      .top {
        width: 100%;
        display: flex;
        height: 75%;
        .main {
          width: 64%;
          margin-left: 6%;
          display: flex;
          align-content: center;
          text-align: center;
          flex-wrap: wrap;
          background-size: 100% 100%;
          cursor: pointer;
          height: 100%;
          > div {
            width: 100%;
            font-family: SourceHanSansCN-Medium;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0;
            text-align: center;
          }
        }
      }
      .bot {
        width: 64%;
        margin-left: 6%;
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 7%;
        .tit {
          font-family: SourceHanSansCN-Medium;
          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0;
          margin-right: 5px;
        }
        .con {
          font-family: SourceHanSansCN-Medium;
          font-size: 12px;
          color: #32c5ff;
          letter-spacing: 0;
          box-sizing: border-box;
        }
      }
    }
  }
  .center {
    width: 4%;
    background: url("../../assets/oridinary/connect.png") no-repeat;
    background-size: 100% 10%;
    background-position: center center;
  }
  .right {
    width: 48%;
    background: url("../../assets/oridinary/bigborder.png") no-repeat;
    background-size: 100% 85%;
    background-position: center center;
    padding: 5% 4%;
    box-sizing: border-box;

    .icon {
      width: 64px;
      height: 5px;
      background-image: linear-gradient(270deg, #11f8ee 4%, #02c0fd 87%);
    }
    .title {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #ffffff;
      margin-top: 10px;
    }
    .content {
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #ffffff;
      letter-spacing: 1px;
      margin-top: 5px;
    }
  }
}
</style>