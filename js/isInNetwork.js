function isInNetwork(ipParts, netParts, mask, maskParts) {
    //transform the IPs into binaries number
    for(let i = 0 ; i < 4 ; i++){
        ipParts[i] = addZerosLeft(convert(ipParts[i], 10, 2));
        netParts[i] = addZerosLeft(convert(netParts[i], 10, 2));
    }

    //creating an object to get the information on the mask
    let maskObject = {
        byte:0,
        digit:0
    }

    //if the mask is not in the CIDR form
    if(verifyMaskDecimal(mask, maskParts)){
        for(let i = 0 ; i < 4 ; i++){
            maskParts[i] = addZerosLeft(convert(maskParts[i], 10, 2));
        }
        let maskObject2 = {
            byte:0,
            digit:0
        }
        mask = computeMask(maskParts,maskObject2)
    }

    //compute the mask of the net
    //regarder si tous les bits jusqu'a la fin du masque sont égaux a ceux de l'adresse IP, puis chexk si tous les bits restants sont égaux a 0
    let count = 0;
    let boolean = false;
    for(let i = 0 ; i < 4 ; i++) {
        //backwards on the array of digits
        for(let j = 0 ; j < 8 ; j++) {
            if(count >= mask){
                if(netParts[i][j] != 0) {
                    boolean = true;
                }
            }
            else {
                if(netParts[i][j] != ipParts[i][j]) {
                    boolean = true;
                }
            }
            count++;
        }
    }

    //if both mask are equals
    if(!boolean) return isSameNetwork(netParts, ipParts, maskObject);
    else return false;
}