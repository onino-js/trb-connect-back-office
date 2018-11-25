import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faUserPlus,
  faExclamationTriangle,
  faLock,
  faLockOpen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
library.add(faUserPlus);
library.add(faExclamationTriangle);
library.add(faLock);
library.add(faLockOpen);
library.add(faPlus);
library.add(faSearch);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
