<template>
  <div class="modelManaga">
    <!-- <searchdemo :four="true" one="模型编号" two="请输入模型编号"></searchdemo> -->
    <div class="addnew" v-if="ismanaga">
      <span @click="addnew">新增模型</span>
    </div>
    <div class="listfolder" :style="ismanaga ? '' : 'margin-top:10px;'">
      <!-- <div class="folder">
        <div class="addtype">
          <i class="addicon iconfont icon-tianjia" @click="addnewtype"></i>
        </div>
        <tree :data="data" @getdata="gettype" @chosetype="chosetype"></tree>
      </div> -->
      <div class="list">
        <div class="line topline">
          <!-- <div>模型编号</div> -->
          <div>应用名称</div>
          <!-- <div>类型</div> -->
          <!-- <div>所属单位</div> -->
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
          <!-- <div :title="year+'000'+k.id">{{year+"000"+k.id }} </div> -->
          <div :title="k.modulename">{{ k.modulename }}</div>
          <!-- <div :title="k.module_type">{{ k.module_type }}</div> -->
          <!-- <div :title="k.branch_id">{{ k.get_branch_name }}</div> -->
          <div :title="k.update_time">{{ k.update_time }}</div>
          <div class="actions">
            <p @click="goup(k.id, index)" v-if="k.load == 2 || k.load == 3">
              <img :src="change" alt="图片资源缺失" /> <span>上架</span>
            </p>
            <p @click="edit(k, index)">
              <img :src="off" alt="图片资源缺失" /> <span>修改</span>
            </p>
            <p @click="godown(k.id, index)" v-if="k.load == 1 || k.load == 3">
              <img :src="puton" alt="图片资源缺失" /> <span>下架</span>
            </p>
            <p @click="intro(k.id, index)">
              <span>模型介绍</span>
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
    <div class="tip" v-show="showedit">
      <div class="mask" @click="hideedit"></div>
      <div class="editcon">
        <div class="ed">修改</div>
        <div class="name">
          <span>模型名称:</span>
          <input type="text" v-model="waitEdit.modulename" />
        </div>
        <div class="name">
          <span>类型:</span>
          <!-- <input type="text" v-model="waitEdit.type" /> -->
          <el-cascader
            v-model="waitEdit.category_id"
            :options="data"
            :props="propopt"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div class="ac">
          <span @click="hideedit">取消</span>
          <span @click="confirmedit">确定</span>
        </div>
      </div>
    </div>
    <div class="tip" v-if="showputon">
      <div class="mask" @click="hideputon"></div>
      <modelPuton
        v-if="showputon"
        class="maincen"
        @success="hideputon"
        @cancel="hideputon"
        :alltype="data"
      ></modelPuton>
    </div>
    <div class="tip" v-show="shownewtype">
      <div class="mask" @click="hideedit"></div>
      <div class="newtype">
        <div class="tit">新建分类</div>
        <div class="in">
          <span>分类名称:</span>
          <input
            type="text"
            v-model="newtypename"
            placeholder="请输入分类名称"
          />
        </div>
        <div class="in">
          <span>分类位置:</span>
          <!-- <input type="text" v-model="newtypeaddress" /> -->
          <el-select v-model="newtypeaddress" placeholder="请选择">
            <el-option
              v-for="item in data"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="action">
          <span class="cancel" @click="hidenewtype">取消</span>
          <span class="confirm" @click="confirmadd">确定</span>
        </div>
      </div>
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
// import tree from "@/components/tree.vue";
// import searchdemo from "@/components/searchdemo.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {
  getlist,
  appload,
  appCategory,
  introduce,
  categoryadd,
} from "@/api/list.js";
import { appedit } from "@/api/managa.js";
export default {
  name: "modelManaga",
  data() {
    return {
      propopt: {
        expandTrigger: "hover",
        children: "item",
        label: "category_name",
        value: "id",
        checkStrictly: true,
      },
      list: [],
      year: 0,
      change,
      off,
      puton,
      shownewtype: false,
      ismanaga: false,
      showModify: false,
      showputon: false,
      currentPage: 1,
      total: 0,
      data: [],
      defaultProps: {
        children: "item",
        label: "category_name",
      },
      queryId: null,
      waitchange: false,
      module_id: 0,
      newtypename: "",
      newtypeaddress: "",
      waitEdit: {
        modulename: "",
        category_id: "",
        id: 0,
        index:0
      },
      showedit: false,
    };
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  mounted() {
    this.year = new Date().getFullYear();
    getlist("page=1").then((res) => {
      // console.log(res);
      this.list = res.data.data.list;
      this.total = res.data.data.count;
    });
    // appCategory().then((res) => {
    //   // console.log("分类", res);
    //   this.data = res.data.data;
    // });
    // console.log(this[3]);
    if (this.identity == 2) {
      this.ismanaga = true;
    }
  },
  components: {
    modelPuton,
    modify,
    // tree,
    // searchdemo,
  },
  methods: {
    hideedit() {
      this.showedit = false;
    },
    edit(k, index) {
      this.showedit = true;
      this.waitEdit.modulename = k.modulename;
      this.waitEdit.category_id = k.category_id;
      this.waitEdit.id = k.id;
      this.waitEdit.index = index;
      // console.log(this.waitEdit.category_id);
    },
    handleChange(ids) {
      // console.log(ids);
      // console.log(this.waitEdit.category_id);
    },
    confirmedit() {
      let category_id = 0;
      if (typeof this.waitEdit.category_id == "number") {
        category_id = this.waitEdit.category_id;
      } else {
        category_id = this.waitEdit.category_id[
          this.waitEdit.category_id.length - 1
        ];
      }
      // console.log(category_id)
      let data = {
        id: this.waitEdit.id,
        modulename: this.waitEdit.modulename,
        category_id,
      };
      appedit(data).then((res) => {
        // console.log(res,this.waitEdit.index);
        if(res.data.status == 200) {
          this.list[this.waitEdit.index].modulename = res.data.data.modulename
          this.list[this.waitEdit.index].category_id = res.data.data.category_id
          this.showedit = false;
        }
      });
    },
    gettype() {
      appCategory().then((res) => {
        this.data = res.data.data;
      });
    },
    confirmadd() {
      if (this.newtypename === "") {
        this.$message({
          message: "请输入分类名称",
          type: "warning",
        });
        return;
      }
      let str = "";
      str = "category_name=" + this.newtypename;
      // console.log(this.newtypeaddress);
      // console.log(this.newtypeaddress !== "");
      if (this.newtypeaddress !== "") {
        str = str + "&pid=" + this.newtypeaddress;
      }
      categoryadd(str).then((res) => {
        // console.log(res);
        if (res.data.data == true) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.gettype();
          this.hidenewtype();
        }
      });
    },
    addnewtype() {
      this.shownewtype = true;
    },
    hidenewtype() {
      this.shownewtype = false;
      this.newtypename = "";
      this.newtypeaddress = "";
    },
    intro(id) {
      introduce(id).then((res) => {
        console.log(res);
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
    handleNodeClick(data) {
      this.queryId = data.id;
      let str = "category_id=" + data.id + "&page=1";
      this.getdata(str);
      this.currentPage = 1;
    },
    chosetype(id) {
      // console.log(id);
      this.queryId = id;
      this.handleCurrentChange(1);
    },
    getdata(query) {
      getlist(query).then((res) => {
        //console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
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
      if (this.queryId) {
        queryStr = "category_id=" + this.queryId + "&page=" + val;
      } else {
        queryStr = "page=" + val;
      }
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