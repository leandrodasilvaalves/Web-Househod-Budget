import { page } from '../user.register.service';

export default function () {
    if (page.isRegisterUser()) {
        page.fullName.value = 'Leandro Alves';
        page.email.value = 'leandro@email.com';
        page.username.value = 'lele';
        page.password.value = '123@Mudar';
        page.confirmPassword.value = '123@Mudar';
    }
}