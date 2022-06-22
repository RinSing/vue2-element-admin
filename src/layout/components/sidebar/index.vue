<template>
  <div :class="{ 'has-logo': true }" style="text-align: left">
    <logo v-if="true" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
      >
        <subItem v-for="router in routers" :key="router.path" :item="router" :basePath="router.path"></subItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import subItem from "./subItem";
import Logo from "./Logo";
import variables from "@/styles/variables.module.scss";
import { mapGetters } from "vuex";

export default {
  components: { subItem, Logo },
  computed: {
    ...mapGetters({ sidebar: "sidebar" }),
    routers() {
      // debugger;
      return this.$store.getters.routers; // this.$router.options.routes;
    },

    activeMenu() {
      return this.$route.path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    variables() {
      return variables;
    },
    showLogo() {
      return ""; // this.$store.state.settings.sidebarLogo;
    },
  },
  mounted() {},
};
</script>
<style></style>
