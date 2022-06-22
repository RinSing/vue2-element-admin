<template>
  <div class="iconfont" v-on="$listeners">
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="type"></use>
    </svg>
  </div>
</template>

<script>
// import "@/icons/download/font_3446663_0odt72fdfqml/iconfont";

export default {
  props: {
    type: { type: String, default: "" },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
// .icon {
//   width: 1em;
//   height: 1em;
//   vertical-align: -0.15em;
//   fill: currentColor;
//   overflow: hidden;
// }
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.iconfont {
  display: inline-block;
}
</style>
