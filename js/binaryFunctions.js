function addZeros(number) {
    while (number.length < 8) number = "0" + number;
    return number;
}

function intoBinaries(number){
    return parseInt(number,10).toString(2);
}