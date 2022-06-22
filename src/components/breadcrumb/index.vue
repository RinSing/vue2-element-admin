<template>
  <div>
    <el-breadcrumb separator="/" class="app-breadcrumb">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">
          <span> {{ item.meta.title }}</span></el-breadcrumb-item
        ></transition-group
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return { levelList: null };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.getBreadcrumb();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => {
        return item.meta && item.meta.title;
      });
      this.levelList = matched;
    },
    onHandleLink(item) {
      let { path } = item;
      console.log(path);
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  // font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
