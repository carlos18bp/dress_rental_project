<template>  
  <Header></Header>  
  <RouterView/>
</template>

<script setup>    
  import { RouterView } from "vue-router";
  import { onMounted, provide } from 'vue';
  import Header from "./views/layouts/Header.vue";
  import { useDressRentalStore } from '@/stores/dress_rental';
  
  const store = useDressRentalStore();

  onMounted(async () => {
    await store.init();
  });
</script>