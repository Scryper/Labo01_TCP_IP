function verifyMaskCIDR(mask) {
    let regexCIDR = "^\/?[0-9]{1,2}$";
    let regexObjCIDR = new RegExp(regexCIDR);

    //if the regex is ok
    if(regexObjCIDR.test(mask)) {
        if(mask[0].localeCompare("\/") == 0) mask = mask.substring(1, mask.length);
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
    if(mask[0].localeCompare("\/") == 0) mask = mask.substring(1, mask.length);
    // we add the amount of 1s that we need
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

function sameMask(mask1, maskParts1, mask2,maskParts2, maskObject1) {

    //if the mask is not in the CIDR form
    if(verifyMaskDecimal(mask1, maskParts1)){
        for(let i = 0 ; i < 4 ; i++){
            maskParts1[i] = addZerosLeft(convert(maskParts1[i], 10, 2));
        }
        mask1 = computeMask(maskParts1,maskObject1);
    }

    //if the mask is not in the CIDR form
    if(verifyMaskDecimal(mask2, maskParts2)){
        for(let i = 0 ; i < 4 ; i++){
            maskParts2[i] = addZerosLeft(convert(maskParts2[i], 10, 2));
        }
        let maskObject2 = {
            byte:0,
            digit:0
        };
        mask2 = computeMask(maskParts2,maskObject2);
    }
    //if both mask are equals
    return (mask1==mask2);
}