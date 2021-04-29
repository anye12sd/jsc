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
      <div v-for="(k, index) in list" :key="index" class="line">
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
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import { demandlist } from "@/api/list.js";
export default {
  name: "hasDoing",
  data() {
    return {
      currentPage: 1,
      st: ["通过", "驳回", "无状态", "单位分配", "开发中"],
      total: 1,
      list: [],
      querymesg: null,
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    this.getdata();
  },
  methods: {
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
        "page=1&type=3&demand_name=" +
          this.querymesg.demand_name +
          "&start_time=" +
          this.querymesg.start_time +
          "&end_time=" +
          this.querymesg.end_time
      ).then((res) => {
        console.log("搜索", res);
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
          "&type=3&demand_name=" +
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
}
</style>