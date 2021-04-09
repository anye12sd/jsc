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
    <div class="type" v-if="identity != 2">
      <img
        :src="left"
        alt="图片缺失"
        class="img1"
        v-if="alltype.length > 5"
        @click="toleft"
      />
      <img
        :src="left"
        alt="图片缺失"
        class="img2"
        v-if="alltype.length > 5"
        @click="toright"
      />
      <div
        v-for="(k, index) in type"
        :key="index"
        :class="current == index ? 'active' : ''"
        @click="chose(k, index)"
      >
        {{ k.modulename }}
      </div>
    </div>
    <div v-for="(k, index) in content" :key="index" class="item">
      <div class="inside">
        <div :class="'first ' + (index % 2 == 1 ? 'imgright' : '')">
          <div v-if="index % 2 == 0" class="itemtit">
            <div>{{ k.modulename }}</div>
            <div class="managa">
              <span @click="changeModel(k)" v-if="ismanaga">编辑</span>
              <span @click="dele(k)" v-if="ismanaga">{{
                k.deleted ? "已删除" : "删除"
              }}</span>
            </div>
          </div>
          <div v-if="index % 2 == 0" class="con">{{ k.introduce }}</div>
          <img v-else :src="'http://10.21.197.237' + k.img_url" />
        </div>
        <div :class="'second ' + (index % 2 == 0 ? 'imgleft' : '')">
          <div v-if="index % 2 == 1" class="itemtit">
            <div>{{ k.modulename }}</div>
            <div class="managa">
              <span @click="changeModel(k)" v-if="ismanaga">编辑</span>
              <span @click="dele(k)" v-if="ismanaga">{{
                k.deleted ? "已删除" : "删除"
              }}</span>
            </div>
          </div>
          <div v-if="index % 2 == 1" class="con">{{ k.introduce }}</div>
          <img v-else :src="'http://10.21.197.237' + k.img_url" />
        </div>
      </div>
    </div>
    <div v-if="identity == 2" class="loadmore" @click="loadmore">{{nomore?"没有更多":"加载更多"}}</div>
    <modify
      v-if="showModify"
      @justHide="justHide"
      :changeAble="waitchange"
      @changeConfirm="justHide"
      @subok="subok"
    ></modify>
  </div>
</template>

<script>
import search from "@/assets/search.png";
import modify from "./modify";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {
  introducelist,
  introduce,
  introducecurdlist,
  introducedel,
} from "@/api/list.js";
import left from "@/assets/modelIntro/left.png";

export default {
  name: "modelIntroduce",
  data() {
    return {
      search,
      left,
      type: ["分类1", "分类1", "分类1", "分类1", "分类1"],
      alltype: [],
      total: 0,
      page: 1,
      ismanaga: false,
      current: 0,
      showModify: false,
      waitchange: false,
      nomore:false,
      content: [
      ],
    };
  },
  components: {
    modify,
  },
  computed: {
    ...mapState("config", ["3", "identity"]),
  },
  mounted() {
    // console.log(this.identity);
    this.init()
  },
  watch: {
    3() {
      this.ismanaga = this[3];
      // console.log(this[3], this.ismanaga);
    },
  },
  methods: {
    loadmore(){
      if(this.nomore) return
      introducecurdlist(this.page+1).then(res=>{
        // console.log(res)
        if(res.data.status == 200) {
          this.page++
          if(res.data.data.list.length == 0) {
            this.nomore = true
            return
          }
          this.content = this.content.concat(res.data.data.list)
        }

      })
    },
    init() {
      if (this.identity == 1 || this.identity == 2) {
        this.ismanaga = true;
      }
      // 单位管理员introducecurdlist
      if (this.identity == 2) {
        introducecurdlist(1).then((res) => {
          // console.log(res);
          this.content = res.data.data.list;
          this.content.forEach((it) => {
            it.deleted = false;
          });
        });
        // 其他人员
      } else {
        introducelist().then((res) => {
          // console.log(res);
          if (res.data.data.length > 5) {
            this.alltype = res.data.data;
            this.type = res.data.data.slice(0, 5);
            this.total = res.data.data.length / 5;
          } else {
            this.type = res.data.data;
          }
          introduce(this.type[0].id).then((res) => {
            // console.log(res);
            this.content = [res.data.data];
            this.content.forEach((it) => {
              it.deleted = false;
            });
          });
        });
      }
    },
    dele(k) {
      if (k.deleted) return;
      introducedel(k.id).then((res) => {
        // console.log(res);
        k.deleted = true;
        this.$forceUpdate();
        // console.log(this.content);
      });
    },
    chose(k, idx) {
      this.current = idx;
      introduce(k.id).then((res) => {
        this.content = [res.data.data];
      });
    },
    toright() {
      if (this.page == this.total) return;
      this.page++;
      this.type = this.alltype.slice((this.page - 1) * 5, this.page * 5);
    },
    toleft() {
      if (this.page == 1) return;
      this.page--;
      this.type = this.alltype.slice((this.page - 1) * 5, this.page * 5);
    },
    addNew() {
      this.showModify = true;
    },
    justHide() {
      this.showModify = false;
      this.waitchange = false;
    },
    subok() {
      this.showModify = false;
      this.waitchange = false;
      this.init()
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
    position: relative;
    justify-content: space-around;
    border-bottom: 1px solid #cacaca;
    .img1 {
      position: absolute;
      top: 20%;
      left: 0;
      height: 60%;
      cursor: pointer;
    }
    .img2 {
      position: absolute;
      top: 20%;
      right: 0;
      height: 60%;
      transform: rotate(180deg);
      cursor: pointer;
    }
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
      .itemtit > div:nth-of-type(1) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 24px;
        color: #000000;
      }
      .itemtit > div:nth-of-type(2) {
        text-align: right;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #016cf0;
        span {
          cursor: pointer;
        }
      }
      .itemtit > div:nth-of-type(2) > span:nth-of-type(2) {
        margin-left: 5px;
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
  .loadmore{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: lightgray;
  }
}
</style>