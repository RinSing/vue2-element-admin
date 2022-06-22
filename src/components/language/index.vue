<template>
  <div>
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        <icon-svg type="#icon-language"></icon-svg>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in languList"
          :key="item.value"
          :command="item.value"
          :disabled="$i18n.locale == item.value"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { language } from "@/config";
export default {
  data() {
    return {
      languList: [
        { value: "zh", name: "中文" },
        { value: "en", name: "英文" },
      ],
    };
  },
  methods: {
    onCommand(event) {
      localStorage.setItem(language, event);
      this.$i18n.locale = event;
    },
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
