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
          <label for="customerSecondContact" class="form-label">Número De Contacto Secundario (opcional):</label>
          <input
            type="number"
            class="form-control"
            id="customerSecondContact"
            placeholder="Número De Contacto Secundario (opcional)"
            v-model="customerformData.secondContact" 
          />
        </div>
        <div class="mb-3">
          <label for="customerAddress" class="form-label">Direccion (opcional):</label>
          <input
            type="text"
            class="form-control"
            id="customerAddress"
            placeholder="Direccion (opcional)"
            v-model="customerformData.address" 
          />
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button type="submit" class="btn btn-primary mx-3">Guardar</button>
        <button @click="goBack" class="btn btn-danger mx-3">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { submitHandler } from '@/shared/submit_handler'; 
  import { computed} from 'vue';

  const router = useRouter();

  const props = defineProps({
      action: String,
      customerformData: Object,
      model: String,
  });

  /**
   * 
   */
  const defineAction = computed(() => {
    return props.action == 'create' ? 'Crear Nuevo Cliente:' : 'Editar Cliente:';
  });

  const onSubmit = () => {
    let text_response = 
      props.action == 'create' ? 'Se ha creado tu nuevo cliente' : 'Se ha editado el cliente';

    submitHandler(
      props.action, 
      props.customerformData, 
      props.model, 
      text_response,                   
      router, 
      '/list_customers');
  };

  const goBack = () => window.history.back();
</script>