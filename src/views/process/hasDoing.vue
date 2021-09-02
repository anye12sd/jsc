<template>
  <div class="hasDoing">
    <searchdemo
      :four="true"
      one="流程名称"
      two="请输入流程名称"
      @feedback="justgoto"
      @clear="clear"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">序号</div>
        <div class="name">流程名称</div>
        <div class="time">处理时间</div>
        <div class="status">状态</div>
        <!-- <div class="actions">操作</div> -->
      </div>
      <div
        v-if="list.length == 0"
        style="text-align: center; height: 50px; line-height: 50px; color: gray"
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
        <div class="name" :title="k.name">{{ k.demand_name }}</div>
        <div class="time" :title="k.time">{{ k.create_time }}</div>
        <div class="status" :title="k.tit">{{ st[k.status - 1] }}</div>
        <!-- <div class="actions">
          <span @click="addnew(k)">新增模型</span>
        </div> -->
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
    <div class="detail" v-show="drawer">
      <div class="mask" @click="hide"></div>
      <div class="main">
        <div class="left" v-if="detail2">
          <div>
            <span>需求名称:</span><span>{{ detail2.demand_name }}</span>
          </div>
          <div>
            <span>发起人:</span><span>{{ detail2.username }}</span>
          </div>
          <div>
            <span>需求类型:</span><span>{{ detail2.demand_type }}</span>
          </div>
          <div>
            <span>单位:</span><span>{{ detail2.get_branch_name }}</span>
          </div>
          <div>
            <span>时间:</span><span>{{ detail2.create_time }}</span>
          </div>
          <div class="spec">
            <span>需求描述:</span
            ><span class="desc">{{ detail2.demand_describe }}</span>
          </div>
        </div>
        <div class="right">
          <div>
            <span>审批记录</span>
            <span>审批时间</span>
          </div>
          <div v-for="k in detail" :key="k.id">
            <span>{{ k.message }}</span>
            <span>{{ k.create_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import { demandlist, getdetail, getdemand } from "@/api/list.js";
export default {
  name: "hasDoing",
  data() {
    return {
      currentPage: 1,
      st: ["通过", "已驳回", "无状态", "已通过", "已通过",'已驳回','正在开发','完成'],
      total: 1,
      list: [],
      querymesg: null,
      detail: [],
      detail2: null,
      drawer: false,
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    this.getdata();
  },
  methods: {
    hide() {
      this.drawer = false;
    },
    showdetail(id) {
      // console.log(id);
      this.drawer = true;
      getdetail(id).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.detail = res.data.data;
        }
      });
      getdemand(id).then((res) => {
        if (res.data.status == 200) {
          this.detail2 = res.data.data;
        }
      });
    },
    justgoto(p1, p2) {
      // console.log(p1, p2);
      // console.log(
      //   p2[0].getTime(),
      //   p2[1].getTime(),
      //   p2[0].getTime() / 1000,
      //   p2[1].getTime() / 1000
      // );
      this.querymesg = {};
      this.querymesg.demand_name = p1;
      if (!p2) {
        this.querymesg.start_time = "";
        this.querymesg.end_time = "";
      } else {
        this.querymesg.start_time = p2[0].getTime() / 1000;
        this.querymesg.end_time = p2[1].getTime() / 1000;
      }

      demandlist(
        "page=1&type=2&demand_name=" +
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
    getdata() {
      demandlist("page=1&type=2").then((res) => {
        // console.log("已处理", res);
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let str = "";
      if (this.querymesg) {
        str =
          "page=" +
          val +
          "&type=2&demand_name=" +
          this.querymesg.demand_name +
          "&start_time=" +
          this.querymesg.start_time +
          "&end_time=" +
          this.querymesg.end_time;
      } else {
        str = "type=3&page=" + val;
      }
      demandlist(str).then((res) => {
        // console.log("已处理", res);
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
.hasDoing {
  height: 91%;
  .list {
    height: calc(91% - 35px);
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 8%;
      border: 1px solid #f5f6f9;
      div {
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
    }
    .topline {
      background: #f5f6f9;
      margin: 0;
      div {
        padding: 0.5% 0;
      }
    }
  }
  .detail {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .main {
      width: 880px;
      height: 500px;
      background-color: #fff;
      position: relative;
      padding: 20px;
      overflow: auto;
      display: flex;
      > .left {
        width: 55%;
        > div {
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
            width: 300px;
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
      > .right {
        width: 45%;
        > div {
          display: flex;
          border: 1px solid #f5f6f9;
          padding: 5px 0;
          margin-top: 5px;
          span {
            width: 50%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>