import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import SensorHub from '@/plugins/sensor-hub'

Vue.config.productionTip = false

Vue.use(SensorHub);

Vue.prototype.startSignalR();


new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
