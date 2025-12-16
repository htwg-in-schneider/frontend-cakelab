<<<<<<< HEAD
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
=======
import { createRouter, createWebHistory } from "vue-router";
import ProductDetail from "../views/ProductDetail.vue";
import CreateProduct from "@/views/CreateProduct.vue";
import Home from "../views/Home.vue";
import StandardCakes from "../views/StandardCakes.vue";
import CustomizeCake from "@/views/CustomizeCake.vue";
import Login from "@/views/Login.vue";
import Registrieren from "@/views/Registrieren.vue";
import MitarbeiterBestellungen from "@/views/MitarbeiterBestellungen.vue";
import MitarbeiterBestellungDetails from "@/views/MitarbeiterBestellungDetails.vue";
import Bestellbestaetigung from "@/views/Bestellbestaetigung.vue";
import AboutUsSeite from "@/views/AboutUsSeite.vue";
import Impressum from "@/views/Impressum.vue";
import Datenschutz from "@/views/Datenschutz.vue";
>>>>>>> refs/remotes/origin/main

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/standard-cakes",
    name: "standardCakes",
    component: StandardCakes,
  },

  {
<<<<<<< HEAD
    path: '/product/:id',
    name: 'product',
     beforeEnter: authGuard,
=======
    path: "/product/:id",
    name: "product",
>>>>>>> refs/remotes/origin/main
    component: ProductDetail,
    props: true,
  },
  {
<<<<<<< HEAD
    path: '/product/create',
    name: 'product-create',
     beforeEnter: authGuard,
=======
    path: "/product/create",
    name: "product-create",
>>>>>>> refs/remotes/origin/main
    component: CreateProduct,
  },
    { path: '/profile', component: Profile },

  {
<<<<<<< HEAD
    path: '/product/edit/:id',
    name: 'product-edit',
     beforeEnter: authGuard,
    component: () => import('@/views/EditProduct.vue'),
    
    props: true
=======
    path: "/product/edit/:id",
    name: "product-edit",
    component: () => import("@/views/EditProduct.vue"),
    props: true,
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: MitarbeiterBestellungen,
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
     beforeEnter: authGuard,
    props: true
  },
  {
    path: '/customize-cake',
    name: 'customizeCake',
    component: CustomizeCake ,
     beforeEnter: authGuard
=======
    props: true,
  },
  {
    path: "/customize-cake",
    name: "customizeCake",
    component: CustomizeCake,
>>>>>>> refs/remotes/origin/main
  },

  {
<<<<<<< HEAD
    path: '/login',
    name: 'login',
    component: Login,
     beforeEnter: authGuard
=======
    path: "/about-us",
    name: "aboutUs",
    component: AboutUsSeite,
>>>>>>> refs/remotes/origin/main
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/registrieren",
    name: "registrieren",
    component: Registrieren,
  },
  {
    path: "/bestellbestaetigung",
    name: "bestellbestaetigung",
    component: Bestellbestaetigung,
  },

  {
    path: "/impressum",
    component: Impressum,
  },
  {
    path: "/datenschutz",
    component: Datenschutz,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
