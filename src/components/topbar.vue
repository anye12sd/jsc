<template>
  <div class="topbar">
    <div class="tit">数据分析应用成果超市</div>
    <div
      v-for="p in usingOption"
      :key="p.id"
      :class="'item ' + (p.id == current ? 'active' : '')"
      @click="chose(p.id, p.path)"
    >
      <img :src="p.img" alt="图片缺失" style="width: 30px" />
      <p>{{ p.name }}</p>
    </div>
    <div class="user">
      <div class="left">
        <span :class="'icon'+(show?' fan':' zhen')" @click="show = !show"></span>
        <div :class="show?'msg ':''">
          <div @click="gobefore" v-if="identity != 4">返回前台</div>
          <div @click="signout">退出登录</div>
          <div @click="showtab = !showtab">修改个人信息</div>
        </div>
        <!-- <span @click="gobefore" v-if="identity != 4">返回前台</span>
        <span @click="signout">退出登录</span> -->
      </div>
      <div class="right">
        <div>
          <span class="userName">{{ userInfo.userName }}</span>
          <span class="identitys">{{ identitys[userInfo.role_id] }}</span>
        </div>
        <div class="time">{{ date1 }}&nbsp;&nbsp;{{ date2 }}</div>
      </div>
    </div>
    <el-drawer title="修改个人信息" :visible.sync="showtab" direction="rtl" size="40%">
      <div class="userinfo">
        <div class="labe">
          <span>姓名：</span>
          <input type="text" v-model="info.userName" />
        </div>

        <div class="labe">
          <span>密码：</span>
          <input type="text" v-model="password" />
        </div>
        <div class="labe">
          <span>手机号：</span>
          <input type="text" v-model="info.mobile" />
        </div>
        <div class="labe">
          <span>邮箱：</span>
          <input type="text" v-model="info.email" />
        </div>
        <div class="labe">
          <span>性别：</span>
          <el-select v-model="info.sex" placeholder="请选择">
            <el-option
              v-for="item in sexoption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="labe">
          <span>地址：</span>
          <input type="text" v-model="info.address" />
        </div>
        <div class="action">
          <span @click="confirm">确定</span>
          <span @click="cancel">取消</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userEdit } from "@/api/list.js";
