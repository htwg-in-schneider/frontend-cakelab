import { createRouter, createWebHistory } from 'vue-router';
import ProductDetail from '../views/ProductDetail.vue';
import CreateProduct from '@/views/CreateProduct.vue';
import EditProduct from '@/views/EditProduct.vue';
import Home from '../views/Home.vue';
import StandardCakes from '../views/StandardCakes.vue';
import CustomizeCake from '@/views/CustomizeCake.vue';
import Login from '@/views/Login.vue';
import Registrieren from '@/views/Registrieren.vue';
import MitarbeiterBestellungen from '@/views/MitarbeiterBestellungen.vue';
import MitarbeiterBestellungDetails from '@/views/MitarbeiterBestellungDetails.vue';
import Profile from '@/views/Profile.vue';

import { authGuard } from '@auth0/auth0-vue';

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/standard-cakes',
    name: 'standardCakes',
    component: StandardCakes
  },

  {
    path: '/product/:id',
    name: 'product',
     beforeEnter: authGuard,
    component: ProductDetail,
    props: true
  },
  {
    path: '/product/create',
    name: 'product-create',
     beforeEnter: authGuard,
    component: CreateProduct,
  },
    { path: '/profile', component: Profile },

  {
    path: '/product/edit/:id',
    name: 'product-edit',
     beforeEnter: authGuard,
    component: () => import('@/views/EditProduct.vue'),
    
    props: true
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
     beforeEnter: authGuard,
    component: MitarbeiterBestellungen
  },

  {
    path: "/admin/orders/:id",
    name: "admin-order-details",
    component: MitarbeiterBestellungDetails,
     beforeEnter: authGuard,
    props: true
  },
  {
    path: '/customize-cake',
    name: 'customizeCake',
    component: CustomizeCake ,
     beforeEnter: authGuard
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
     beforeEnter: authGuard
  },
  {
    path: '/registrieren',
    name: 'registrieren',
    component: Registrieren
  },

  {
    path: '/impressum',
    component: () => import('@/views/Impressum.vue')
  },
  {
    path: '/datenschutz',
    component: () => import('@/views/Datenschutz.vue')
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
