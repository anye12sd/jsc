<template>
  <div class="diytree">
    <div v-for="(k, index) in data" :key="index" class="tree">
      <div
        :class="'tl ' + 'treelabel' + deep"
        :style="'padding-left: ' + (deep - 1) * 42 + 'px;'"
        @click="showhide(index,k.id, $event)"
      >
        <div>
          <i
            class="treeicon iconfont icon-top"
            v-if="showdown"
            @click.stop="sh($event)"
          ></i>
          <span class="treelabel" @click.stop="sh(index,k.id, $event)">{{
            k[defaultProps.label]
          }}</span>
        </div>
        <div>
          <i
            class="edit iconfont icon-bianjimian"
            @click.stop="edit(k[defaultProps.label], k.id, k.pid)"
          ></i>
          <i class="dele iconfont icon-shanchu" @click.stop="dele(k.id)"></i>
        </div>
      </div>
      <tree
        v-if="k.item"
        :data="k.item"
        :deep="deep + 1"
        :showdown="k.item.item ? true : false"
        @getdata="reget"
        @chosetype="chosetype"
        style="height: 0"
      ></tree>
    </div>
    <div class="editcon" v-if="showeditcon">
      <div class="mask" @click="hide"></div>
      <div class="main">
        <div class="in">
          <span>分类名称:</span>
          <input type="text" v-model="typeName" />
        </div>
        <div class="action">
          <span class="cancel" @click="hide">取消</span>
          <span class="confirm" @click="confirm">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/iconfont.css";
import tree from "./tree";
import { categoryedit, categorydel } from "@/api/list.js";
export default {
  name: "tree",
  data() {
    return {
      showeditcon: false,
      typeName: "",
      id: 0,
      pid: 0,
    };
  },
  components: {
    tree,
  },
  mounted() {
    // console.log(this.data)
  },
  methods: {
    reget(){
      this.$emit("getdata");
    },
    chosetype(id){
      this.$emit("chosetype",id)
    },
    dele(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          categorydel("id=" + id).then((res) => {
            console.log(res)
            if (res.data.data == true) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$emit("getdata");
            } else {
              this.$message({
                type: "warning",
                message: "该分类下有子分类不能删除",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(name, id, pid) {
      this.showeditcon = true;
      this.typeName = name;
      this.id = id;
      this.pid = pid;
    },
    hide() {
      this.showeditcon = false;
    },
    confirm() {
      if (this.typeName === "") {
        this.$message({
          message: "请输入分类名称",
          type: "warning",
        });
        return;
      }
      categoryedit(
        "id=" + this.id + "&category_name=" + this.typeName + "&pid=" + this.pid
      ).then((res) => {
        console.log(res);
        if (res.data.data == true) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$emit("getdata");
          this.hide();
        }
      });
    },
    sh(index,id, event) {
      this.$emit("chosetype",id)
      if (!this.data[index].item) return;
      if (event.currentTarget.parentElement.parentElement.nextElementSibling) {
        if (
          event.currentTarget.parentElement.parentElement.nextElementSibling
            .clientHeight != 0
        ) {
          event.currentTarget.parentElement.parentElement.nextElementSibling.style.height =
            "0px";
          event.currentTarget.parentElement.children[0].classList.remove(
            "treeicon2"
          );
          event.currentTarget.parentElement.children[0].classList.add(
            "treeicon"
          );
        } else {
          event.currentTarget.parentElement.parentElement.nextElementSibling.style.height =
            26 *
              event.currentTarget.parentElement.parentElement.nextElementSibling
                .children.length +
            "px";
          event.currentTarget.parentElement.children[0].classList.remove(
            "treeicon"
          );
          event.currentTarget.parentElement.children[0].classList.add(
            "treeicon2"
          );
        }
      }
    },
    showhide(index,id, event) {
      this.$emit("chosetype",id)
      if (!this.data[index].item) return;
      if (event.currentTarget.nextElementSibling) {
        if (event.currentTarget.nextElementSibling.clientHeight != 0) {
          event.currentTarget.nextElementSibling.style.height = "0px";
          event.currentTarget.children[0].children[0].classList.remove(
            "treeicon2"
          );
          event.currentTarget.children[0].children[0].classList.add("treeicon");
        } else {
          event.currentTarget.nextElementSibling.style.height =
            26 * event.currentTarget.nextElementSibling.children.length + "px";
          event.currentTarget.children[0].children[0].classList.remove(
            "treeicon"
          );
          event.currentTarget.children[0].children[0].classList.add(
            "treeicon2"
          );
        }
      }
    },
  },
  props: {
    showdown: {
      type: Boolean,
      default: true,
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "item",
          label: "category_name",
        };
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    deep: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped lang="less">
.diytree {
  width: 100%;
  transition: all 0.5s;
  overflow: hidden;
  .tl {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    box-sizing: border-box;

    .treeicon {
      margin: 0 6px;
      transform: rotate(-90deg);
    }
    .icon-top {
      transition: all 0.5s;
    }
    .treeicon2 {
      margin: 0 6px;
    }
    .dele {
      margin: 0 6px;
    }
    .iconfont {
      color: #c0c4cc;
      display: inline-block;
      font-size: 12px;
    }
    .treelabel {
      color: #606266;
      font-size: 14px;
    }
  }
  .tl:hover {
    background-color: #f5f6f9;
  }
  .editcon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .main {
      background-color: #fff;
      width: 600px;
      height: 131px;
      position: relative;
      .in {
        margin-top: 30px;
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