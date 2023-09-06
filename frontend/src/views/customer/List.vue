<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1>Lista de Clientes:</h1>
      <router-link  :to="{ name: 'create_customer' }" class="btn btn-primary btn-lg">
        Crear Cliente
      </router-link>
    </div>
    <CustomerTable
      :customers="customers"
    >
    </CustomerTable>
  </div>
</template>

<script setup>
  import { RouterLink } from "vue-router";
  import { ref, onMounted, watchEffect } from 'vue';
  import CustomerTable from '@/components/CustomerTable.vue';
  import { useDressRentalStore } from '@/stores/dress_rental';

  const store = useDressRentalStore();
  const customers = ref([]);

  onMounted(async () => fetchCustomers());

  watchEffect(async () => fetchCustomers());  

  /**
   * 
   */
  async function fetchCustomers() {
    await store.fetchCustomersData();
    customers.value = store.customers;
  }
</script>
