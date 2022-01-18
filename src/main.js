import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import './index.css'
import 'normalize.css'

import Constants from './const'

Vue.config.productionTip = false

axios.defaults.baseURL = Constants.API_URL;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
