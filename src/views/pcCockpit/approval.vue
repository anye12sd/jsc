<template>
  <div class="Approval">
    <searchdemo :four="true"></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="person">申请人</div>
        <div class="pagename">页面名称</div>
        <div class="gotime">申请时间</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k,index) in list" :key="index" class="line">
        <div class="person">{{ k.person }}</div>
        <div class="pagename">{{ k.name }}</div>
        <div class="gotime">{{ k.time }}</div>
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
  name: "Approval",
  data() {
    return {
      adopt,reject,
      list: ll,
      currentPage: 1,
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
.Approval {
  height: 91%;
  .list {
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
      border: 1px solid #F5F6F9;
      div {
        // padding: 0.75% 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
      }
      .person,
      .actions {
        flex: 1;
        p{
          // display: flex;
          // align-items: center;
          display: inline-block;
          vertical-align: middle;
          width: 70px;
          background: #F5F4F7;
          border: 1px solid #E5E6EB;
          border-radius: 4px;
          padding: 2px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          cursor: pointer;
          *{
            vertical-align: middle;
          }
        }
      }
      .actions>p:nth-of-type(1){
        color: #017CF8;
      }
      .actions>p:nth-of-type(2){
        margin-left: 5px;
        color: #FD6969;
      }
      .pagename,
      .gotime {
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
  .pagination{
    margin-top: 1%;
  }
}
</style>