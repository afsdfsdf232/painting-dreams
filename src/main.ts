import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './style/common.css'
import registerGlobalComponents from '@/components/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
const app = createApp(App).use(store).use(router).use(ElementPlus, {
  locale: zhCn
})
registerGlobalComponents(app)
app.mount('#app')
