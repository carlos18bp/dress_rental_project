import { useDressRentalStore } from '@/stores/dress_rental';
import Swal from 'sweetalert2';

const dressRentalStore = useDressRentalStore();

export function deleteHandler(id, model) {
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
      switch (model) {
          case 'customer':
              dressRentalStore.deleteCustomer(id);
              text_message = "Tu cliente ha sido eliminado."
              break;
          case 'product':
              dressRentalStore.deleteProduct(id);
              text_message = "Tu producto ha sido eliminado."
              break;
          case 'sale':
              dressRentalStore.deleteSale(id);
              text_message = "Tu venta ha sido eliminado."
              break;
          default:
              throw new Error(`Unsupported model: ${model}`);
      }
      
      Swal.fire("¡Eliminado!", text_message, "success");
    }
  });
}  