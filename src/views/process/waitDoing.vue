<template>
  <div class="waitDoing">
    <searchdemo
      four="流程名称"
      one="标题"
      two="请输入标题"
      three="请输入流程名称"
    ></searchdemo>
    <div class="se">
      <div class="go">批量审核通过</div>
      <div class="back">批量申请驳回</div>
    </div>
    <div class="list">
      <div class="line topline">
        <!-- <div class="sele"></div> -->
        <div class="choise">
          <img
            :src="isAll ? checked : notcheck"
            alt="图标缺失"
            @click="choseAll"
          />
          <span>全选/全不选</span>
        </div>
        <div class="num">序号</div>
        <div class="name">流程名称</div>
        <div class="time">申请时间</div>
        <div class="actions">模型审批</div>
      </div>
      <div
        v-if="list.length == 0"
        style="text-align: center; height: 50px; line-height: 50px; color: gray"
      >
        暂无数据
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="choise">
          <img
            :src="k.isSelect ? checked : notcheck"
            alt="图标缺失"
            @click="chose(k)"
          />
          <!-- <div :class="k.isSelect ? 'selected' : 'notselect'"></div> -->
        </div>
        <div class="num">{{ k.id }}</div>
        <div class="name" :name="k.name">{{ k.demand_name }}</div>
        <div class="time" :title="k.time">{{ k.create_time }}</div>
        <div class="actions">
          <p @click="goon(k.id, index)">
            <img :src="adopt" alt="图片资源缺失" /> <span>通过</span>
          </p>
          <p @click="refuse(k.id, index)">
            <img :src="reject" alt="图片资源缺失" /> <span>驳回</span>
          </p>
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
      :total="total"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import adopt from "@/assets/listlogo/adopt.png";
import reject from "@/assets/listlogo/reject.png";
import checked from "@/assets/listlogo/checked.png";
import notcheck from "@/assets/listlogo/notcheck.png";
import { demandlist, demandstatus } from "@/api/list.js";
export default {
  name: "waitDoing",
  data() {
    return {
      adopt,
      checked,
      notcheck,
      reject,
      currentPage: 1,
      total: 1,
      isAll: false,
      selectedNumber: 0,
      st: ["通过", "驳回", "无状态", "单位分配", "开发中"],
      list: [],
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    this.getdata();
  },
  watch: {
    selectedNumber(newValue, oldValue) {
      if (newValue == 10) {
        this.isAll = true;
      }
      if (newValue < 10) {
        this.isAll = false;
      }
    },
  },
  methods: {
    goon(id, index) {
      demandstatus("status=1&id=" + id).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.list.splice(index, 1);
        }
      });
    },
    refuse(id, index) {
      demandstatus("status=2&id=" + id).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.list.splice(index, 1);
        }
      });
    },
    getdata() {
      demandlist("page=1&type=3").then((res) => {
        console.log("待处理", res);
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
        console.log(this.total);
      });
    },
    choseAll() {
      if (this.isAll) {
        this.isAll = false;
        this.list.forEach((item) => {
          item.isSelect = false;
        });
        this.selectedNumber = 0;
      } else {
        this.isAll = true;
        this.list.forEach((item) => {
          item.isSelect = true;
        });
        this.selectedNumber = 10;
      }
    },
    chose(item) {
      if (item.isSelect) {
        item.isSelect = false;
        this.selectedNumber--;
      } else {
        item.isSelect = true;
        this.selectedNumber++;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      demandlist("type=3&page=" + val).then((res) => {
        if (res.data.status == 200) {
          this.total = res.data.data.count;
          this.list = res.data.data.list;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.waitDoing {
  height: 91%;
  position: relative;
  .se {
    position: absolute;
    top: 2%;
    right: 0;
    display: flex;
    div {
      background: #017cf8;
      border-radius: 4px;
      margin-left: 10px;
      padding: 3px 8px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .back {
      margin-left: 10px;
    }
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
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        img {
          background-color: #fff;
          cursor: pointer;
        }
      }
      .num {
        flex: 1;
      }
      .choise {
        flex: 1;
      }
      .actions {
        // flex: 3;
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
  // .pagination {
  //   margin-top: 1%;
  // }
}
</style>