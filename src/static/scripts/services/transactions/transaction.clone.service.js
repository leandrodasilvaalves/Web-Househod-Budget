import { getTransactionById, createTransaction } from '@clients/transaction.client';
import { page } from './transaction.form.page';
import { successAlert, errorAlert } from '@utils/alerts.utils';

export default function () {
    document.addEventListener("DOMContentLoaded", async () => {
        if (isTransactionPage()) {
            page.form.addEventListener('submit', async event => {
                event.preventDefault();
                var { isSuccess, data, errors } = await createTransaction({ ...page.buildTransaction(), id: '' });
                if (isSuccess) {
                    console.log('data', data);
                    successAlert('transação criada com sucesso com sucesso', null, () => history.back());
                }
                else {
                    console.log('errors', errors);
                    errorAlert('Ocorreram erros ao tentar criar uma transação');
                }
            });

            page.configurePaymentInputs();
            await page.loadCategories();
            const result = await getTransactionById(getIdFromRoute());
            if (result.isSuccess) {
                page.loadForm(result);
            }
        }
    });
}

const isTransactionPage = () => window.location.pathname.indexOf('/transactions/clone/') > -1;
const getIdFromRoute = () => window.location.pathname.split('/')?.pop();