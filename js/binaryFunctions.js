// adds zeros to the left of a byte
function addZerosLeft(number) {
    return number.padStart(8, "0");
}

// adds zeros to the right of a byte
function addZerosRight(number) {
    return number.padEnd(8, "0");
}

// convert a number from a base to another
function convert(number, radixFrom, radixTo) {
    return parseInt(number, radixFrom).toString(radixTo);
}