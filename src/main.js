import Vue from "vue";
import VueAlertify from "vue-alertify";
import App from "./App.vue";

import "./app.scss";
import router from "./router";
import { Buffer } from "buffer";

Vue.config.productionTip = false;
Vue.use(VueAlertify);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$buffer = Buffer;
Vue.prototype.$router = router;
