//const fs = require("fs");
// const path = require("path");
const { isMock, mocUrl } = require("../src/config/cli.config");
const Mock = require("mockjs"); //mockjs 导入依赖模块
//const JSON5 = require("json5"); //json5的作用是可以解析json文件中的注释
const getUserList = () => {
  let users = [
    {
      id: "1001",
      username: "zhangsan",
      password: "123456",
    },
    {
      id: "1002",
      username: "lisi",
      password: "123456",
    },
    {
      id: "1003",
      username: "wangwu",
      password: "123456",
    },
  ];
  return users;
};

import personnel from "./personnel";
import user from "./user";

const mockData = [...personnel, ...user];

//Mock.mock("http://localhost:8080/getUserList", "get", getUserList());
// Mock.mock({
//   url: "http://localhost:8080/getUserList",
//   type: "get",
//   response: (config) => {
//     const items = getUserList();
//     return {
//       code: 20000,
//       data: {
//         total: items.length,
//         items: items,
//       },
//     };
//   },
// });
mockData.map((v, i, arr) => {
  Mock.mock(v.url, v.type, v.response());
});

//读取json文件
// function getJsonFile(filePath) {
//   //读取指定json文件
//   var json = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");
//   //解析并返回
//   return JSON5.parse(json);
// }

//返回一个函数
// module.exports = function (app) {
//   // if (process.env.MOCK == "true") {
//   //为了满足当后台有接口的时候，不是使用mock数据，在此处做一个判断，可以在.env文件中对设置
//   //监听http请求
//   app.get("/user/userinfo", function (rep, res) {
//     //每次响应请求时读取mock data的json文件
//     //getJsonFile方法定义了如何读取json文件并解析成数据对象
//     var json = getJsonFile("./userInfo.json5");
//     //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
//     res.json(Mock.mock(json));
//   });
//   // }
// };
