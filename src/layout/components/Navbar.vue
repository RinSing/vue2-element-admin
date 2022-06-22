<template>
  <div class="navbar">
    <div style="height: 60%">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
      <userInfo></userInfo>
      <div class="tools">
        <fullScreen class="fullScreen"></fullScreen>
        <language class="language"></language>
      </div>
    </div>
    <div style="height: 40%; border-top: 1px solid #e9e4e4">
      <menuTabs class="menuTabs"></menuTabs>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb";
import Hamburger from "@/components/hamburger";
import UserInfo from "@/components/userInfo";
import { mapGetters } from "vuex";
import MenuTabs from "@/components/menuTabs";
import language from "@/components/language";

import fullScreen from "@/components/fullScreen";

export default {
  components: { Breadcrumb, Hamburger, MenuTabs, UserInfo, language, fullScreen },

  data() {
    return { avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?" };
  },
  computed: {
    ...mapGetters({
      sidebar: "sidebar",
    }),
    isActive() {
      return this.$store.state.setting.sidebar.opened;
    },
  },
  created() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch("setting/toggleSideBar");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  line-height: 50px;
  font-size: 14px;
  height: 80px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: 1px;
  }

  .right-menu {
    float: right;
    height: 100%;
    // line-height: 58px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      // font-size: 14px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
::v-deep.menuTabs {
  line-height: 1px;
}
::v-deep.menuTabs .div {
  color: rgb(164, 46, 46) !important;
}

.tools {
  float: right;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-right: 30px;
}

::v-deep .fullScreen,
.language {
  margin-right: 25px;
}

::v-deep .language .el-dropdown-link,
.fullScreen {
  font-size: 25px;
}
</style>
