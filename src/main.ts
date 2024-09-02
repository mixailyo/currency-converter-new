import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/shared/styles/global.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('Select', Select);
app.component('InputNumber', InputNumber);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});


app.mount('#app');
