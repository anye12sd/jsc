<template>
  <div class="roleAssignment">
    <searchdemo
      four="所属单位"
      one="用户名"
      two="请输入用户名"
      @feedback="justgoto"
      @clear="clear"
    ></searchdemo>
    <div class="list">
      <div class="line topline">
        <div class="name">用户名</div>
        <div class="company">所属单位</div>
        <div class="uses">所属角色</div>
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
        <div class="company" :title="k.branch_id">{{ k.branch_id }}</div>
        <div class="uses" :title="k.role_name">{{ k.role_name }}</div>
        <div class="actions">
          <span @click="addnew(k)">角色分配</span>
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
    <el-drawer title="角色分配" :visible.sync="show" direction="rtl" size="40%">
      <div v-for="p in peopleOption" :key="p.id" class="col">
        <div>
          <p>{{ p.name }}</p>
          <p>{{ p.remark }}</p>
        </div>
        <div>
          <span @click="chose(p)" :class="p.name == active.role_name ? 'gray' : ''">{{
            p.name == active.role_name ? "当前身份" : "选择"
          }}</span>
        </div>
      </div>
    </el-drawer>
    <!-- <div class="tip">
      <div class="mask"></div>
      <div class="main">

      </div>
    </div> -->
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import { userList, userRloe, userroleedit } from "@/api/list.js";
export default {
  name: "roleAssignment",
  data() {
    return {
      currentPage: 1,
      total: 1,
      active: {},
      peopleOption: [],
      show: false,
      list: [],
      querymesg:null
    };
  },
  components: {
    searchdemo,
  },
  methods: {
     justgoto(p1,p2){
      // console.log(p1,p2)
      this.querymesg = {};
      this.querymesg.userName = p1;
      this.querymesg.branch_id = p2 == null ? '' : p2
      this.handleCurrentChange(this.currentPage)
    },
    clear(){
      this.querymesg = null
    },
    addnew(k) {
      this.show = true;
      this.active = k;
    },
    chose(p) {
      if (p.name == this.active.role_name) return;
      let str = "?role_id="+p.id+"&id="+this.active.id
      userroleedit(str).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.show = false;
          this.active.role_name = p.name
        }
      });
    },
    getdata(page) {
      let str = ''
      if(this.querymesg) {
        str =  page +"&userName="+this.querymesg.userName+"&branch_id="+this.querymesg.branch_id
      } else {
        str = page
      }
      userList(str).then((res) => {
        // console.log(res);
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
      // console.log(`当前页: ${val}`);
      this.getdata(val)
    },
  },
  mounted() {
    this.getdata(1);
    userRloe().then((res) => {
      // console.log(res);
      if (res.data.status == 200) {
        this.peopleOption = res.data.data;
      }
    });
  },
};
</script>

<style scoped lang="less">
.roleAssignment {
  height: 91%;
  .list {
    height: calc(91% - 35px);;
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
        align-items: center;
        justify-content: center;
      height: 8%;
      border: 1px solid #f5f6f9;
      div {
        // padding: 0.75% 0;
        
        // padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .actions > span {
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
    .topline {
      background: #f5f6f9;
      margin: 0;
      div {
        padding: 0.5% 0;
      }
    }
  }
  .col {
    display: flex;
    align-items: center;
    margin-top: 25px;
    padding-left: 20px;
  }
  .col > div:nth-of-type(1) {
    width: 80%;
  }
  .col > div:nth-of-type(2) {
    width: 20%;
    text-align: center;
    margin-top: 10px;
    span {
      background: #017cf8;
      color: #ffffff;
      padding: 3px 0;
      width: 85px;
      text-align: center;
      display: inline-block;
      height: 27px;
      box-sizing: border-box;
      border-radius: 4px;
      cursor: pointer;
    }
    .gray {
      background: lightgray;
      color: #000;
    }
  }
  // .tip{
  //   position: fixed;
  //   width: 100%;
  //   height: 100%;
  //   top: 0;
  //   left: 0;
  //   .mask{
  //     position: absolute;
  //     background-color: rgba(0, 0, 0, 0.5);
  //   }
  // }
}
</style>