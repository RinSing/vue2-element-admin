<template>
  <div v-if="!item.hidden">
    <menuLink v-if="!item.children" :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)" :class="{ 'submenu-title-noDropdown': true }">
        <!-- <i :class="item.meta.icon"></i>
      <span slot="title">{{ item.meta.title }}</span> -->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </menuLink>
    <el-submenu :index="resolvePath(item.path)" v-else popper-append-to-body>
      <!-- <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template> -->
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <subItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :basePath="resolveBasePath(child.path)"
        class="nest-menu"
      ></subItem>
    </el-submenu>
  </div>
</template>
<script>
import item from "./item";
import menuLink from "./menuLink.vue";
export default {
  components: { item, menuLink },
  name: "subItem",
  props: ["item", "basePath"],
  data() {
    return { isChildren: true };
  },
  computed: {},
  created() {},
  methods: {
    resolvePath(path) {
      return this.basePath;
    },
    resolveBasePath(path) {
      if (this.basePath == "/") {
        return "/" + path;
      }
      return this.basePath + "/" + path;
    },
  },
};
</script>
<style scoped>
::v-deep .svg-icon {
  background: #fff;
}
</style>
