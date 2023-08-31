<template>  
  <Header></Header>  
  <RouterView/>
</template>

<script setup>  
  import Header from "./views/layouts/Header.vue";
  import { RouterView } from "vue-router";
</script>