<template>
  <div class="container">
    <h1 class="text-center mt-5">
      Bienvenido al Administrador de inventariado
    </h1>
    <div class="d-flex justify-content-around mt-5">
      <RouterLink to="/List_Customers" class="btn btn-primary btn-lg">Clientes</RouterLink>
      <RouterLink to="/List_Sales" class="btn btn-primary btn-lg">Ventas</RouterLink>
      <RouterLink to="/List_Products" class="btn btn-primary btn-lg">Productos</RouterLink>
    </div>
  </div>
</template>
<script setup>
import {RouterLink} from 'vue-router';
</script>
