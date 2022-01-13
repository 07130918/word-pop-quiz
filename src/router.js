import Vue from 'Vue'
import Router from 'vue-router'

const Index = () => import('.App.vue')

Vue.use(Router)

new Router({
    routes: [
        {path: '/', component: Index},
    ]
})
