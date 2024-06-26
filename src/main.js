import Vue from "vue";
import App from "./App.vue";

import "./app.scss";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(router);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
