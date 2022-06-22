<template>
  <div>
    <hintCount></hintCount>
    <hintMonthly></hintMonthly>
  </div>
</template>
<script>
import hintCount from "@/views/workbench/components/hintCount";
import hintMonthly from "@/views/workbench/components/hintMonthly";

export default {
  components: { hintCount, hintMonthly },

  methods: {},
};
</script>
<style scoped>
.workCard {
  width: 18.8%;
  padding: 1% 1%;
  background: #3598dc;
  float: left;
  margin-left: 1%;
  border-radius: 2%;
}
.workCardIcon {
  float: left;
  width: 40%;
}
.workCardContent {
  float: left;
  margin-top: 15%;
  color: #fff;
  text-align: right;
  width: 50%;
}
.workCardIcon i {
  font-size: 120px;
  color: #fff;
  opacity: 0.2;
  margin-left: -30px;
}

.workCardContent .workCardContentP1 {
  font-size: 200%;
}
.workCardContent .workCardContentP2 {
  font-size: 18px;
  margin-top: 10px;
}
</style>
