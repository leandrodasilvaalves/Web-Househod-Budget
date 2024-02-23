import { registerPage } from '../services/users';

export default function () {
    if (registerPage.isRegisterUser()) {
        registerPage.fullName.value = 'Leandro Alves';
        registerPage.email.value = 'leandro@email.com';
        registerPage.username.value = 'lele';
        registerPage.password.value = '123@Mudar';
        registerPage.confirmPassword.value = '123@Mudar';
    }
}