import { login } from './clients/user.client';
import storage from './storage.service';
const storageKey = `accessToken`;

export default function (destinationRoute) {
    if (window.location.pathname == '/account/login') {
        page.form.addEventListener('submit', async event => {
            event.preventDefault();
            if (storage.getItem(storageKey)) {
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
    }
}

const accessToken = storage.getItem(storageKey);

const clearAccessToken = () => {
    storage.removetItem(storageKey);
    window.location.href = '/account/login';
}

export { clearAccessToken, accessToken };