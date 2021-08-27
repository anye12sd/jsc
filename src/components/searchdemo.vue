<template>
  <div class="search">
    <div>
      <label for="people">{{ one }}</label>
      <input
        type="text"
        name="people"
        id="people"
        v-model="name"
        @blur="blur"
        :placeholder="two"
      />
      <label for="time">{{ four == true ? "选择时间" : '' }}</label>
      <el-date-picker
        v-model="datetime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-if="four == true"
        :default-time="['12:00:00']"
        @blur="blur"
      >
      </el-date-picker>
      <!-- <el-select v-model="company" :placeholder="three" clearable @blur="blur" v-else>
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.branchname"
          :value="item.id"
        >
        </el-option>
      </el-select> -->
      <!-- <input
        type="text"
        id="time"
        v-else
        :placeholder="three"
        v-model="name2"
        @blur="blur"
      /> -->
      <div
        class="searchlogo"
        style="color: #fff; margin-left: 20px"
        @click="confirm"
      >
        搜索
        <!-- <img :src="search" alt="图片丢失" /> -->
      </div>
    </div>
    <!-- <div>
      <div class="searchlogo" style="color: #fff" @click="confirm">
        搜索
      </div>
    </div> -->
  </div>
</template>

<script>
import search from "@/assets/search.png";
import { appbranch } from "@/api/list.js";
export default {
  name: "searchdemo",
  data() {
    return {
      search,
      datetime: "",
      name: "",
      name2: "",
      searchcontent: "",
      company: null,
      options:[]
    };
  },
  props: {
    one: {
      type: String,
      default: "申请人",
    },
    two: {
      type: String,
      default: "请输入姓名",
    },
    three: {
      type: String,
      default: "选择需求单位",
    },
    four: {
      default: "请选择时间",
    },
  },
  mounted() {
    if (this.four != true) {
      // appbranch().then((res) => {

      //   this.options = res.data.data;
      // });
    }
  },
  methods: {
    blur() {
      if (this.four == true) {
        if (!this.name && !this.datetime) {
          this.$emit("clear");
        }
      } else {
        if (!this.name && !this.company) {
          this.$emit("clear");
        }
      }
    },
    confirm() {
      if (this.four == true) {
        // console.log(th)
        this.$emit("feedback", this.name, this.datetime);
      } else {
        // this.$emit("feedback", this.name, this.company);
        this.$emit("feedback", this.name);
      }
    },
  },
  watch: {
    datetime(newValue) {
      if (!newValue && !this.name) {
        this.$emit("clear");
      }
    },
  },
};
</script>

<style lang="less">
.search {
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    width: 200px;
    height: 30px;
    line-height: 30px;
  }
  .el-select .el-input .el-select__caret{
    position: relative;
    top: -1px;
  }

}
</style>
<style scoped lang="less">
.search {
  height: 9%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #292929;
  label {
    margin-right: 1%;
  }
  input {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 3%;
    padding: 3px 5px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #606266;
    box-sizing: border-box;
  }

  input:focus {
    border: 1px solid #409eff;
    outline: 0;
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #afadad;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #afadad;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #afadad;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #afadad;
  }
  #people,
  #time {
    width: 170px;
    height: 30px;
  }
  #people {
    margin-right: 3%;
  }
  .searchlogo {
    cursor: pointer;
    height: 38%;
    padding: 0.6% 1.8%;
    display: flex;
    align-items: center;
    border: 1px solid #017cf8;
    width: auto;
    background: #017cf8;
    border-radius: 2px;
  }
}
.search > div {
  height: 100%;
  display: flex;
  align-items: center;
}
.search > div:nth-of-type(1) {
  width: 80%;
}
.search > div:nth-of-type(2) {
  width: 20%;
}
</style>

<style lang="less">
.search {
  .el-date-editor--datetimerange.el-input__inner {
    height: 30px;
  }
  // .el-date-editor.el-input {
  //   width: 25%;
  //   height: 40%;
  //   padding: 0.6% 3%;
  // }
  // .el-input--prefix .el-input__inner {
  //   border: 1px solid #c1c1c1;
  //   border-radius: 2px;
  //   height: 100%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   font-family: MicrosoftYaHei;
  //   font-size: 14px;
  //   padding-left: 30px;
  //   // padding: 0.6% 13%;
  // }
  .el-input__icon {
    line-height: 24px;
  }
}
</style>