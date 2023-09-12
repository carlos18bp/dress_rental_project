<template>
  <InvoiceForm 
    :invoiceformData=invoice
    action="create"
    model="invoice">
  </InvoiceForm>
</template>

<script setup>
  import { onMounted, reactive} from 'vue';
  import { useRoute } from "vue-router";
  import Invoice from '@/models/invoice';
  import InvoiceForm  from '@/components/invoice/InvoiceForm.vue';

  const route = useRoute();

  const invoice = reactive(new Invoice({
    type: '',
    price: '',
    advancePayment: '',
    advancePaymentDate: '',
    deliveryDate: '',
    isProductDelivered: '',
    returnDate: '',
    isProductReturn: '',
    customerId: '',
    products: [],
    productIds: []
  }));

  onMounted(async () => {    
    invoice.customerId = route.params.customer_id;
  });
</script>