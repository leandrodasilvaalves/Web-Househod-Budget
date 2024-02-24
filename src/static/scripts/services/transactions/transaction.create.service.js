import { createTransaction } from '../../clients/transaction.client';
import { page } from './transaction.form.page';
import { successAlert, errorAlert } from '../../utils/alerts.utils';

export default function () {
    document.addEventListener("DOMContentLoaded", async () => {
        if (isTransactionPage()) {
            page.form.addEventListener('submit', async event => {
                event.preventDefault();
                var { isSuccess, data, errors } = await createTransaction(page.buildTransaction());
                if (isSuccess) {
                    console.log('data', data);
                    successAlert('transação criada com sucesso')
                }
                else {
                    console.log('errors', errors);
                    errorAlert('Ocorreram erros ao tentar registrar uma transação');
                }
            });
            page.configurePaymentInputs();
            await page.loadCategories();
        }
    });
}

const isTransactionPage = () => window.location.pathname == '/transactions/create';