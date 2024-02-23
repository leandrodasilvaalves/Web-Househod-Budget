import { login } from '../../clients/user.client';
import storage from '../../utils/storage.utils';
const storageKey = `accessToken`;

export default function (destinationRoute) {
    if (page.isLogin()) {
        page.form.addEventListener('submit', async event => {
            event.preventDefault();
            if (isTokenExpired() == false) {
                window.location.href = destinationRoute;
            }

            let { isSuccess, data } = await login(page.buildUser());
            if (isSuccess) {
                const { token_type, access_token } = data;
                storage.setItem(storageKey, `${token_type} ${access_token}`);
                window.location.href = destinationRoute;
            }
        });
    }
    if (page.isLogout()) {
        clearAccessToken();
    }
}

const page = {
    form: document.getElementById('loginform'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    buildUser: () => {
        return {
            username: page.username.value,
            password: page.password.value,
        }
    },
    isLogin: () => window.location.pathname == '/account/login',
    isLogout: () => window.location.pathname == '/account/logout',
}

const accessToken = storage.getItem(storageKey);

const clearAccessToken = () => {
    storage.removetItem(storageKey);
    if (page.isLogin() == false) {
        window.location.href = '/account/login';
    }
}

const isTokenExpired = () => {
    const token = storage.getItem(storageKey)?.split(' ')[1];
    if (token) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }
}

export { clearAccessToken, accessToken, isTokenExpired, page };