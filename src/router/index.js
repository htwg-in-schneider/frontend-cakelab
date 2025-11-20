import { createRouter, createWebHistory } from 'vue-router';
import ProductDetail from '../views/ProductDetail.vue';
import Home from '../views/Home.vue';
const routes = [
  { path: '/', component: Home},
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
