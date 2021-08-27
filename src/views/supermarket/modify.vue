<template>
  <div class="modify">
    <div class="mask"></div>
    <div class="main">
      <div class="tit">
        {{ changeAble ? "修改应用" : "应用介绍" }}
      </div>
      <div v-for="k in explain" :key="k.name">
        <label for="">{{ k.name }}</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="最多500个字符"
          v-model="k.content"
          @blur="explainblur(k.name + '不能多于500字符', k.content, $event)"
        ></textarea>
      </div>
      <!-- <div>
        <span class="zzz">上传图片</span>
        <div class="uploadArea kkk" @click="goup">
          <span v-show="!canUpimg" @click="reup" class="reup">重新上传</span>
          <img
            :src="hasImg ? userImg : uploadImg"
            alt="点击上传"
            :class="'uploadIcon ' + (hasImg ? 'dd' : '')"
          />
          <p v-if="!hasImg">请上传图片</p>
          <input
            type="file"
            class="file"
            name="imgfile"
            id="imgfile"
            style="display: none"
            ref="upfile"
            @change="readFile"
          />
        </div>
      </div> -->
      <div class="actions">
        <div class="cancel" @click="hide">取消</div>
        <div class="confirm" @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import uploadImg from "@/assets/modelIntro/upload.png";
