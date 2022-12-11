<template>
  <div style="margin-left: 25%">
    <div class="w3-container">
      <FormConnexion :btn="'success'" :action="'connecter'" />
    </div>
  </div>
</template>

<script setup>
import FormConnexion from "./FormConnexion.vue";
</script>
