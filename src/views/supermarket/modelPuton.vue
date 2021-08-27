<template>
  <div class="modelPuton">
    <div class="main">
      <div class="tit">{{ edit ? "修改应用" : "添加应用" }}</div>
      <div class="item">
        <label style="width: 40%">应用名称</label>
        <div style="width: 60%">
          <input type="text" placeholder="请输入名称" v-model="name" />
        </div>
      </div>
      <div class="item">
        <label style="width: 40%">应用链接</label>
        <div style="width: 60%">
          <input type="text" v-model="applink" />
        </div>
      </div>
      <div class="item appicon">
        <label style="width: 40%">选择应用图标</label>
        <div style="width: 60%">
          <img
            v-if="conimg && !dialogVisible"
            :src="'http://10.21.197.237' + conimg.url"
            alt=""
            style="vertical-align: top; cursor: pointer"
            @click="dialogVisible = true"
          />
          <span @click="dialogVisible = true" v-else>点击选择应用图标</span>
        </div>
      </div>
      <div class="item">
        <div style="width: 40%"></div>
        <div style="width: 60%">
          <div class="cancel" @click="cancel">取消</div>
          <div class="confirm" @click="confirm">确定</div>
        </div>
      </div>
    </div>
    <div class="diaolog" v-show="dialogVisible">
      <div class="choseicon">
        <div class="tit">选择图标</div>
        <div v-if="allicons.length == 0">图标获取失败,请稍后重试</div>
        <div class="icons" v-if="allicons.length != 0">
          <img
            v-for="p in allicons"
            :key="p.img"
            :src="'http://10.21.197.237' + p.url"
            alt="图标获取失败"
            @click="choiseimg = p"
            :class="choiseimg && choiseimg.img == p.img ? 'yes' : ''"
          />
        </div>
        <div class="cs">
          <div class="cancel" @click="cencelicon">取消</div>
          <div class="confirm" @click="conicon">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appimage, appadd } from "@/api/list.js";
import { appedit } from "@/api/managa.js";
export default {
  name: "modelPuton",
  data() {
    return {
      options: [],
      value: null,
      name: "",
      typeId: null,
      propopt: {
        expandTrigger: "hover",
        children: "item",
        label: "category_name",
        value: "id",
        checkStrictly: true,
      },
      allicons: [],
      applink: "",
      appicon: null,
      dialogVisible: false,
      choiseimg: null,
      conimg: null,
    };
  },
  props: ["edit"],
  mounted() {

    appimage().then((res) => {
      if (res.status == 200) {
        this.allicons = res.data.data;
      }
    });
    if (this.edit) {
      this.name = this.edit.appName;
      this.applink = this.edit.app_url;
      let arr = this.edit.app_ico.split("/");
      this.conimg = {
        url: this.edit.app_ico,
        img: arr[arr.length - 1],
      };
    }
  },
  methods: {
    handleChange(ids) {
      this.typeId = ids[ids.length - 1];
    },
    cencelicon() {
      this.dialogVisible = false;
    },
    conicon() {
      this.dialogVisible = false;
      this.conimg = { ...this.choiseimg };
    },
    confirm() {
      // console.log(this.value);
      if (!this.name && this.name.length < 16) {
        this.$message({
          message: "请输入应用名称且长度不能小于16",
          type: "warning",
        });
        return;
      }
      if (!this.applink) {
        this.$message({
          message: "请输入应用链接",
          type: "warning",
        });
        return;
      }
      if (!this.conimg) {
        this.$message({
          message: "请选择应用图标",
          type: "warning",
        });
        return;
      }
      if (this.edit) {
        appedit({
          appName: this.name,
          app_url: this.applink,
          app_ico: this.conimg.img,
          id:this.edit.id
        }).then(res=>{
          if (res.data.status == 200) {
            this.$emit("success");
          }
        })
      } else {
        appadd({
          appName: this.name,
          app_url: this.applink,
          app_ico: this.conimg.img,
        }).then((res) => {
          if (res.data.status == 200) {
            this.$emit("success");
          }
        });
      }
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less">
.modelPuton {
  .item {
    .el-input__inner {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      width: 300px;
    }
    input::placeholder {
      color: gray;
    }
  }
}
</style>

<style scoped lang="less">
.modelPuton {
  height: 91%;
  display: flex;
  align-items: center;
  justify-content: center;
  > .main > .tit {
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #000000;
    margin-top: 40px;
  }
  .diaolog {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    .choseicon {
      padding: 10px 30px;
      background-color: #ffffff;
      width: 400px;
      height: 400px;
      white-space: pre-wrap;
      .cs {
        text-align: center;
        margin-top: 10px;
        .confirm {
          width: 148px;
          height: 36px;
          line-height: 36px;
          background: #017cf8;
          border-radius: 4px;
          font-family: SourceHanSansCN-Regular;
          font-size: 18px;
          color: #ffffff;
          text-align: center;
          box-sizing: border-box;
          display: inline-block;
          vertical-align: middle;
          margin-left: 8px;
          cursor: pointer;
        }
        .cancel {
          width: 148px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #cccfd7;
          box-shadow: 0 0 6px 0 rgba(38, 91, 218, 0.04);
          border-radius: 4px;
          box-sizing: border-box;
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
        }
      }

      .tit {
        text-align: center;
        font-family: MicrosoftYaHei-Bold;
        font-size: 20px;
        margin: 10px 0;
      }
      .icons {
        height: 300px;
        overflow-y: scroll;
        padding: 20px 0;
        box-sizing: border-box;
        .yes {
          border: 1px solid #017cf8;
        }
        img {
          box-sizing: border-box;
          width: 25%;
          border: 1px solid transparent;
        }
        > img:hover {
          cursor: pointer;
          border: 1px solid #017cf8;
        }
      }
    }
  }
  .main {
    width: 775px;
    height: 449px;
    background-image: url("../../assets/bg.png");
    background-size: cover;
    overflow: hidden;
    background-color: #fff;
  }
  .appicon {
    height: 30%;
    font-size: 16px;
    > div {
      > span {
        height: 40px;
        line-height: 40px;
        display: inline-block;
        cursor: pointer;
        color: #017cf8;
      }
    }
  }
  .item {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    label {
      text-align: right;
      height: 40px;
      line-height: 40px;
      padding-right: 28px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #000000;
      box-sizing: border-box;
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
    input::placeholder {
      color: gray;
    }
    input:hover {
      border-color: #c0c4cc;
    }
    input:focus {
      border-color: #409eff;
    }
    .confirm {
      width: 148px;
      height: 36px;
      line-height: 36px;
      background: #017cf8;
      border-radius: 4px;
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
      cursor: pointer;
    }
    .cancel {
      width: 148px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: #ffffff;
      border: 1px solid #cccfd7;
      box-shadow: 0 0 6px 0 rgba(38, 91, 218, 0.04);
      border-radius: 4px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .main > .item:nth-of-type(2) {
    margin-top: 30px;
  }
}
</style>