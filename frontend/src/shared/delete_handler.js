import Swal from 'sweetalert2';
import { useDressRentalStore } from '@/stores/dress_rental';

/**
 * Show a warning message for delete record.
 * @param {integer} id - Id record.
 * @param {string} model - Model record.
 */
export function deleteHandler(id, model) {
  const store = useDressRentalStore();

  Swal.fire({
    title: "¿Estas Seguro?",
    text: "No podras revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let text_message;
      store.delete(id, model);

      switch (model) {
          case 'customer':
              text_message = "Tu cliente ha sido eliminado."
              break;
          case 'product':
              text_message = "Tu producto ha sido eliminado."
              break;
          case 'invoice':
              text_message = "Tu venta ha sido eliminado."
              break;
          default:
              throw new Error(`Unsupported model: ${model}`);
      }
      
      Swal.fire("¡Eliminado!", text_message, "success");
    }
  });
}  