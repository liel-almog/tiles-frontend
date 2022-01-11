import OldSwal, { SweetAlertOptions } from "sweetalert2";

export const Swal = (options: SweetAlertOptions) => {
    OldSwal.fire({ ...options, heightAuto: false });
};
