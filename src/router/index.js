import { createRouter, createWebHistory } from 'vue-router';
import ProductDetail from '../views/ProductDetail.vue';
import Home from '../views/Home.vue';
import StandardCakes from '../views/StandardCakes.vue';
import CustomizeCake from '@/views/CustomizeCake.vue';


const routes = [
  { path: '/', component: Home },

  {
    path: '/standard-cakes',
    name: 'standardCakes',
    component: StandardCakes
  },

  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetail,
    props: true
  },
  {
    path: '/customize-cake',
    name: 'customizeCake',
    component: CustomizeCake
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
