module.exports = {
  baseUrl: process.env.VUE_APP_baseUrl,
  port: process.env.port,
  timeout: 2000,
  // 配后端数据的接收方式application/json;charset=UTF-8 �application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
};
