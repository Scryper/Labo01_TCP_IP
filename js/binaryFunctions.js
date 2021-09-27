function addZerosLeft(number) {
    return number.padStart(8, "0");
}

function addZerosRight(number) {
    return number.padEnd(8, "0");
}

function convert(number, radixFrom, radixTo) {
    return parseInt(number, radixFrom).toString(radixTo);
}