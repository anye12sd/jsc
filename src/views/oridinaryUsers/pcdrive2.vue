<template>
  <div class="pcdrive">
    <div class="cen">
      <div class="line">
        <div class="themeline">
          <span class="theme">产业情况</span>
        </div>
        <div class="each" style="height: 31%">
          <component :is="allmodel[0]"></component>
        </div>
        <div class="each" style="height: 62%">
          <component :is="allmodel[2]"></component>
        </div>
      </div>
      <div class="midline">
        <menudemo></menudemo>
        <div class="down">
          <div class="themeline">
            <span class="theme">GDP预测</span>
          </div>
          <div class="each">
            <component :is="allmodel[6]"></component>
          </div>
        </div>
        <div class="down">
          <div class="themeline">
            <span class="theme">碳排放总量排行</span>
          </div>
          <div class="each">
            <component :is="allmodel[3]"></component>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="themeline" style="justify-content: space-between">
          <span class="theme">企业综合</span>
          <div class="search-box" @click="dialogVisible = true">搜索</div>
        </div>
        <div
          class="each"
          style="
            height: 94.5%;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
          "
        >
          <component
            :is="allmodel[1]"
            style="height: 33%"
            :class="enterpriseName ? 'hide' : ''"
          ></component>
          <component
            :is="allmodel[4]"
            style="height: 33%"
            :class="enterpriseName ? 'hide' : ''"
          ></component>
          <component
            :is="allmodel[7]"
            style="height: 33%"
            :class="enterpriseName ? 'hide' : ''"
          ></component>
          <component
            :is="allmodel[8]"
            :enterpriseNameProp="enterpriseName"
            @hideEnterprise="hideEnterprise"
            style="height: 100%"
            :class="enterpriseName ? '' : 'hide'"
          ></component>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-autocomplete
        :trigger-on-focus="false"
        v-model="searchContent"
        class="el-input-reset"
        value-key="firm_name"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import menudemo from "./menudemo.vue";
const modulesFiles = require.context(
  "../../components/subpage/econom",
  true,
  /\.vue$/
);
let allpage = {};
modulesFiles.keys().forEach((path) => {
  let arr = path.split("/");
  let name = arr[arr.length - 1].split(".")[0]; //组件名称
  let c = modulesFiles(path); //组件实例
  allpage[name] = c.default;
}, {});
export default {
  name: "pcdrive2",
  data() {
    return {
      allmodel: [
        "industry",
        "enterpriseInfo",
        "invest",
        "carbon",
        "enterpriseScore",
        "comEducation",
        "GDP",
        "enterpriseRisk",
        "enterpriseDetail",
      ],
      enterpriseName: "",
      dialogVisible: false,
      searchContent: "",
      option: [],
      baseUrl: "http://10.21.197.236:9000",
    };
  },
  mounted() {},
  methods: {
    hideEnterprise() {
      this.enterpriseName = "";
    },
    handleClick() {
      this.$axios({
        method: "post",
        url: this.baseUrl + "/index/economic/qyzh_pfxq?nm=" + this.searchContent,
        // data: data,
      }).then((res) => {
        let optionsdata = res.data;
        if (optionsdata.code == 200) {
          this.enterpriseName = this.searchContent;
          this.searchContent = ''
          this.dialogVisible = false;
        } else if (optionsdata.code == 300) {
          this.$message.error("无法查询该企业请重新输入");
          this.searchContent = ''
        }
      });
      
    },
    handleSelect(item) {
      this.enterpriseName = item.firm_name;
      this.dialogVisible = false;
      this.searchContent = ''
    },
    handleClose(done) {
      done();
    },
    querySearchAsync(queryString, cb) {
      this.$axios({
        method: "get",
        url: this.baseUrl + "/index/economic/qyzh_qyss?nm=" + queryString,
      }).then((res) => {
        if (res.data.code == 200) {
          this.option = res.data.data[0];
          cb(this.option);
        } else if (res.data.code == 300) {
          this.option = [];
          cb(this.option);
        }
        
      });
    },
  },
  components: {
    ...allpage,
    menudemo,
  },
};
</script>

<style scoped lang="less">
.pcdrive {
  height: 93%;
  width: 100%;
  .cen {
    width: 97%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    .hide {
      visibility: hidden;
    }
    > .line {
      width: 24.9%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      > .each {
        width: 100%;
        padding: 13px 10px 0 15px;
        box-sizing: border-box;
        background-color: rgba(6, 26, 62, 0.4);
        box-shadow: inset 0 1px 3px 0 rgba(0, 255, 234, 0.5),
          inset 0 0 11px 0 #00b7ff;
        border-radius: 20px;
        position: relative;
      }
      > .themeline {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4%;
      }
      .search-box {
        cursor: pointer;
        border: 1px solid #315a92;
        color: #ccc;
        height: 3rem;
        line-height: 3rem;
        width: 7rem;
        padding: 0 2px 0 15px;
        font-size: 12px;
        text-align: center;
        border-radius: 15px;
        background-image: url("../../assets/subpage/search@1x.png");
        background-repeat: no-repeat;
        background-position: 10px;
      }
    }
    > .midline {
      width: 49.3333%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > .down {
        width: 49.6%;
        height: 68%;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        > .themeline {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 6%;
        }
        > .each {
          height: 92%;
          width: 100%;
          padding: 13px 10px 0 20px;
          box-sizing: border-box;
          background-color: rgba(6, 26, 62, 0.4);
          box-shadow: inset 0 1px 3px 0 rgba(0, 255, 234, 0.5),
            inset 0 0 11px 0 #00b7ff;
          border-radius: 20px;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          position: relative;
        }
      }
    }
  }
  .el-input-reset {
    width: 100%;
  }
  .el-input-reset /deep/ .el-input__inner {
    width: 100%;
    padding: 0 15px;
  }
}
</style>