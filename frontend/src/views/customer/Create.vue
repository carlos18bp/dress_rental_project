<template>
  <CustomerForm 
    :customerformData=customer 
    action="create" 
    model="customer">
  </CustomerForm>
</template>

<script setup>
  import { reactive } from 'vue';
  import Customer from '@/models/customer';
  import CustomerForm from '@/components/customer/CustomerForm.vue';

  const customer = reactive(new Customer({
    identification: '',
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    secondContact: '',
    address: '',
  }));
</script>
