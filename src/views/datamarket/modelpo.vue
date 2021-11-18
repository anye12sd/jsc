<template>
  <div class="modepo">
    <div class="main">
      <div class="tit">{{ edit ? "修改模型" : "添加模型" }}</div>
      <div class="item">
        <label for="modelName" style="width: 40%">模型名称</label>
        <div style="width: 60%">
          <input
            type="text"
            id="modelName"
            placeholder="请输入名称"
            v-model="name"
          />
        </div>
      </div>
      <div class="item" v-if="!edit">
        <label style="width: 40%">指派的模型开发人员</label>
        <div style="width: 60%">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.userName"
              :value="item.user_id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <label for="modelDescribe" style="width: 40%">模型描述</label>
        <div style="width: 60%">
          <textarea
              class="item_textarea"
              id="modelDescribe"
              placeholder="请输入描述"
              v-model="describe"
          />
        </div>
      </div>
      <div class="item">
        <div style="width: 40%"></div>
        <div style="width: 60%">
          <div class="cancel" @click="cancel">取消</div>
          <div class="confirm" @click="confirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { demandadd, modeledit } from "@/api/list.js";
import { demanduser } from "@/api/managa.js";
export default {
  name: "modepo",
  data() {
    return {
      options: [],
      value: null,
      name: "",
      describe: "",
    };
  },
  props: ["edit"],
  mounted() {
    demanduser().then((res) => {
      this.options = res.data.data;
    });
    if (this.edit) {
      // console.log(this.edit);
      this.name = this.edit.modulename;
      this.describe = this.edit.describe;
    }
  },
  methods: {
    confirm() {
      // console.log(this.value);
      if (this.name.length < 4) {
        this.$message({
          message: "模型名称长度不能小于4",
          type: "warning",
        });
        return;
      }
      if (!this.edit && this.value === null) {
        this.$message({
          message: "请选择模型开发人员",
          type: "warning",
        });
        return;
      }
      if (this.edit) {
        modeledit({
          modulename: this.name,
          describe: this.describe,
          id: this.edit.id,
        }).then((res) => {
        //   console.log(res);
          if (res.data.status == 200) {
            this.name = "";
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$emit("success");
          }
        });
      } else {
        demandadd({
          demand_name: this.name,
          execute_id: this.value,
          type: 3,
          status: 3,
        }).then((res) => {
          // console.log(res);
          if (res.data.status == 200) {
            this.name = "";
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$emit("success");
          }
        });
      }
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less">
.modepo {
  .item {
    .el-input__inner {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      width: 300px;
    }
    input::placeholder {
      color: gray;
    }
  }
}
</style>

<style scoped lang="less">
.modepo {
  height: 91%;
  display: flex;
  align-items: center;
  justify-content: center;
  .tit {
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #000000;
    margin-top: 40px;
  }
  .main {
    width: 775px;
    height: 449px;
    background-image: url("../../assets/bg.png");
    background-size: cover;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    > div:nth-child(1) {
      margin: 0;
    }
    > div {
      width: 100%;
    }
  }

  .item {
    display: flex;
    justify-content: center;
    margin-top: 36px;
    label {
      text-align: right;
      height: 40px;
      line-height: 40px;
      padding-right: 28px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #000000;
      box-sizing: border-box;
    }
    input {
      background: #ffffff;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      width: 300px;
      height: 40px;
      padding-left: 20px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      outline: none;
      box-sizing: border-box;
    }
    input::placeholder {
      color: gray;
    }
    input:hover {
      border-color: #c0c4cc;
    }
    input:focus {
      border-color: #409eff;
    }
    .confirm {
      width: 148px;
      height: 36px;
      line-height: 36px;
      background: #017cf8;
      border-radius: 4px;
      font-family: SourceHanSansCN-Regular;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
      cursor: pointer;
    }
    .cancel {
      width: 148px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: #ffffff;
      border: 1px solid #cccfd7;
      box-shadow: 0 0 6px 0 rgba(38, 91, 218, 0.04);
      border-radius: 4px;
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .main > .item:nth-of-type(2) {
    margin-top: 40px;
  }
}
</style>
<style>
.item_textarea{
  width: 300px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding-left: 20px;
  padding-top: 10px;
  height: 75px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #333333;
  outline: none;
  box-sizing: border-box;
  resize: none;
}
</style>
