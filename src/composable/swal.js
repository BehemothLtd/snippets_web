import { inject } from "vue";

export default function useSwal() {
  const Swal = inject("Swal");

  // options is new SwalOptions
  async function confirming(options) {
    const confirmation = await Swal.fire(options);

    return confirmation.isConfirmed;
  }

  return {
    confirming,
  };
}
