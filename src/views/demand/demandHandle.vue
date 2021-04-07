<template>
  <div class="demandHandle">
    <searchdemo
      four="需求单位"
      one="需求名称"
      two="请输入需求名称"
      three="请输入需求单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">需求编号</div>
        <div class="name">需求名称</div>
        <div class="company">需求单位</div>
        <div class="status">状态</div>
        <div class="actions">操作</div>
      </div>
      <div
        v-if="list.length == 0"
        style="text-align: center; height: 50px; line-height: 50px; color: gray"
      >
        暂无数据
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="num">{{ index }}</div>
        <div class="name" :title="k.demand_name">{{ k.demand_name }}</div>
        <div class="company" :title="k.branch_id">{{ k.branch_id }}</div>
        <div class="status" :title="st[k.status - 1]">{{ st[k.status - 1] }}</div>
        <div class="actions">
          <span @click="selectPerson(index)">{{
            k.actionPeople == null ? "选择开发人员" : k.actionPeople
          }}</span>
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
    <div class="tip" v-show="showtip">
      <div class="mask" @click="justhide"></div>
      <div class="main">
        <div class="tit">
          <span>开发人员</span>
          <span>操作</span>
        </div>
        <div v-for="p in actionPeoples" :key="p" class="each">
          <span>{{ p }}</span>
          <span @click="confirmChose(p)">选择</span>
        </div>
      </div>
    </div>
    <div class="tip2" v-show="showtip2">
      <div class="main">
        <p>确认选择该人员吗</p>
        <span class="cancel" @click="cancel">取消</span>
        <span class="confirm" @click="confirm">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
// 需求处理
import searchdemo from "@/components/searchdemo.vue";
import { demandlist } from "@/api/list.js";
export default {
  name: "demandHandle",
  data() {
    return {
      currentPage: 1,
      showtip: false,
      showtip2: false,
      activeNum: -1,
      waitconfirmperson: null,
      st: ["通过", "驳回", "无状态", "单位分配", "开发中"],
      list: [],
      actionPeoples: ["张三1212", "李四2222", "王五", "赵六222222"],
    };
  },
  mounted() {
    this.getdata()
  },
  components: {
    searchdemo,
  },
  methods: {
    getdata() {
      demandlist("page=1&type=3&status=4").then((res) => {
        console.log("需求处理",res)
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      demandlist("status=4&type=3&page=" + val).then((res) => {
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
    selectPerson(idx) {
      this.showtip = true;
      this.activeNum = idx;
      // item.actionPeople = "张三"
    },
    justhide() {
      this.showtip = false;
      this.activeNum = -1;
    },
    confirmChose(p) {
      this.waitconfirmperson = p;
      this.showtip2 = true;
    },
    confirm() {
      this.list[this.activeNum].actionPeople = this.waitconfirmperson;
      this.activeNum = -1;
      this.showtip = false;
      this.showtip2 = false;
    },
    cancel() {
      this.showtip2 = false;
    },
  },
};
</script>

<style scoped lang="less">
.demandHandle {
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
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .num {
        flex: 1;
      }
      .actions {
        // flex: 1;
        text-align: center;
        span {
          // display: flex;
          // align-items: center;
          display: inline-block;
          vertical-align: middle;
          width: 100px;
          background: #f5f4f7;
          border: 1px solid #e5e6eb;
          border-radius: 4px;
          padding: 2px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          cursor: pointer;
        }
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
  .tip {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 10;
    }
    .main {
      width: 700px;
      height: 400px;
      //   background-image: url("../../assets/bg.png");
      padding: 30px 0;
      background-size: cover;
      overflow: hidden;
      position: absolute;
      top: 120px;
      left: calc(50% - 350px);
      background-color: #fff;
      z-index: 20;

      .each {
        display: flex;
        justify-content: space-around;
        align-items: center;
        // border: 1px solid #a7a9b1;
        border: 1px solid #f5f6f9;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        margin: 5px auto 0 auto;
        width: 90%;
        padding: 4px 0;
        span {
          display: inline-block;
          width: 100px;
          text-align: center;
        }
      }
      .each > span:nth-of-type(2) {
        background-color: #f5f4f7;
        cursor: pointer;
        color: #017cf8;
      }
      .tit {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        background: #f5f6f9;
        margin: 5px auto 0 auto;
        width: 90%;
        padding: 4px 0;
        span {
          width: 100px;
          color: #666f8e;
          text-align: center;
        }
      }
    }
  }
  .tip2 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 30;
    .main {
      width: 300px;
      margin-left: calc(50% - 150px);
      background-color: #fff;
      margin-top: 160px;
      padding: 20px 0;
      text-align: center;
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      p {
        margin-bottom: 20px;
      }
      .cancel {
        width: 100px;
        height: 36px;
        background: #ffffff;
        box-sizing: border-box;
        line-height: 36px;
        border: 1px solid #cccfd7;
        box-shadow: 0 0 6px 0 rgba(38, 91, 218, 0.04);
        border-radius: 4px;
        color: #384155;
        text-align: center;
        cursor: pointer;
        display: inline-block;
      }
      .confirm {
        display: inline-block;
        width: 100px;
        height: 36px;
        box-sizing: border-box;
        line-height: 36px;
        background: #017cf8;
        border-radius: 4px;
        margin-left: 10px;
        cursor: pointer;
        color: #fff;
      }
    }
  }
}
</style>