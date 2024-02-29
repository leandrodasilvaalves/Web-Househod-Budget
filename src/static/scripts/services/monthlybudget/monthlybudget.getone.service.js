import { getOneMonthlyBudget } from '@clients/monthlybudget.client';
import { configureYearOptions, configureMonthOptions, getMonthName } from '@utils/date.utils';
import { warningAlert } from '@utils/alerts.utils';

export default async () => {
    if (page.isMonthlyBudget()) {
        const today = new Date();
        configureYearOptions(page.year, new Date().getFullYear());
        configureMonthOptions(page.month, today.getMonth() + 1);

        const month = getMonthName(today.getMonth() + 1).key.toUpperCase()
        await page.bindCategories(today.getFullYear(), month);

        page.form.addEventListener('submit', async event => {
            event.preventDefault();
            const { name: monthName } = page.month.selectedOptions[0].dataset;
            await page.bindCategories(page.year?.value, monthName);
        });
    }
};

const page = {
    accordion: document.getElementById('monthlybudget'),
    year: document.getElementById('year'),
    month: document.getElementById('month'),
    form: document.getElementById('search'),
    isMonthlyBudget: () => window.location.pathname == '/monthlybudget',

    bindCategories: async (year, month) => {
        const { data, isSuccess } = await getOneMonthlyBudget(year, month);
        if (isSuccess) {
            page.accordion.innerHTML = data.categories.map(category => {
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
        } else {
            warningAlert('Orçamento não encontrado!');
        }
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