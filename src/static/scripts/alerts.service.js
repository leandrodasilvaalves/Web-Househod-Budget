import Swal from 'sweetalert2';

const successAlert = (title, text) => Swal.fire({ title, text, icon: "success" });

const errorAlert = (title, text) => Swal.fire({ title, text, icon: "error", });

const warningAlert = () => Swal.fire({ title, text, icon: "warning", });


export { successAlert, errorAlert, warningAlert };