import { padZeroLeft } from "./number.utils";

const parseDate = (value) => {
    const date = new Date(value);
    return `${date.getFullYear()}-${padZeroLeft((date.getMonth() + 1), 2)}-${padZeroLeft(date.getDate(), 2)}`;
}

const addMonth = (value, addition) => {
    const date = new Date(value);
    const month = padZeroLeft((date.getMonth() + addition), 2);
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

export {
    parseDate,
    addMonth
}