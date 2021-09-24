function verifyMask(mask){
    let regex = "^\/{0,1}[0-9]{1,2}$";
    let regexObj = new RegExp(regex);

    //if the regex is ok
    if(regexObj.test(mask)){
        if(mask.substring(0,1)=="\/"){
            mask=mask.substring(1,mask.length);
        }
        if(mask>31||mask<1){
            return false;
        }
        return true;
    }
    return false;
}

function computeMask(ip,maskObject){
    //determine the mask of the net: search the first digit not null
    let done = false;

    //backwards on the array of octet
    for(let i=3;i>=0;i--){
        //backwards on the array of digits
        for(let j=7;j>=0;j--){
            //if we find the first not null digit we save the octet and the digit then exit the loop
            if(ip[i].substring(j,j+1)!=0){
                maskObject.octet = i+1;
                maskObject.digit = j+1;
                done = true;
                break;
            }
        }
        if(done==true){
            break;
        }
    }
    //computing the mask in decimal
    return 8*(maskObject.octet-1) + maskObject.digit;
}