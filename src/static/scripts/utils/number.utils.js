const padZeroLeft = (number, zeros) =>
    number.toString().padStart(zeros || 1, '0');

export {
    padZeroLeft
}