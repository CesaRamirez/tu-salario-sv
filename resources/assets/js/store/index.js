import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import rent from './modules/rent'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        rent,
        settings
    }
})
