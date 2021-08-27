<template>
  <div class="application">
    <div class="tit"><img src="@/assets/img/appli.png" alt="图" /></div>
    <div class="main">
      <div v-for="p in option" :key="p.name">
        <div><span @click="jump(p.app_url)">应用介绍</span></div>
        <div><img :src="'http://10.21.197.237'+p.app_ico" alt="图" /></div>
        <div>{{ p.appName }}</div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        layout=" pager"
        :page-size="6"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getlist } from "@/api/list.js";

export default {
  name: "application",
  data() {
    return {
      total:1,
      option: []
    };
  },
  mounted() {
    getlist("load=1&page=1&pageSize=6").then((res) => {
      console.log(res);
      if(res.data.status == 200) {
        this.total = res.data.data.count
        this.option = res.data.data.list
      }
    });
  },
  methods: {
    jump(url){
      if(url.startsWith('http')) {
        window.open(url)
      } else {
        window.open('http://'+url)
      }
    },
    handleCurrentChange(val){
      getlist("load=1&page="+val+"&pageSize=6").then(res=>{
        if(res.data.status == 200) {
        this.total = res.data.data.count
        this.option = res.data.data.list
      }
      })
    }
  },
};
</script>


<style lang="less" >
.application {
  .pagination {
    position: absolute;
    bottom: 9%;
    width: 100%;
    z-index: 100;
    .el-pagination {
      text-align: center;
      .el-pager {
        li {
          background: none;
          color: #2abdf6;
          cursor: pointer;
        }
        .active {
          // color: #0e0aee;
          color: #fff;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.application {
  height: 92%;
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
    > div {
      margin-top: 30px;
      margin-right: 30px;
      width: calc(32% - 20px);
      height: 35%;
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
      > div:nth-child(2) {
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
      > div:nth-child(3) {
        font-family: MicrosoftYaHei;
        font-size: 2.8rem;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
}
</style>