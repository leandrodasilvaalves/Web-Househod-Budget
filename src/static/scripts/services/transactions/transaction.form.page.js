import { getCategories } from '@clients/category.client';
import { parseDate } from '@utils/date.utils';

export const page = {
    form: document.getElementById("transactionForm"),
    transactionId: document.getElementById("transactionId"),
    description: document.getElementById("description"),
    category: document.getElementById("category"),
    subcategory: document.getElementById("subcategory"),
    creditCardRadio: document.getElementById("creditCard"),
    creditCardForm: document.getElementById("creditCardForm"),
    creditCardName: document.getElementById("creditCardName"),
    installmentsNumber: document.getElementById("installmentsNumber"),
    firstDueDate: document.getElementById("firstDueDate"),
    paymentType: document.getElementById("paymentType"),
    transactionAmount: document.getElementById("transactionAmount"),
    transactionDate: document.getElementById("transactionDate"),
    tags: document.getElementById("tags"),
    paymentTypeRabioButtons: document.querySelectorAll('input[name="paymentMethod"]'),
    total: document.getElementById("transactionAmount"),
    type: document.getElementById("paymentType"),
    subcategoriesList: [],
    isDesiredRoute: () => {
        const desiredRoutes = ['/transactions/create', '/transactions/edit/:id'];
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
        page.category.innerHTML = '<option value="" disabled selected>Selecione ...</option>';
        const categories = await getCategories();
        if (categories.isSuccess) {
            for (let category of categories.items) {
                let option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                page.category.appendChild(option);
                for (let subcategory of category.subcategories) {
                    page.subcategoriesList.push({ ...subcategory, categoryId: category.id });
                }
            }
        }
        page.category.addEventListener("change", page.loadSubcategories);
    },
    loadSubcategories: () => {
        page.subcategory.innerHTML = '<option value="" disabled selected>Selecione ...</option>';
        let matchingSubcategories = page.subcategoriesList.filter(c => c.categoryId == page.category.value);

        if (matchingSubcategories) {
            matchingSubcategories.forEach((subcategory) => {
                let option = document.createElement("option");
                option.value = subcategory.id;
                option.text = subcategory.name;
                page.subcategory.appendChild(option);
            });
        }
    },
    buildTransaction: () => {
        const transaction = {
            description: page.description.value,
            category: {
                id: page.category.value,
                subcategory: {
                    id: page.subcategory.value,
                }
            },
            payment: {
                total: page.total.value,
                type: page.type.value,
                creditCard: page.creditCardRadio.checked == false ? null : {
                    name: page.creditCardName.value,
                    installmentNumber: page.installmentsNumber.value,
                    firstDueDate: parseDate(page.firstDueDate.value)
                }
            },
            transactionDate: parseDate(page.transactionDate.value),
            tags: page.tags.value?.split(";"),
        };

        return page.transactionId.value ? { ...transaction, id: page.transactionId.value } : transaction;
    },
    configurePaymentInputs: () => {
        page.paymentTypeRabioButtons.forEach(radio => {
            radio.addEventListener("change", e => {
                if (page.creditCardRadio.checked) {
                    page.showCreditCardForm();
                }
                else {
                    page.hideCreditCardForm();
                }
                page.paymentType.value = e.target.value;
            });
            page.creditCardRadio.click();
        });
    },
    loadForm: ({ data }) => {
        page.transactionId.value = data.id;
        page.description.value = data.description;
        page.category.value = data.category.id;
        page.loadSubcategories();
        page.subcategory.value = data.category.subcategory.id;
        loadPayment(data.payment);
        page.transactionDate.value = parseDate(data.transactionDate);
        page.tags.value = data.tags.join(';');
    }
}

const loadPayment = payment => {
    page.paymentType.value = payment.type;
    page.total.value = payment.total;
    page.paymentTypeRabioButtons.forEach(radio => {
        if (radio.value == payment.type) {
            radio.checked = true;
        }
    });
    if (payment.type == 'CREDIT_CARD') {
        const { creditCard } = payment;
        page.creditCardName.value = creditCard.name;
        page.installmentsNumber.value = creditCard.installment.number;
        page.firstDueDate.value = parseDate(creditCard.installment.nextPayments[0].dueDate);
        page.showCreditCardForm();
    }
    else {
        page.hideCreditCardForm();
    }
};