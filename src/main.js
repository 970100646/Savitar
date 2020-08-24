// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

//ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import "./assets/global/style/style.scss";

//引入全局变量
import GLOBAL from "@/assets/global/js/Global";
Vue.prototype.GLOBAL = GLOBAL;

Vue.config.productionTip = false;

import Echarts from "echarts";
Vue.prototype.echarts = Echarts;
Vue.use(Echarts);

import axios from "axios";
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
