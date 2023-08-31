<template>
  <CustomerForm
    :customerformData="editFormData.customer"
    action="edit"
    endPoint="edit_customer/"
  >
  </CustomerForm>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import CustomerForm from "@/components/CustomerForm.vue";

const route = useRoute();
const editFormData = reactive({});

onMounted(async () => {
  const encodedData = route.params.customer;
  const decodedData = await JSON.parse(decodeURIComponent(encodedData));
  editFormData.customer = decodedData;
});
</script>