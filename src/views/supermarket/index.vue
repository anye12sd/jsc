<template>
  <div class="supermarket">
    <div class="tit">模型超市</div>
    <div class="option">
      <div
        :class="'op ' + (current == 0 ? 'status02' : 'status01')"
        @click="chose(0)"
      >
        模型管理
      </div>
      <div
        :class="'op ' + (current == 1 ? 'status12' : 'status11')"
        @click="chose(1)"
      >
        模型上架
      </div>
      <div
        :class="'op ' + (current == 2 ? 'status12' : 'status11')"
        @click="chose(2)"
      >
        模型审批
      </div>
    </div>
    <div class="managa" v-if="current == 0">
      <searchdemo :four="true" one="模型编号" two="请输入模型编号"></searchdemo>
      <div class="list">
        <div class="line topline">
          <div>模型编号</div>
          <div>模型名称</div>
          <div>类型</div>
          <div>所属单位</div>
          <div>模型修改时间</div>
          <div class="actions">操作</div>
        </div>
        <div v-for="(k, index) in list" :key="index" class="line">
          <div>{{ k.num }}</div>
          <div>{{ k.name }}</div>
          <div>{{ k.type }}</div>
          <div>{{ k.address }}</div>
          <div>{{ k.time }}</div>
          <div class="actions">
            <p><img :src="change" alt="图片资源缺失" /> <span>上架</span></p>
            <p><img :src="off" alt="图片资源缺失" /> <span>修改</span></p>
            <p><img :src="puton" alt="图片资源缺失" /> <span>下架</span></p>
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
    <modelputon v-else-if="current == 1"></modelputon>
    <modelapproval v-else-if="current == 2"></modelapproval>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import modelputon from './modelPuton'
import modelapproval from './modelApproval';
import ll from "./data.json";
import change from "@/assets/channge.png";
import off from "@/assets/off.png";
import puton from "@/assets/puton.png";

export default {
  name: "supermarket",
  data() {
    return {
      change,
      off,
      puton,
      current: 0,
      list: ll,
      currentPage:1
    };
  },
  components: {
    searchdemo,modelputon,modelapproval,
  },
  methods: {
    chose(i) {
      this.current = i;
    },
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
.supermarket {
  margin: 1% auto 0 auto;
  width: 91%;
  height: 89%;
  background: #ffffff;
  border-radius: 4px;
  padding: 20px 30px;
  box-sizing: border-box;
  .option {
    display: flex;
    border-bottom: 1px solid #ebebeb;
    margin-top: 1%;
    .op {
      width: 113px;
      padding: 7px 0;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      cursor: pointer;
      background-size: 98% 98%;
    }
    .op:nth-of-type(1) {
      padding-left: 20px;
      box-sizing: border-box;
    }
    .op:nth-of-type(2) {
      text-align: center;
      position: relative;
      left: -10px;
    }
    .op:nth-of-type(3) {
      text-align: center;
      position: relative;
      left: -20px;
    }
  }
  .status01 {
    background-image: url("../../assets/rect01.png");
    background-repeat: no-repeat;
    color: #666f8e;
  }
  .status02 {
    background-image: url("../../assets/rect02.png");
    background-repeat: no-repeat;
    color: #ffffff;
  }
  .status11 {
    background-image: url("../../assets/rect11.png");
    background-repeat: no-repeat;
    color: #666f8e;
  }
  .status12 {
    background-image: url("../../assets/rect12.png");
    background-repeat: no-repeat;
    color: #ffffff;
  }
  .managa {
    height: 91%;
  }

  .list {
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
      border: 1px solid #f5f6f9;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 1;
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
      .actions>p:nth-of-type(1){
        color: #017CF8;
      }
      .actions>p:nth-of-type(2){
        margin-left: 5px;
        color: #017CF8;
      }
      .actions>p:nth-of-type(3){
        margin-left: 5px;
        color: #FD6969;
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
  .pagination {
    margin-top: 1%;
  }
}
</style>