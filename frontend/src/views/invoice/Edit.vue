<template>
  <InvoiceForm
    :invoiceformData="invoice"
    action="edit"
    model="invoice"
  >
  </InvoiceForm>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import Invoice from '@/models/invoice';
  import InvoiceForm from "@/components/invoice/InvoiceForm.vue";
  import { decodeHandler } from '@/shared/decode_handler';

  const route = useRoute();
  const invoice = ref(null);

  onMounted(async () => {
    const invoiceParams  = await decodeHandler(route.params.invoice);
    invoice.value = new Invoice(invoiceParams);
  });
</script>