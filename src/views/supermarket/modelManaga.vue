<template>
  <div class="modelManaga">
    <searchdemo :four="true" one="模型编号" two="请输入模型编号"></searchdemo>
    <div class="list">
      <div class="line topline">
        <!-- <div>模型编号</div> -->
        <div>模型名称</div>
        <div>类型</div>
        <div>所属单位</div>
        <div>模型修改时间</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <!-- <div :title="year+'000'+k.id">{{year+"000"+k.id }} </div> -->
        <div :title="k.modulename">{{ k.modulename }} </div>
        <div :title="k.module_type">{{ k.module_type }} </div>
        <div :title="k.branch_id">{{ k.branch_id }} </div>
        <div :title="k.update_time">{{ k.update_time }} </div>
        <div class="actions">
          <p @click="goup(k.id,index)" v-if="k.load == 2 || k.load == 3"><img :src="change" alt="图片资源缺失" /> <span>上架</span></p>
          <p><img :src="off" alt="图片资源缺失" /> <span>修改</span></p>
          <p @click="godown(k.id,index)" v-if="k.load == 1 || k.load == 3"><img :src="puton" alt="图片资源缺失" /> <span>下架</span></p>
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
import change from "@/assets/listlogo/channge.png";
import off from "@/assets/listlogo/off.png";
import puton from "@/assets/listlogo/puton.png";
import searchdemo from "@/components/searchdemo.vue";
import { getlist,appload } from "@/api/list.js";
export default {
  name: "modelManaga",
  data() {
    return {
      list: [],
      year:0,
      change,
      off,
      puton,
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    this.year = new Date().getFullYear();
    getlist(1).then((res) => {
      console.log(res);
      this.list = res.data.data.list;
      this.total = res.data.data.count;
    });
  },
  components: {
    searchdemo,
  },
  methods: {
    goup(id,index){
      appload("load=1&id="+id).then(res=>{
        // console.log(res)
        if(res.data.status == 200) {
          this.list[index].load = res.data.data.load
        }
      })
    },
    godown(id,index){
      appload("load=2&id="+id).then(res=>{
        // console.log(res)
        if(res.data.status == 200) {
          this.list[index].load = res.data.data.load
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      getlist(val).then((res) => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
  },
};
</script>

<style scoped lang="less">
.modelManaga {
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