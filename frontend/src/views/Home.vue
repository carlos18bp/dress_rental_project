<template>  
  <div class="container">
    <h1 class="text-center mt-5">
      Bienvenido al Administrador de inventariado
    </h1>
    <div class="d-flex justify-content-around mt-5">
      <RouterLink :to="{ name: 'list_customers' }" 
        class="btn btn-primary btn-lg test-list-customer-link">
        Clientes
      </RouterLink>      
      <RouterLink :to="{ name: 'list_products' }" 
        class="btn btn-primary btn-lg test-list-product-link">
        Productos
      </RouterLink>
      <RouterLink :to="{ name: 'list_invoices' }" 
        class="btn btn-primary btn-lg test-list-invoice-link">
        Facturas
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
</script>