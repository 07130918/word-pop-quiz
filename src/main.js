import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'normalize.css'

import config from './config'

require('./assets/scss/style.scss')

Vue.config.productionTip = false

axios.defaults.baseURL = config.API_URL;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
