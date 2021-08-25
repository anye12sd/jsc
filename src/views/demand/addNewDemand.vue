<template>
  <div class="addNewDemand">
    <searchdemo
      :four="true"
      one="需求名称"
      two="请输入需求名称"
      @feedback="justgoto"
      @clear="clear"
    ></searchdemo>
    <div class="add" @click="addNew">新增需求</div>
    <div class="listfolder">
      <!-- <div class="folder">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div> -->
      <div class="list">
        <div class="line topline">
          <div class="num">序号</div>
          <div class="name">需求名称</div>
          <div class="time">处理时间</div>
          <div class="status">状态</div>
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
        <div
          v-for="(k, index) in list"
          :key="index"
          class="line"
          @click="showdetail(k.id)"
        >
          <div class="num">{{ k.id }}</div>
          <div class="name" :title="k.demand_name">{{ k.demand_name }}</div>
          <div class="time" :title="k.create_time">{{ k.create_time }}</div>
          <div class="status" :title="k.tit">{{ st[k.status - 1] }}</div>
          <div class="actions">
            <span @click.stop="dedit(k)" v-if="k.status == 5">编辑</span>
            <span @click.stop="delet(k)" v-if="k.status == 5">删除</span>
            <span @click.stop="editsub(k)" v-if="k.status == 5">提交</span>
            <span v-if="k.status != 5">没有操作</span>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>
    <div class="write" v-show="showedit">
      <div class="mask" @click="hideedit"></div>
      <div class="main">
        <div class="tit">{{ issub ? "提交" : "编辑" }}</div>
        <div>
          <label for="">需求名称</label>
          <input type="text" class="pb" v-model="editform.demand_name" />
        </div>
        <div>
          <label>需求单位</label>
          <el-select v-model="editform.branch_id" placeholder="选择需求单位">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.branchname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <label for="deamndDescribe" class="labeldescribe">需求描述</label>
          <textarea
            cols="70"
            rows="14"
            v-model="editform.demand_describe"
          ></textarea>
        </div>
        <div class="actions" v-if="issub">
          <div class="cancel" @click="hideedit">取消</div>
          <div class="confirm" @click="confirmsub">提交</div>
        </div>
        <div class="actions" v-else>
          <div class="cancel" @click="hideedit">取消</div>
          <div class="confirm" @click="confirmedit">确定</div>
        </div>
      </div>
    </div>
    <div class="write" v-show="showdemand">
      <div class="mask" @click="hidedemand"></div>
      <div class="conent" v-if="detail">
        <div>
          <span>需求名称:</span><span>{{ detail.demand_name }}</span>
        </div>
        <div>
          <span>发起人:</span><span>{{ detail.username }}</span>
        </div>
        <div>
          <span>需求类型:</span><span>{{ detail.demand_type }}</span>
        </div>
        <div>
          <span>单位:</span><span>{{ detail.get_branch_name }}</span>
        </div>
        <div>
          <span>时间:</span><span>{{ detail.create_time }}</span>
        </div>
        <div class="spec">
          <span>需求描述:</span
          ><span class="desc">{{ detail.demand_describe }}</span>
        </div>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <div class="mask"></div>
      <div class="main">
        <div class="tit">新增需求</div>
        <div>
          <label for="">需求名称</label>
          <input
            type="text"
            id="demandName"
            class="pb"
            v-model="form.demandName"
          />
        </div>
        <div>
          <label>需求单位</label>
          <el-select v-model="form.company" placeholder="选择需求单位">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.branchname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <label for="deamndDescribe" class="labeldescribe">需求描述</label>
          <textarea
            id="deamndDescribe"
            cols="70"
            rows="14"
            v-model="form.describe"
          ></textarea>
        </div>
        <div class="actions">
          <div class="cancel" @click="cancel">取消</div>
          <div class="confirm" @click="confirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 新增需求
