<template>
  <div class="addNewDemand">
    <searchdemo
      four="所属单位"
      one="页面名称"
      two="请输入页面名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="add" @click="addNew">新增需求</div>
    <div class="list">
      <div class="line topline">
        <div class="num">需求编号</div>
        <div class="name">需求名称</div>
        <div class="company">需求单位</div>
        <div class="describe">需求描述</div>
      </div>
      <div v-if="list.length == 0" style="text-align: center; height:50px;line-height:50px;color:gray">暂无数据</div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="num">{{ index }}</div>
        <div class="name" :title="k.name">{{ k.name }}</div>
        <div class="company" :title="k.company">{{ k.company }}</div>
        <div class="describe" :title="k.describe">{{ k.describe }}</div>
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
    <div class="write" v-show="showWrite">
      <div class="mask"></div>
      <div class="main">
        <div class="tit">新增需求</div>
        <div>
          <label for="">需求名称</label>
          <input type="text" id="demandName" v-model="form.demandName" />
        </div>
        <div>
          <label>需求单位</label>
          <el-select v-model="form.company" placeholder="选择需求单位">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <label for="deamndDescribe" class="labeldescribe">需求描述</label>
          <textarea
            id="deamndDescribe"
            cols="70"
            rows="14"
            v-model="form.describe"
          ></textarea>
        </div>
        <div class="actions">
          <div class="cancel" @click="cancel">取消</div>
          <div class="confirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 新增需求
import searchdemo from "@/components/searchdemo.vue";
import {demanduser} from "@/api/managa.js"
export default {
  name: "addNewDemand",
  data() {
    return {
      showWrite: false,
      currentPage: 1,
      form: {
        demandName: null,
        company: null,
        describe: null,
      },
      options: [],
      list: [
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
        {
          num: 1,
          name: "XXX需求开发模型",
          company: "委办局A",
          describe: "开发XXXXXXXXXX",
          actionPeople: null,
        },
      ],
    };
  },
  mounted() {
    
  },
  components: {
    searchdemo,
  },
  methods: {
    addNew(){
      this.showWrite = true;
      demanduser().then(res=>{
        console.log(res)
        this.options = res.data.data
      })
    },
    cancel() {
      this.form = {
        demandName: null,
        company: null,
        describe: null,
      };
      this.showWrite = false;
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
.addNewDemand {
  height: 91%;
  position: relative;
  .add {
    position: absolute;
    top: 2%;
    right: 0;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #292929;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #017cf8;
    color: #fff;
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
          cursor: pointer;
          color: #017cf8;
          display: inline-block;
          text-align: center;
          width: 80px;
          background: #f5f4f7;
          border: 1px solid #e5e6eb;
          border-radius: 4px;
          padding: 2px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
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
  .write {
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
      #demandName {
        background-color: #fff;
        width: 500px;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
      }
      #demandName:focus,
      textarea:focus {
        border: 1px solid #409eff;
      }
      .labeldescribe {
        vertical-align: top;
      }
      .el-select {
       width: 500px;
      }
      label {
        margin-right: 10px;
      }
    }
    .main > div {
      padding-left: 150px;
      margin-top: 20px;
    }
    .main > .tit {
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      color: #000000;
      text-align: center;
      margin-top: 25px;
      display: block;
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
}
</style>