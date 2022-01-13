import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

import { API_URL } from './const'

Vue.config.productionTip = false

axios.defaults.baseURL = API_URL;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
