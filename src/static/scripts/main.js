// libs
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.all.min.js'

import '../css/style.css'
// clients
import './clients/http.client.js';
import './clients/category.client.js';
import './clients/user.client.js';
import './clients/transaction.client.js';

// services
import loginUser, { isTokenExpired, clearAccessToken } from './user.login.service.js';
import regiserUser from './user.register.service.js';
import transaction from './transaction.service.js';

// actions
if (isTokenExpired()) {
    clearAccessToken();
}
else {
    loginUser('/transactions/create');
    regiserUser();
    transaction();
}