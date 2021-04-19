<template>
  <div class="pcdrive">
    <div class="main">
      <div class="left">
        <div>
          <!-- 为什么这里不直接传宽高？这需求又改了，新样式，这代码可以少写点 -->
          <div class="name"><span>模型名称</span></div>
          <div class="item" ref="item">
            <birth
              :size="true"
              :style="
                'transform:scale(' +
                widper +
                ',' +
                heiper +
                ');transform-origin:0% 0%;'
              "
            ></birth>
          </div>
        </div>
        <div></div>
        <div>
          <div class="name"><span>模型名称</span></div>
          <div class="item" ref="item">
            <birth
              :size="true"
              :style="
                'transform:scale(' +
                widper +
                ',' +
                heiper +
                ');transform-origin:0% 0%;'
              "
            ></birth>
          </div>
        </div>
      </div>
      <div class="cen">
        <div>
          <div v-for="k in opt" :key="k.name" class="each">
            <img :src="k.img" alt=" " />
            <div>{{ k.name }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <div class="name"><span>模型名称</span></div>
          <div class="item" ref="item">
            <birth
              :size="true"
              :style="
                'transform:scale(' +
                widper +
                ',' +
                heiper +
                ');transform-origin:0% 0%;'
              "
            ></birth>
          </div>
        </div>
        <div>
          <div class="name"><span>模型名称</span></div>
          <div class="item" ref="item">
            <birth
              :size="true"
              :style="
                'transform:scale(' +
                widper +
                ',' +
                heiper +
                ');transform-origin:0% 0%;'
              "
            ></birth>
          </div>
        </div>
        <div>
          <div class="name"><span>模型名称</span></div>
          <div class="item" ref="item">
            <birth
              :size="true"
              :style="
                'transform:scale(' +
                widper +
                ',' +
                heiper +
                ');transform-origin:0% 0%;'
              "
            ></birth>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import f1 from "@/assets/oridinary/f1.png";
import f2 from "@/assets/oridinary/f2.png";
import f3 from "@/assets/oridinary/f3.png";
import f4 from "@/assets/oridinary/f4.png";
import Birth from "../../components/subpage/birth.vue";
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
  mounted() {
    // console.log(this.$refs.item.clientWidth, this.$refs.item.clientHeight);
    // let width =
    //   window.getComputedStyle(this.$refs.item).width.split("px")[0] * 1;
    // let height =
    //   window.getComputedStyle(this.$refs.item).height.split("px")[0] * 1;
    this.widper = Math.floor((this.$refs.item.clientWidth / 650) * 100) / 100;
    this.heiper = Math.floor((this.$refs.item.clientHeight / 350) * 100) / 100;
    this.goto();
    window.onresize = () => {
      this.changesize();
    };
  },
  methods: {
    goto() {
      // 请求获取的数组
      let data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
      for (let i = 0; i < data.length; i += 6) {
        this.models.push(data.slice(i, i + 6));
      }
    },
    changesize() {
      if(this.$refs.item){
        this.widper = Math.floor((this.$refs.item.clientWidth / 650) * 100) / 100;
      this.heiper = Math.floor((this.$refs.item.clientHeight / 350) * 100) / 100;
      }
    },
  },
  data() {
    return {
      widper: 1,
      heiper: 1,
      f1,
      f2,
      f3,
      f4,
      opt: [
        {
          name: "幸福民生",
          img: f1,
        },
        {
          name: "社会治理",
          img: f2,
        },
        {
          name: "生态文明",
          img: f3,
        },
        {
          name: "经济发展",
          img: f4,
        },
      ],
      models: [],
      // 页面渲染的数据

      showingModel: {
        // 左边的数组
        left: [],
        right: [],
      },
    };
  },
  components: {
    ...allpage,
  },
};
</script>

<style scoped lang="less">
.pcdrive {
  height: 92%;
  width: 100%;
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
        .name {
          width: 100%;
          height: 20%;
          padding-left: 12%;
          color: #fff;
          padding-top: 3.5%;
          box-sizing: border-box;
          position: relative;
          span {
            position: absolute;
            bottom: 7px;
          }
        }
        .item {
          width: 90%;
          margin: 0 auto;
          height: 73%;
          background: #000;
        }
        //   >div{
        //       width: 100%;
        //       height: 100%;
        //       background-color: #000;
        //   }
      }
    }
    .left > div:nth-of-type(1):hover {
      transform: scale(1.5, 1.5);
      transform-origin: top left;
    }
    .left > div:nth-of-type(2):hover {
      transform: scale(1.5, 1.5);
      transform-origin: center left;
    }
    .left > div:nth-of-type(3):hover {
      transform: scale(1.5, 1.5);
      transform-origin: bottom left;
    }
    .right > div:nth-of-type(1):hover {
      transform: scale(1.5, 1.5);
      transform-origin: top right;
    }
    .right > div:nth-of-type(2):hover {
      transform: scale(1.5, 1.5);
      transform-origin: center right;
    }
    .right > div:nth-of-type(3):hover {
      transform: scale(1.5, 1.5);
      transform-origin: bottom right;
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