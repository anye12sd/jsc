<template>
  <div class="modelManaga">
    <!-- <searchdemo :four="true" one="模型编号" two="请输入模型编号"></searchdemo> -->
    <div class="addnew" v-if="ismanaga">
      <span @click="addnew">新增应用</span>
    </div>
    <div class="listfolder" :style="ismanaga ? '' : 'margin-top:10px;'">
      <div class="list">
        <div class="line topline">
          <div>应用名称</div>
          <div>当前应用图标</div>
          <div>应用修改时间</div>
          <div class="actions">操作</div>
        </div>
        <div
          v-if="list.length == 0"
          style="
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: gray;
          "
        >
          暂无数据
        </div>
        <div v-for="(k, index) in list" :key="index" class="line">
          <div :title="k.appName">{{ k.appName }}</div>
          <div>
            <img
              class="icon"
              v-if="k.app_ico"
              :src="'http://10.21.197.237' + k.app_ico"
              alt=""
            />
            <span v-else>无图标</span>
          </div>
          <div :title="k.update_time">{{ k.update_time }}</div>
          <div class="actions">
            <p @click="goup(k.id, index)" v-if="k.load == 2">
              <img :src="change" alt="图片资源缺失" /> <span>上架</span>
            </p>
            <p @click="edit(k, index)">
              <img :src="off" alt="图片资源缺失" /> <span>修改</span>
            </p>
            <p @click="godown(k.id, index)" v-if="k.load == 1">
              <img :src="puton" alt="图片资源缺失" /> <span>下架</span>
            </p>
            <p @click="intro(k.id, index)">
              <span>应用介绍</span>
            </p>
            <p @click="dele(k.id, index)">
              <span>删除</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>
    <div class="tip" v-if="showedit">
      <div class="mask" @click="hideedit"></div>
      <modelPuton
        v-if="showedit"
        class="maincen"
        @success="success"
        @cancel="hideputon"
        :edit="waitEdit"
      ></modelPuton>
    </div>
    <div class="tip" v-if="showputon">
      <div class="mask" @click="hideputon"></div>
      <modelPuton
        v-if="showputon"
        class="maincen"
        @success="success"
        @cancel="hideputon"
        :edit="false"
      ></modelPuton>
    </div>
    <modify
      v-if="showModify"
      @justHide="justHide"
      :module_id="module_id"
      :changeAble="waitchange"
      @changeConfirm="justHide"
      @subok="subok"
    ></modify>
  </div>
</template>

<script>
import change from "@/assets/listlogo/channge.png";
import off from "@/assets/listlogo/off.png";
import puton from "@/assets/listlogo/puton.png";
import modify from "./modify";
import modelPuton from "./modelPuton";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { getlist, appload, introduce, appdel } from "@/api/list.js";
export default {
  name: "modelManaga",
  data() {
    return {
      list: [],
      change,
      off,
      puton,
      ismanaga: false,
      showModify: false,
      showputon: false,
      currentPage: 1,
      total: 0,
      waitchange: false,
      module_id: 0,
      waitEdit: false,
      showedit: false,
    };
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  mounted() {
    getlist("page=1").then((res) => {
      this.list = res.data.data.list;
      this.total = res.data.data.count;
    });
    if (this.identity == 1) {
      this.ismanaga = true;
    }
  },
  components: {
    modelPuton,
    modify,
  },
  methods: {
    hideedit() {
      this.showedit = false;
    },
    edit(k, index) {
      this.showedit = true;
      this.waitEdit = { ...k };
      this.waitEdit.index = index;
    },
    dele(id) {
      appdel("id=" + id).then((res) => {
        if (res.data.status == 200) {
          this.handleCurrentChange(this.currentPage);
        }
      });
    },
    intro(id) {
      introduce(id).then((res) => {
        // console.log(res);
        if (res.data.status == 200 && res.data.data.length == 0) {
          this.waitchange = false;
          this.showModify = true;
          this.module_id = id;
        }
        if (res.data.data.module_id) {
          this.showModify = true;
          this.module_id = id;
          this.waitchange = res.data.data;
        }
      });
    },
    justHide() {
      this.showModify = false;
      this.waitchange = false;
    },
    hideputon() {
      this.showputon = false;
      this.showedit = false;
    },
    success() {
      this.handleCurrentChange(this.currentPage);
      this.showputon = false;
      this.showedit = false;
    },
    subok() {
      this.showModify = false;
      this.waitchange = false;
      // this.init()
    },
    changeModel(k) {
      this.showModify = true;
      this.waitchange = k;
    },
    addnew() {
      this.showputon = true;
    },
    goup(id, index) {
      appload("load=1&id=" + id).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.list[index].load = res.data.data.load;
        }
      });
    },
    godown(id, index) {
      appload("load=2&id=" + id).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.list[index].load = res.data.data.load;
        }
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      let queryStr = "";
      queryStr = "page=" + val;
      getlist(queryStr).then((res) => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
  },
};
</script>

