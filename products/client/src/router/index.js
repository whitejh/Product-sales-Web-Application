import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import ProductRegister from '../views/ProductRegister.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList,
  },
  {
    path: '/detail',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/register',
    name: 'ProductRegister',
    component: ProductRegister,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
