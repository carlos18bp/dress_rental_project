<template>
  <ProductForm
    :productformData="productformData"
    action="create"
    model="product"
  >
  </ProductForm>
</template>
  
<script setup>
  import { reactive } from "vue";
  import ProductForm from "@/components/ProductForm.vue";

  const productformData = reactive({
    title: "",
    reference: "",
    category: "",
  });
</script>