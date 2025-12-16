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
    path: "/product/:id",
    name: "product",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/product/create",
    name: "product-create",
    component: CreateProduct,
  },
    { path: '/profile', component: Profile },

  {
    path: "/product/edit/:id",
    name: "product-edit",
    component: () => import("@/views/EditProduct.vue"),
    props: true,
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: MitarbeiterBestellungen,
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: MitarbeiterBestellungen
  },

  {
    path: "/admin/orders/:id",
    name: "admin-order-details",
    component: MitarbeiterBestellungDetails,
    props: true,
  },
  {
    path: "/customize-cake",
    name: "customizeCake",
    component: CustomizeCake,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
