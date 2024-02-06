import { login } from './clients/user.client';
import storage from './storage.service';
const storageKey = `accessToken`;

const loginForm = document.getElementById('loginform');
const username = document.getElementById('username');
const password = document.getElementById('password');

export default function (destinationRoute) {
    const desiredRoutes = ['/account/login', '/account/register'];
    const currentPath = window.location.pathname;

    if (desiredRoutes.includes(currentPath)) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();

            if (storage.getItem(storageKey)) {
                window.location.href = destinationRoute;
            }

            let user = { username: username.value, password: password.value };
            let { isSuccess, data } = await login(user);
            if (isSuccess) {
                const { token_type, access_token } = data;
                storage.setItem(storageKey, `${token_type} ${access_token}`);
                window.location.href = destinationRoute;
            }
        });
    }
}

const accessToken = storage.getItem(storageKey);

const clearAccessToken = () => {
    storage.removetItem(storageKey);
    window.location.href = '/account/login';
}

export { clearAccessToken, accessToken };