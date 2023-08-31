import { useDressRentalStore } from "@/stores/dress_rental";
import Swal from "sweetalert2";

const dressRentalStore = useDressRentalStore();

export function submitHandler(
  action,
  endPoint,
  formData,
  text_response,
  router,
  redirectUrl
) {
  try {
    action == "create"
      ? dressRentalStore.createRequest(endPoint, formData)
      : dressRentalStore.editRequest(endPoint, formData);

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
