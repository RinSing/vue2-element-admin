import Vue from "vue";
import axios from "axios";
let { baseUrl, mocUrl, timeout, contentType } = require("@/config");
const instance = axios.create({
  baseURL: mocUrl,
  timeout: timeout,
  headers: { "Content-Type": contentType },
  // responseType: "json",

  // transformRequest: () => {},
  // transformResponse: () => {},
  // auth: { Authorization: "AuthorizationValue" },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {}
);

instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    // Vue.prototype.$fnElMessageExamine("操作失败");
  }
);

function handleData({ config, data, status, statusText }) {
  if (status == 200) {
    if (data.code == 1000) {
      //Vue.prototype.$fnElMessageExamine("操作失败");
    }
    //Vue.prototype.$fnElMessageExamine("操作成功");
    return data;
  }
}

export default instance;
