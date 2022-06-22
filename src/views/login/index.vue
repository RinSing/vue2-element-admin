<template>
  <div style="background: #2d3a4b; height: 100vh; width: 100%; position: absolute; top: 0px">
    <div style="width: 600px; margin: auto; margin-top: 13%">
      <div style="font-size: 30px; color: #eee; width: 100%; margin: auto; height: 50px">
        {{ $t("langu.loginTitle") }} <language class="language"></language>
      </div>
      <el-form style="width: 100%; margin: auto; margin-top: 18%" :model="user">
        <el-form-item prop="name">
          <span> <i class="el-icon-user"></i></span>
          <el-input v-model="user.name" name="name" type="text" tabindex="1" auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item>
          <span><i class="el-icon-lock"></i></span>
          <el-input v-model="user.password" :type="passwordType" ref="password"> </el-input>
          <!-- <svg-icon :icon-class="isEyeOpen ? 'eye' : 'eyeClose'" @click="isEyeOpen = !isEyeOpen"></svg-icon> -->
          <span @click="onPassShow">
            <icon-svg :type="passwordType == 'password' ? '#icon-eyeClose' : '#icon-eyeOpen'"></icon-svg>
          </span>
        </el-form-item>

        <el-button type="primary" @click="submitForm('ruleForm')" style="float: right">{{
          $t("langu.loginSubmit")
        }}</el-button>
        <div style="display: flex; flex-direction: column; align-items: baseline; color: rgb(238, 238, 238)">
          <p>{{ $t("langu.systemUser") }}：admin/123</p>
          <p>{{ $t("langu.leader") }}：leader/123</p>
          <p>{{ $t("langu.ordinary") }}：user/123</p>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import language from "@/components/language";

export default {
  components: { language },
  data() {
    return {
      passwordType: "password",
      user: {
        name: "",
        password: "",
      },
      redirect: "",
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        const query = newVal.query;
        if (query) {
          this.redirect = query.redirect;
        }
      },
      immediate: true,
    },
  },
  methods: {
    onPassShow() {
      this.passwordType = this.passwordType == "password" ? "" : "password";
      this.$nextTick(() => {
        this.$refs["password"].focus();
      });
    },
    submitForm() {
      this.$store
        .dispatch("user/login", this.user)
        .then((data) => {
          if (!data || data.code != 20000) {
            this.$fnElMessageExamine("账号或密码错误。", "error");
            return;
          }

          this.$router.push({
            path: this.redirect || "/",
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  /*transition: background-color 5000s ease-in-out 0s;
   -webkit-text-fill-color: #fff !important; */
  box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
  -webkit-text-fill-color: #fff !important;
}
::v-deep input {
  color: #fff !important;
  caret-color: #fff !important;
}

::v-deep .el-input__inner {
  height: 55px;
  border: 0px;
}
::v-deep .el-input {
  width: 91%;
  font-size: 20px;
}
::v-deep .el-form-item {
  border: 1px solid #585858;
}
::v-deep .el-form-item__content {
  font-size: 25px;
  color: #eee;
  text-align: left;
  margin-left: 2%;
}

::v-deep .language .el-dropdown-link {
  font-size: 20px;
  background: rgb(238, 238, 238);
}
::v-deep .language {
  display: inline-block;
  float: right;
}
</style>
