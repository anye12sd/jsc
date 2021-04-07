<template>
  <div class="hasDoing">
    <searchdemo
      four="流程名称"
      one="标题"
      two="请输入标题"
      three="请输入流程名称"
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
        <div class="status" :title="k.tit">{{ st[k.status-1] }}</div>
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
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      demandlist("page=1&type=2").then((res) => {
        console.log("已处理", res);
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
      console.log(`当前页: ${val}`);
      demandlist("type=2&page="+val).then((res) => {
        console.log("已处理", res);
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
    height: 86%;
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
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
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