<template>
  <div class="modelmarket">
    <div class="tit"><img src="@/assets/img/dm.png" alt="图" /></div>
    <div class="main">
      <div v-for="(k, index) in models" :key="index" class="each">
        <div>
          <span
            v-if="k.sql_type == 1 || k.sql_type == 2"
            class="modelDownload"
            @click.stop="todownload(k.id, k.sql_type, k.modular_type, k)"
          >
            数据下载
          </span>
          <span
            v-else-if="k.sql_type == 3"
            class="modelDownload"
            @click.stop="download(k.id, k.sql_type, k)"
            >数据下载</span
          >
        </div>
        <img :src="da" alt="图" />
        <div>{{ k.modulename }}</div>
        <div class="flex">
          <div>
            <span>所属单位:</span> <span>{{ k.get_branch_name }}</span>
          </div>
          <div class="describe-btn" @click="openDescribe(k)">
            描述
          </div>
        </div>
      </div>
      <!-- <div
        v-for="(k, index) in 9 - models.length"
        :key="9 - index"
        class="each"
      >
        <div class="top unchecked">
          <img src="@/assets/oridinary/modelIcon.png" alt="" />
          <div>模型名称</div>
          <span
            v-if="k.sql_type == 1 || k.sql_type == 2"
            class="modelDownload"
            @click.stop="todownload(k.id, k.sql_type, k)"
          >
            数据下载
          </span>
          <span
            v-else-if="k.sql_type == 3"
            class="modelDownload"
            @click.stop="download(k.id, k.sql_type, k.modular_type, k)"
            >数据下载</span
          >
        </div>
        <div class="bot">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="tit">所属单位</span>
              <span class="con">****</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <el-dialog
      v-loading="loading"
      element-loading-text="正在后台查询数据，请稍候"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.65)"
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form ref="form" class="form-box" :model="form" label-width="80px">
        <el-form-item label="查询时间" v-if="sql_type == 1">
          <el-col :span="11">
            <el-date-picker
              type="date"
              :default-value="appTime"
              placeholder="选择开始日期"
              v-model="form.date1"
              style="width: 100%"
              :picker-options="pickerOptionsStart"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              :default-value="appTime"
              placeholder="选择结束日期"
              v-model="form.date2"
              style="width: 100%"
              :picker-options="pickerOptionsEnd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item
          v-else-if="sql_type == 2"
          v-for="(content, index) in form.contents"
          :label="'条件' + (index + 1)"
          :key="content.key"
          :prop="'contents.' + index + '.value'"
          :rules="{
            required: true,
            message: '条件不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="content.value"
            style="width: calc(100% - 90px); margin-right: 18px"
          ></el-input
          ><el-button v-if="index == 0" type="primary" @click="addDomain"
            >新增</el-button
          ><el-button
            v-else
            type="danger"
            @click.prevent="removeDomain(content)"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item
          class="url-content"
          label="上传excel"
          v-if="sql_type == 1 && (modular_type == 2 || modular_type == 3)"
        >
          <el-upload
            class="upload-demo"
            ref="upload"
            :limit="1"
            action="http://10.21.197.237/module/data"
            :on-change="onChange"
            :on-remove="handleRemove"
            :file-list="form.file"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <!--            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          </el-upload>
          <!--          <input type="file" id="file">-->
          <a
            class="url"
            v-if="sql_type == 1 && (modular_type == 2 || modular_type == 3)"
            :href="'http://10.21.197.237' + excel_url"
            >下载模版</a
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="dialogbtn"
          @click="submitForm('form')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="pagination">
      <el-pagination
        layout=" pager"
        :page-size="9"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getmodellist,
  getAppTime,
  postFormJr,
  postFormWg,
} from "@/api/list.js";
import modelImg from "@/assets/oridinary/modelIcon.png";
import { mapState } from "vuex";
import axios from "axios";
import da from "@/assets/img/da.png";
export default {
  name: "modelmarket",
  data() {
    return {
      da,
      modelImg,
      models: [],
      total: 1,
      appTime: 0,
      nextMonthFirstDay: 0,
      dialogVisible: false,
      excel_url: "",
      loading: false,
      sql_type: "",
      modular_type: "",
      id: "",
      form: {
        date1: "",
        date2: "",
        contents: [
          {
            value: "",
          },
        ],
        file: [],
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          return time.getTime() > this.appTime;
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return time.getTime() > this.nextMonthFirstDay;
        },
      },
      dialogbtn: true,
    };
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  mounted() {
    // getmodellist
    getmodellist("load=1&page=1&pageSize=9").then((res) => {
      // console.log(res);
      if (res.data.status == 200) {
        this.models = res.data.data.list;
        this.total = res.data.data.count;
      }
    });
  },
  methods: {
    handleCurrentChange(val) {
      getmodellist("load=1&page=" + val + "&pageSize=9").then((res) => {
        if (res.data.status == 200) {
          this.models = res.data.data.list;
          this.total = res.data.data.count;
        }
      });
    },
    // 跳转v字模型
    getdetail(item) {
      // console.log(item);
      this.$router.push("/oridinaryUsers/detail/" + item.id);
      this.$store.commit("jurisdiction/setModelInfo", item);
    },
    todownload(id, type, modular_type, k) {
      console.log(this.identity)
      if(this.identity != 5 && this.identity != 1) {
        // 数据专员和系统管理员才能下载，提示只显示数据专员能下载
        this.$message({
            message: "只有数据专员才能下载",
            type: "warning",
          });
        return
      }
      this.excel_url = k.excel_url;
      this.modular_type = modular_type;
      this.dialogVisible = true;
      this.sql_type = type;
      this.id = id;
      this.dialogbtn = true;
      getAppTime().then((res) => {
        if (res.status == 200) {
          this.appTime = res.data;
          let month = new Date(this.appTime).getMonth() + 1
          let year = new Date(this.appTime).getFullYear()
          let nextMonthFirstDay
          if(month == 12){
            nextMonthFirstDay = new Date(year + 1,0,1).getTime();//根据年份与月份日期得到下个月第一天的对象
          }else{
            nextMonthFirstDay = new Date(year,month,1).getTime();//根据年份与月份日期得到下个月第一天的对象
          }
          this.nextMonthFirstDay = nextMonthFirstDay - 1000 //减去1000毫秒得到本月最后一天23.59.59分毫秒
          console.log(nextMonthFirstDay)
          this.dialogbtn = false;
        }
      });
    },
    download(id, type, modular_type) {
      if(this.identity != 5 && this.identity != 1) {
        // 数据专员和系统管理员才能下载，提示只显示数据专员能下载
        this.$message({
            message: "只有数据专员才能下载",
            type: "warning",
          });
        return
      }
      this.modular_type = modular_type;
      this.handleExport(id, type);
      // if(type == 3){
      //   window.open(
      //       "http://10.21.197.237/module/sql?id=" +
      //       id +
      //       "&access_token=" +
      //       location.search.split("=")[1] +
      //       "&sql_type=" + type
      //   );
      // } else if(type == 1){
      // window.open(
      //     "http://10.21.197.237/module/sql?id=" +
      //     id +
      //     "&access_token=" +
      //     location.search.split("=")[1] +
      //     "&sql_type=" + type +
      //     "&start_time=" + new Date(this.form.date1).getTime() +
      //     "&end_time=" + new Date(this.form.date2).getTime()
      // );
      // }
    },
    removeDomain(item) {
      var index = this.form.contents.indexOf(item);
      if (index !== -1) {
        this.form.contents.splice(index, 1);
      }
    },
    addDomain() {
      this.form.contents.push({
        value: "",
        key: Date.now(),
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.form.sql_type = this.sql_type;
        this.form.date1 = new Date(this.form.date1).getTime();
        this.form.date2 = new Date(this.form.date2).getTime();
        this.form.id = this.id;
        console.log(this.form);
        if (valid) {
          // this.sql_type 1 时间， 2 条件， 3 直接下载
          if (this.sql_type == 1) {
            if (!this.form.date1 || !this.form.date2) {
              this.$message({
                message: "请填写时间",
                type: "error",
              });
              return;
            }
            if (this.form.date1 > this.form.date2) {
              this.$message({
                message: "开始时间不能在结束时间之后",
                type: "error",
              });
              return;
            }
            if (
              this.form.date2 - this.form.date1 >=
              366 * 24 * 60 * 60 * 1000
            ) {
              this.$message({
                message: "时间间隔必须在一年之内",
                type: "error",
              });
              return;
            }
            // this.modular_type 1 无条件 2 data_jr 3 data_wg
            if (this.modular_type == 1) {
              // this.handleExport(this.id, this.sql_type);
              window.open(
                  "http://10.21.197.237/module/sql?id=" +
                  this.id +
                  "&access_token=" +
                  location.search.split("=")[1] || sessionStorage.getItem("access_token") +
                  "&sql_type=" + '1' +
                  "&start_time=" + new Date(this.form.date1).getTime() +
                  "&end_time=" + new Date(this.form.date2).getTime()
              );
              return;
            }
            if (
              (this.modular_type == 2 || this.modular_type == 3) &&
              this.form.file.length == 0
            ) {
              this.$message({
                message: "请上传excel",
                type: "error",
              });
              return;
            }
            if (
              (this.modular_type == 2 || this.modular_type == 3) &&
              this.form.file[0].name.split(".")[1] !== "xlsx" &&
              this.form.file[0].name.split(".")[1] !== "xls"
            ) {
              this.$message({
                message: "上传文件只能是 xls、xlsx格式!",
                type: "error",
              });
              return;
            }
            if (this.modular_type == 2) {
              this.toPostFormJr();
            } else if (this.modular_type == 3) {
              this.toPostFormWg();
            }
            // console.log(this.form)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toPostFormJr() {
      let formData = new FormData();
      formData.append("file", this.form.file[0].raw);
      formData.append("date1", this.form.date1);
      formData.append("date2", this.form.date2);
      formData.append("content", this.form.contents);
      formData.append("access_token", location.search.split("=")[1] || sessionStorage.getItem("access_token"));
      formData.append("id", this.id);
      formData.append("sql_type", this.sql_type);
      console.log(formData);
      this.loading = true;
      postFormJr(formData).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.$message({
            message: "即将开始下载，请勿关闭窗口",
            type: "success",
            duration: 5000,
          });
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          // let objectUrl = URL.createObjectURL(blob);
          var downloadA = document.createElement("a");
          downloadA.href = window.URL.createObjectURL(blob);
          downloadA.download = decodeURIComponent(
            res.headers["content-disposition"]
              .split(";")[1]
              .split("filename=")[1]
          );
          downloadA.click();
          window.URL.revokeObjectURL(downloadA.href);
          this.loading = false;
          this.dialogVisible = false;
          this.form = this.$options.data().form;
          // if (res.status == 200) {
          //   this.$message({
          //     message: "即将开始下载，请勿关闭窗口",
          //     type: "success",
          //     duration: 5000
          //   });
          //   this.dialogVisible = false
          //   this.download(this.id, this.sql_type)
          //   this.handleExport(this.id, this.sql_type)
          // }else{
          //   this.$message.error("无法下载，联系管理员")
          // }
        } else {
          this.$message({
            message: "无法下载，请联系管理员",
            type: "error",
            duration: 3000,
          });
          this.loading = false;
          this.dialogVisible = false;
        }
      });
    },
    toPostFormWg() {
      let formData = new FormData();
      formData.append("file", this.form.file[0].raw);
      formData.append("date1", this.form.date1);
      formData.append("date2", this.form.date2);
      formData.append("content", this.form.contents);
      formData.append("access_token", location.search.split("=")[1] || sessionStorage.getItem("access_token"));
      formData.append("id", this.id);
      formData.append("sql_type", this.sql_type);
      console.log(formData);
      this.loading = true;
      postFormWg(formData).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.$message({
            message: "即将开始下载，请勿关闭窗口",
            type: "success",
            duration: 5000,
          });
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          // let objectUrl = URL.createObjectURL(blob);
          var downloadA = document.createElement("a");
          downloadA.href = window.URL.createObjectURL(blob);
          downloadA.download = decodeURIComponent(
            res.headers["content-disposition"]
              .split(";")[1]
              .split("filename=")[1]
          );
          downloadA.click();
          window.URL.revokeObjectURL(downloadA.href);
          this.loading = false;
          this.dialogVisible = false;
          this.form = this.$options.data().form;
        } else {
          this.$message({
            message: "下载失败，请联系管理员",
            type: "error",
            duration: 3000,
          });
          this.loading = false;
          this.dialogVisible = false;
        }
      });
    },
    onChange(file, fileList) {
      this.form.file = fileList;
    },
    openDescribe(item) {
      this.$alert(item.describe ? item.describe : '暂无描述', item.modulename, {
        confirmButtonText: '确定',
        callback: action => {
          console.log(action)
        }
      });
    },
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    handleRemove(file, fileList) {
      this.form.file = fileList;
    },
    handleExport(id, type) {
      let url;
      // if(type == 3) {
      //   url = "http://10.21.197.237/module/sql?id=" +
      //       id +
      //       "&access_token=" +
      //       location.search.split("=")[1] +
      //       "&sql_type=" + type
      // }
      // else if(type == 1) {
      //   url = "http://10.21.197.237/module/sql?id=" +
      //       id +
      //       "&access_token=" +
      //       location.search.split("=")[1] +
      //       "&sql_type=" + type +
      //       "&start_time=" + this.form.date1 +
      //       "&end_time=" + this.form.date2
      // }
      // var elemIF = document.createElement('iframe')
      // elemIF.src = url
      // elemIF.style.display = 'none'
      // elemIF.onload = function () {
      //   document.body.removeChild(elemIF)
      // }
      // document.body.appendChild(elemIF)
      this.loading = true;
      let access_token = location.search.split("=")[1] || sessionStorage.getItem("access_token");
      let URL =
        "http://10.21.197.237/module/sql?id=" +
        id +
        "&access_token=" +
        access_token +
        "&sql_type=" +
        type +
        "&start_time=" +
        this.form.date1 +
        "&end_time=" +
        this.form.date2;
      let me = this;
      axios
        .get(URL)
        .then(function (response) {
          if (response.data.status && response.data.status === 300) {
            me.$message.warning("下载失败，请联系管理员"); // 链接正确，下载失败
          } else {
            me.form = me.$options.data().form();
            me.loading = false;
            me.$message.success("即将开始下载，请勿关闭窗口");
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
};
</script>


<style lang="less">
.modelmarket {
  .pagination {
    position: absolute;
    bottom: 9%;
    width: 100%;
    z-index: 100;
    .el-pagination {
      text-align: center;
      .el-pager {
        li {
          background: none;
          color: #2abdf6;
          cursor: pointer;
        }
        .active {
          // color: #0e0aee;
          color: #fff;
        }
      }
    }
  }
}
.url-content {
  position: relative;
}
.url {
  position: absolute;
  top: 0;
  left: 100px;
  color: #409eff;
  text-decoration: none;
}
</style>
<style scoped lang="less">
.modelmarket {
  height: 93%;
  width: 100%;
  .tit {
    text-align: center;
    img {
      margin: 0 auto;
      width: 400px;
    }
  }
  .main {
    min-width: 1100px;
    width: 78%;
    height: 86%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    > .each {
      position: relative;
      font-family: SourceHanSansCN-Medium;
      font-size: 1.6rem;
      background-image: linear-gradient(46deg, #95d6ff 0%, #ffffff 100%);
      border-radius: 6px;
      box-sizing: border-box;
      padding: 10px;
      padding-left: 30px;
      width: calc(25% - 20px);
      height: 28%;
      margin: 0 10px;
      margin-bottom: 20px;
      > div:nth-child(1) {
        text-align: right;
        > .modelDownload {
          cursor: pointer;
          background: #f5a623;
          border-radius: 4px;
          font-family: SourceHanSansCN-Medium;
          font-size: 1.6rem;
          color: #ffffff;
          letter-spacing: 0;
          padding: 3px 5px;
        }
      }
      > img:nth-child(2) {
        text-align: left;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      > div:nth-child(3) {
        font-family: MicrosoftYaHei-Bold;
        font-size: 1.6rem;
        color: #333333;
        letter-spacing: 0;
        font-weight: 600;
        margin-top: 1rem;
        margin-bottom: 2rem;
      }
      > div:nth-child(4) {
        margin: 1rem 0;
        > div span:nth-child(1) {
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          color: #333333;
          letter-spacing: 0;
        }
        > div span:nth-child(2) {
          font-family: MicrosoftYaHei;
          font-size: 1.4rem;
          color: #1987ff;
          letter-spacing: 0;
        }
      }
    }
  }
}
.line{
  text-align: center;
}
.form-box .el-input__inner{
  width: 100%;
}
.flex{
  display: flex;
  justify-content: space-between;
}
.describe-btn{
  color: #1987ff;
  cursor: pointer;
}
</style>