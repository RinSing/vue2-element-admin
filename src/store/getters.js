const getters = {
  userInfo: (state) => state.user.userInfo,
  sidebar: (state) => state.setting.sidebar,
  isKeepAlive: (state) => state.setting.isKeepAlive,
  routers: (state) => state.user.routers,
};

export default getters;
