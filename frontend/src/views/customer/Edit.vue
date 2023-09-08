<template>
  <CustomerForm
    :customerformData="editFormData.customer"
    action="edit"
    model="customer"
  >
  </CustomerForm>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import CustomerForm from "@/components/customer/CustomerForm.vue";
import { decodeHandler } from '@/shared/decode_handler';

const route = useRoute();
const editFormData = reactive({});

onMounted(async () => {
  editFormData.customer = await decodeHandler(route.params.customer);
});
</script>