import searchdemo from "@/components/searchdemo.vue";
import { demanduser } from "@/api/managa.js";
import {
  demandhandlelist,
  appbranch,
  demandadd,
  getdemand,
  appCategory,
} from "@/api/list.js";
import { demandedit, demanddel } from "@/api/managa.js";
export default {
  name: "addNewDemand",
  data() {
    return {
      showdemand: false,
      showWrite: false,
      showedit: false,
      issub: true,
      currentPage: 1,
      total: 1,
      st: ["通过", "驳回", "无状态", "开发中", "草稿"],
      form: {
        demandName: null,
        company: null,
        describe: null,
      },
      options: [],
      list: [],
      detail: null,
      querymesg: null,
      editform: {
        demand_name: null,
        id: 0,
        demand_describe: "",
        branch_id: 0,
      },
      data: [],
      queryId: null,
      defaultProps: {
        children: "item",
        label: "category_name",
      },
    };
  },
  mounted() {
    this.getdata(1);
    appCategory().then((res) => {
      this.data = res.data.data;
    });
  },
  components: {
    searchdemo,
  },
  methods: {
    handleNodeClick(data) {
      this.queryId = data.id;
      this.currentPage = 1;
      this.handleCurrentChange(this.currentPage);
    },
    editsub(k) {
      this.editform.demand_name = k.demand_name;
      this.editform.branch_id = k.branch_id;
      this.editform.id = k.id;
      this.showedit = true;
      getdemand(k.id).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.editform.demand_describe = res.data.data.demand_describe;
        }
        appbranch().then((res) => {
          this.showedit = true;
          this.options = res.data.data;
          this.issub = true;
        });
      });
    },
    confirmsub() {
      demandedit({
        id: this.editform.id,
        status: 3,
      }).then((res) => {
        if (res.data.status == 200) {
          this.handleCurrentChange(this.currentPage);
          this.hideedit();
        }
      });
    },
    hideedit() {
      this.showedit = false;
      this.editform = {
        demand_name: null,
        id: 0,
        demand_describe: "",
        branch_id: 0,
      };
    },
    confirmedit() {
      demandedit({
        ...this.editform,
        status: 5,
      }).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.handleCurrentChange(this.currentPage);
          this.hideedit();
        }
      });
    },
    dedit(k) {
      this.editform.demand_name = k.demand_name;
      this.editform.branch_id = k.branch_id;
      this.editform.id = k.id;
      this.showedit = true;
      getdemand(k.id).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.editform.demand_describe = res.data.data.demand_describe;
        }
        appbranch().then((res) => {
          this.showedit = true;
          this.options = res.data.data;
          this.issub = false;
        });
      });
    },
    delet(k) {
      demanddel(k.id).then((res) => {
        if (res.data.status == 200) {
          this.handleCurrentChange(this.currentPage);
        }
      });
    },
    justgoto(p1, p2) {
      // console.log(p1, p2);
      // console.log(p2[0].getTime(),p2[1].getTime(),p2[0].getTime()/1000,p2[1].getTime()/1000)
      this.querymesg = {};
      this.querymesg.demand_name = p1;
      if (!p2) {
        this.querymesg.start_time = "";
        this.querymesg.end_time = "";
      } else {
        this.querymesg.start_time = p2[0].getTime() / 1000;
        this.querymesg.end_time = p2[1].getTime() / 1000;
      }
      demandhandlelist(
        "page=1&type=1&demand_name=" +
          this.querymesg.demand_name +
          "&start_time=" +
          this.querymesg.start_time +
          "&end_time=" +
          this.querymesg.end_time
      ).then((res) => {
        // console.log("搜索", res);
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
    clear() {
      this.querymesg = null;
    },
    hidedemand() {
      this.showdemand = false;
    },
    showdetail(id) {
      this.showdemand = true;
      getdemand(id).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.detail = res.data.data;
        }
      });
    },
    confirm() {
      if (this.form.demandName.length < 4) {
        this.$message({
          message: "需求名称长度不能小于4",
          type: "warning",
        });
        return;
      }
      demandadd({
        demand_name: this.form.demandName,
        branch_id: this.form.company,
        demand_describe: this.form.describe,
        type: 3,
        status: 5,
      }).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.name = "";
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.showWrite = false;
          this.form = {
            demandName: null,
            company: null,
            describe: null,
          };
          this.getdata(this.currentPage);
        }
      });
    },
    getdata(page, str) {
      demandhandlelist("page=" + page + "&type=1" + str).then((res) => {
        // console.log("我发起的", res);
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
    addNew() {
      this.showWrite = true;
      appbranch().then((res) => {
        // console.log("单位", res);
        this.options = res.data.data;
      });
    },
    cancel() {
      this.form = {
        demandName: null,
        company: null,
        describe: null,
      };
      this.showWrite = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      let str = "";
      if (this.querymesg) {
        str =
          "page=" +
          val +
          "&type=1&demand_name=" +
          this.querymesg.demand_name +
          "&start_time=" +
          this.querymesg.start_time +
          "&end_time=" +
          this.querymesg.end_time;
      } else {
        str = "type=1&page=" + val;
      }
      if (this.queryId) {
        str = str + "&category_id=" + this.queryId;
      }
      demandhandlelist(str).then((res) => {
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.addNewDemand {
  height: 91%;
  position: relative;
  .pagination{
    padding-left: 47%;
  }
  .add {
    position: absolute;
    top: 2%;
    right: 0;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #292929;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #017cf8;
    color: #fff;
  }
  .listfolder {
    display: flex;
     height: 85%;
    .folder {
      width: 20%;
      margin-top: 10px;
    }
    .list {
      width: 100%;
      .line {
        // margin: 0.1% 0;
        margin-top: 0.1%;
        display: flex;
        align-items: center;
        height: 8%;
        border: 1px solid #f5f6f9;
        div {
          // padding: 0.75% 0;
          // padding: 0.45% 0;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #666f8e;
          text-align: center;
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .num {
          flex: 1;
        }
        .actions {
          span {
            color: #017cf8;
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
            margin: 0 5px;
          }
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
  }

  .write {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 10;
    }
    .conent {
      width: 880px;
      height: 500px;
      padding: 20px;
      // background-image: url("../../assets/bg.png");
      background-size: cover;
      overflow: hidden;
      background-color: #fff;
      position: relative;
      z-index: 100;

      > div {
        padding-left: 150px;
        margin-top: 10px;
        > span {
          vertical-align: middle;
        }
        > span:nth-of-type(1) {
          flex: 1;
          text-align: right;
          display: inline-block;
          width: 100px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          padding-right: 10px;
        }
        > span:nth-of-type(2) {
          flex: 2;
          border: 1px solid #dcdfe6;
          background-color: #fff;
          height: 35px;
          line-height: 35px;
          display: inline-block;
          width: 500px;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 20px;
        }
      }
      > .spec {
        > span {
          vertical-align: top;
        }
        > .desc {
          height: 180px;
          overflow: auto;
        }
      }
    }
    .main {
      width: 880px;
      height: 500px;
      background-image: url("../../assets/bg.png");
      background-size: cover;
      overflow: hidden;
      position: relative;
      // top: 100px;
      // left: calc(50% - 440px);
      background-color: #fff;
      z-index: 20;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #000000;

      textarea {
        resize: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        padding: 0 15px;
        outline: 0;
        width: 500px;
      }
      #demandName,
      .pb {
        background-color: #fff;
        width: 500px;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
      }
      #demandName:focus,
      .pb:focus,
      textarea:focus {
        border: 1px solid #409eff;
      }
      .labeldescribe {
        vertical-align: top;
      }
      .el-select {
        width: 500px;
      }
      label {
        margin-right: 10px;
      }
    }
    .main > div {
      padding-left: 150px;
      margin-top: 20px;
    }
    .main > .tit {
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      color: #000000;
      text-align: center;
      margin-top: 25px;
      display: block;
      padding: 0;
    }
    .main > .actions {
      padding: 0;
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
}
</style>