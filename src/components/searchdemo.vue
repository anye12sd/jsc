<template>
  <div class="search">
    <div>
      <label for="people">{{ one }}</label>
      <input
        type="text"
        name="people"
        id="people"
        v-model="people"
        :placeholder="two"
      />
      <label for="time">{{ four == true ? '修改时间':four }}</label>
      <el-date-picker
        v-model="datetime"
        type="datetime"
        placeholder="请选择时间范围"
        v-if="four == true"
      >
      </el-date-picker>
      <!-- <input
        type="time"
        name="time"
        id="time"
        v-if="four == true"
        placeholder="请选择时间范围"
      /> -->
      <input type="text" id="time" v-else :placeholder="three" />
    </div>
    <div>
      <input
        type="text"
        class="goSearch"
        v-model="searchcontent"
        placeholder="查询输入"
      />
      <div class="searchlogo">
        <img :src="search" alt="图片丢失" />
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/assets/search.png";
export default {
  name: "searchdemo",
  data() {
    return {
      search,
      datetime: "",
      people: "",
      searchcontent: "",
    };
  },
  props: {
    one: {
      type: String,
      default: "申请人",
    },
    two: {
      type: String,
      default: "修改时间",
    },
    three: {
      type: String,
      default: "请输入申请人姓名",
    },
    four: {
      default: "请选择时间范围",
    },
  },
  mmethods: {},
};
</script>
<style scoped lang="less">
.search {
  height: 9%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #292929;
  label {
    margin-right: 1%;
  }
  input {
    border: 1px solid #c1c1c1;
    border-radius: 2px;
    height: 3%;
    padding: 0.6% 3%;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #606266;
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
    width: 20%;
    height: 38%;
  }
  #people {
    margin-right: 3%;
  }
  .goSearch {
    width: 25%;
    height: 38%;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
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
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
}
.search > div:nth-of-type(2) {
  justify-content: flex-end;
}
</style>

<style lang="less">
.search {
  .el-date-editor.el-input {
    width: 23%;
    height: 40%;
    padding: 0.6% 3%;
  }
  .el-input--prefix .el-input__inner {
    border: 1px solid #c1c1c1;
    border-radius: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    padding-left: 30px;
    // padding: 0.6% 13%;
  }
  .el-input__icon {
    line-height: 100%;
    display: block;
    margin-top: 10%;
    height: 94%;
  }
}
</style>