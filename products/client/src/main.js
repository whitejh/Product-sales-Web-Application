import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mixins from './mixins';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App)
  .use(router)
  .mixin(mixins)
  .mount('#app');

window.Kakao.init('7193607a13069418981fb575a7e60559');
