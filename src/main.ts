import { createApp } from 'vue';
import './assets/tailwind.css'
import './style.css';
import App from './App.vue';
import router from './router/router';

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})


import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);


app.use(router);
app.mount('#app');
app.use(vuetify)