<template>
  <div class="monthlyParent">
    <div id="hintMonthly"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.fnHintMonthly();
  },
  methods: {
    fnHintMonthly() {
      let hintMonthly = document.getElementById("hintMonthly");
      let hintMonthlyParent = document.getElementById("hintMonthly").parentNode;
      hintMonthly.style.width = hintMonthlyParent.offsetWidth + "px";
      hintMonthly.style.height = hintMonthlyParent.offsetHeight + "px";
      let myChart = this.echarts.init(document.getElementById("hintMonthly"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          data: ["公告", "通知", "留言", "任务总数"],
        },
        xAxis: [
          {
            type: "category",
            data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一", "十二月"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "月度数量",
            min: 0,
            max: 100,
            interval: 10,
          },
        ],
        series: [
          {
            name: "公告",
            type: "bar",
            color: " #32c5d2",
            data: [20, 49, 70, 22, 26, 77, 16, 12, 36, 20, 64, 33],
          },
          {
            name: "通知",
            type: "bar",
            color: "#8e44ad",
            data: [24, 57, 92, 26, 21, 77, 12, 18, 41, 18, 61, 27],
          },
          {
            name: "留言",
            type: "bar",
            color: "#3598dc",
            data: [24, 52, 99, 25, 27, 71, 17, 18, 48, 11, 62, 29],
          },
          {
            name: "任务总数",
            type: "bar",
            color: "#e7505a",
            data: [21, 59, 90, 24, 28, 70, 17, 18, 48, 18, 6, 21],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.monthlyParent {
  width: 100%;
  height: 48vh;
  margin: auto;
  margin-top: 5%;
}
</style>
