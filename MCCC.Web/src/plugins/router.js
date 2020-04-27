import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home';
import Sensors from '../components/Sensors'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home},
    { path: '/sensors', component: Sensors}
]

export default new VueRouter({ routes })