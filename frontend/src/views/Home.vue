<template>  
  <div class="container">
    <h1 class="text-center mt-5">
      Bienvenido al Administrador de inventariado
    </h1>
    <div class="d-flex justify-content-around mt-5">
      <RouterLink :to="{ name: 'list_customers' }" class="btn btn-primary btn-lg">
        Clientes
      </RouterLink>      
      <RouterLink :to="{ name: 'list_products' }" class="btn btn-primary btn-lg">
        Productos
      </RouterLink>
      <RouterLink :to="{ name: 'list_sales' }" class="btn btn-primary btn-lg">
        Ventas
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
</script>