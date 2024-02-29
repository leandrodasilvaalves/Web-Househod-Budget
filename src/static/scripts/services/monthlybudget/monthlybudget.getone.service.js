import { getOneMonthlyBudget } from '@clients/monthlybudget.client';

export default async () => {
    if (page.isMonthlyBudget()) {
        const { data, isSuccess } = await getOneMonthlyBudget(2024, "FEBRUARY");
        if (isSuccess) {
            page.bindCategories(data)
        }
    }
};

const page = {
    accordion: document.getElementById('monthlybudget'),
    isMonthlyBudget: () => window.location.pathname == '/monthlybudget',

    bindCategories: ({categories}) => {
        page.accordion.innerHTML = categories.map(category => {
            const accordionId = `acc-${category.id}`;
            return `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#${accordionId}" 
                            aria-expanded="true" aria-controls="${accordionId}">
                            ${category.name}
                        </button>
                    </h2>
                    <div id="${accordionId}" class="accordion-collapse collapse show">
                        <div class="container-fluid">
                            <table class="table table-hover table-striped table-sm">               
                                <tbody>
                                    ${page.bindSubcategories(category.subcategories)}
                                </tbody>
                            </table>
                        </div>               
                    </div>
                </div>`}).join('');
    },
    bindSubcategories: subcategories => {
        const result = subcategories.map(subcategory => 
            `<tr>
                <th scope="row" data-subcategory=${subcategory.id}">${subcategory.name}</th>
                <td>
                    <div class="container text-center">
                        <div class="row g-2">
                            <div class="col-6">
                                <small>${subcategory.total?.planned?.toFixed(2)}</small>
                            </div>
                            <div class="col-6">
                                ${subcategory.total?.actual?.toFixed(2)}
                            </div>                            
                        </div>
                    </div>
                </td>               
            </tr>`);
        return result.join('');
    }
}