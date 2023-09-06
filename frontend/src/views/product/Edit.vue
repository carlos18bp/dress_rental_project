<template>
  <ProductForm
    :productformData="editFormData.product"
    action="edit"
    model="product"
  >
  </ProductForm>
</template>

<script setup>
  import { onMounted, reactive } from "vue";
  import { useRoute } from "vue-router";
  import ProductForm from "@/components/ProductForm.vue";

  const route = useRoute();
  const editFormData = reactive({});

  onMounted(async () => {
    const encodedProduct = route.params.product;
    const decodedProduct = await JSON.parse(decodeURIComponent(encodedProduct));
    editFormData.product = decodedProduct;
  });
</script>
