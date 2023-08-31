<template>
  <SaleForm
    :saleformData="editFormData"
    action="edit"
    endPoint="edit_sale/"
  >
  </SaleForm>
</template>

<script setup>
  import { onMounted, reactive, ref } from "vue";
  import { useRoute } from "vue-router";
  import SaleForm from "@/components/SaleForm.vue";

  const route = useRoute();
  const editFormData = reactive({});

  onMounted(async () => {    
    const encodedSale = route.params.sale;
    const decodedSale = await JSON.parse(decodeURIComponent(encodedSale));
    editFormData.sale = decodedSale;
    editFormData.sale.customerId = decodedSale.customer.id;
  });
</script>