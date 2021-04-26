<template>
  <div class="distribution">
    <div class="listfolder">
      <div class="folder">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="list">
        <div class="line topline">
          <div class="pagename">页面名称</div>
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
          <div class="pagename">{{ k.view_name }}</div>
          <div class="actions">
            <span @click="togive(k.id)">分配</span>
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
      class="ppp"
    >
    </el-pagination>
    <div class="mesbox" v-show="showmesbox">
      <div class="mask" @click="hide"></div>
      <div class="main">
        <div class="top">
          <span class="name">姓名</span>
          <input type="text" class="xm" v-model="xm" />
          <span v-if="identity == 1">单位</span>
          <el-select
            v-model="company"
            filterable
            placeholder="请选择"
            v-if="identity == 1"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.branchname"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span class="search" @click="search">搜索</span>
          <span class="all" @click="manydis">分配</span>
          <span class="all" @click="manyundis">解除分配</span>
          <span class="all" v-if="identity == 2" @click="alldis"
            >单位批量分配</span
          >
          <span class="all" v-if="identity == 2" @click="allundis"
            >单位批量解除分配</span
          >
          <!-- <span class="all">所有人</span> -->
        </div>
        <div class="users">
          <div class="firstline line">
            <div class="choises">
              <img
                :src="isAll ? checked : notcheck"
                alt="图标缺失"
                @click="choseAll"
              />
              <span>全选/全不选</span>
            </div>
            <div class="name">姓名</div>
            <div class="branch" v-if="identity == 1">单位</div>
            <div class="act">操作</div>
          </div>
          <div
            v-if="users.length == 0"
            style="
              text-align: center;
              height: 50px;
              line-height: 50px;
              color: gray;
            "
          >
            暂无数据
          </div>
          <div class="line" v-for="(p, index) in users" :key="p.id">
            <div>
              <img
                :src="status[index] ? checked : notcheck"
                alt="图标缺失"
                @click="chose(index)"
              />
              <span @click="chose(index)">选择</span>
            </div>
            <div>{{ p.userName ? p.userName : p.employeeName }}</div>
            <div v-if="identity == 1" class="branch">{{ p.branch_id }}</div>
            <div>
              <span
                class="do"
                @click="oneundis(p.id, index)"
                v-if="p.subscribe != 0"
                >解除分配</span
              >
              <span class="do" @click="onedis(p.id, index)" v-else>分配</span>
            </div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange2"
          :current-page.sync="currentPage2"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="usertotal"
          class="pagination special"
          style="text-align: center"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getsubscribe,
  subscribeList,
  appbranch,
  portalSubscribe,
  portalSubscribeall,
  appCategory,
  subscribeall,
} from "@/api/list.js";
import checked from "@/assets/listlogo/checked.png";
import notcheck from "@/assets/listlogo/notcheck.png";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "distribution",
  data() {
    return {
      checked,
      notcheck,
      total: 10,
      currentPage: 1,
      currentPage2: 1,
      list: [],
      showmesbox: false,
      users: [],
      usertotal: 0,
      isAll: false,
      demand_id: 0,
      options: [],
      company: null,
      xm: "",
      data: [],
      queryId: null,
      defaultProps: {
        children: "item",
        label: "category_name",
      },
      status: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      selectNum: 0,
    };
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  mounted() {
    this.init();
  },
  watch: {
    selectNum(newValue, oldValue) {
      if (newValue == this.users.length) {
        this.isAll = true;
      }
      if (newValue < this.users.length) {
        this.isAll = false;
      }
      if (newValue <= 0) {
        this.status = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
      }
      if (newValue >= 10) {
        this.status = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ];
      }
    },
  },
  methods: {
    init() {
      getsubscribe("page=1").then((res) => {
        // console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        // console.log(this.total)
      });
      appCategory().then((res) => {
        // console.log("分类", res);
        this.data = res.data.data;
      });
    },
    search() {
      if (this.xm == null && this.company == null) return;
      subscribeList(
        "demand_id=" +
          this.demand_id +
          "&page=1" +
          "&branch_id=" +
          this.company +
          "&username=" +
          this.xm
      ).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.users = res.data.data.list;
          this.usertotal = res.data.data.count;
        }
      });
    },
    onedis(id, index) {
      // 单一分配
      portalSubscribe(
        "id=" + id + "&demand_id=" + this.demand_id + "&status=1"
      ).then((res) => {
        console.log(res);
        if (res.data.data) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          this.users[index].subscribe = 2;
        }
      });
    },
    oneundis(id, index) {
      // 单一解除分配

      portalSubscribe(
        "id=" + id + "&demand_id=" + this.demand_id + "&status=2"
      ).then((res) => {
        console.log(res);
        if (res.data.data) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          this.users[index].subscribe = 0;
        }
      });
    },
    handleNodeClick(data) {
      console.log(data);
      this.queryId = data.id;
      let str = "category_id=" + data.id + "&page=1";
      this.getdata(str);
      this.currentPage = 1;
    },
    getdata(str) {
      getsubscribe(str).then((res) => {
        // console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
        // console.log(this.total)
      });
    },
    manydis() {
      let ids = "";
      let flag = false;
      this.status.forEach((item, index) => {
        if (item) {
          // 等于0可以分配
          if (this.users[index].subscribe != 0) {
            return;
          }
          ids += this.users[index].id;
          ids += ",";
        }
      });
      if (flag) {
        this.$message({
          message: "选中人员有已分配人员",
          type: "warning",
        });
        return;
      }
      ids = ids.slice(0, ids.length - 1);
      if (ids.length == 0) {
        this.$message({
          message: "请选择人员",
          type: "warning",
        });
        return;
      }
      console.log(ids);
      portalSubscribeall(
        "ids=" + ids + "&demand_id=" + this.demand_id + "&status=1"
      ).then((res) => {
        console.log(res);
        if (res.data.data) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          // this.hide();
          this.status.forEach((item, index) => {
            if (item) {
              this.users[index].subscribe = 2;
            }
          });
        }
      });
    },
    manyundis() {
      let ids = "";
      let flag = false;
      this.status.forEach((item, index) => {
        if (item) {
          if (this.users[index].subscribe == 0) {
            return;
          }
          ids += this.users[index].id;
          ids += ",";
        }
      });
      if (flag) {
        this.$message({
          message: "选中人员有已解除分配人员",
          type: "warning",
        });
        return;
      }
      ids = ids.slice(0, ids.length - 1);
      if (ids.length == 0) {
        this.$message({
          message: "请选择人员",
          type: "warning",
        });
        return;
      }
      console.log(ids);
      portalSubscribeall(
        "ids=" + ids + "&demand_id=" + this.demand_id + "&status=2"
      ).then((res) => {
        console.log(res);
        if (res.data.data) {
          this.$message({
            message: "解除分配成功",
            type: "success",
          });
          // this.hide();
          this.status.forEach((item, index) => {
            if (item) {
              this.users[index].subscribe = 0;
            }
          });
        }
      });
    },
    chose(index) {
      console.log(this.status[index]);
      if (this.status[index]) {
        this.status[index] = false;
        this.selectNum--;
      } else {
        this.status[index] = true;
        this.selectNum++;
      }
      this.$forceUpdate();
    },
    choseAll() {
      if (this.isAll) {
        this.isAll = false;
        this.selectNum = 0;
      } else {
        this.isAll = true;
        this.selectNum = 10;
      }
    },
    togive(id) {
      this.showmesbox = true;
      this.demand_id = id;
      this.getUserList(1);
      appbranch().then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.options = res.data.data;
        }
      });
    },
    hide() {
      this.showmesbox = false;
      this.selectNum = 0;
      this.company = "";
      this.xm = "";
    },
    getUserList(page) {
      subscribeList("demand_id=" + this.demand_id + "&page=" + page).then(
        (res) => {
          console.log(res);
          if (res.data.status == 200) {
            this.users = res.data.data.list;
            this.usertotal = res.data.data.count;
          }
        }
      );
    },
    handleCurrentChange(val) {
      let queryStr = "";
      if (this.queryId) {
        queryStr = "category_id=" + this.queryId + "&page=" + val;
      } else {
        queryStr = "page=" + val;
      }
      getsubscribe(queryStr).then((res) => {
        // console.log(res)
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
    handleCurrentChange2(val) {
      this.selectNum = 0;

      if (this.company || this.xm) {
        subscribeList(
          "demand_id=" +
            this.demand_id +
            "&page=" +
            val +
            "&branch_id=" +
            this.company +
            "&username=" +
            this.xm
        ).then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            this.users = res.data.data.list;
            this.usertotal = res.data.data.count;
          }
        });
      } else {
        this.getUserList(val);
      }
    },
    alldis() {
      subscribeall("demand_id=" + this.demand_id + "&status=1").then((res) => {
        if (res.data.data == true) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          this.hide();
          this.init();
        }
      });
    },
    allundis() {
      subscribeall("demand_id=" + this.demand_id + "&status=2").then((res) => {
        if (res.data.data == true) {
          this.$message({
            message: "解除分配成功",
            type: "success",
          });
          this.hide();
          this.init();
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.distribution {
  height: 91%;
  .ppp {
    padding-left: 47%;
  }
  .listfolder {
    display: flex;
    height: 86%;
    .folder {
      width: 20%;
      margin-top: 10px;
    }
    .list {
      width: 80%;

      margin-top: 10px;
      .line {
        // margin: 0.1% 0;
        margin-top: 0.1%;
        display: flex;
        height: 8%;
        border: 1px solid #f5f6f9;
        div {
          // padding: 0.75% 0;
          display: flex;
          align-items: center;
          justify-content: center;
          // padding: 0.45% 0;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #666f8e;
          text-align: center;
        }

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

        .actions > span {
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
        }
        .sort {
          flex: 1;
        }
        .pagename,
        .company,
        .actions {
          flex: 2;
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

  .mesbox {
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
      z-index: 50;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .main {
      background: #fff;
      position: relative;
      z-index: 100;
      width: 900px;
      height: 500px;
      font-size: 16px;
      letter-spacing: 2px;
      padding-top: 15px;
      .special {
        position: absolute;
        bottom: 10px;
        width: 100%;
      }
      .top {
        text-align: center;
        margin-top: 5px;
        .xm {
          border: 1px solid lightgray;
          border-radius: 4px;
          width: 140px;
          height: 30px;
          padding-left: 15px;
        }
        input:focus {
          border: 1px solid #409eff;
          outline: 0;
          text-align: left;
        }
        * {
          vertical-align: middle;
          margin: 0 5px;
          text-align: center;
        }
        .search,
        .all {
          background: #017cf8;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
          padding: 3px 9px;
        }
      }
      .users {
        width: 90%;
        margin: 10px auto;
        text-align: center;
        .firstline {
          background: #f5f6f9;
        }
        .line {
          display: flex;
          border: 1px solid #f5f6f9;
          margin-top: 5px;
          > .branch {
            flex: 3;
          }
          > div {
            flex: 1;
            padding: 3px 0;
            img {
              vertical-align: middle;
              margin-right: 3px;
            }
            .do {
              background: #f5f4f7;
              border: 1px solid #e5e6eb;
              border-radius: 4px;
              padding: 2px 6px;
              font-family: MicrosoftYaHei;
              font-size: 14px;
              box-sizing: border-box;
              cursor: pointer;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.distribution {
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
</style>