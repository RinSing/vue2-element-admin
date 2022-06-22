import Vue from "vue";
import store from "@/store/index";

import "@/components/index";
import "@/utils/prototypeCommon";
import "@/permission";
import router from "@/router/index";

import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import { language } from "@/config";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: (function () {
    if (localStorage.getItem(language)) {
      return localStorage.getItem(language);
    }
    return "zh";
  })(),
  messages: {
    en: { ...require("./language/en"), ...enLocale }, //英文包
    zh: { ...require("./language/zh"), ...zhLocale }, //中文包
  },
});
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) });
//ElementLocale.i18n((key, value) => i18n.t(key, value));
//Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) });

import "@/utils/echarts";

import "@/styles/index.scss"; // global css
import App from "./App.vue";

Vue.config.productionTip = false;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.BASE_URL", process.env.BASE_URL);
console.log("process.env.port", process.env.port);
console.log("process.env.barseUrl", process.env.barseUrl);
const mock = true;
if (mock) {
  require("../mock/index");
}
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
