<template>
  <div style="height: 100%; float: left">
    <div style="height: 370px; float: left; width: 100%">
      <div style="width: 54.5%; float: left; height: 100%"><authorInfo></authorInfo></div>

      <div style="width: 45%; float: right; height: 100%">
        <el-card class="box-card" style="height: 100%; width: 100%">
          <div style="width: 300px; margin: auto">
            <img :src="require('@/assets/give.jpg')" style="width: 100%; height: 100%" />
          </div>
          <!-- <p>***后台管理系统。</p> -->
        </el-card>
      </div>
    </div>
    <div style="margin-top: 0.5%; width: 100%; height: 100%; float: left">
      <div class="visitor">
        <el-card style="padding: 10px; height: 100%">
          <div style="text-align: left; margin-top: 10px">
            <i class="el-icon-s-marketing"></i> <span>访问量(月)</span>
          </div>
          <div class="pageviewParent">
            <div id="pageview"></div>
          </div>
        </el-card>
      </div>
      <div class="visitor">
        <el-card style="padding: 10px; height: 100%">
          <div style="text-align: left; margin-top: 10px">
            <i class="el-icon-s-marketing"></i> <span>访问来源(市)</span>
          </div>
          <div class="visitSourceParent">
            <div id="visitSource"></div>
          </div>
        </el-card>
      </div>
      <div class="frameTable">
        <el-card style="padding: 10px; height: 100%">
          <div style="text-align: left; margin-top: 10px; margin-bottom: 2vh">
            <i class="el-icon-info"></i> <span>信息</span>
            <div style="color: #341fd8; float: right; padding: 0 10px">部署时间：2021-01-01</div>
          </div>
          <table>
            <tr>
              <td>vue</td>
              <td>^2.6.14</td>
              <td>vuex</td>
              <td>^3.6.2</td>
              <td>vue-router</td>
              <td>^3.5.4</td>
            </tr>
            <tr>
              <td>element-ui</td>
              <td>^2.15.8</td>
              <td>echarts</td>
              <td>^5.3.2</td>
              <td>npm</td>
              <td>^8.12.0</td>
            </tr>
            <tr>
              <td>网站</td>
              <td colspan="5"></td>
            </tr>
            <tr>
              <td>gitee</td>
              <td colspan="5">https://gitee.com/</td>
            </tr>
            <tr>
              <td>github</td>
              <td colspan="5"></td>
            </tr>
          </table>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
// import * as echarts from "echarts";
import authorInfo from "@/components/authorInfo";
export default {
  components: { authorInfo },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.pageView();
    this.visitSource();
  },
  methods: {
    pageView() {
      let pageview = document.getElementById("pageview");
      let pageviewParent = document.getElementById("pageview").parentNode;
      pageview.style.width = pageviewParent.offsetWidth + "px";
      pageview.style.height = pageviewParent.offsetHeight + "px";
      console.log(pageviewParent.offsetWidth);
      let myChart = this.echarts.init(pageview);

      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "line",
            areaStyle: {},
          },
        ],
      });
    },
    visitSource() {
      let visitSource = document.getElementById("visitSource");
      let visitSourceParent = document.getElementById("visitSource").parentNode;
      visitSource.style.width = visitSourceParent.offsetWidth + "px";
      visitSource.style.height = visitSourceParent.offsetHeight + "px";
      let myChart = this.echarts.init(document.getElementById("visitSource"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "上海" },
              { value: 735, name: "北京" },
              { value: 580, name: "深圳" },
              { value: 484, name: "广东" },
              { value: 300, name: "武汉" },
            ],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.pageviewParent,
.visitSourceParent {
  width: 100%;
  height: 27vh;
}
.visitor {
  /* width: 23vw; */
  float: left;
  margin-left: 0.5%;
  width: 28%;
  height: 33vh;
  background-color: #fff;
}
.visitor:first-child {
  margin-left: 0;
}
.frameTable {
  /* margin-left: 1%; */
  float: right;
  width: 43%;
  height: 33vh;
  background-color: #fff;
}
table {
  height: 25vh;

  width: 100%;
  color: #666;
  border-collapse: collapse;
  background-color: #fff;
}
td {
  position: relative;
  padding: 1% 2%;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #e6e6e6;
  text-align: left;
}
td:nth-child(odd) {
  width: 20%;
  text-align: right;
  background-color: #f7f7f7;
}
</style>
