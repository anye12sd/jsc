<template>
  <div class="modelDownload">
    <searchdemo
      four="所属单位"
      one="模型名称"
      two="请输入模型名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="name">页面名称</div>
        <div class="type">类型</div>
        <div class="company">所属单位</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="name">{{ k.name }}</div>
        <div class="type">{{ k.type }}</div>
        <div class="company">{{ k.company }}</div>
        <div class="actions">
          <p><img :src="datapreview" alt="图片资源缺失" /> <span>数据预览</span></p>
          <p><img :src="dataexport" alt="图片资源缺失" /> <span>数据导出</span></p>
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
import datapreview from "@/assets/listlogo/datapreview.png"
import dataexport from "@/assets/listlogo/dataexport.png"
export default {
  name: "modelDownload",
  data() {
    return {
      datapreview,dataexport,
      currentPage:1,
      list: [
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
        {
          name: "招商引资",
          type: "SOL类型",
          company: "质监局",
        },
      ],
    };
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  components: {
    searchdemo,
  },
};
</script>

<style scoped lang="less">
.modelDownload {
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
        display: flex;
        align-items: center;
        justify-content: center;
        // padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 1;
      }
      .actions {
        //   flex: 2;
        p {
          // display: flex;
          // align-items: center;
          display: inline-block;
          vertical-align: middle;
          width: 85px;
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