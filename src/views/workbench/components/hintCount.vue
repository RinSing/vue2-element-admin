<template>
  <div style="width: 100%; height: 20vh">
    <div class="workCard" style="background: #32c5d2">
      <div class="workCardIcon">
        <i class="el-icon-message"></i>
      </div>
      <div class="workCardContent">
        <p class="workCardContentP1">3</p>
        <p class="workCardContentP2">公告</p>
      </div>
    </div>
    <div class="workCard" style="background: #8e44ad">
      <div class="workCardIcon">
        <i class="el-icon-bell"></i>
      </div>
      <div class="workCardContent">
        <p class="workCardContentP1">5</p>
        <p class="workCardContentP2">通知</p>
      </div>
    </div>
    <div class="workCard" style="background: #3598dc">
      <div class="workCardIcon">
        <i class="el-icon-chat-dot-round"></i>
      </div>
      <div class="workCardContent">
        <p class="workCardContentP1">8</p>
        <p class="workCardContentP2">留言</p>
      </div>
    </div>
    <div class="workCard" style="background: #e7505a">
      <div class="workCardIcon">
        <i class="el-icon-bangzhu"></i>
      </div>
      <div class="workCardContent">
        <p class="workCardContentP1">10</p>
        <p class="workCardContentP2">待处理任务</p>
      </div>
    </div>
    <div class="workCard" style="background: #e7505a">
      <div class="workCardIcon">
        <i class="el-icon-s-help"></i>
      </div>
      <div class="workCardContent">
        <p class="workCardContentP1">15</p>
        <p class="workCardContentP2">已处理任务</p>
      </div>
    </div>
  </div>
</template>
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
