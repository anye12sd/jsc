<template>
  <div class="userManaga">
    <searchdemo
      four="所属单位"
      one="页面名称"
      two="请输入页面名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="num">姓名</div>
        <div class="account">账号</div>
        <div class="company">手机号</div>
        <div class="actions">操作</div>
      </div>
      <div
        v-if="list.length == 0"
        style="text-align: center; height: 50px; line-height: 50px; color: gray"
      >
        暂无数据
      </div>
      <div v-for="(k, index) in list" :key="index" class="line">
        <div class="name" :title="k.userName">{{ k.userName }}</div>
        <div class="account" :title="k.id">{{ k.id }}</div>
        <div class="number" :title="k.mobile">{{ k.mobile }}</div>
        <div class="actions">
          <span @click="amend(k.id,index)">修改</span>
          <span @click="showdetail(k.id)">明细</span>
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
    <el-drawer title="详细信息" :visible.sync="show" direction="rtl" size="40%">
      <div class="userinfo">
        <div class="labe">
          <span>姓名：</span>
          <div v-if="!isedit">{{ userInfo.userName }}</div>
          <input v-else type="text" v-model="userInfo.userName" />
        </div>
        <div class="labe">
          <span>账号：</span>
          <div v-if="!isedit">{{ userInfo.account }}</div>
          <input v-else type="text" v-model="userInfo.account" />
        </div>
        <div class="labe">
          <span>手机号：</span>
          <div v-if="!isedit">{{ userInfo.mobile }}</div>
          <input v-else type="text" v-model="userInfo.mobile" />
        </div>
        <div class="labe">
          <span>邮箱：</span>
          <div v-if="!isedit">{{ userInfo.email }}</div>
          <input v-else type="text" v-model="userInfo.email" />
        </div>
        <div class="labe">
          <span>性别：</span>
          <div v-if="!isedit">{{ userInfo.sex == 1 ? "男" : "女" }}</div>
          <el-select v-else v-model="userInfo.sex" placeholder="请选择">
            <el-option
              v-for="item in sexoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <input v-else type="text" v-model="userInfo.sex" /> -->
        </div>
        <div class="labe">
          <span>地址：</span>
          <div v-if="!isedit">{{ userInfo.address }}</div>
          <input v-else type="text" v-model="userInfo.address" />
        </div>
        <div class="labe">
          <span>状态：</span>
          <div v-if="!isedit">{{ st[userInfo.status - 1] }}</div>
          <el-select v-else v-model="userInfo.status" placeholder="请选择">
            <el-option
              v-for="item in statusoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <input v-else type="text" v-model="st[userInfo.status - 1]" /> -->
        </div>
        <div class="action" v-if="isedit">
          <span @click="confirm">确定</span>
          <span @click="cancel">取消</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import { userList, user, userEdit } from "@/api/list.js";

export default {
  name: "userManaga",
  data() {
    return {
      currentPage: 1,
      total: 1,
      list: [],
      show: false,
      st: ["正常", "异常"],
      isedit: false,
      active:-1,
      sexoption: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
      ],
      statusoption: [
        {
          value: 1,
          label: "正常",
        },
        {
          value: 2,
          label: "异常",
        },
      ],
      userInfo: {
        userName: "",
        mobile: null,
        email: null,
        sex: 1,
        address: null,
        account: null,
        status: 1,
      },
    };
  },
  components: {
    searchdemo,
  },
  methods: {
    confirm() {
      userEdit({
        userName: this.userInfo.userName,
        id: this.userInfo.account,
        mobile: this.userInfo.mobile,
        email: this.userInfo.email,
        empGender: this.userInfo.sex,
        workPlace: this.userInfo.address,
        status: this.userInfo.status ,
      }).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.$message({
            message:"修改成功",
            type: "success",
          });
          this.show = false;
          this.isedit = false;
          this.list[this.active] = res.data.data
          this.active = -1
        }
      });
    },
    cancel() {
      this.show = false;
      this.isedit = false;
      this.active = -1
    },
    showdetail(id) {
      user(id).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.userInfo = {
            userName: res.data.data.userName,
            mobile: res.data.data.mobile,
            email: res.data.data.email,
            sex: res.data.data.empGender ,
            address: res.data.data.workPlace,
            account: res.data.data.id,
            status: res.data.data.status ,
          };
          this.show = true;
          this.isedit = false;
        } else {
          this.$message({
            message: res.data.message,
            type: "success",
          });
        }
      });
    },
    amend(id,index) {
      console.log(this.isedit);
      user(id).then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          this.userInfo = {
            userName: res.data.data.userName,
            mobile: res.data.data.mobile,
            email: res.data.data.email,
            sex: res.data.data.empGender,
            address: res.data.data.workPlace,
            account: res.data.data.id,
            status: res.data.data.status * 1,
          };
          this.show = true;
          this.isedit = true;
          this.active = index
        } else {
          this.$message({
            message: res.data.message,
            type: "success",
          });
        }
      });
    },
    getdata(page) {
      userList(page).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.list = res.data.data.list;
          this.total = res.data.data.count;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getdata(val);
    },
  },
  mounted() {
    this.getdata(1);
  },
};
</script>

<style scoped lang="less">
.userManaga {
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
      }
      .actions {
        flex: 3;
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
      .actions > span:nth-of-type(1) {
        margin-right: 10px;
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
  .userinfo {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    .labe {
      width: 50%;
      display: flex;
      margin-top: 10px;
      align-items: center;
      span {
        flex: 2;
        text-align: right;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        // text-align-last: justify;
      }
      div,
      input {
        flex: 4;
        border: 1px solid #c1c1c1;
        padding: 3px 5px;
        border-radius: 4px;
        height: 30px;
        line-height: 24px;
        box-sizing: border-box;
      }
      input:focus {
        border: 1px solid #409eff;
        outline: 0;
      }
    }
    .action {
      width: 100%;
      margin-top: 20px;
      text-align: center;
    }
    .action > span:nth-of-type(1) {
      padding: 3px;
      width: 100px;
      box-sizing: border-box;
      background: #017cf8;
      color: #ffffff;
      border-radius: 4px;
      display: inline-block;
      cursor: pointer;
    }
    .action > span:nth-of-type(2) {
      padding: 3px;
      width: 100px;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #cccfd7;
      box-shadow: 0 0 6px 0 rgba(38, 91, 218, 0.04);
      border-radius: 4px;
      color: #384155;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>

<style lang="less">
.userManaga {
  .userinfo {
    .labe {
      .el-select {
        padding: 0 !important;
        border: none !important;
      }
      .el-input--suffix .el-input__inner {
        // border: none;
        border: 1px solid #c1c1c1;
        height: 30px;
        line-height: 30px;
        padding: 3px 5px;
      }
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
}
</style>