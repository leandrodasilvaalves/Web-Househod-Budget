import { page } from "../transaction.form.service";

export default function () {
    if (page.isDesiredRoute()) {
        page.description.value = "Lorem ipsum dolor sit amet consectetur";
        page.transactionAmount.value = '150.00';
        page.transactionDate.value = getDate(1);
        page.tags.value = "foo;bar;tagA;tagB;tagC";
        page.installmentsNumber.value = 1;
        page.firstDueDate.value = getDate(2);
        page.creditCardName.selectedIndex = 1;
    }
}

const getDate = addition => {
    const today = new Date();
    const month = (today.getMonth() + addition).toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${today.getDate()}`;
}