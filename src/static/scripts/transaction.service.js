import { getCategories } from './clients/category.client';
import { create } from './clients/transaction.client';

const categoriesDropdown = document.getElementById("category");
const subcategoriesDropdown = document.getElementById("subcategory");
const creditCardRadio = document.getElementById("creditCard");
const creditCardForm = document.getElementById("creditCardForm");
const creditCardName = document.getElementById("creditCardName");
const installmentsNumber = document.getElementById("installmentsNumber");
const firstDueDate = document.getElementById("firstDueDate");
const paymentType = document.getElementById("paymentType");
const transactionForm = document.getElementById("transactionForm");
const subcategoriesList = [];

export default function () {
    document.addEventListener("DOMContentLoaded", async () => {
        const desiredRoutes = ['/transactions/create', '/transactions/edit'];
        const currentPath = window.location.pathname;

        if (desiredRoutes.includes(currentPath)) {  
            categoriesDropdown.addEventListener("change", loadSubcategories);

            document.querySelectorAll('input[name="paymentMethod"]').forEach(radio =>
                radio.addEventListener("change", e => {
                    creditCardForm.style.display = creditCardRadio.checked ? showCreditCardForm() : hideCreditCardForm();
                    paymentType.value = e.target.value;
                }));

            transactionForm.addEventListener('submit', async event => {
                event.preventDefault();
                saveTransaction(event);
            });

            await loadCategories();
        }
    });
}


function showCreditCardForm() { creditCardForm.classList.remove("visually-hidden"); }
function hideCreditCardForm() {
    creditCardForm.classList.add("visually-hidden");
    creditCardName.value = "";
    installmentsNumber.value = "";
    firstDueDate.value = "";
}

async function loadCategories() {
    categoriesDropdown.innerHTML = '<option value="" disabled selected>Selecione ...</option>';

    const categories = await getCategories();
    if (categories.isSuccess) {
        for (let category of categories.items) {
            let option = document.createElement("option");
            option.value = category.id;
            option.text = category.name;
            categoriesDropdown.appendChild(option);
            for (let subcategory of category.subcategories) {
                subcategoriesList.push({ ...subcategory, categoryId: category.id });
            }
        }
    }
}

function loadSubcategories() {
    subcategoriesDropdown.innerHTML = '<option value="" disabled selected>Selecione ...</option>';
    let matchingSubcategories = subcategoriesList.filter(c => c.categoryId == categoriesDropdown.value);

    if (matchingSubcategories) {
        matchingSubcategories.forEach((subcategory) => {
            let option = document.createElement("option");
            option.value = subcategory.id;
            option.text = subcategory.name;
            subcategoriesDropdown.appendChild(option);
        });
    }
}

async function saveTransaction({ target }) {
    let transaction = {
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
            creditCard: target[3].value != "CREDIT_CARD" ? null : {
                name: target[9].value,
                installmentNumber: target[10].value,
                firstDueDate: target[11].value
            }
        },
        transactionDate: target[13].value,
        tags: target[14].value?.split(";"),
    };
    var { isSuccess, data, errors } = await create(transaction);
    if (isSuccess) {
        console.log('transação criada com sucesso', data);
    }
    else {
        console.log('Ocorreram erros ao tentar registrar uma transação', errors);
    }
}