import login from './user.login.mock';
import register from './user.register.mock';

export default function () {
    if (envName === 'development') {
        login();
        register();
    }
}