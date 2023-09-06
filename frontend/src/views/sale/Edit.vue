<template>
  <SaleForm
    :saleformData="editFormData"
    action="edit"
    model="sale"
  >
  </SaleForm>
</template>

<script setup>
  import { onMounted, reactive} from "vue";
  import { useRoute } from "vue-router";
  import SaleForm from "@/components/SaleForm.vue";

  const route = useRoute();
  const editFormData = reactive({});

  onMounted(async () => {    
    const encodedSale = route.params.sale;
    const decodedSale = await JSON.parse(decodeURIComponent(encodedSale));
    editFormData.sale = decodedSale;
    editFormData.sale.customerId = decodedSale.customerId;
  });
</script>