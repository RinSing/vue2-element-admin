<template>
  <div style="">
    <el-tabs v-model="activeName" type="card" tab-position="bottom" @tab-click="onTabClick" @tab-remove="onTabRemove">
      <el-tab-pane
        v-for="(item, index) in tabsList"
        :key="item.path"
        :name="item.path"
        :label="item.meta.title"
        :closable="index != 0"
      >
        <template slot="label" style="margin-right: 10px; border: 1px solid red">
          <span>{{ item.meta.title }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "menuTabs",
  data() {
    return { tabsList: [], activeName: "" };
  },

  watch: {
    $route: {
      handler: function (newval, oldVal) {
        this.tabsAdd();
      },
    },
  },
  created() {
    this.tabsInit();
    this.tabsAdd();
  },
  activated() {
    console.log("activated");
  },
  deactivated() {
    console.log("deactivated");
  },
  methods: {
    tabsInit() {
      let route = null;
      this.$store.getters.routers.some((item) => {
        if (item.path == "/" || item.path == "index") {
          route = item;
          return true;
        }
      });

      console.log(this.$router.options);
      this.tabsList = [{ ...route.children[0], path: route.redirect }];
      this.activeName = route.redirect;
    },
    tabsAdd() {
      let isTabsListExist = false;
      for (let t = 0; t < this.tabsList.length; t++) {
        if (this.tabsList[t].path == this.$route.path) {
          isTabsListExist = true;
          break;
        }
      }
      if (!isTabsListExist) {
        this.tabsList.push(this.$route);
      }
      this.activeName = this.$route.path;
    },
    onTabClick(tab, v, z) {
      let tabIndex = this.tabsList[tab.index];
      if (tabIndex.path !== this.$route.path) {
        this.$router.push(tabIndex.path);
      }
    },
    onTabRemove(tabName, v, z) {
      for (let t = 0; t < this.tabsList.length; t++) {
        if (this.tabsList[t].path == tabName) {
          this.tabsList.splice(t, 1);
          this.activeName = this.tabsList[t - 1].path;
          this.$router.push(this.tabsList[t - 1].path);
          break;
        }
      }
    },
  },
};
</script>
<style scoped>
::v-deep .el-tabs--card > .el-tabs__header {
  border-bottom: 0px;
  /* margin-top: 5px !important; */
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 1px solid #e5e5e7;
}

::v-deep .el-tabs__item {
  height: 25px;
  line-height: 25px;
  /* padding: 0 10px; */
}
::v-deep.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0px solid #e1e1e4;
}
::v-deep.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #e1e1e4;
}
::v-deep.el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  border-left: 1px solid #c6c0c0;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #c6c0c0;
  margin-left: 10px;
  font-size: 14px;
}
::v-deep .el-tabs__nav-wrap {
  float: left;
}
::v-deep .el-tabs--bottom .el-tabs__header.is-bottom {
  margin-top: 3px;
}
</style>
