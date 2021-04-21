<template>
  <div class="modelManaga">
    <!-- <searchdemo :four="true" one="模型编号" two="请输入模型编号"></searchdemo> -->
    <div class="addnew" v-if="ismanaga">
      <span @click="addnew">新增模型</span>
    </div>
    <div class="listfolder">
      <div class="folder">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="list">
        <div class="line topline">
          <!-- <div>模型编号</div> -->
          <div>模型名称</div>
          <div>类型</div>
          <div>所属单位</div>
          <div>模型修改时间</div>
          <div class="actions">操作</div>
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
          <!-- <div :title="year+'000'+k.id">{{year+"000"+k.id }} </div> -->
          <div :title="k.modulename">{{ k.modulename }}</div>
          <div :title="k.module_type">{{ k.module_type }}</div>
          <div :title="k.branch_id">{{ k.branch_id }}</div>
          <div :title="k.update_time">{{ k.update_time }}</div>
          <div class="actions">
            <p @click="goup(k.id, index)" v-if="k.load == 2 || k.load == 3">
              <img :src="change" alt="图片资源缺失" /> <span>上架</span>
            </p>
            <p><img :src="off" alt="图片资源缺失" /> <span>修改</span></p>
            <p @click="godown(k.id, index)" v-if="k.load == 1 || k.load == 3">
              <img :src="puton" alt="图片资源缺失" /> <span>下架</span>
            </p>
          </div>
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
    <modify
      v-if="showModify"
      @justHide="justHide"
      :changeAble="waitchange"
      @changeConfirm="justHide"
      @subok="subok"
    ></modify>
  </div>
</template>

<script>
import change from "@/assets/listlogo/channge.png";
import off from "@/assets/listlogo/off.png";
import puton from "@/assets/listlogo/puton.png";
import modify from "./modify";
// import searchdemo from "@/components/searchdemo.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { getlist, appload, appCategory } from "@/api/list.js";
export default {
  name: "modelManaga",
  data() {
    return {
      list: [],
      year: 0,
      change,
      off,
      puton,
      ismanaga: false,
      showModify:false,
      currentPage: 1,
      total: 0,
      data: [],
      defaultProps: {
        children: "item",
        label: "category_name",
      },
      queryId: null,
      waitchange:false
    };
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  mounted() {
    this.year = new Date().getFullYear();
    getlist("page=1").then((res) => {
      // console.log(res);
      this.list = res.data.data.list;
      this.total = res.data.data.count;
    });
    appCategory().then((res) => {
      console.log("分类", res);
      this.data = res.data.data;
    });
    console.log(this[3])
    if(this.identity == 1 || this.identity == 2) {
      this.ismanaga = true
    }
  },
  components: {
    modify
    // searchdemo,
  },
  methods: {
    justHide() {
      this.showModify = false;
      this.waitchange = false;
    },
    subok() {
      this.showModify = false;
      this.waitchange = false;
      // this.init()
    },
    changeModel(k) {
      this.showModify = true;
      this.waitchange = k;
    },
    addnew(){
      this.showModify = true;
    },
    handleNodeClick(data) {
      console.log(data);
      this.queryId = data.id;
      let str = "category_id=" + data.id + "&page=1";
      this.getdata(str);
      this.currentPage = 1;
    },
    getdata(query) {
      getlist(query).then((res) => {
        console.log(res);
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
    goup(id, index) {
      appload("load=1&id=" + id).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.list[index].load = res.data.data.load;
        }
      });
    },
    godown(id, index) {
      appload("load=2&id=" + id).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.list[index].load = res.data.data.load;
        }
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      let queryStr = "";
      if (this.queryId) {
        queryStr = "category_id=" + this.queryId + "&page=" + val;
      } else {
        queryStr = "page=" + val;
      }
      getlist(queryStr).then((res) => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
  }
};
</script>

<style scoped lang="less">
.modelManaga {
  height: 91%;
  .addnew {
    height: 35px;
    line-height: 35px;
    text-align: right;
    span {
      background: #017cf8;
      border-radius: 4px;
      color: #fff;
      padding: 3px 5px;
      cursor: pointer;
    }
  }
  .listfolder {
    display: flex;
    height: 86%;
    .folder {
      width: 20%;
    }
    .list {
      width: 80%;
    }
  }
  .pagination {
    padding-left: 47%;
  }
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
        overflow: hidden;
        text-overflow: ellipsis;
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
}
</style>