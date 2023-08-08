<template>
  <div class="container mt-5">
    <h1>Lista de Clientes:</h1>
    <table class="table table-striped table-hover mt-4 text-center">
      <thead>
        <tr>
          <th scope="col">Cédula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Número</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td class="d-flex justify-content-around">
            <RouterLink to="/Create_New_Sale" class="btn btn-primary">Crear Venta</RouterLink>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger" @click="deleteCustomer()">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <RouterLink to="/Create_New_Customer" class="btn btn-primary btn-lg"
      >Crear Nuevo Cliente</RouterLink
    >
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";

export default {
  components: {
    RouterLink,
  },
  methods: {
    deleteCustomer() {
      Swal.fire({
        title: "¿Estas Seguro?",
        text: "Tu no serás capaz de revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Eliminado!", "Tu cliente ha sido eliminado.", "success");
        }
      });
    },
  },
};
</script>
