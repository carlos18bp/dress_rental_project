<template>
  <ProductForm
    :productformData="product"
    action="create"
    model="product"
  >
  </ProductForm>
</template>
  
<script setup>
  import { reactive } from "vue";
  import Product from '@/models/customer';
  import ProductForm from "@/components/product/ProductForm.vue";

  const product = reactive( new Product({
    title: '',
    reference: '',
    category: '',
  }));
</script>