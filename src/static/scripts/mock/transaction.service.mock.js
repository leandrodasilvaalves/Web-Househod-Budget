import { page } from "@services/transactions/transaction.form.page";
import { addMonth } from "@utils/date.utils";

export default function () {
    if (page.isDesiredRoute()) {
        const today = new Date();
        page.description.value = "Lorem ipsum dolor sit amet consectetur";
        page.transactionAmount.value = '150.00';
        page.transactionDate.value = addMonth(today, 1);
        page.tags.value = "foo;bar;tagA;tagB;tagC";
        page.installmentsNumber.value = 1;
        page.firstDueDate.value = addMonth(today, 2);
        page.creditCardName.selectedIndex = 1;
    }
}
