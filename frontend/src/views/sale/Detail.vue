<template>
    <div class="container mt-5">
        <h1>Detalle de la venta:</h1>
        <div v-if="detailSale.sale" class="row mt-5">
            <div class="col-6">
                <h2>Modalidad de Venta:</h2>
                <p>{{ detailSale.sale.type }}</p>
            </div>
            <div class="col-6">
                <h2>Precio:</h2>
                <p>${{ detailSale.sale.price }} COP</p>
            </div>
            <div class="col-6">
                <h2>Abono:</h2>
                <p>${{ detailSale.sale.advance_payment }} COP</p>
            </div>
            <div class="col-6">
                <h2>El Producto fue Entregado al Cliente:</h2>
                <div v-if="detailSale.sale.is_product_delivered">
                    <p>Si</p>
                </div>
                <div v-else>
                    <p>No</p>
                </div>                    
            </div>
            <div class="col-6">
                <h2>Fecha Estimada de Entrega al Cliente:</h2>
                <p>{{ detailSale.sale.delivery_date }}</p>
            </div>
            <div class="col-6">
                <h2>Fecha Estimada de Devolución:</h2>
                <p>{{ detailSale.sale.return_date }}</p>
            </div>
            <div class="col-6">
                <h2>El producto esta en el Amacén:</h2>
                <p>TODO</p>
            </div>
            <div class="col-6">
                <h2>Referencia del Producto</h2>
                <p>{{ detailSale.sale.product.reference }}</p>
            </div>
            <div class="col-6">
                <h2>Cédula del Cliente:</h2>
                <p>{{ detailSale.sale.customer.identification }}</p>
            </div>
            <div class="col-6">
                <h2>Nombre del Cliente:</h2>
                <p>{{ detailSale.sale.customer.first_name }} {{ detailSale.sale.customer.last_name }}</p>
            </div>
            <div class="col-6">
                <h2>Contacto del Cliente:</h2>
                <p>{{ detailSale.sale.customer.phone_number }}</p>
            </div>
            <div class="col-6">
                <h2>Correo Electronico del Cliente:</h2>
                <p>{{ detailSale.sale.customer.email }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const detailSale = reactive({});

    onMounted(async () => {
        const encodedData = route.params.sale;
        const decodedData = await JSON.parse(decodeURIComponent(encodedData));
        detailSale.sale = decodedData
    });
</script>