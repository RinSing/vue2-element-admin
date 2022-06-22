<template>
  <el-card style="padding: 10px; height: 100%; width: 100%; height: 100%; font-size: 16px">
    <div style="width: 100%; height: 100%">
      <img :src="require('@/assets/userImg.jpg')" style="width: 100px; height: 100px; border-radius: 50%" />
    </div>
    <div style="float: left; width: 59.5%">
      <table style="text-align: right; font-family: emoji">
        <tr>
          <td>姓名：</td>
          <td>觉有情</td>
        </tr>
        <tr>
          <td>性别：</td>
          <td>男</td>
        </tr>
        <tr>
          <td>出生年月：</td>
          <td>1995年3月</td>
        </tr>
        <tr>
          <td>职业：</td>
          <td>web前端工程师</td>
        </tr>
        <tr>
          <td>现居地：</td>
          <td>上海</td>
        </tr>
        <tr>
          <td>家乡：</td>
          <td>湖北</td>
        </tr>
        <!-- <tr>
            <td rowspan="2">简介：</td>
            <td rowspan="2">
             
            </td>
          </tr> -->
      </table>
      <hr style="border-style: ridge; margin-top: 2%" />
      <div style="text-align: left; margin-top: 2%">
        <!-- text-indent: 2em -->
        <span style="text-indent: 2em">简介：</span>
        <p style="display: inline-block">一个前端程序员,主要技术栈是vue。</p>
      </div>
    </div>
    <div style="float: right; width: 200px; height: 200px">
      <p style="">技术交流</p>

      <img :src="require('@/assets/vx.jpg')" style="width: 100%" />
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style scoped>
td:not(:nth-last-child(2)) {
  text-align: center;
}
td:not(:nth-last-child(1)) {
}
</style>
