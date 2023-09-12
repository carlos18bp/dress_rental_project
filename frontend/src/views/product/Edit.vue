<template>
  <ProductForm
    :productformData="product"
    action="edit"
    model="product"
  >
  </ProductForm>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import Product from '@/models/product';
  import ProductForm from "@/components/product/ProductForm.vue";
  import { decodeHandler } from '@/shared/decode_handler';

  const route = useRoute();
  const product = ref(null);

  onMounted(async () => {
    const productParams  = await decodeHandler(route.params.product);
    product.value = new Product(productParams);
  });
</script>
