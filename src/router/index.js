

import { authGuard } from '@auth0/auth0-vue';

import { createRouter, createWebHistory } from "vue-router";
import CakeDetail from "../views/CakeDetail.vue";
import CreateCake from "@/views/CreateCake.vue";
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
import Profile from "@/views/Profile.vue";
import Users from "@/views/Users.vue";
import EditUser from "@/views/EditUser.vue";

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

    path: '/cake/:id',
    name: 'cake',
    component: CakeDetail,
    props: true,
  },
  {

    path: '/cake/create',
    name: 'cake-create',
    beforeEnter: authGuard,
    component: CreateCake,
  },

  {
    path: "/profile",
    beforeEnter: authGuard,
    component: Profile
  },

  {

    path: '/cake/edit/:id',
    name: 'cake-edit',
    beforeEnter: authGuard,
    component: () => import('@/views/EditCake.vue'),

    props: true

  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: MitarbeiterBestellungen,
    beforeEnter: authGuard,
    props: true
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: MitarbeiterBestellungen,
    beforeEnter: authGuard,
    props: true

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
    component: CustomizeCake,
    beforeEnter: authGuard,
    props: true,
  },


  {
    path: "/about-us",
    name: "aboutUs",
    component: AboutUsSeite,

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
  {
    path: "/users",
    component: Users,
    beforeEnter: authGuard,
  },
  { path: "/users/:id", 
    component: EditUser,
     beforeEnter: authGuard,
 },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
