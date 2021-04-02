<template>
  <div class="hasDoneDemand">
    <searchdemo
      four="流程名称"
      one="标题"
      two="请输入标题"
      three="请输入流程名称"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">序号</div>
        <div class="tit">标题</div>
        <div class="name">流程名称</div>
        <div class="time">完成时间</div>
        <!-- <div class="actions">操作</div> -->
      </div>
      <div v-if="list.length == 0" style="text-align: center; height:50px;line-height:50px;color:gray">暂无数据</div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="num">{{ index }}</div>
        <div class="tit" :title="k.tit">{{ k.tit }}</div>
        <div class="name" :title="k.name">{{ k.name }}</div>
        <div class="time" :title="k.time">{{ k.time }}</div>
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
      :page-size="11"
      layout="total, prev, pager, next, jumper"
      :total="1000"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
// 需求已办
import searchdemo from "@/components/searchdemo.vue";
export default {
  name: "hasDoneDemand",
  data() {
    return {
      currentPage: 1,
      list: [
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          tit: "热线投诉模型开发",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        }
      ],
    };
  },
  components: {
    searchdemo,
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped lang="less">
.hasDoneDemand {
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
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 2;
      }
      .num{
        flex: 1;
      }
      .actions > span{
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