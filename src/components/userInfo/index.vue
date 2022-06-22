<template>
  <div class="right-menu">
    <div style="float: left; margin-right: 10px">
      <span>{{ $store.getters.userInfo.userName }}</span>
    </div>
    <el-dropdown class="avatar-container" trigger="click" @command="onUserCommand">
      <div class="avatar-wrapper">
        <img
          :src="require('@/assets/userImg.jpg')"
          class="user-avatar"
          style="width: 40px; height: 40px; margin-top: 4px"
        />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!-- <router-link to="/">
          <el-dropdown-item> Home </el-dropdown-item>
        </router-link> -->
        <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
          <el-dropdown-item>Github</el-dropdown-item>
        </a> -->
        <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
          <el-dropdown-item>Docs</el-dropdown-item>
        </a> -->
        <el-dropdown-item divided command="exit">
          <span style="display: block"><i class="el-icon-switch-button"></i>退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onUserCommand(v) {
      switch (v) {
        case "exit":
          this.$store.dispatch("user/userExit");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);

          break;
      }
    },
  },
};
</script>