export default {
  name: "topbar",
  data() {
    return {
      show:false,
      date1: "2021-3-24",
      date2: "12:00",
      current: 0,
      usingOption: [],
      password:'',
      identitys: {
        1: "系统管理员",
        2: "单位管理员",
        3: "普通用户",
        4: "模型开发人员",
        5:'数据专员'
      },
      ns:['','系统','单位','普通','数据','开发'],
      showtab:false,
      option: [
        {
          id: 1,
          img: require("@/assets/topBar/pccok.png"),
          name: "PC驾驶舱",
          path: "/pcCockpit",
        },
        {
          id: 2,
          img: require("@/assets/topBar/modle.png"),
          name: "应用成果超市",
          path: "/supermarket",
        },
        {
          id: 20,
          img: require("@/assets/topBar/introduce.png"),
          name: "数据成果超市",
          path: "/datamarket",
        },
        {
          id: 4,
          img: require("@/assets/topBar/needs.png"),
          name: "需求管理",
          path: "/demand",
        },
        {
          id: 6,
          img: require("@/assets/topBar/users.png"),
          name: "用户授权管理",
          path: "/userAuthorization",
        },
        {
          id: 5,
          img: require("@/assets/topBar/process.png"),
          name: "流程审批",
          path: "/process",
        },
      ],
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
      info: {
        userName: "",
        mobile: '',
        email: '',
        sex: 1,
        address: '',
      },
    };
  },
  components: {
    // HelloWorld
  },
  computed:{
    ...mapState('config',['isLogin',"topbararr","userInfo",'identity'])
  },
  mounted() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 5000);
    if(sessionStorage.getItem("mobile")) {
      this.info.mobile = sessionStorage.getItem("mobile")
    }
    this.init();
  },
  methods: {
    init() {
        let op = JSON.parse(JSON.stringify(this.topbararr));
        // console.log(op)
        op.forEach((item, index) => {
          if (item.id == 1) {
            // console.log("kkkkk", item);
            this.$store.commit("config/setpcCockpit", op[index]);
          } else if (item.id == 2) {
            this.$store.commit("config/setsupermarket",op[index]);
          } else if (item.id == 3) {
            this.$store.commit("config/setmodelIntroduce", op[index]);
          } else if (item.id == 4) {
            this.$store.commit("config/setdemand", op[index]);
          } else if (item.id == 5) {
            this.$store.commit("config/setprocess", op[index]);
          } else if (item.id == 6) {
            this.$store.commit(
              "config/setuserAuthorization",
              op[index]
            );
          } else if (item.id == 20) {
            // setdatamarket
            this.$store.commit("config/setdatamarket", op[index]);
          }
          this.option.forEach((k) => {
            if (item.id == k.id) {
              item.img = k.img;
              item.path = k.path;
            }
          });
        });
        this.usingOption = op;
        // console.log(this.usingOption)
    },
    signout() {
      if (process.env.NODE_ENV == "development") {
        window.location.href = "http://localhost:9000/#/login"
      }
      if (process.env.NODE_ENV == "production") {
        window.location.href = "http://10.21.197.237"
      }
    },
    gobefore(){
      this.$router.push("/oridinaryUsers")
    },
    chose(id, path) {
      if(this.current == id) return
      this.current = id;
      this.$router.push(path);
    },
    getTime() {
      let date = new Date();
      this.date1 = date.toLocaleDateString().split("/").join("-");
      this.date2 = date.getHours() + ":" + date.getMinutes();
    },
    confirm() {
      userEdit({
        userName: this.info.userName,
        id: this.userInfo.id,
        mobile: this.info.mobile,
        email: this.info.email,
        empGender: this.info.sex,
        workPlace: this.info.address,
        status: 1 ,
        password:this.password
      }).then((res) => {
        // console.log(res);
        this.password = ''
        if (res.data.status == 200) {
          this.$message({
            message:"修改成功",
            type: "success",
          });
          this.$store.commit("config/setUsetInfo", {
            userName: this.info.userName,
            role_id: this.userInfo.role_id,
            id:this.userInfo.id
          });
          let username = ''
            username = res.data.data.userName || res.data.data.employeeName || this.ns[res.data.data.role_id]
            sessionStorage.setItem("username", username);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("id", res.data.data.id);
          sessionStorage.setItem("mobile", res.data.data.mobile);
          this.showtab = false;
          this.show = false
          this.list[this.active] = res.data.data
          this.active = -1
        }
      }).catch(()=>{
        this.password = ''
      });
    },
cancel() {
      this.showtab = false;
      this.active = -1
    },


  },
  watch: {
    topbararr(){
      this.init()
    },
    $route(to, from) {
      let path = document.location.hash;
      let flag = true;
      this.option.forEach((item) => {
        if (path.includes(item.path)) {
          flag = false;
          this.current = item.id;
        }
      });
      if (flag) {
        this.current = -1;
      }
    },
    usingOption(){
      // console.log("change")
      let flag = false;
      if(this.usingOption.length == 0) return
      // console.log(this.usingOption)
      this.usingOption.forEach(item=>{
        if(location.hash.includes(item.path)) {
          flag = true
          this.current = item.id
        }
      })
      if(flag) return
      this.$router.push(this.usingOption[0].path)
      // if("/"+location.hash.split("/")[1] == this.usingOption[0].path) return
      // this.$router.push(this.usingOption[0].path)
    }
  },
};
</script>

<style lang="less">
.topbar {
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

<style scoped lang="less">
.topbar {
  background: #016cf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.4%;
  .tit {
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    margin-left: 2.5%;
    // margin-right: 11.2%;
  }
  .item {
    // width: 6.5%;
    cursor: pointer;
    padding: 0 20px;
    height: 100%;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    // margin-left: 6%;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
    p {
      width: 100%;
    }
  }
  .item:nth-of-type(2) {
    margin: 0;
  }
  .active {
    background-image: linear-gradient(0deg, #004bdb 0%, #175ceb 100%);
  }
  .user {
    // position: absolute;
    // right: 16px;
    display: flex;
    align-items: center;
    .left{
      font-family: PingFangSC-Medium;
      color: #ffffff;
      margin-right: 10px;
      cursor: pointer;
      text-align: center;
      position: relative;
      // >span{
      //   font-size: 13px;
      //   display: block;
      //   background-color: #fff;
      //   color: #016cf0;
      //   border-radius: 4px;
      //   padding: 1px 5px;
      // }
      // >span:nth-of-type(2){
      //   margin-top: 2px;
      // }
      >.icon{
        background-color: transparent;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        
        transition: all 0.5s linear;
        transform-origin: center center;
      }
      >.zhen{
        transform: rotate(-45deg);
      }
      >.fan{
        transform: rotate(135deg);
      }
      >div{
        max-height: 0;
        transition: all 0.5s linear;
        overflow: hidden;
        position: absolute;
        top: 25px;
        left: -50px;
        font-size: 13px;
        width: 100px;
        background-color: #fff;
        box-shadow: 0px 0px 6px #000;
        border-radius: 3px;
        color: #000;
        >div{
          margin: 4px;
        }
        >div:hover{
          background-color: #dcdfe4; 
        }
      }
      >.msg{
        max-height: 100px;
      }
    }
    .userName {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }
    .identitys {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #eff2f6;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      margin-left: 8px;
    }
    .time {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #eaefff;
      letter-spacing: 1px;
      text-align: center;
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