import { submit } from "@/api/managa.js";
export default {
  name: "modify",
  data() {
    return {
      uploadImg,
      hasImg: false,
      userImg: null,
      fileList: [],
      titname: "",
      area: "",
      canUpimg: true,
      changeImge: false,
      explain: [
        {
          name: "任务定义",
          content: "",
          field: "definition",
        },
        {
          name: "逐级拆解至最小任务项",
          content: "",
          field: "dismantling",
        },
        {
          name: "确定牵头/协同关系",
          content: "",
          field: "synergy",
        },
        {
          name: "建立指标体系",
          content: "",
          field: "system",
        },
        {
          name: "确定数据需求",
          content: "",
          field: "requirements",
        },
        {
          name: "确定数源系统",
          content: "",
          field: "source",
        },
        {
          name: "确定业务协同流程",
          content: "",
          field: "portrait",
        },
        {
          name: "确定数据集成流程",
          content: "",
          field: "monitoring",
        },
        {
          name: "业务集成数据集成",
          content: "",
          field: "analysis",
        },
        {
          name: "智能分析",
          content: "",
          field: "business",
        },
        {
          name: "集成流程监控",
          content: "",
          field: "integration",
        },
        {
          name: "任务整体画像",
          content: "",
          field: "collaboration",
        },  
      ],
    };
  },
  props: {
    changeAble: {
      default: false,
    },
    module_id: {},
  },
  mounted() {
    if (typeof FileReader === "undefined") {
      this.$message({
        message: "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！",
        type: "warning",
      });
      this.$emit("justHide");
    }
    if (this.changeAble) {
      // this.userImg = ...
      if (this.changeAble.img_url.length != 0) {
        this.hasImg = true;
      }
      console.log(this.changeAble)
      // this.titname = this.changeAble.modulename;
      // this.area = this.changeAble.introduce;
      this.explain.forEach((item) => {
        item.content = this.changeAble[item.field];
      });
      this.userImg = "http://10.21.197.237" + this.changeAble.img_url;
    }
  },
  methods: {
    hide() {
      this.$emit("justHide");
    },
    goup() {
      // console.log(this.$refs.upfile);
      // console.log(this);
      if (this.canUpimg) {
        this.$refs.upfile.click();
      }
    },
    explainblur(str, content, event) {
      if (content.length > 500) {
        this.$message({
          message: str,
          type: "warning",
        });
        // this.is1 = true;
        event.target.classList.add("unqualified");
      } else {
        // this.is2 = false;
        event.target.classList.remove("unqualified");
      }
    },
    readFile() {
      // 'Content-Type':'multipart/form-data'
      //   console.log(this.$refs.upfile.files[0]);
      this.canUpimg = false;

      let file = this.$refs.upfile.files[0];

      if (!/image\/\w+/.test(file.type)) {
        this.$message({
          message: "只能选择图片",
          type: "warning",
        });
        return false;
      }
      this.changeImge = true;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function (e) {
        that.userImg = this.result;
        that.hasImg = true;
        //把得到的base64赋值到img标签显示
      };
    },
    reup() {
      this.$refs.upfile.click();
    },
    edit(url) {
      console.log("0000");
      let data = new FormData();
      if (this.changeImge) {
        data.append("image", this.$refs.upfile.files[0]);
      } else {
        data.append("img_url", this.changeAble.img_url);
      }
      data.append("module_id", this.module_id);
      this.explain.forEach((item) => {
        data.append(item.field, item.content);
      });
      data.append("access_token", location.search.split("=")[1]);
      data.append("id", this.changeAble.id);
      this.$axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: url + "/Introduce/add",
        data: data,
      }).then((res) => {
        // console.log(res);
        if (res.data.status == 400) {
          this.$message({
            message: res.data.message,
            type: "warning",
          });
        }
        if (res.data.status == 200) {
          // this.$router.go(0);
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$emit("subok");
        }
      });
    },
    addnew(url) {
      let data = new FormData();
      if (!this.changeImge) {
        data.append("image", "");
      } else {
        data.append("image", this.$refs.upfile.files[0]);
      }
      data.append("module_id", this.module_id);
      // data.append("definition", this.explain[0].content);
      // data.append("dismantling", this.explain[1].content);
      // data.append("synergy", this.explain[2].content);
      // data.append("system", this.explain[3].content);
      // data.append("requirements", this.explain[4].content);
      // data.append("source", this.explain[5].content);
      this.explain.forEach((item) => {
        data.append(item.field, item.content);
      });
      data.append("access_token", location.search.split("=")[1]);

      this.$axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: url + "/Introduce/add",
        data: data,
      }).then((res) => {
        // console.log(res);
        if (res.data.status == 400) {
          this.$message({
            message: res.data.message,
            type: "warning",
          });
        }
        if (res.data.status == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$emit("subok");
        }
      });
    },
    confirm() {
      for (let i = 0; i < this.explain.length; i++) {
        if (this.explain[i].content.length > 500) {
          this.$message({
            message: "请按要求填写",
            type: "warning",
          });
          return;
        }
      }
      let url;
      if (process.env.NODE_ENV == "development") {
        url = "/api";
      }
      if (process.env.NODE_ENV == "production") {
        url = "http://10.21.197.237";
      }
      if (this.changeAble) {
        this.edit(url);
      } else {
        this.addnew(url);
      }
    },
  },
  watch: {
    area(newValue, oldValue) {
      if (newValue.length > 1000) {
        this.is2 = true;
        this.$message({
          message: "模型说明最多1000字符",
          type: "warning",
        });
      } else {
        this.is2 = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.modify {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    z-index: 10;
  }
  .main {
    width: 880px;
    height: 560px;
    // background-image: url("../../assets/bg.png");
    background-color: #fff;
    background-size: cover;
    overflow: hidden;
    position: absolute;
    top: 100px;
    left: calc(50% - 440px);
    background-color: #fff;
    z-index: 20;
    overflow-y: scroll;
    padding-bottom: 30px;
    box-sizing: border-box;
    .kkk {
      background: #ffffff;
      width: 450px;
      // border: 1px solid #ffffff;
      border: 1px solid lightgrey;
      box-sizing: border-box;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .unqualified {
      border-color: rgb(247, 71, 71);
    }
    textarea {
      width: 450px;
      resize: none;
      padding: 5px;
      outline: 0;
      border: 1px solid lightgrey;
      border-radius: 4px;
      box-sizing: border-box;
    }
    input {
      padding: 8px 4px;
      outline: 0;
      border: 1px solid lightgrey;
      width: 450px;
      box-sizing: border-box;
    }
    input:focus,
    textarea:focus {
      border: 1px solid #409eff;
    }
    .actions {
      display: flex;
      justify-content: center;
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      .cancel {
        width: 148px;
        height: 36px;
        background: #ffffff;
        box-sizing: border-box;
        line-height: 36px;
        border: 1px solid #cccfd7;
        box-shadow: 0 0 6px 0 rgba(38, 91, 218, 0.04);
        border-radius: 4px;
        color: #384155;
        text-align: center;
        cursor: pointer;
      }
      .confirm {
        width: 148px;
        height: 36px;
        box-sizing: border-box;
        line-height: 36px;
        background: #017cf8;
        border-radius: 4px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .main > div {
    display: flex;
    align-items: flex-start;
    margin-top: 16px;
    //   justify-content: center;
  }
  .main > div > label,
  .zzz {
    box-sizing: border-box;
    width: 200px;
    text-align: right;
    margin-right: 28px;
  }
  .main .tit {
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #000000;
    text-align: center;
    margin-top: 25px;
    display: block;
  }
  .uploadArea {
    background-color: #fff;
    height: 200px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    .uploadIcon {
      display: block;
      margin: 50px auto 10px auto;
    }
    .dd {
      margin-top: 0;
      max-width: 100%;
      max-height: 100%;
    }
    p {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #b3c2d0;
      text-align: center;
    }
    .reup {
      position: absolute;
      right: 0;
      top: 0;
      background: #ecf1ff;
      border-radius: 2px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #017cf8;
    }
  }
}
</style>