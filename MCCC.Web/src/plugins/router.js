import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About';
import Sensors from '../components/Sensors'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Sensors},
    { path: '/about', component: About}
]

export default new VueRouter({ routes })