import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: 'mdi',
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