<style lang="less">
.modelManaga {
  .editcon {
    .el-input--suffix .el-input__inner {
      border: 1px solid lightgray;
      border-radius: 4px;
      width: 300px;
      height: 40px;
    }
  }
  .newtype {
    .el-input--suffix .el-input__inner {
      border: 1px solid lightgray;
      border-radius: 4px;
      width: 220px;
      height: 30px;
    }
    .el-input__icon {
      line-height: 100%;
      display: block;
      height: 94%;
    }
  }
}
</style>
<style scoped lang="less">
.modelManaga {
  height: 91%;
  .addnew {
    height: 35px;
    line-height: 35px;
    text-align: right;
    span {
      background: #017cf8;
      border-radius: 4px;
      color: #fff;
      padding: 3px 5px;
      cursor: pointer;
    }
  }
  .listfolder {
    display: flex;
    height: calc(100% - 70px);
    .folder {
      width: 20%;
      .addtype {
        height: 26px;
        line-height: 26px;
        text-align: right;
        .addicon {
          font-size: 12px;
          display: inline-block;
          color: #c0c4cc;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
    .list {
      width: 100%;
    }
  }
  .pagination {
    padding-left: 47%;
  }
  .list {
    height: 100%;
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
      align-items: center;
      height: 8%;
      border: 1px solid #f5f6f9;
      .icon {
        height: 100%;
        max-width: 100%;
      }
      div {
        // padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .actions {
        flex: 2;
        p {
          // display: flex;
          // align-items: center;
          display: inline-block;
          vertical-align: middle;
          width: 70px;
          background: #f5f4f7;
          border: 1px solid #e5e6eb;
          border-radius: 4px;
          padding: 2px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          cursor: pointer;
          * {
            vertical-align: middle;
          }
        }
      }
      .actions > p:nth-of-type(1) {
        color: #017cf8;
      }
      .actions > p:nth-of-type(2) {
        margin-left: 5px;
        color: #017cf8;
      }
      .actions > p:nth-of-type(3) {
        margin-left: 5px;
        color: #017cf8;
      }
      .actions > p:nth-of-type(4) {
        margin-left: 5px;
        color: #fd6969;
      }
    }
    .topline {
      background: #f5f6f9;
      margin: 0;
      div {
        padding: 0.5% 0;
      }
    }
  }
  .tip {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    .editcon {
      position: relative;
      z-index: 100;
      background: #fff;
      border-radius: 4px;
      width: 600px;
      height: 220px;
      .ed {
        height: 60px;
        line-height: 60px;
        // border-bottom: 1px solid lightgray;
        padding-left: 50px;
        font-size: 20px;
      }
      .name {
        height: 50px;
        line-height: 50px;
        padding-left: 50px;
        span {
          display: inline-block;
          width: 100px;
          text-align: right;
          margin-right: 5px;
        }
        input {
          background: #ffffff;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          width: 300px;
          height: 40px;
          padding-left: 20px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          outline: none;
          box-sizing: border-box;
        }
      }
      .ac {
        height: 50px;
        line-height: 50px;
        // border-top: 1px solid lightgray;
        text-align: right;
        span:nth-of-type(1) {
          border: 1px solid #017cf8;
          color: #409eff;
          padding: 4px 15px;
          border-radius: 4px;
          box-sizing: border-box;
          margin-right: 20px;
          cursor: pointer;
        }
        span:nth-of-type(2) {
          background-color: #017cf8;
          border: 1px solid #017cf8;
          color: #fff;
          padding: 4px 15px;
          border-radius: 4px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
    .maincen {
      position: relative;
      z-index: 100;
    }
    .newtype {
      width: 600px;
      height: 220px;
      background-color: #fff;
      z-index: 100;
      border-radius: 4px;
      .tit {
        font-size: 18px;
        padding: 0 30px;
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid lightgray;
        margin-bottom: 20px;
        box-sizing: border-box;
      }
      .in {
        margin-top: 10px;
        span {
          margin: 0 20px 0 128px;
        }
      }
      .action {
        height: 50px;
        line-height: 50px;
        border-top: 1px solid lightgray;
        margin-top: 20px;
        text-align: right;
        .cancel {
          border: 1px solid #409eff;
          color: #409eff;
          padding: 5px 20px;
          border-radius: 4px;
          box-sizing: border-box;
          margin-right: 20px;
          cursor: pointer;
        }
        .confirm {
          background-color: #409eff;
          border: 1px solid #409eff;
          color: #fff;
          padding: 5px 20px;
          border-radius: 4px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      input {
        outline: 0;
        border: 1px solid lightgray;
        border-radius: 4px;
        width: 220px;
        height: 30px;
        box-sizing: border-box;
        padding-left: 15px;
      }
      input:focus {
        border: 1px solid #409eff;
        outline: 0;
      }
      ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #afadad;
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #afadad;
      }
      :-ms-input-placeholder {
        /* IE 10+ */
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #afadad;
      }
      :-moz-placeholder {
        /* Firefox 18- */
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #afadad;
      }
    }
  }
}
</style>