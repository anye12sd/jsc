<template>
  <div class="job">
    <div class="tit">就业（上年）</div>
    <div class="cnztjy">
      <div>
        <div>总就业人数</div>
        <div>{{ cnzt_jy.zjyrs }}}</div>
      </div>
      <div>
        <div>就业率</div>
        <div>{{ cnzt_jy.jyl }}</div>
      </div>
      <div>
        <div>失业率</div>
        <div>{{ cnzt_jy.syl }}</div>
      </div>
      <div>
        <div>已就业人数</div>
        <div>{{ cnzt_jy.yjyrs }}</div>
      </div>
      <div>
        <div>待就业人数</div>
        <div>{{ cnzt_jy.djyrs }}</div>
      </div>
    </div>
    <div class="qyxx">
        <div>
            <div>
                <div>人才引进</div>
                <div>{{ cnzt_jy.rcyj }}</div>
            </div>
            <div>
                <div>较上年</div>
                <div v-if="cnzt_jy.rcyjsn" :class="cnzt_jy.rcyjsn > 0 ? 'cyzj' : 'cyzj1'">
                    {{ cnzt_jy.rcyjsn }}
                </div>
            </div>
            <div>
                <div>大学生本地就业</div>
                <div>{{ cnzt_jy.dxsbdjy }}</div>
            </div>
            <div>
                <div>较上年</div>
                <div v-if="cnzt_jy.dxssn" :class="cnzt_jy.dxssn > 0 ? 'cyzj' : 'cyzj1'">
                    {{ cnzt_jy.dxssn }}
                </div>
            </div>
        </div>
        <div>
            <div>
                <div>公积金新增</div>
                <div>{{ cnzt_jy1.gjjxz }}</div>
            </div>
            <div>
                <div>社保新增</div>
                <div></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// 就业
export default {
  name: "job",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.job {
  width: 100%;
  height: 100%;
  padding: 5px;
  color: #fff;
  box-sizing: border-box;
  .tit {
    font-family: SourceHanSansCN-Heavy;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
  }
  .cnztjy{
      display: flex;
      flex-wrap: wrap;
  }
  .cnztjy>div{
      flex: 1;
      text-align: center;
  }
}
</style>