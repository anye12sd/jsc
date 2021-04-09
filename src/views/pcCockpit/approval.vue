<template>
  <div class="Approval">
    <searchdemo
      four="所属单位"
      one="页面名称"
      two="请输入页面名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="pagename">页面名称</div>
        <div class="company">所属单位</div>
        <div class="sort">排序</div>
        <div class="actions">操作</div>
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="pagename">{{ k.view_name }}</div>
        <div class="company">{{ k.branch_id }}</div>
        <div class="sort">{{ k.list_order }}</div>
        <div class="actions">
          <p @click="goup(k)"><img :src="adopt" alt="图片资源缺失" /> <span>上移</span></p>
          <p @click="godown(k)"><img :src="reject" alt="图片资源缺失" /> <span>下移</span></p>
          <p @click="deletepage(k,index)">
            <img v-if="!k.deleted" :src="delelogo" alt="图片资源缺失" /> <span >{{k.deleted?"已删除":"删除页面"}}</span>
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
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
// import ll from "./data.json";
import adopt from "@/assets/listlogo/adopt.png";
import reject from "@/assets/listlogo/reject.png";
import delelogo from "@/assets/listlogo/delete.png";
import { getorder,order,dele } from "@/api/list.js";
export default {
  name: "Approval",
  data() {
    return {
      adopt,
      reject,
      delelogo,
      total: 0,
      list: [],
      currentPage: 1,
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    getorder(1).then((res) => {
      // console.log(res);
      this.list = res.data.data.list;
      this.list.forEach(item=>{
        item.deleted = false
      })
      this.total = res.data.data.count;
    });
  },
  methods: {
    goup(k){
      let str = "id="+k.id+"&type="+ 1
      order(str).then(res=>{
        // console.log(res)
        if(res.status==200) {
          k.list_order--
        }
      })
    },
    godown(k){
      let str = "ids="+k.id+"&type="+ 2
      order(str).then(res=>{
        // console.log(res)
        if(res.status==200) {
          k.list_order++
        }
      })
    },
    deletepage(k,index){
      dele(k.id).then(res=>{
        // console.log(res)
        if(res.data.data==true) {
          k.deleted = true
          this.list[index].deleted = true
          this.$forceUpdate();
        }
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      getorder(val).then((res) => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
  },
};
</script>

<style scoped lang="less">
.Approval {
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
        width: 85px;
      }
      .sort {
        flex: 1;
      }
      .pagename,
      .company,
      .actions {
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
  // .pagination{
  //   margin-top: 1%;
  // }
}
</style>