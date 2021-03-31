<template>
  <div class="addNewDemand">
    <searchdemo
      four="所属单位"
      one="页面名称"
      two="请输入页面名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">需求编号</div>
        <div class="name">需求名称</div>
        <div class="company">需求单位</div>
        <div class="describe">需求描述</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="num">{{ index }}</div>
        <div class="name" :title="k.name">{{ k.name }}</div>
        <div class="company" :title="k.company">{{ k.company }}</div>
        <div class="describe" :title="k.describe">{{ k.describe }}</div>
        <div class="actions">
          <span @click="addnew(k)">新增模型</span>
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
// 新增需求
import searchdemo from "@/components/searchdemo.vue";
export default {
  name: "addNewDemand",
  data() {
    return {
      currentPage:1,
      list: [
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
      ],
    };
  },
  mounted() {},
  components: {
    searchdemo,
  },
  methods: {
    addnew(item) {},
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
.addNewDemand {
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
      }
      .person,
      .actions,
      .pagename {
        flex: 1;
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
}
</style>