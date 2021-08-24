<template>
  <div class="modelmarket">
    <div class="main">
      <div v-for="(k, index) in models" :key="index" class="each">
        <div class="top checked" @click="getdetail(k)">
          <img
            :src="k.img_url ? 'http://10.21.197.237' + k.img_url : modelImg"
            alt=""
          />
          <div>{{ k.modulename }}</div>
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
        <div class="bot">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="tit">所属单位</span>
              <span class="con">{{ k.get_branch_name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
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
      </div>
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="查询时间" v-if="sql_type == 1">
          <el-col :span="11">
            <el-date-picker
              type="date"
              :default-value="appTime"
              placeholder="选择开始日期"
              v-model="form.date1"
              style="width: 100%"
              :picker-options="pickerOptionsEnd"
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
            action="http://10.21.197.237/app/data"
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
    <!-- <div class="pagination">
      <el-pagination
        layout=" pager"
        :page-size="9"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import {
  getlist,
  appuserlist,
  getAppTime,
  postFormJr,
  postFormWg,
} from "@/api/list.js";
import modelImg from "@/assets/oridinary/modelIcon.png";
import { mapState } from "vuex";
import singleaxios from "@/download";
export default {
  name: "modelmarket",
  data() {
    return {
      modelImg,
      models: [],
      total: 1,
      appTime: 0,
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
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return time.getTime() > this.appTime;
        },
      },
      dialogbtn: true,
    };
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  mounted() {
    // getlist("page=1&pageSize=9").then((res) => {
    //   // console.log(res);
    //   if (res.data.status == 200) {
    //     this.models = res.data.data.list;
    //     this.total = res.data.data.count;
    //   }
    // });
  },
  methods: {
    handleCurrentChange(val) {
      getlist("page=" + val + "&pageSize=9").then((res) => {
        if (res.data.status == 200) {
          this.models = res.data.data.list;
          this.total = res.data.data.count;
        }
      });
    },
    getdetail(item) {
      // console.log(item);
      this.$router.push("/oridinaryUsers/detail/" + item.id);
      this.$store.commit("jurisdiction/setModelInfo", item);
    },
    todownload(id, type, modular_type, k) {
      this.excel_url = k.excel_url;
      this.modular_type = modular_type;
      this.dialogVisible = true;
      this.sql_type = type;
      this.id = id;
      this.dialogbtn = true;
      getAppTime().then((res) => {
        if (res.status == 200) {
          this.appTime = res.data;
          this.dialogbtn = false;
        }
      });
    },
    download(id, type, modular_type) {
      this.modular_type = modular_type;
      this.handleExport(id, type);
      // if(type == 3){
      //   window.open(
      //       "http://10.21.197.237/app/sql?id=" +
      //       id +
      //       "&access_token=" +
      //       location.search.split("=")[1] +
      //       "&sql_type=" + type
      //   );
      // } else if(type == 1){
      // window.open(
      //     "http://10.21.197.237/app/sql?id=" +
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
              this.handleExport(this.id, this.sql_type);
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
      formData.append("access_token", location.search.split("=")[1]);
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
      formData.append("access_token", location.search.split("=")[1]);
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
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    handleRemove(file, fileList) {
      this.form.file = fileList;
    },
    handleExport(id, type) {
      let url;
      // if(type == 3) {
      //   url = "http://10.21.197.237/app/sql?id=" +
      //       id +
      //       "&access_token=" +
      //       location.search.split("=")[1] +
      //       "&sql_type=" + type
      // }
      // else if(type == 1) {
      //   url = "http://10.21.197.237/app/sql?id=" +
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
      let URL =
        "http://10.21.197.237/app/sql?id=" +
        id +
        "&access_token=" +
        location.search.split("=")[1] +
        "&sql_type=" +
        type +
        "&start_time=" +
        this.form.date1 +
        "&end_time=" +
        this.form.date2;
      let me = this;
      singleaxios
        .get(URL)
        .then(function (response) {
          if (response === "200") {
            // console.log('下载成功')
            me.form = me.$options.data().form();
            me.loading = false;
            me.$message.success("即将开始下载，请勿关闭窗口");
          } else {
            // console.log('下载失败')
            me.loading = false;
            me.$message.warning("下载失败，请联系管理员");
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
  height: 92%;
  width: 100%;
  .main {
    min-width: 1100px;
    width: 78%;
    height: 86%;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    img {
      display: block;
      margin: 0 auto;
      height: 60%;
    }
    > .each {
      font-family: SourceHanSansCN-Medium;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 0;
      width: 29%;
      height: 28%;
      margin: 0 2%;
      > .checked {
        background: url("../../assets/oridinary/modelborder.png") no-repeat;
      }
      > .unchecked {
        background: url("../../assets/oridinary/notsale.png") no-repeat;
      }
      > .top {
        display: flex;
        align-content: center;
        text-align: center;
        flex-wrap: wrap;

        background-size: 100% 100%;
        cursor: pointer;
        transition: transform;
        height: 75%;
        position: relative;
        .modelDownload {
          position: absolute;
          right: 8%;
          top: 12%;
          background: #f5a623;
          border-radius: 20px;
          padding: 3px 9px;
          font-size: 10px;
          cursor: pointer;
        }
        > div {
          width: 100%;
        }
      }
      > .top:hover {
        transform: scale(1.3, 1.3);
      }
      > .bot {
        padding: 0 10px;
        .tit {
          font-family: SourceHanSansCN-Medium;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          margin-right: 5px;
        }
        .con {
          font-family: SourceHanSansCN-Medium;
          font-size: 14px;
          color: #32c5ff;
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>