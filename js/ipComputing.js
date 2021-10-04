function verifyIPAddress(ip, ipPart) {
    //check with a regex if the input is correct
    let regex = "^([0-9]{1,3}\\.){3}[0-9]{1,3}$";
    let regexObj = new RegExp(regex);

    //if the regex is ok
    if(regexObj.test(ip)) {
        let incorrect = false;
        // remove the "."'s and divide the IP adress into 4 parts
        //select all characters before the point
        for (let i = 0; i < 3; i++) {
            ipPart[i] = ip.substring(0, ip.indexOf("."));
            ip = ip.substring(ip.indexOf(".") + 1, ip.length);
        }
        //what is left is the last part of the IP
        ipPart[3] = ip;
        //verify if each number is between 0 and 255 included
        for(let i = 0 ; i < 4 ; i++) {
            if(ipPart[i] < 0 || ipPart[i] > 255) incorrect = true;
        }
        if(!incorrect) return true;
    }
    return false;
}

//compare two BINARY IP
//both IP must have the same mask (composed of byte and digit corresponding to the position of the first not null digit)
//return true if they are in the same network
function isSameNetwork(ip1, ip2, mask) {
    //compare each bit from the mask
    //if they are the same, the two IP are from the same network
    let same = true;
    for(let i = 0 ; i < mask.byte ; i++) {
        if(i + 1 == mask.byte) {
            for(let j = 0 ; j < mask.digit ; j++) {
                if(ip1[i].substring(j, j + 1) != ip2[i].substring(j, j + 1)) same = false;
            }
        }
        else {
            for(let j = 0 ; j < 8 ; j++){
                if(ip1[i].substring(j, j + 1 ) != ip2[i].substring(j, j + 1)) same = false;
            }
        }
    }
    return same;
}