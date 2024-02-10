// libs
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.all.min.js'

import '../css/style.css'

// services
import loginUser, { isTokenExpired, clearAccessToken } from './user.login.service.js';
import regiserUser from './user.register.service.js';
import transaction from './transaction.service.js';

//mock: development
import mockForms from './mock';

// actions
if (isTokenExpired()) {
    clearAccessToken();
}
else {
    loginUser('/transactions/create');
    regiserUser();
    transaction();
    mockForms();
}
