<template>
  <CustomerForm 
    :customerformData=customerformData 
    action="create" 
    model="customer">
  </CustomerForm>
</template>

<script setup>
  import { reactive } from 'vue';
  import CustomerForm from '@/components/CustomerForm.vue';

  const customerformData = reactive({
    identification: '',
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    secondContact: '',
    address: '',
  });
</script>
