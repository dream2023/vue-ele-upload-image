import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EleUploadImage from '../src'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(EleUploadImage.name, EleUploadImage)

new Vue({
  render: h => h(App)
}).$mount('#app')
