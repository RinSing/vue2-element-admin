import Vue from "vue";
import VueRouter from "vue-router";
import { publicPath, routerMode } from "@/config";
import layout from "@/layout/index.vue";
Vue.use(VueRouter);
export const initRouters = [
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/login"),
  },
];
export const menuRouters = [
  {
    path: "/",
    name: "indexLayout",
    hidden: false,
    component: layout,
    redirect: "/index",
    meta: { title: "首页", icon: "el-icon-house" },
    children: [
      {
        path: "index",
        name: "index",

        hidden: false,

        component: () => import("@/views/home/index"),
        meta: { title: "首页", icon: "el-icon-house", menuRole: [] },
      },
      {
        path: "workPlatform",
        name: "workPlatform",
        hidden: false,

        component: () => import("@/views/workbench"),
        meta: { title: "工作台", icon: "el-icon-menu", menuRole: [] },
      },
    ],
  },
  {
    path: "/table",
    name: "table",
    hidden: false,
    component: layout,
    meta: { title: "表格", icon: "el-icon-s-operation" },
    children: [
      {
        path: "tableList",
        name: "table",
        hidden: false,
        meta: { title: "el表格", icon: "el-icon-s-grid", menuRole: [] },
        component: () => import("@/views/table"),
      },
    ],
  },
  {
    path: "/image",
    name: "image",
    hidden: false,
    component: layout,
    meta: { title: "图片", icon: "el-icon-picture-outline" },
    children: [
      {
        path: "photograph",
        name: "photograph",
        hidden: false,
        component: () => import("@/views/photograph"),
        meta: { title: "拍照", icon: "el-icon-camera-solid", menuRole: [] },
      },
      {
        path: "cropper",
        name: "cropper",
        hidden: false,
        component: () => import("@/views/cropper"),
        meta: { title: "裁剪", icon: "el-icon-s-marketing", menuRole: [] },
      },
      {
        path: "imgIcon",
        name: "imgIcon",
        hidden: false,
        component: () => import("@/views/imgIcon"),
        meta: { title: "图标", icon: "el-icon-s-marketing" },
        children: [
          {
            path: "icon",
            name: "icon",
            hidden: false,
            component: () => import("@/views/imgIcon"),
            meta: { title: "icon", icon: "el-icon-s-marketing", menuRole: [] },
          },
        ],
      },
    ],
  },

  {
    path: "/adminPage",
    name: "adminPage",
    hidden: false,
    component: layout,
    meta: { title: "管理员页面", icon: "el-icon-s-custom" },
    children: [
      {
        path: "adminPageTest",
        name: "adminPageTest",
        meta: { title: "管理员路由", icon: "el-icon-s-custom", menuRole: ["admin"] },
        component: () => import("@/views/adminPage"),
      },
    ],
  },
  {
    path: "/leaderPage",
    name: "leaderPage",
    hidden: false,
    component: layout,
    redirect: "",
    meta: { title: "部门经理页面", icon: "el-icon-s-check" },
    children: [
      {
        path: "leaderPageTest",
        name: "leaderPageTest",
        meta: { title: "部门经理路由", icon: "el-icon-s-check", menuRole: ["leader"] },
        component: () => import("@/views/leaderPage"),
      },
    ],
  },
  {
    path: "/language",
    name: "language",
    hidden: false,
    component: layout,
    meta: { title: "语言管理", icon: "#icon-language" },
    children: [
      {
        path: "test",
        name: "test",
        meta: { title: "中英文切换", icon: "#icon-language", menuRole: [] },
        component: () => import("@/views/language"),
      },
    ],
  },
  {
    path: "/error",
    name: "error",
    alias: "",
    hidden: false,
    redirect: "/error/404",
    meta: { title: "错误页", icon: "el-icon-question" },
    component: layout,
    children: [
      {
        path: "404",
        name: "404",
        meta: {
          title: "404",
          icon: "el-icon-question",
          menuRole: [],
        },
        component: () => import("@/views/error/err404"),
      },
    ],
  },
  {
    path: "*",
    hidden: true,
    redirect: "/error/404",
  },
  //
  //     path: "personnel",
  //     name: "home",
  //   },
  //   {
  //     path: "dept",
  //     name: "dept",
  //   },
  //   {
  //     path: "certificate",
  //     name: "dept",
  //   },
  //   {
  //     path: "swiper",
  //     name: "swiper",
  //     title: "swiper",
  //     children: [{ path: "", name: "", title: "" }],
  //   },
  //   {
  //     path: "drag",
  //     name: "drag",
  //     title: "拖拽",
  //     children: [
  //       { path: "card", title: "卡片拖拽" },
  //       { path: "dialog", title: "弹窗拖拽" },
  //       { path: "flowChart", name: "flowChart", title: "流程图拖拽" },
  //     ],
  //   },

  //   {
  //     path: "echarts",
  //     name: "dept",
  //     title: "Echarts图标",
  //     children: [
  //       {
  //         path: "pie",
  //         title: "饼图",
  //       },
  //       {
  //         path: "line",
  //         title: "折线图",
  //       },
  //     ],
  //   },
  //   {
  //     path: "map",
  //     title: "地图",
  //     children: [
  //       {
  //         path: "baidu",
  //         title: "百度地图",
  //       },
  //     ],
  //   },
];
// initRouters.push(...menuRouters);
let ff = [...initRouters, ...menuRouters];

const router = createRouter();

export function resetRouter(routers = []) {
  router.matcher = createRouter(routers).matcher;
}
function createRouter(routers = initRouters) {
  return new VueRouter({
    base: publicPath,
    mode: routerMode,
    routes: routers,
  });
}

export default router;
