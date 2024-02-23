import { loginPage as loginPage } from '../services/users';

export default function () {
    if (loginPage.isLogin()) {
        loginPage.username.value = 'lele';
        loginPage.password.value = '123@Mudar';
    }
}