import Swal from "sweetalert2";
import { useDressRentalStore } from '@/stores/dress_rental';

export function submitHandler(
  action,
  formData,
  model,
  text_response,
  router,
  redirectUrl
) {
  const store = useDressRentalStore();

  try {
    action == "create"
      ? store.createRequest(formData, model)
      : store.editRequest(formData, model);

    Swal.fire({
      icon: "success",
      title: "Exitoso",
      text: text_response,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(redirectUrl);
      }
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal!",
      footer: "<a>Vuelve a intentar o intenta más tarde.</a>",
    });
  }
}
