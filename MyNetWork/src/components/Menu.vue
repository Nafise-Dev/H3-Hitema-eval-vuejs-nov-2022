<template>
  <!-- <div class="bg-primary">
    <nav class="navbar navbar-expand container">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand"
        >MyNetWork</RouterLink
      >
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link"
            >Fil d'actualités</RouterLink
          >
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item d-flex align-items-baseline">
          <RouterLink :to="{ name: 'inscription' }" class="nav-link"
            >Créer un profil</RouterLink
          >
        </li>
        <li class="nav-item d-flex align-items-baseline">
          <RouterLink :to="{ name: 'connexion' }" class="nav-link"
            >Se connecter</RouterLink
          >
        </li>
      </ul>
    </nav>
  </div> -->

  <div
    class="w3-sidebar w3-light-grey w3-bar-block"
    style="width: 25%"
    v-if="show"
  >
    <h1 class="w3-bar-item w3-border-bottom">
      <a> <RouterLink :to="{ name: 'home' }"> MyNetWork </RouterLink> </a>
    </h1>
    <a class="w3-bar-item w3-button w3-border-bottom">
      <RouterLink :to="{ name: 'home' }">
        <i class="fa fa-home" style="font-size: 32px"></i>
        Fil d'actualités
      </RouterLink>
    </a>
    <a class="w3-bar-item w3-button w3-border-bottom">
      <RouterLink :to="{ name: 'inscription' }">
        <i class="fa fa-user-plus" style="font-size: 26px"></i>
        Créer un profil
      </RouterLink>
    </a>
    <a class="w3-bar-item w3-button w3-border-bottom">
      <RouterLink :to="{ name: 'connexion' }">
        <i class="fa fa-user-circle-o" style="font-size: 29px"></i>
        Se connecter
      </RouterLink>
    </a>
  </div>

  <div class="w3-sidebar w3-light-grey w3-bar-block" style="width: 25%" v-else>
    <h1 class="w3-bar-item w3-border-bottom">
      <a> <RouterLink :to="{ name: 'home' }"> MyNetWork </RouterLink> </a>
    </h1>
    <a class="w3-bar-item w3-button w3-border-bottom">
      <RouterLink :to="{ name: 'home' }">
        <i class="fa fa-home" style="font-size: 32px"></i>
        Fil d'actualités
      </RouterLink>
    </a>
    <a class="w3-bar-item w3-button w3-border-bottom" @click="logout">
      <RouterLink :to="{ name: 'connexion' }">
        <i class="fa fa-sign-out" style="font-size: 32px"></i>
        Déconnexion
      </RouterLink>
    </a>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { onMounted, ref, watch } from "vue";
let show = ref(true);
const userStore = useUserStore();

//cette fonction sera exécutée s'il y a un changement des datas réactives
watch(() => {
  // debugger;
  if (userStore.user && userStore.user.isLogged) {
    show.value = false;
  } else {
    show.value = true;
  }
});

onMounted(() => {
  // debugger;
  if (userStore.user && userStore.user.isLogged) {
    show.value = false;
  }
});

async function logout() {
  // debugger;
  await userStore.logout();
}
</script>
