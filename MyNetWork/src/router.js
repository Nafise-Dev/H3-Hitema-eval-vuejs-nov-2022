import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/front/Home.vue";
import Inscription from "./components/front/Inscription.vue";
import Connexion from "./components/front/Connexion.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/inscription", name: "inscription", component: Inscription },
    { path: "/connexion", name: "connexion", component: Connexion },
  ],
});
