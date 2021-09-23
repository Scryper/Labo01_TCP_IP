function verifyIPAdress(ip,ipPart) {

    //check with a regex if the input is correct
    let regex = "^([0-9]{1,3}\\.){3}[0-9]{1,3}$";
    let regexObj = new RegExp(regex);

    //if the regex is ok
    if(regexObj.test(ip)){

        let incorret = false;

        /* remove the "."'s and divide the IP adress into 4 parts */
        //select all characters before the point
        for (let i = 0; i < 3; i++) {
            ipPart[i] = ip.substring(0,ip.indexOf("."));
            ip=ip.substring(ip.indexOf(".")+1,ip.length);
        }

        //what is left is the last part of the IP
        ipPart[3] = ip;

        //verify if each number is between 0 and 255 included
        for(let i = 0; i < 4; i++){
            if(ipPart[i]<0||ipPart[i]>255){
                incorret=true;
            }
        }
        if(!incorret)
        return true;
    }
    return false;
}







