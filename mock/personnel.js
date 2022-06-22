let { mocUrl } = require("@/config");
const Mock = require("mockjs");
const Random = require("mockjs").Random;
function f() {
  return;
}
module.exports = [
  {
    // url: `${baseUrl}"/getStaffList"`,
    url: mocUrl + "/getUserList",
    type: "get",
    response: (config) => {
      let data = Mock.mock({
        "items|9": [
          {
            id: "@id()", // 得到随机的id
            username: "@cname()", // 随机生成中文名字
            headmage: Random.image("200x200", "#894FC4", "#FFF", "png", "@/username"), // 随机生成图片
            description: "@paragraph()", // 随机生成描述
            ip: "@ip()", // 随机生成ip地址
            email: "@email()", // 随机生成email
            birthDate: "@date()", // 随机生成日期
            education: "",
            sex: "@pick(['男','女'])",
            "string|1-10": "xxx", // 范围内，随机重复字符串次数
            "number|1-100": 100, // 范围内，随机生成数字
            "boolean|1": true, // 随机生成布尔值
            deptId: "", // 在对象中，抽取随机数个数据
            city: "@city()",
            ctitle: "@ctitle(13,28)",
            "object|1": {
              110000: "北京市",
              120000: "天津市",
              130000: "河北省",
              140000: "山西省",
            }, // 在数组中，抽取随机数个数据
            "array|1-10": [
              {
                // 抽出的每个数据中的对象将轮流从该数组中抽取
                "name|+1": ["Hello", "Mock.js", "!"],
              },
            ],
          },
        ],
      });
      return {
        code: 20000,
        data: {
          total: data.items.length,
          items: data.items,
        },
      };
    },
  },
];
