import Swal from 'sweetalert2';

const executeAlert = (type, title, text, callback) => {
    Swal.fire({ title, text, icon: type })
        .then(() => {
            if (callback) { callback(); }
        });
};

const successAlert = (title, text, callback) =>
    executeAlert("success", title, text, callback);

const errorAlert = (title, text) =>
    executeAlert("error", title, text, callback);

const warningAlert = (title, text) =>
    executeAlert("warning", title, text, callback);


export { successAlert, errorAlert, warningAlert };