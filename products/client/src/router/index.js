import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import ProductRegister from '../views/ProductRegister.vue';
import ProductUpdate from '../views/ProductUpdate.vue';
import SalesList from '../views/SalesList.vue';
import ImageInsert from '../views/ImageInsert.vue';

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
  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate,
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList,
  },
  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
