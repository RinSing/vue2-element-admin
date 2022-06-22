import { login } from "@/api/get";
import { setToken, removeToken, setStorage, getStorage, removeStorage } from "@/utils/storage";
import { initRouters, menuRouters } from "@/router/index";
import { resetRouter } from "@/router";

const state = { userInfo: "", routers: [] };

const mutations = {
  async login(state, { user }) {
    state.userInfo = user;
  },
  getUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  getRoleRouter(state, roleRouter) {
    state.routers = roleRouter;
  },
};
const actions = {
  async login(context, userInfo) {
    let { userData, token, code } = await login({});
    console.log(userData, code);
    let user = null;
    if (code == 20000) {
      user = userSelect(userInfo, userData);

      if (user) {
        //context.commit("login", user);
        context.commit({ type: "login", user });
        // this.$store.state.user = user;
        let roleRouter = await context.dispatch("getRoleRouter", user.userRole);
        await resetRouter(roleRouter);
        setToken(token);
        setStorage("userInfo", user);
        user = { code, ...user };
      }
    }
    return user;
  },
  getUserInfo({ commit }) {
    let userInfo = getStorage("userInfo");
    commit("getUserInfo", userInfo);
    return userInfo;
  },

  getRoleRouter({ commit }, userRole) {
    let routers = []; // [...menuRouters];
    routerDeepCopy(menuRouters, routers);
    routerScreen(userRole, routers);
    let roleRouter = initRouters.concat(routers);
    commit("getRoleRouter", roleRouter);
    return roleRouter;
  },
  userExit({ commit }) {
    removeToken();
    removeStorage("userInfo");
    commit("getUserInfo", "");
  },
};

function routerScreen(userRole, menuRouters) {
  // debugger;
  for (let t = 0; t < menuRouters.length; t++) {
    if (menuRouters[t].children && menuRouters[t].children.length > 0) {
      routerScreen(userRole, menuRouters[t].children);
      if (menuRouters[t].children == 0) {
        menuRouters.splice(t, 1);
        t--;
      }
    } else if (menuRouters[t].children == 0) {
      menuRouters.splice(t, 1);
      t--;
    } else {
      if (
        !menuRouters[t].meta?.menuRole ||
        menuRouters[t].meta.menuRole.length == 0 ||
        menuRouters[t].meta.menuRole.includes(userRole)
      ) {
        // menuList.push(menuRouters[t]);
      } else {
        menuRouters.splice(t, 1);
        t--;
      }
    }
  }
}

function routerDeepCopy(menuRouters, roleRouter) {
  for (let t = 0; t < menuRouters.length; t++) {
    if (menuRouters[t].children && menuRouters[t].children.length > 0) {
      roleRouter.push({ ...menuRouters[t] });
      roleRouter[t].children = [];
      routerDeepCopy(menuRouters[t].children, roleRouter[t].children);
    } else {
      roleRouter.push({ ...menuRouters[t] });
      //   if (
      //     !menuRouters[t].meta?.menuRole ||
      //     menuRouters[t].meta.menuRole.length == 0 ||
      //     menuRouters[t].meta.menuRole.includes(userRole)
      //   ) {
      //     roleRouter.push({ ...menuRouters[t] });
      //   } else {

      //   }
    }
  }
}

function userSelect(userInfo, userData) {
  let user = null;
  userData.forEach((item) => {
    if (item.userName.includes(userInfo.name) && item.userPass.includes(userInfo.password)) {
      user = item;
      return user;
    }
  });
  return user;
}

export default { namespaced: true, state, mutations, actions };
