import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#8e94b3',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
}

export default new Vuetify(opts)