<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Clientes:</h1>
      <router-link  :to="{ name: 'create_customer' }" class="btn btn-primary btn-lg">
        Crear Cliente
      </router-link>
    </div>
    <table class="table table-striped table-hover mt-4 text-center">
      <thead>
        <tr>
          <th scope="col">Cédula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Contacto</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="customer in customers" :key="customer.id">
          <th scope="row">{{ customer.identification }}</th>
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.contact }}</td>
          <td class="d-flex justify-content-around">
            <router-link 
              :to="{ name: 'create_sale', 
                     params: { customer_id: customer.id } }"
              class="btn btn-primary">
              Crear Venta
            </router-link>
            <router-link 
              :to="{ name: 'edit_customer', 
                    params: { customer: encodeURIComponent(JSON.stringify(customer)) } }" 
              class="btn btn-primary">
              Editar Cliente
            </router-link>
            <button class="btn btn-danger" 
              @click="deleteHandler(customer.id, 'customer')"
              :disabled="customer.hasSale">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { ref, onMounted, watchEffect } from 'vue';
  import { useDressRentalStore } from '@/stores/dress_rental';
  import { deleteHandler } from '@/shared/deleteHandler'; 

  const dressRentalStore = useDressRentalStore();
  const customers = ref([]);
  const products = ref([]);

  onMounted(async () => {
    await dressRentalStore.fetchCustomersData();
    customers.value = dressRentalStore.customers;

    await dressRentalStore.fetchProductsData('available_products');
    products.value = dressRentalStore.products;
  });

  watchEffect(() => {
    customers.value = dressRentalStore.customers;
  });  
</script>
