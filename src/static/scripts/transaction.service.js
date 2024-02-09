import { getCategories } from './clients/category.client';
import { create } from './clients/transaction.client';
import { successAlert, errorAlert } from './alerts.service';

export default function () {
    document.addEventListener("DOMContentLoaded", async () => {
        if (page.isDesiredRoute()) {
            page.form.addEventListener('submit', async event => {
                event.preventDefault();
                var { isSuccess, data, errors } = await create(page.buildTransaction(event));
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

const page = {
    form: document.getElementById("transactionForm"),
    categoriesDropdown: document.getElementById("category"),
    subcategoriesDropdown: document.getElementById("subcategory"),
    creditCardRadio: document.getElementById("creditCard"),
    creditCardForm: document.getElementById("creditCardForm"),
    creditCardName: document.getElementById("creditCardName"),
    installmentsNumber: document.getElementById("installmentsNumber"),
    firstDueDate: document.getElementById("firstDueDate"),
    paymentType: document.getElementById("paymentType"),
    subcategoriesList: [],

    isDesiredRoute: () => {
        const desiredRoutes = ['/transactions/create', '/transactions/edit'];
        return desiredRoutes.includes(window.location.pathname);
    },
    showCreditCardForm: () => { page.creditCardForm.classList.remove("visually-hidden"); },
    hideCreditCardForm: () => {
        page.creditCardForm.classList.add("visually-hidden");
        page.creditCardName.value = "";
        page.installmentsNumber.value = "";
        page.firstDueDate.value = "";
    },
    loadCategories: async () => {
        page.categoriesDropdown.innerHTML = '<option value="" disabled selected>Selecione ...</option>';

        const categories = await getCategories();
        if (categories.isSuccess) {
            for (let category of categories.items) {
                let option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                page.categoriesDropdown.appendChild(option);
                for (let subcategory of category.subcategories) {
                    page.subcategoriesList.push({ ...subcategory, categoryId: category.id });
                }
            }
        }
        page.categoriesDropdown.addEventListener("change", page.loadSubcategories);
    },
    loadSubcategories: () => {
        page.subcategoriesDropdown.innerHTML = '<option value="" disabled selected>Selecione ...</option>';
        let matchingSubcategories = page.subcategoriesList.filter(c => c.categoryId == page.categoriesDropdown.value);

        if (matchingSubcategories) {
            matchingSubcategories.forEach((subcategory) => {
                let option = document.createElement("option");
                option.value = subcategory.id;
                option.text = subcategory.name;
                page.subcategoriesDropdown.appendChild(option);
            });
        }
    },
    buildTransaction: ({ target }) => {
        return {
            description: target[0].value,
            category: {
                id: target[1].value,
                subcategory: {
                    id: target[2].value,
                }
            },
            payment: {
                total: target[12].value,
                type: target[3].value,
                creditCard: page.creditCardRadio.checked == false ? null : {
                    name: target[9].value,
                    installmentNumber: target[10].value,
                    firstDueDate: target[11].value
                }
            },
            transactionDate: target[13].value,
            tags: target[14].value?.split(";"),
        };
    },
    configurePaymentInputs: () => {
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener("change", e => {
                if (page.creditCardRadio.checked) {
                    page.showCreditCardForm();
                }
                else {
                    page.hideCreditCardForm();
                }
                console.log('target', e.target.value)
                page.paymentType.value = e.target.value;
            });
            page.creditCardRadio.click();
        });       
    }
}