const state = { sidebar: { opened: true }, isKeepAlive: [] };

const mutations = {
  toggleSideBar(state) {
    state.sidebar.opened = !state.sidebar.opened;
  },
};
const actions = {
  toggleSideBar({ commit }) {
    commit("toggleSideBar");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
