<template>
  <div class="container mt-5">
    <h1>{{ defineAction }}</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="customerformData" class="mt-3">
        <div class="mb-3">
          <label for="identification" class="form-label">Número de Cédula:</label>
          <input
            type="number"
            class="form-control"
            id="identificatio"
            placeholder="Número de Cédula"
            v-model="customerformData.identification" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label">Nombre:</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            placeholder="Nombre"
            v-model="customerformData.firstName" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Apellido:</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            placeholder="Apellido"
            v-model="customerformData.lastName" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="customerEmail" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="customer-email"
            placeholder="Email"
            v-model="customerformData.email"
          />
        </div>
        <div class="mb-3">
          <label for="customerContact" class="form-label">Número De Contacto:</label>
          <input
            type="number"
            class="form-control"
            id="customerContact"
            placeholder="Número De Contacto"
            v-model="customerformData.contact" 
            required
          />
        </div>
        <div class="mb-3">
          <label for="customerSecondContact" class="form-label">Número De Contacto Secundario:</label>
          <input
            type="number"
            class="form-control"
            id="customerSecondContact"
            placeholder="Número De Contacto Secundario"
            v-model="customerformData.secondContact" 
          />
        </div>
        <div class="mb-3">
          <label for="customerAddress" class="form-label">Direccion:</label>
          <input
            type="text"
            class="form-control"
            id="customerAddress"
            placeholder="Direccion"
            v-model="customerformData.address" 
          />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-primary mx-3">Guardar</button>
        <RouterLink :to="{ name: 'list_customers' }" class="btn btn-danger">Cancelar</RouterLink> 
      </div>
    </form>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { submitHandler } from '@/shared/submitHandler'; 
  import { computed} from 'vue';

  const router = useRouter();

  const props = defineProps({
      action: String,
      customerformData: Object,
      endPoint: String,
  });

  const defineAction = computed(() => {
    if (props.action == 'create') return 'Crear Nuevo Cliente:';
    return 'Editar Cliente:';
  });

  const onSubmit = () => {
    let text_response = props.endPoint == 'create_customer/' ? 'Se ha creado tu nuevo cliente' : 'Se ha editado el cliente';
    submitHandler(props.action, props.endPoint, props.customerformData, text_response, router, '/list_customers');
  };
</script>