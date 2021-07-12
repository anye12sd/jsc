<template>
  <div class="pcdrive">
    <div class="cen">
      <div class="each model">
        <div
          v-if="models[0]"
          :style="
            'width:650px;height:350px;' +
            'transform:scale(' +
            widper +
            ',' +
            heiper +
            ');transform-origin:0% 0%;'
          "
        >
          <component :is="models[0].view_code"></component>
        </div>
      </div>
      <div class="each menu" ref="each">
        <div
          v-for="(k, index) in opt"
          :key="k.name"
          :class="current == index ? 'op' : 'op light'"
          @click="changtype(index)"
        >
          <img :src="k.img" alt=" " />
          <div>{{ k.name }}</div>
        </div>
        <div class="pagination">
          <el-pagination
            layout=" pager"
            :page-size="8"
            :current-page.sync="currentPage"
            :total="total"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <div class="each model">
        <div
          v-if="models[1]"
          :style="
            'width:650px;height:350px;' +
            'transform:scale(' +
            widper +
            ',' +
            heiper +
            ');transform-origin:0% 0%;'
          "
        >
          <component :is="models[1].view_code"></component>
        </div>
      </div>
      <div v-for="p in 6" class="each model" :key="p">
        <div
          v-if="models[p + 1]"
          :style="
            'width:650px;height:350px;' +
            'transform:scale(' +
            widper +
            ',' +
            heiper +
            ');transform-origin:0% 0%;'
          "
        >
          <component :is="models[p + 1].view_code"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import f1 from "@/assets/img/f1.png";
import f2 from "@/assets/img/f2.png";
import f3 from "@/assets/img/f3.png";
import f4 from "@/assets/img/f4.png";
import { portaluser } from "@/api/list.js";

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
export default {
  name: "pcdrive",
  data() {
    return {
      widper: 1,
      heiper: 1,
      total: 1,
      current: 0,
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
    };
  },
  mounted() {
    this.goto(1);
    this.changesize();
    window.onresize = () => {
      this.changesize();
    };
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

      this.current = index;
      this.currentPage = 1;
      this.goto(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.goto(val);
    },
    goto(page) {
      // 请求获取的数组
      portaluser(
        "page=" +
          page +
          "&pageSize=8&category_id=" +
          this.opt[this.current].category_id
      ).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.models = res.data.data.list;
        }
      });
    },
    changesize() {
      if (this.$refs.each) {
        let wid = this.$refs.each.clientWidth - 20;
        let hei = this.$refs.each.clientHeight - 8;
        this.widper = Math.floor((wid / 650) * 100) / 100;
        this.heiper = Math.floor((hei / 350) * 100) / 100;
      }
    },
  },
  components: {
    ...allpage,
  },
};
</script>
<style lang="less">
.pcdrive {
  .pagination {
    // position: absolute;
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
<style scoped lang="less">
.pcdrive {
  height: 92%;
  width: 100%;
  .cen {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    > .each {
      width: 31.3333%;
      margin: 0 1%;
      height: 33%;
      padding: 4px 10px;
      box-sizing: border-box;
    }
    > .menu {
      background-image: url("../../assets/img/mainbg.png");
      background-repeat: no-repeat;
      background-size: 85% 83%;
      background-position: center center;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      flex-wrap: wrap;
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
    > .model {
      background-image: url("../../assets/img/modelborder.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
  }

  .main {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    height: 100%;
    .left,
    .right {
      width: 31%;
      padding-top: 1%;
      > div {
        width: 80%;
        height: 29%;
        background: url("../../assets/oridinary/border.png") no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        margin: 2% auto;
        padding: 1% 1%;
        transition: all;
        cursor: pointer;
        > .name {
          width: 100%;
          height: 20%;
          padding-left: 12%;
          color: #fff;
          padding-top: 3.5%;
          box-sizing: border-box;
          position: relative;
          > span {
            position: absolute;
            bottom: 7px;
          }
        }
        > .item {
          width: 90%;
          height: 73%;
          // width: 650px;
          // height: 350px;
          margin: 0 auto;
          position: relative;
          background: #000;
          overflow: hidden;
        }
        //   >div{
        //       width: 100%;
        //       height: 100%;
        //       background-color: #000;
        //   }
      }
    }
    .left > div:nth-of-type(1):hover {
      transform: scale(1.8, 1.8);
      transform-origin: top left;
      position: relative;
      z-index: 10;
    }
    .left > div:nth-of-type(2):hover {
      transform: scale(1.8, 1.8);
      transform-origin: center left;
      position: relative;
      z-index: 10;
    }
    .left > div:nth-of-type(3):hover {
      transform: scale(1.8, 1.8);
      transform-origin: bottom left;
      position: relative;
      z-index: 10;
    }
    .right > div:nth-of-type(1):hover {
      transform: scale(1.8, 1.8);
      transform-origin: top right;
      position: relative;
      z-index: 10;
    }
    .right > div:nth-of-type(2):hover {
      transform: scale(1.8, 1.8);
      transform-origin: center right;
      position: relative;
      z-index: 10;
    }
    .right > div:nth-of-type(3):hover {
      transform: scale(1.8, 1.8);
      transform-origin: bottom right;
      position: relative;
      z-index: 10;
    }
    .cen {
      width: 38%;
      background-image: url("../../assets/oridinary/center.png");
      background-repeat: no-repeat;
      background-size: 80% auto;
      background-position: center 30%;
      > div {
        display: flex;
        > .each:nth-of-type(1) {
          margin-top: 41%;
        }
        > .each:nth-of-type(2) {
          margin-top: 9%;
        }
        > .each:nth-of-type(3) {
          margin-top: 23%;
        }
        > .each:nth-of-type(4) {
          margin-top: 41%;
        }
        > .light {
          opacity: 0.6;
        }
        > div {
          width: 25%;
          text-align: center;
          font-family: Helvetica;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          cursor: pointer;
          img {
            width: 90%;
            margin: 5px auto;
          }
        }
      }
    }
  }
}
</style>