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