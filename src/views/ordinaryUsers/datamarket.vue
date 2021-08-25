<template>
  <div class="datamarket">
    <div class="tit"><img src="@/assets/img/dm.png" alt="图" /></div>
    <div class="main">
      <div v-for="(p, index) in option" :key="index">
        <div>
          <span>数据下载</span>
        </div>
        <img :src="da" alt="" />
        <div>{{ p.name }}</div>
        <div>
          <span>所属单位:</span> <span>{{ p.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import da from "@/assets/img/da.png";
export default {
  name: "datamarket",
  data() {
    return {
      da,
      option: [
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
        {
          name: "税务数据",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.datamarket {
  .tit {
    text-align: center;
    img {
      margin: 0 auto;
      width: 400px;
    }
  }
  .main {
    width: 60%;
    height: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-left: 20px;
    > div {
      margin-top: 20px;
      margin-right: 20px;
      width: calc(25% - 20px);
      //   height: 35%;
      background-image: linear-gradient(46deg, #95d6ff 0%, #ffffff 100%);
      border-radius: 6px;
      box-sizing: border-box;
      padding: 10px;
      > div:nth-child(1) {
        text-align: right;
        span {
          cursor: pointer;
          background: #f5a623;
          border-radius: 4px;
          font-family: SourceHanSansCN-Medium;
          font-size: 1.6rem;
          color: #ffffff;
          letter-spacing: 0;
          padding: 3px 5px;
        }
      }
      > img:nth-child(2) {
        text-align: left;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      > div:nth-child(3) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 1.6rem;
        color: #333333;
        letter-spacing: 0;
      }
      > div:nth-child(4) {
          margin: 1rem 0;
        > span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          color: #333333;
          letter-spacing: 0;
        }
        > span:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          color: #1987ff;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>