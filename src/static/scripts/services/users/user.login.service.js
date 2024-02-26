import { login } from '@clients/user.client';
import storage from '@utils/storage.utils';
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
                const redirectRoute = new URLSearchParams(window.location.search).get('redirect');
                window.location.href = redirectRoute ? redirectRoute : destinationRoute;
            }
        });
    }
    if (page.isLogout()) {
        clearAccessToken(true);
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

const clearAccessToken = (isLogout) => {
    storage.removetItem(storageKey);
    if (page.isLogin() == false) {
        const loginRoute = '/account/login';
        window.location.href = isLogout ? loginRoute :
            `${loginRoute}?redirect=${window.location.pathname}`;
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