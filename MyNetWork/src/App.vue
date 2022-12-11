<template>
  <Menu />
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup>
import Menu from "./components/Menu.vue";
import { RouterView } from "vue-router";
</script>
