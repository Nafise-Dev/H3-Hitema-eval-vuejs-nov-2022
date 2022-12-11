<template>
  <div style="margin-left: 25%">
    <div class="w3-container">
      <!-- <h1>TEST home</h1> -->
      <Suspense>
        <template #default>
          <HomeGrille />
        </template>
        <template #fallback> Données en cours de chargement </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { Suspense } from "vue";
import HomeGrille from "./HomeGrille.vue";
</script>
