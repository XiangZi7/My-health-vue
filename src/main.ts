import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'

import * as elicons from '@element-plus/icons-vue'



const app = createApp(App)

for (const name in elicons) {
    app.component(name, (elicons as any)[name])

}

app.use(router)
app.use(vuex)

app.mount('#app')
