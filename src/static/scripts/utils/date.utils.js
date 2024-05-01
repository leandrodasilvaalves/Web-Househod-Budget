import { padZeroLeft } from "./number.utils";

const parseDate = (value) => {
    const date = new Date(value);
    return `${date.getFullYear()}-${padZeroLeft((date.getMonth() + 1), 2)}-${padZeroLeft(date.getDate(), 2)}`;
};

const addMonth = (value, addition) => {
    const date = new Date(value);
    const month = padZeroLeft((date.getMonth() + addition), 2);
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

const configureMonthOptions = (element, currentMonth) => {
    for (var index = 1; index <= 12; index++) {
        let option = document.createElement('option');
        option.value = padZeroLeft(index);
        const { key, value } = getMonthName(index);
        option.text = value;
        option.dataset.name = key.toUpperCase();
        option.selected = currentMonth == padZeroLeft(index);
        element.appendChild(option);
    }
};

const getMonthName = (index) => {
    const mapping = {
        1: ['January', 'Janeiro'],
        2: ['February', 'Fevereiro'],
        3: ['March', 'Março'],
        4: ['April', 'Abril'],
        5: ['May', 'Maio'],
        6: ['June', 'Junho'],
        7: ['July', 'Julho'],
        8: ['August', 'Agosto'],
        9: ['September', 'Setembro'],
        10: ['October', 'Outubro'],
        11: ['November', 'Novembro'],
        12: ['December', 'Dezembro']
    };
    return {
        key: mapping[index][0],
        value: mapping[index][1]
    };
}

const configureYearOptions = (element, currentYear) => {
    for (let year = 2015; year <= 2045; year++) {
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        option.selected = year == currentYear;
        element.appendChild(option);
    }
};

export {
    parseDate,
    addMonth,
    configureMonthOptions,
    configureYearOptions,
    getMonthName
}