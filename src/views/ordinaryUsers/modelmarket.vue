<template>
  <div class="modelmarket">
    <div class="main">
      <div v-for="(k, index) in models" :key="index" class="each">
        <div class="top" @click="getdetail">
          <img src="@/assets/oridinary/modelIcon.png" alt="" />
          <div>{{ k.modulename }}</div>
          <span class="modelDownload" @click.stop="download(k.id,$event)">模型下载</span>
        </div>
        <div class="bot">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="tit">所属单位</span>
              <span class="con">{{ k.branch_name }}</span>
            </div>
            <!-- <div style="text-align: right">
              <span class="tit">类型</span>
              <span class="con">{{ k.module_type }}</span>
            </div> -->
          </div>
          <!-- <div>
            <span class="tit">模型修改时间</span>
            <span class="con">{{ k.create_time }}</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination layout=" pager" :page-size="9" :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { appuserlist } from "@/api/list.js";
export default {
  name: "modelmarket",
  data() {
    return {
      models: [],
      total: 1,
    };
  },
  mounted() {
    appuserlist(1).then((res) => {
      console.log(res);
      this.models = res.data.data.list;
      this.total = res.data.data.count;
    });
  },
  methods: {
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    getdetail() {
      this.$router.push("/oridinaryUsers/detail/" + 12);
    },
    download(id,event) {
      window.open(
        "http://10.21.197.237/app/sql?id=" +
          id +
          "&access_token=" +
          location.search.split("=")[1]
      );
    },
  },
};
</script>


<style lang="less">
.modelmarket {
  .pagination {
    position: absolute;
    bottom: 3%;
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
<style scoped lang="less">
.modelmarket {
  height: 92%;
  width: 100%;
  position: relative;
  .main {
    min-width: 1100px;
    width: 78%;
    height: 86%;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
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
      margin: 0 2%;
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
        position: relative;
        .modelDownload {
          position: absolute;
          right: 8%;
          top: 12%;
          background: #f5a623;
          border-radius: 20px;
          padding: 3px 9px;
          font-size: 10px;
          cursor: pointer;
        }
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