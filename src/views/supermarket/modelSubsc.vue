<template>
  <div class="modelSubsc">
    <searchdemo
      four="所属单位"
      one="模型名称"
      two="请输入模型名称"
      three="请输入所属单位"
    ></searchdemo>
    <div class="listfolder">
      <div class="folder">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div class="list">
        <div class="line topline">
          <div class="name">模型名称</div>
          <div class="type">类型</div>
          <div class="company">所属单位</div>
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
          <div class="name">{{ k.modulename }}</div>
          <div class="type">{{ k.module_type }}</div>
          <div class="company">{{ k.branch_id }}</div>
          <div class="actions">
            <p :class="k.type == 0 ? 'blue' : 'gray'" @click="gosubscribe(k)">
              <img :src="subsc" alt="图片资源缺失" />
              <span>{{ k.type == 0 ? "订阅" : "已订阅" }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="11"
      layout="total, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import searchdemo from "@/components/searchdemo.vue";
import subsc from "@/assets/listlogo/subscribe.png";
import { appuser, demandadd } from "@/api/list.js";
import { mapState } from "vuex";
export default {
  name: "modelSubsc",
  data() {
    return {
      subsc,
      currentPage: 1,
      total: 0,
      status: {},
      list: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    appuser(1).then((res) => {
      console.log(res);
      this.list = res.data.data.list;
      this.total = res.data.data.count;
    });
  },
  components: {
    searchdemo,
  },
  computed: {
    ...mapState("config", ["identity"]),
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    gosubscribe(k) {
      // 普通用户
      if (this.identity == 3) {
        demandadd({
          demand_id: k.id,
          type: 2,
          demand_name: k.modulename,
          branch_id: k.branch_id,
        }).then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            k.type = res.data.data.type;
          }
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      appuser(val).then((res) => {
        this.list = res.data.data.list;
        this.total = res.data.data.count;
      });
    },
  },
};
</script>

<style scoped lang="less">
.modelSubsc {
  height: 91%;
  .pagination {
    padding-left: 47%;
  }
  .listfolder {
    display: flex;
    height: 86%;
    .folder {
      width: 20%;
    }
    .list {
      width: 80%;
    }
  }
  .list {
    height: 100%;
    .line {
      // margin: 0.1% 0;
      margin-top: 0.1%;
      display: flex;
      height: 8%;
      border: 1px solid #f5f6f9;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        // padding: 0.45% 0;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #666f8e;
        text-align: center;
        flex: 1;
      }
      .actions {
        //   flex: 2;
        p {
          // display: flex;
          // align-items: center;
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
          * {
            vertical-align: middle;
          }
        }
      }
      .actions > .blue {
        color: #017cf8;
      }
      .actions > .gray {
        color: gray;
      }
      // .actions > p:nth-of-type(1) {
      //   color: #017cf8;
      // }
      // .actions > p:nth-of-type(2) {
      //   margin-left: 5px;
      //   width: 85px;
      //   color: #fd6969;
      // }
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
</style>