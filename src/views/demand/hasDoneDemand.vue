<template>
  <div class="hasDoneDemand">
    <searchdemo
      :four="true"
      one="模型名称"
      two="请输入模型名称"
      @feedback="justgoto"
      @clear="clear"
    ></searchdemo>
    <div class="listfolder">
      <!-- <div class="folder">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div> -->
      <div class="list">
        <div class="line topline">
          <div class="num">序号</div>
          <div class="name">模型名称</div>
          <div class="time">申请时间</div>
          <div class="status">状态</div>
          <!-- <div class="actions">操作</div> -->
        </div>
        <div
          v-if="list.length == 0"
          style="
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: gray;
          "
        >
          暂无数据
        </div>
        <div v-for="(k, index) in list" :key="index" class="line">
          <div class="num">{{ k.id }}</div>
          <div class="name" :title="k.demand_name">{{ k.demand_name }}</div>
          <div class="time" :title="k.create_time">{{ k.create_time }}</div>
          <div class="status" :title="st[k.status - 1]">
            {{ st[k.status - 1] }}
          </div>
          <!-- <div class="actions">
          <span @click="addnew(k)">新增模型</span>
        </div> -->
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
  </div>
</template>

<script>
// 需求已办
import searchdemo from "@/components/searchdemo.vue";
import { demandexecute, appCategory } from "@/api/list.js";
export default {
  name: "hasDoneDemand",
  data() {
    return {
      currentPage: 1,
      total: 1,
      st: ["通过", "驳回", "无状态", "单位分配", "开发中"],
      list: [],
      querymesg: null,
      data: [],
      queryId: null,
      defaultProps: {
        children: "item",
        label: "category_name",
      },
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    this.getdata(1);
    // appCategory().then((res) => {
    //   this.data = res.data.data;
    // });
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
      this.queryId = data.id;
      this.currentPage = 1;
      this.getdata(1);
    },
    justgoto(p1, p2) {
      // console.log(p1, p2);
      // console.log(p2[0].getTime(),p2[1].getTime(),p2[0].getTime()/1000,p2[1].getTime()/1000)
      this.querymesg = {};
      this.querymesg.demand_name = p1;
      if (!p2) {
        this.querymesg.start_time = "";
        this.querymesg.end_time = "";
      } else {
        this.querymesg.start_time = p2[0].getTime() / 1000;
        this.querymesg.end_time = p2[1].getTime() / 1000;
      }
      this.handleCurrentChange(this.currentPage);
    },
    clear() {
      this.querymesg = null;
    },
    getdata(page) {
      let str = "";
      if (this.querymesg) {
        str =
          "page=" +
          page +
          "&type=1&demand_name=" +
          this.querymesg.demand_name +
          "&start_time=" +
          this.querymesg.start_time +
          "&end_time=" +
          this.querymesg.end_time;
      } else {
        str = "type=1&page=" + page;
      }
      if (this.queryId) {
        str = str + "&category_id=" + this.queryId;
      }
      demandexecute(str).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.list = res.data.data.list;
          this.total = res.data.data.count;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getdata(val);
    },
  },
};
</script>

<style scoped lang="less">
.hasDoneDemand {
  height: 91%;
  .pagination{
    padding-left: 47%;
  }
  .listfolder {
    display: flex;
    height: calc(91% - 35px);
    .folder {
      width: 20%;
      margin-top: 10px;
    }
    .list {
      
      width: 100%;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 2;
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
}
</style>