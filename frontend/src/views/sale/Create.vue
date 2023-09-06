<template>
  <SaleForm 
    :saleformData=saleformData
    action="create"
    model="sale">
  </SaleForm>
</template>

<script setup>
  import { onMounted, reactive} from 'vue';
  import { useRoute } from "vue-router";
  import SaleForm  from '@/components/SaleForm.vue';

  const route = useRoute();

  const saleformData = reactive({
    sale: {
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
    }
  });

  onMounted(async () => {    
    saleformData.sale.customerId = route.params.customer_id;
  });
</script>