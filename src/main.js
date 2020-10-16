import Vue from 'vue';
import App from './App.vue';
// Estilos animados
import Styles from './assets/css/animate.css';
// Rutas
import router from './routes/index';
// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Iconos
require('./plugins/fontawesome');

// ---------------------------------------------------------------//
// Configuracion para test/produccion                             //
// ---------------------------------------------------------------//
Vue.config.productionTip = false
// ---------------------------------------------------------------//
// BootstrapVue                                                   //
// ---------------------------------------------------------------//
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App, Styles),
}).$mount('#app')
