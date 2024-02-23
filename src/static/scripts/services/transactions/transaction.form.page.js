import { getCategories } from '../../clients/category.client';

export const page = {
    form: document.getElementById("transactionForm"),
    description: document.getElementById("description"),
    categoriesDropdown: document.getElementById("category"),
    subcategoriesDropdown: document.getElementById("subcategory"),
    creditCardRadio: document.getElementById("creditCard"),
    creditCardForm: document.getElementById("creditCardForm"),
    creditCardName: document.getElementById("creditCardName"),
    installmentsNumber: document.getElementById("installmentsNumber"),
    firstDueDate: document.getElementById("firstDueDate"),
    paymentType: document.getElementById("paymentType"),
    transactionAmount: document.getElementById("transactionAmount"),
    transactionDate: document.getElementById("transactionDate"),
    tags: document.getElementById("tags"),
    subcategoriesList: [],

    isDesiredRoute: () => {
        const desiredRoutes = ['/transactions/create', '/transactions/edit/:id'];
        return desiredRoutes.includes(window.location.pathname);
    },
    getIdFromRoute: () => window.location.split('/')?.pop(),
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
                page.paymentType.value = e.target.value;
            });
            page.creditCardRadio.click();
        });
    }
}