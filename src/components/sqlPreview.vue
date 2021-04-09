<template>
  <div class="sqlPrewiew">
    <div class="menu">
      <span>数据预览</span>
      <span class="back" @click="back">返回</span>
    </div>
    <div class="list">
      <div v-for="(p, index) in list" :key="index" class="line">
        <div v-for="(k, idx) in p" :key="idx">
          {{ k }}
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
import { apppreview } from "@/api/list.js";
export default {
  name: "sqlPrewiew",
  data() {
    return {
      currentPage: 1,
      list: [],
    };
  },
  mounted(){
    console.log(this.$route.params.id)
    this.getdata()
  },
  methods: {
    getdata(){
      apppreview(this.$route.params.id).then(res=>{
        console.log(res)
        this.list = res.data
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.sqlPrewiew {
  margin: 1% auto 0 auto;
  width: 91%;
  height: 89.6%;
  overflow: hidden;
  background: #ffffff;
  border-radius: 4px;
  padding: 20px 30px;
  box-sizing: border-box;
  .menu {
    display: flex;
    justify-content: space-between;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    .back {
      background: #017cf8;
      color: #fff;
      border-radius: 4px;
      padding: 0 6px;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
    }
  }
  .list {
    height: 86%;
    margin-top: 3.2%;
    .line {
      margin-top: 0.4%;
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
      }
    }
  }
}
</style>