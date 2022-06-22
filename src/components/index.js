import Vue from "vue";
import iconSvg from "@/components/iconSvg";

Vue.component("iconSvg", iconSvg);

import SvgIcon from "@/components/SvgIcon"; // svg component
// register globally
Vue.component("svg-icon", SvgIcon);
const req = require.context("@/icons/svg", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);
