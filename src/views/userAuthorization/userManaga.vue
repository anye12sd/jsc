<template>
  <div class="userManaga">
    <searchdemo
      four="所属单位"
      one="页面名称"
      two="请输入页面名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">姓名</div>
        <div class="account">账号</div>
        <div class="company">手机号</div>
        <div class="describe">状态</div>
        <div class="actions">操作</div>
      </div>
      <div v-if="list.length == 0" style="text-align: center; height:50px;line-height:50px;color:gray">暂无数据</div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="name" :title="k.name">{{ k.name }}</div>
        <div class="account" :title="k.account">{{ k.account }}</div>
        <div class="number" :title="k.number">{{ k.number }}</div>
        <div class="state" :title="k.state">{{ k.state }}</div>
        <div class="actions">
          <span>修改</span>
          <span>明细</span>
        </div>
      </div>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="11"
      layout="total, prev, pager, next, jumper"
      :total="1000"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
export default {
  name: "userManaga",
  data() {
    return {
      currentPage: 1,
      list: [
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
        {
          name: "余敏",
          account: "139****4846",
          number: "139****4846",
          state: "正常",
        },
      ],
    };
  },
  components: {
    searchdemo,
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.userManaga {
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
      }
      .actions {
        flex: 3;
        span {
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
      .actions>span:nth-of-type(1){
        margin-right: 10px;
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