<template>  
  <Header></Header>  
  <RouterView/>
</template>

<script setup>    
  import { RouterView } from "vue-router";
  import { onMounted } from 'vue';
  import Header from "./views/layouts/Header.vue";
  import { useCategoryStore } from '@/stores/category';
  import { useCustomerStore } from '@/stores/customer';
  import { useInvoiceStore } from '@/stores/invoice';
  import { useProductStore } from '@/stores/product';
  
  const categoryStore = useCategoryStore();
  const customerStore = useCustomerStore();
  const invoiceStore = useInvoiceStore();
  const productStore = useProductStore();

  onMounted(async () => {
    await categoryStore.init();
    await customerStore.init();
    await invoiceStore.init();
    await productStore.init();
  });
</script>