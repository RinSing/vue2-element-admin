let { baseUrl } = require("@/config");
let userData = [
  {
    userName: "admin",
    userPass: "123",
    userRole: "admin",
  },
  {
    userName: "leader",
    userPass: "123",
    userRole: "leader",
  },
  {
    userName: "user",
    userPass: "123",
    userRole: "user",
  },
];
module.exports = [
  {
    url: baseUrl + "/user/login",
    type: "get",
    response: (data) => {
      return { code: 20000, userData, token: "tokenValue" };
    },
  },
];
