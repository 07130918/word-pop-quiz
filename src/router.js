import Vue from 'vue'
import Router from 'vue-router'

const Quiz = () => import(/* webpackChunkName: "Quiz" */ './components/Quiz.vue')
const Start = () => import(/* webpackChunkName: "Start" */ './components/Start.vue')
const Goal = () => import(/* webpackChunkName: "End" */ './components/Goal.vue')

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
