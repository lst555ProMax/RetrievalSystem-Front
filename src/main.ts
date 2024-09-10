

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElIcon } from 'element-plus';
import './assets/styles.css'; // 引入全局样式
/* import 'element-plus/lib/theme-chalk/el-icon.css'; */

//图标 图标在附件中
import './assets/icon/iconfont.css'
import './assets/base.scss'

//引入cookies
import VueCookies from 'vue-cookies'


import Request from '@/utils/Request'
import Message from '@/utils/Message'
import Confirm from '@/utils/Confirm'
import Verify from '@/utils/verify'
import Utils from '@/utils/Utils'

import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(pinia);
app.component(ElIcon.name, ElIcon);

//配置全局变量
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.Verify=Verify;
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.VueCookies = VueCookies;

app.mount('#app')
