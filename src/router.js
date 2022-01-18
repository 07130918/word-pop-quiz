import Vue from 'vue'
import Router from 'vue-router'

const Quiz = () => import('./components/Quiz.vue')
const Start = () => import('./components/Start.vue')
const Goal = () => import('./components/Goal.vue')

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        { path: '/', component: Start },
        { path: '/goal', component: Goal },
        { path: '/quiz/:num', component: Quiz },
        { path: '*', redirect: '/' },
    ]
})
