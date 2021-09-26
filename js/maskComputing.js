function verifyMaskCIDR(mask) {
    let regexCIDR = "^\/?[0-9]{1,2}$";
    let regexObjCIDR = new RegExp(regexCIDR);

    //if the regex is ok
    if(regexObjCIDR.test(mask)) {
        if(mask.substring(0, 1).localeCompare("\/")) mask = mask.substring(1, mask.length);
        if(mask > 31 || mask < 1) return false;
        return true;
    }
    return false;
}

function verifyMaskDecimal(mask, maskParts) {
    return verifyIPAddress(mask, maskParts);
}

function convertMaskToCIDR(maskParts) {
    let count = 0;
    for(let i = 0 ; i < maskParts.length ; i++) {
        for(let j = 0 ; j < 8 ; j++) {
            if(maskParts[i][j].localeCompare("1") == 0) count++;
        }
    }
    return count;
}

function convertMaskToBinary(mask) {
    let maskParts = ["", "", "", ""];
    let count = 1;
    let part = 0;
    // we had the amount of 1s that we need
    for(let i = 0 ; i < mask ; i++) {
        maskParts[part] += "1";
        // if we complete a byte, we go to the next one
        if(count % 8 == 0) part++;
        count++;
    }
    // add zeros to each byte
    for(let i = part ; i < maskParts.length ; i++) {
        maskParts[i] = addZerosRight(maskParts[i]);
    }
    return maskParts;
}

function computeMask(ip, maskObject){
    //determine the mask of the net: search the first digit not null
    let done = false;

    //backwards on the array of byte
    for(let i = 3 ; i >= 0 ; i--){
        //backwards on the array of digits
        for(let j = 7 ; j >= 0 ; j--){
            //if we find the first not null digit we save the byte and the digit then exit the loop
            if(ip[i].substring(j, j + 1) != 0){
                maskObject.byte = i + 1;
                maskObject.digit = j + 1;
                done = true;
                break;
            }
        }
        if(done) break;
    }
    //computing the mask in decimal
    return 8 * (maskObject.byte - 1) + maskObject.digit;
}