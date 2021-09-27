function isInNetwork(ipParts, netParts, mask) {
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
    //compute the mask of the net
    let netMask = computeMask(netParts, maskObject);
    //if both mask are equals
    if(netMask == mask) return isSameNetwork(netParts, ipParts, maskObject);
    else return false;
}