<template>
  <div class="modelApproval">
    <searchdemo :four="true" one="模型编号" two="请输入模型编号"></searchdemo>
    <div class="list">
      <div class="line topline">
        <div>模型编号</div>
        <div>模型名称</div>
        <div>类型</div>
        <div>所属单位</div>
        <div>模型修改时间</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div>{{ k.num }}</div>
        <div>{{ k.name }}</div>
        <div>{{ k.type }}</div>
        <div>{{ k.address }}</div>
        <div>{{ k.time }}</div>
        <div class="actions">
          <p> <img :src="adopt" alt="图片资源缺失"> <span>通过</span></p>
          <p> <img :src="reject" alt="图片资源缺失"> <span>驳回</span></p>
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
import ll from "./data.json";
import adopt from "@/assets/adopt.png"
import reject from "@/assets/reject.png"
export default {
  name: "modelApproval",
  data() {
    return {
        adopt,reject,
        list:ll,
        currentPage:1
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
};
</script>

<style scoped lang="less">
.modelApproval {
    height: 91%;
  .list {
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
      border: 1px solid #f5f6f9;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 1;
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
  .pagination {
    margin-top: 1%;
  }
}
</style>