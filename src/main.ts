import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import i18n from './translations/i18n';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(i18n).use(vuetify).mount('#app');
