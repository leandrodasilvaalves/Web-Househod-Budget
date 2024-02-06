import { getCategories } from './clients/category.client';

const categoriesDropdown = document.getElementById("category");
const subcategoriesDropdown = document.getElementById("subcategory");
const creditCardRadio = document.getElementById("creditCard");
const creditCardForm = document.getElementById("creditCardForm");
const creditCardName = document.getElementById("creditCardName");
const installmentsNumber = document.getElementById("installmentsNumber");
const firstDueDate = document.getElementById("firstDueDate");
const paymentType = document.getElementById("paymentType");
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