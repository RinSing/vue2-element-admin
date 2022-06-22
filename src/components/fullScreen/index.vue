<template>
  <div>
    <icon-svg :type="isFullScreen ? '#icon-fullScreenExit' : '#icon-fullScreen'" @click="onToggle"></icon-svg>
  </div>
</template>
<script>
import screenfull from "screenfull";

export default {
  data() {
    return {
      isFullScreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    onToggle() {
      if (!screenfull.isEnabled) {
        this.$message.warning("此时全屏组件不可用");
        return;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullScreen = screenfull.isFullscreen;
    },
    init() {
      screenfull.on("change", this.change);
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style scoped>
div {
  cursor: pointer;
  color: #409eff;
}
</style>
