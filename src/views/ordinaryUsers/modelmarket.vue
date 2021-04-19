<template>
  <div class="modelmarket">
    <div class="main">
      <div v-for="(k, index) in models" :key="index" class="each">
        <div class="top" @click="getdetail">
          <img src="@/assets/oridinary/modelIcon.png" alt="" />
          <div>{{ k.name }}</div>
        </div>
        <div class="bot">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="tit">所属单位</span>
              <span class="con">{{ k.branch }}</span>
            </div>
            <div style="text-align: right">
              <span class="tit">类型</span>
              <span class="con">{{ k.type }}</span>
            </div>
          </div>
          <div>
            <span class="tit">模型修改时间</span>
            <span class="con">{{ k.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modelmarket",
  data() {
    return {
      models: [
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
        {
          name: "模型名称",
          branch: "质监局",
          type: "SQL类型",
          time: "2021-01-20 12:30:00",
        },
      ],
    };
  },
  mounted() {},
  methods: {
      getdetail(){
          this.$router.push("/oridinaryUsers/detail/"+12)
      }
  },
};
</script>

<style scoped lang="less">
.modelmarket {
  height: 92%;
  width: 100%;
  .main {
    min-width: 1100px;
    width: 78%;
    height: 86%;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-around;
    img {
      display: block;
      margin: 0 auto;
      height: 60%;
    }
    > .each {
      font-family: SourceHanSansCN-Medium;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      width: 29%;
      height: 28%;
      > .top {
        display: flex;
        align-content: center;
        text-align: center;
        flex-wrap: wrap;
        background: url("../../assets/oridinary/modelborder.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        transition: transform;
        height: 75%;
        > div {
          width: 100%;
        }
      }
      > .top:hover {
        transform: scale(1.3, 1.3);
      }
      > .bot {
          padding: 0 10px;
        .tit {
          font-family: SourceHanSansCN-Medium;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          margin-right: 5px;
        }
        .con {
          font-family: SourceHanSansCN-Medium;
          font-size: 14px;
          color: #32c5ff;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>