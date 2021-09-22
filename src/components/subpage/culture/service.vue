<template>
  <div id="service">
    <div class="bigtit">
      <div class="tag"></div>
      <div>志愿服务</div>
    </div>
    <div class="content">
      <div class="flex">
        <div class="service-left"></div>
        <div class="flex-1 service-right">
          <div class="in">
            <div>{{ child01.label }}</div>
            <div>
              <span style="font-weight:bold;font-size: 2.2rem;color: #14FC8C;">{{ child01.value }}</span>
            </div>
          </div>
          <div class="in">
            <div>{{ child02.label }}</div>
            <div style="font-size: 2.2rem;color: #32C5FF;">NO.{{child02.value}}</div>
          </div>
        </div>
      </div>
      <div class="service-outbox flex" style="flex-wrap: wrap;" v-if="child03.data.length">
        <div class="service-box">
          <div class="header-img header-img1">{{ child03.data[0].value }}{{child03.data[0].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[0].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img2">{{ child03.data[1].value }}{{child03.data[1].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[1].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img3">{{ child03.data[2].value }}{{child03.data[2].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[2].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img4">{{ child03.data[3].value }}{{child03.data[3].em || ""}}</div>
          <div class="service-content flex">
            <div class="service-content-left">{{ child03.data[3].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img5">{{ child03.data[4].value }}{{child03.data[4].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[4].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img6">{{ child03.data[5].value }}{{child03.data[5].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[5].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img7">{{ child03.data[6].value }}{{child03.data[6].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[6].label }}</div>
          </div>
        </div>
        <div class="service-box">
          <div class="header-img header-img8">{{ child03.data[7].value }}{{child03.data[7].em || ""}}</div>
          <div class="service-content">
            <div class="service-content-left">{{ child03.data[7].label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "service",
  data(){
    return {
      child01: {},
      child02: {},
      child03: {data: []},
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      this.$axios({
        method: "post",
        url: "api/front-jczl-dpm/stwm/json/module02.json",
      })
          .then((res) => {
            let optionsdata = res.data.data;
            this.child03 = optionsdata.child03
            this.child02 = optionsdata.child02
            this.child01 = optionsdata.child01
          })
          .catch((err) => {
            console.log(err);
          });
    },
  }
}
</script>

<style scoped>
#service {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}
.bigtit{
  height: 3.5%;
}
.flex{
  display: flex;
}
.flex-1{
  flex: 1;
}
.in{
  display: inline-block;
  width: 50%;
  padding-top: 9px;
}
.content{
  height: 92%;
  margin-top: 15px;
}
.service-left{
  background: url("../../../assets/subpage/service@1x.png") no-repeat right;
  background-size: 60px;
  width: 60px;
  height: 60px;
}
.service-right{
  text-align: left;
  margin-left: 14px;
}
.service-box{
  width: 48%;
  margin-right: 1%;
  background: #114787;
  padding: 10px 0;
  margin-top: 8px;
  border-radius: 5px;
}
.header-img{
  text-align: right;
  color: #00eaff;
  font-size: 2.2rem;
}
.header-img1{
  background: url("../../../assets/subpage/service1@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img2{
  background: url("../../../assets/subpage/service2@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img3{
  background: url("../../../assets/subpage/service3@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img4{
  background: url("../../../assets/subpage/service4@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img5{
  background: url("../../../assets/subpage/service5@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img6{
  background: url("../../../assets/subpage/service6@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img7{
  background: url("../../../assets/subpage/service7@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.header-img8{
  background: url("../../../assets/subpage/service8@1x.png") no-repeat 15px;
  background-size: 18px;
  height: 18px;
  padding: 0 15px
}
.service-content{
  padding: 0 15px;
  margin-top: 10px;
  font-size: 1.8rem;
}
.service-content-right{
  text-align: right;
  color: #00EAFF;
  font-size: 2.2rem;
}
</style>