import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import VueQuillEditor from 'vue-quill-editor';
import './registerServiceWorker';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueQuillEditor);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
