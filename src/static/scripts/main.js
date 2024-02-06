import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/style.css'
import user from './user.service.js';
import transaction from './transaction.service.js';
import './clients/category.client.js';
import './clients/user.client.js';

user('/transactions/create');
transaction();