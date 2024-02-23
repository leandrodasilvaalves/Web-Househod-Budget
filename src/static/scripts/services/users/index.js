import registerUser, {page as registerPage} from './user.register.service';
import loginUser, { isTokenExpired, clearAccessToken, accessToken, page as loginPage } from './user.login.service.js';

export default () => {
    loginUser('/transactions/create');
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