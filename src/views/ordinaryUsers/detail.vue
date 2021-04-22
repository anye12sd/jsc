<template>
  <div class="detail">
    <div class="left">
      <div class="back" @click="goback">返回模型超市</div>
      <div class="model">
        <div class="top">
          <div class="main">
            <img :src="info.img_url?'http://10.21.197.237'+info.img_url:'@/assets/oridinary/modelIcon.png'" alt="" />
            <div>{{ modelInfo.modulename }}</div>
          </div>
          <div class="to">
            <img src="@/assets/oridinary/connect.png" alt="" />
          </div>
        </div>
        <div class="bot">
          <!-- <div style="display: flex; justify-content: space-between"> -->
          <div>
            <div>
              <span class="tit">所属单位</span>
              <span class="con">{{ modelInfo.branch_name }}</span>
            </div>
            <div style="text-align: left">
              <span class="tit">类型</span>
              <span class="con">{{ modelInfo.module_type }}</span>
            </div>
          </div>
          <div>
            <span class="tit">模型修改时间</span>
            <span class="con">{{ modelInfo.update_time }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div v-for="(value,name) in opt" :key="name" class="each">
        <div class="icon"></div>
        <div class="title">{{ value }}</div>
        <div class="content">{{ info[name] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { introduce } from "@/api/list.js";
import {mapState} from 'vuex'
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
      opt: {
        background: "模型背景",
        results: "应用成效",
        source: "数据来源",
        result: "计算结果",
        logic: "处理逻辑",
        process: "加工过程"
      },
    };
  },
  computed:{
    ...mapState("jurisdiction",['modelInfo'])
  },
  mounted() {
    console.log(this.$route.params,this.modelInfo);
    introduce(this.$route.params.id).then((res) => {
      console.log(res);
      this.info = res.data.data;
    });
  },
  methods: {
    goback() {
      // this.$router.go(-1);
      this.$router.push("/oridinaryUsers/modelmarket")
    },
  },
};
</script>

<style scoped lang="less">
.detail {
  height: 78%;
  margin-top: 1%;
  box-sizing: border-box;
  padding: 5px 0;
  display: flex;
  .left {
    width: 32%;
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
      height: 35%;
      margin-top: 38%;
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
          background: url("../../assets/oridinary/modelborder.png") no-repeat;
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
          > img {
            display: block;
            height: 60%;
            margin: 0 auto;
          }
        }
        .to {
          width: 30%;
          img {
            width: 100%;
            height: 68%;
          }
        }
      }
      .bot {
        width: 64%;
        margin-left: 6%;
        padding: 0 10px;
        box-sizing: border-box;
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
  .right {
    width: 68%;
    background: url("../../assets/oridinary/bigborder.png") no-repeat;
    background-size: 100% 100%;
    padding: 2% 4%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .each {
      width: 47%;
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
}
</style>