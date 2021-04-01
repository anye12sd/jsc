<template>
  <div class="roleAssignment">
    <searchdemo
      four="所属单位"
      one="用户名"
      two="请输入用户名"
      three="请输入所属单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="name">用户名</div>
        <div class="company">所属单位</div>
        <div class="uses">所属角色</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="name" :title="k.name">{{ k.name }}</div>
        <div class="company" :title="k.company">{{ k.company }}</div>
        <div class="uses" :title="k.uses">{{ k.users }}</div>
        <div class="actions">
          <span @click="addnew(k)">角色分配</span>
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
  name: "roleAssignment",
  data() {
    return {
      currentPage: 1,
      list:[
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          },
          {
              name:"A",
              company:"民政局",
              users:"普通用户"
          }
      ]
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
.roleAssignment {
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
      
      .actions>span{
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