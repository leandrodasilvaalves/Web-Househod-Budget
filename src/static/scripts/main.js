// libs
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.all.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../css/style.css'

// services
import users, { isAuthenticated } from './services/users';
import transactions from './services/transactions';
import monthlybudget from './services/monthlybudget';

//partials
import footer from './partials/footer.partial.js';

//mock: development
import mockForms from './mock';

// actions
footer();
if (isAuthenticated()) {
    users();
    transactions();
    monthlybudget();
    mockForms();
}