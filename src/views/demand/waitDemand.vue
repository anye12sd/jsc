<template>
  <div class="waitDemand">
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
          <div class="num">{{ k.id }}</div>
          <div class="name" :title="k.demand_name">{{ k.demand_name }}</div>
          <div class="time" :title="k.create_time">{{ k.create_time }}</div>
          <div class="status" :title="st[k.status - 1]">
            {{ st[k.status - 1] }}
          </div>
          <div class="actions">
            <span @click="develop(k)">模型开发</span>
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
    <div class="develop" v-show="showDevelop">
      <div class="mask"></div>
      <div class="main">
        <!-- <div class="op">
          <span>模型类型</span>
          <el-select class="sec" v-model="type" placeholder="请选择类型">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="op">
          <span>数据库</span>
          <el-select class="sec" v-model="database" placeholder="请选择数据库">
            <el-option
              v-for="(item, index) in databases"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="op">
          <span>内置条件</span>
          <el-select
            class="sec"
            v-model="condition"
            placeholder="请选择内置条件"
          >
            <el-option
              v-for="(item, index) in conditions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </div>
        <div class="op">
          <span>处理方式</span>
          <div class="sec" style="line-height: 40px; padding-left: 20px">
            <el-radio v-model="radio" label="1">导出数据</el-radio>
            <el-radio v-model="radio" label="2">数据规整</el-radio>
          </div>
        </div>
        <div class="tip" v-show="condition == 1">
          内置条件选择时间，sql语句必须使用{start_time}
          {end_time}表示开始结束时间
        </div>
        <div class="op">
          <span class="top">脚本内容</span>
          <textarea
            class="sec"
            cols="70"
            rows="14"
            v-model="content"
          ></textarea>
        </div>
        <div class="actions">
          <!-- <span class="confirm" @click="goPreview">数据预览</span> -->
          <span class="confirm" v-if="!hasyz" @click="yanzheng">验证</span>
          <span class="confirm" @click="confirm" v-if="hasyz">确定</span>
          <span class="cancel" @click="cancel">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 需求待办
import searchdemo from "@/components/searchdemo.vue";
import { demandexecute, appAdd, appCategory,testing } from "@/api/list.js";
import { Base64 } from "js-base64";
export default {
  name: "waitDemand",
  data() {
    return {
      hasyz: false,
      currentPage: 1,
      showDevelop: false,
      type: "SQL脚本",
      active: {},
      total: 1,
      content: "",
      st: [
        "开发中",
        "开发中",
        "开发中",
        "开发中",
        "开发中",
        "开发中",
        "开发中",
        '完成'
      ],
      options: [
        {
          value: "SQL脚本",
          label: "SQL脚本",
        },
      ],
      database: 1,
      databases: [
        {
          value: 1,
          label: "mysql",
        },
        {
          value: 2,
          label: "oracle",
        },
        {
          value: 3,
          label: "hive",
        },
        {
          value: 4,
          label: "postgre",
        },
      ],
      condition: 2,
      conditions: [
        {
          value: 1,
          label: "时间",
        },
        {
          value: 2,
          label: "无",
        },
      ],
      radio: "1",
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
  watch:{
    content(){
      this.hasyz = false
    },
    database(){
      this.hasyz = false
    },
    condition(){
      this.hasyz = false
    },
    radio(){
      this.hasyz = false
    }
  },
  methods: {
    cancel() {
      this.showDevelop = false;
      this.hasyz = false;
      // 类型
      this.type = "";
      // 内容
      this.content = "";
      // 数据库
      this.database = 1;
      // 内置条件
      this.condition = 2;
      // 处理方式
      this.radio = "1";
    },
    yanzheng() {
      if (this.condition == 1) {
        if (
          !this.content.includes("{start_time}") &&
          !this.content.includes("{ start_time }")
        ) {
          this.$message({
            message: "请使用{start_time}变量",
            type: "warning",
          });
          return;
        }
        if (
          !this.content.includes("{end_time}") &&
          !this.content.includes("{ end_time }")
        ) {
          this.$message({
            message: "请使用{end_time}变量",
            type: "warning",
          });
          return;
        }
      }
      let str = 'database_type=' +this.database +'&sql_type='+this.condition + "&modular_type="+this.radio +"&sql="+ Base64.encode(this.content)
      testing(str).then(res=>{
        // console.log(res)
        if(res.data.type) {
          this.hasyz = true
        } else {
          this.$message({
            message: "验证失败sql语句无效",
            type: "warning",
          });
        }
      })
      
    },
    confirm() {
      let sql = Base64.encode(this.content);
      appAdd({
        id: this.active.id,
        sql,
        status:8,
        database_type:this.database,
        sql_type:this.condition,
        modular_type:this.radio
      }).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.showDevelop = false;
          this.active = {};
          this.getdata(this.currentPage);
          this.$message({
            message: "提交成功",
            type: "warning",
          });
        }
      });
    },
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
          "&type=3&demand_name=" +
          this.querymesg.demand_name +
          "&start_time=" +
          this.querymesg.start_time +
          "&end_time=" +
          this.querymesg.end_time;
      } else {
        str = "type=3&page=" + page;
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
    develop(k) {
      this.showDevelop = true;
      this.active = k;
    },

    goPreview() {
      this.$router.push("/sqlPreview");
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
.waitDemand {
  height: 91%;
  .pagination {
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
          flex: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
    overflow-y: scroll;
    .op {
      display: flex;
      justify-content: center;
      > span {
        width: 70px;
        text-align: right;
        line-height: 40px;
      }
      .sec {
        width: 50%;
      }
    }
    textarea {
      resize: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      padding: 15px;
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
    margin-top: 20px;
    span {
      margin-right: 10px;
    }
    .top {
      vertical-align: top;
    }
  }
  .main > .tip {
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
    margin-bottom: 40px;
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