import request from "@/utils/request";
export async function getStaffList(params) {
  return request({
    url: "/getUserList",
    method: "get",
    params: {},
  });
}

export async function login() {
  return request({
    url: "/user/login",
    method: "get",
    params: {}
  })
}