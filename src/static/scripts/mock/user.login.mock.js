import { page } from '../user.login.service';

export default function () {
    if (page.isLogin()) {
        page.username.value = 'lele';
        page.password.value = '123@Mudar';
    }
}