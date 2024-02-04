const categoriesDropdown = document.getElementById("category");
const subcategoriesDropdown = document.getElementById("subcategory");
const categoriesList = JSON.parse(`{}`)
const subcategoriesList = [];
const creditCardRadio = document.getElementById("creditCard");
const creditCardForm = document.getElementById("creditCardForm");
const creditCardName = document.getElementById("creditCardName");
const installmentsNumber = document.getElementById("installmentsNumber");
const firstDueDate = document.getElementById("firstDueDate");
const paymentType = document.getElementById("paymentType");

document.addEventListener("DOMContentLoaded", () => {
    categoriesDropdown.addEventListener("change", loadSubcategories);

    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio =>
        radio.addEventListener("change", e => {
            creditCardForm.style.display = creditCardRadio.checked ? showCreditCardForm() : hideCreditCardForm();
            paymentType.value = e.target.value;
        }));
    loadCategories();
});

function showCreditCardForm() { creditCardForm.classList.remove("visually-hidden"); }
function hideCreditCardForm() {
    creditCardForm.classList.add("visually-hidden");
    creditCardName.value = "";
    installmentsNumber.value = "";
    firstDueDate.value = "";
}

function loadCategories() {
    categoriesDropdown.innerHTML = '<option value="" disabled selected>Selecione ...</option>';
    if (categoriesList.isSuccess) {
        for (let category of categoriesList.data.items) {
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