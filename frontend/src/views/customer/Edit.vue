<template>
  <CustomerForm
    :customerformData="customer"
    action="edit"
    model="customer"
  >
  </CustomerForm>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import Customer from '@/models/customer';
  import CustomerForm from "@/components/customer/CustomerForm.vue";
  import { decodeHandler } from '@/shared/decode_handler';

  const route = useRoute();
  const customer = ref(null);

  onMounted(async () => {
    const customerParams  = await decodeHandler(route.params.customer);
    customer.value = new Customer(customerParams);
  });
</script>