import Swal from 'sweetalert2';

const executeAlert = (type, title, text, callback) => {
    Swal.fire({ title, text, icon: type })
        .then(() => {
            if (callback) { callback(); }
        });
};

const successAlert = (title, text, callback) =>
    executeAlert("success", title, text, callback);

const errorAlert = (title, text, callback) =>
    executeAlert("error", title, text, callback);

const warningAlert = (title, text, callback) =>
    executeAlert("warning", title, text, callback);

const confirmAlert = (question, text, callback) => {
    const swal = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-outline-danger m-1",
            cancelButton: "btn btn-outline-secondary m-1"
        },
        buttonsStyling: false
    });
    swal.fire({
        title: question,
        text: text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}


export { successAlert, errorAlert, warningAlert, confirmAlert };