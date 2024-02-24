import { register } from '@clients/user.client';
import { successAlert, errorAlert, warningAlert } from '@utils/alerts.utils';

export default function () {
    if (page.isRegisterUser()) {
        page.form.addEventListener('submit', async event => {
            event.preventDefault();
            if (page.differentPasswords()) {
                return;
            }

            let { isSuccess, data, errors } = await register(page.buildUser());
            if (isSuccess) {
                console.log('data', data);
                successAlert('Usuário registrado com sucesso!');
                setTimeout(() => window.location.href = '/account/login', 2000);
            }
            else {
                console.log('errors', errors);
                //TODO: incluir mensagens de erro no alerta de erro
                //passar por paramentro pra centralizar a abordagem
                errorAlert('Ocorreram erros ao tentar registrar o usuario');
            }
        });
    }
}

const page = {
    form: document.getElementById('registerUserForm'),
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    buildUser: () => {
        return {
            fullName: page.fullName.value,
            email: page.email.value,
            username: page.username.value,
            password: page.password.value,
            confirmPassword: page.confirmPassword.value,
        }
    },
    differentPasswords: () =>
        page.password.value != page.confirmPassword.value &&
        warningAlert('As senhas devem ser iguais!'),
    isRegisterUser: () => window.location.pathname == '/account/register',
}

export { page };