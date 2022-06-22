import router from "@/router";
import store from "@/store";
import { message } from "element-ui";
import { getToken } from "./utils/storage";
import { resetRouter } from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style\
NProgress.configure({ showSpinner: false }); // NProgress Configuration

let passRouterList = ["/login"];
let login = "/login";
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  let token = getToken();
  if (!token) {
    if (passRouterList.includes(to.path)) {
      next();
    } else {
      next({ path: `/login`, replace: true });
    }
  } else {
    let userInfo = store.getters.userInfo;
    if (!userInfo) {
      let uerInfo = await store.dispatch("user/getUserInfo");
      let roleRouter = await store.dispatch("user/getRoleRouter", uerInfo.userRole);
      // router.addRoutes(roleRouter);
      await resetRouter(roleRouter);
      next({ path: to.path, replace: true });
    } else {
      if (login == to.path) {
        next({ path: "/", replace: true });
      } else {
        next();
      }
    }
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
