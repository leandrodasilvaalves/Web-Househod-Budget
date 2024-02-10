import login from './user.login.mock';
import register from './user.register.mock';
import transaction from './transaction.service.mock';

export default function () {
    if (envName === 'development') {
        login();
        register();
        transaction();
    }
}