import registerUser, { page as registerPage } from './user.register.service';
import loginUser, { isTokenExpired, clearAccessToken, accessToken, page as loginPage } from './user.login.service.js';
import { page as transaction } from '@services/transactions/transaction.list.service';

export default () => {
    loginUser(transaction.getPathRoute());
    registerUser();
}

const isAuthenticated = () => {
    if (isTokenExpired()) {
        clearAccessToken();
        return false;
    }
    return true;
}

export {
    isAuthenticated,
    clearAccessToken,
    accessToken,
    loginPage,
    registerPage
}