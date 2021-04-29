<template>
  <div class="roleManaga">
    <searchdemo
      four="模型权限"
      one="角色名称"
      two="请输入角色名称"
      three="请输入模型权限"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="name">角色名称</div>
        <div class="modelAuthority">模型权限</div>
        <div class="pcAuthority">PC驾驶舱页面权限</div>
        <div class="actions">操作</div>
      </div>
      <div v-if="list.length == 0" style="text-align: center; height:50px;line-height:50px;color:gray">暂无数据</div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="name" :title="k.name">{{ k.name }}</div>
        <div class="modelAuthority" :title="k.modelAuthority">
          {{ k.modelAuthority }}
        </div>
        <div class="pcAuthority" :title="k.pcAuthority">
          {{ k.pcAuthority }}
        </div>
        <div class="actions">
          <span @click="addnew(k)">修改权限</span>
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
  name: "roleManaga",
  data() {
    return {
      currentPage: 1,
      list: [
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
        },
        {
          name: "系统管理员",
          modelAuthority: "模型全部权限",
          pcAuthority: "页面全部权限",
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
.roleManaga {
  height: 91%;
  .list {
    height:calc(91% - 35px);;
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
        align-items: center;
        justify-content: center;
      height: 8%;
      border: 1px solid #f5f6f9;
      div {
        // padding: 0.75% 0;
        
        // padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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