<template>
  <div class="waitDemand">
    <searchdemo
      four="流程名称"
      one="类型"
      two="请输入类型"
      three="请输入流程名称"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">序号</div>
        <div class="name">模型名称</div>
        <div class="time">申请时间</div>
        <div class="status">状态</div>
        <div class="actions">操作</div>
      </div>
      <div v-if="list.length == 0" style="text-align: center; height:50px;line-height:50px;color:gray">暂无数据</div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="num">{{ k.id }}</div>
        <div class="name" :title="k.demand_name">{{ k.demand_name }}</div>
        <div class="time" :title="k.create_time">{{ k.create_time }}</div>
        <div class="status" :title="st[k.status-1]">{{ st[k.status-1] }}</div>
        <div class="actions">
          <span @click="develop(k)">模型开发</span>
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
    <div class="develop" v-show="showDevelop">
      <div class="mask"></div>
      <div class="main">
        <div>
          <span>模型类型</span>
          <el-select v-model="type" placeholder="请选择类型">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tip">请勿查询数据超过20000条，防止程序执行超时，无法得到结果</div>
        <div>
          <span class="top">脚本内容</span>
          <textarea cols="70" rows="14" v-model="content"></textarea>
        </div>
        <div class="actions">
          <!-- <span class="confirm" @click="goPreview">数据预览</span> -->
          <span class="confirm" @click="confirm">确定</span>
          <span class="cancel" @click="cancel">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 需求待办
import searchdemo from "@/components/searchdemo.vue";
import {demandexecute,appAdd} from "@/api/list.js"
import { Base64 } from 'js-base64';
export default {
  name: "waitDemand",
  data() {
    return {
      currentPage: 1,
      showDevelop: false,
      type: "SQL脚本",
      active:{},
      total:1,
      content: "",
      st: ["通过", "驳回", "无状态", "单位分配", "开发中"],
      options: [{
          value: "SQL脚本",
          label: "SQL脚本",
        }],
      list: [
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
        {
          type: "待办",
          tit: "热线投诉模型数据使用申请",
          name: "模型数据开发",
          time: "2021年01月29日 12:38:14",
        },
      ],
    };
  },
  components: {
    searchdemo,
  },
  mounted() {
    this.getdata(1)
  },
  methods: {
    confirm(){
      let sql = Base64.encode(this.content)
      appAdd({
        id:this.active.id,
        sql
      }).then(res=>{
        // console.log(res)
        if(res.data.status == 200) {
          this.showDevelop = false;
          this.active = {};
        }
      })
    },
    getdata(page){
      demandexecute("type=3&page="+page).then(res=>{
        // console.log(res)
        if(res.data.status == 200) {
          this.list = res.data.data.list
          this.total = res.data.data.count
        }
      })
    },
    develop(k) {
      this.showDevelop = true;
      this.active = k;
    },
    cancel() {
      this.showDevelop = false;
      this.type = "";
      this.content = "";
    },
    goPreview() {
      this.$router.push("/sqlPreview")
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getdata(val)
    },
  },
};
</script>

<style scoped lang="less">
.waitDemand {
  height: 91%;
  .list {
    height: 85%;
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
      }
      .num {
        flex: 1;
      }
      .actions {
        span {
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
.develop {
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
    width: 880px;
    height: 500px;
    background-image: url("../../assets/bg.png");
    background-size: cover;
    overflow: hidden;
    position: absolute;
    top: 100px;
    left: calc(50% - 440px);
    background-color: #fff;
    z-index: 20;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #000000;
    box-sizing: border-box;
    padding-top: 50px;
    textarea {
      resize: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      padding: 0 15px;
      outline: 0;
      width: 500px;
    }
    .el-select {
      width: 500px;
    }
    input:focus,
    textarea:focus {
      border: 1px solid #409eff;
    }
  }
  
  .main > div {
    padding-left: 150px;
    margin-top: 20px;
    span {
      margin-right: 10px;
    }
    .top {
      vertical-align: top;
    }
  }
  .main>.tip{
    text-align: center;
    width: 100%;
    color: gray;
    padding: 0;
  }
  .main > .actions {
    padding: 0;
    display: flex;
    justify-content: center;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
    .cancel {
      width: 148px;
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
    }
    .confirm {
      width: 148px;
      height: 36px;
      box-sizing: border-box;
      line-height: 36px;
      background: #017cf8;
      border-radius: 4px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  
}
</style>