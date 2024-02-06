// libs
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/style.css'
// clients
import './clients/category.client.js';
import './clients/user.client.js';
import './clients/transaction.client.js';

// services
import user from './user.service.js';
import transaction from './transaction.service.js';

// actions
user('/transactions/create');
transaction();