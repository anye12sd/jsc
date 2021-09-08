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
        <div class="name">模型名称</div>
        <div class="type">类型</div>
        <div class="company">所属单位</div>
        <div class="actions">操作</div>
      </div>
      <div
        v-if="list.length == 0"
        style="text-align: center; height: 50px; line-height: 50px; color: gray"
      >
        暂无数据
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="name" :title="k.modulename">{{ k.modulename }}</div>
        <div class="type" :title="k.module_type">{{ k.module_type }}</div>
        <div class="company" :title="k.branch_id">{{ k.branch_id }}</div>
        <div class="actions">
          <p @click="topreview(k.id)">
            <img :src="datapreview" alt="图片资源缺失" /> <span>数据预览</span>
          </p>
          <p @click="expo(k.id)">
            <img :src="dataexport" alt="图片资源缺失" /> <span>数据导出</span>
          </p>
          <p @click="cancelsub(k)" :class="k.type == 0 ? 'blue' : 'gray'">
            <img :src="subsc" alt="图片资源缺失" />
            <span>{{ k.type == 0 ? "取消订阅" : "已取消" }}</span>
          </p>
        </div>
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
    <div class="preview" v-show="showPreview">
      <div class="mask" @click="hide"></div>
      <div class="main">
        <div v-for="(k, index) in previewList" :key="index" class="col">
          <div v-for="(p, idx) in k" :key="index + idx" :title="p">{{ p }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import datapreview from "@/assets/listlogo/datapreview.png";
import dataexport from "@/assets/listlogo/dataexport.png";
import subsc from "@/assets/listlogo/subscribe.png";
import { appuserlist, dele, apppreview } from "@/api/list.js";

export default {
  name: "modelDownload",
  data() {
    return {
      datapreview,
      dataexport,
      subsc,
      total: 0,
      currentPage: 1,
      list: [],
      previewList: [],
      showPreview: false,
    };
  },
  mounted() {
    appuserlist(1).then((res) => {
      console.log(res);
      this.list = res.data.data.list;
      this.total = res.data.data.count;
    });
  },
  methods: {
    expo(id) {
      let access_token = location.search.split("=")[1] || sessionStorage.getItem("access_token");
      window.open(
        "http://10.21.197.237/app/sql?id=" +
          id +
          "&access_token=" +
          access_token
      );
      // appsql(id).then(res=>{
      //   console.log(res)
      // })
    },
    hide() {
      this.showPreview = false;
    },
    topreview(id) {
      // this.$router.push("/sqlPreview/"+id)
      apppreview(id).then((res) => {
        console.log("预览",res)
        this.showPreview = true;
        this.previewList = res.data.data;
      });
    },
    cancelsub(k) {
      dele(k.id).then((res) => {
        // console.log(res)
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      appuserlist(val).then((res) => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
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
    height: calc(91% - 35px);;
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
      .type {
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
      .actions > p:nth-of-type(3) {
        margin-left: 5px;
      }
      .actions > .blue {
        color: #017cf8;
      }
      .actions > .gray {
        color: gray;
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
  .preview {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }
    .main{
      position: relative;
      padding: 30px;
      width: 80%;
      height: 80%;
      z-index: 100;
      background-color: #fff;
      overflow: scroll;
      border: 1px solid #000;
    }
    .main>div{
      // display: flex;
      // overflow: scroll;
      white-space: nowrap;
      // border-bottom: 1px solid #000;
      // border-left: 1px solid #000;
      // border-right: 1px solid #000;
      font-size: 0;
      div{
        display: inline-block;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        text-align: center;
        width: 120px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .main>div:nth-of-type(1){
      div{
        border-top: 1px solid #000;
      }
    }
    .main>div>div:nth-of-type(1){
      border-left: 1px solid #000;
    }
  }
}
</style>