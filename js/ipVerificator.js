function verifyIPAdress() {
    //get the IP adress
    let ip = document.getElementById('ip_adress-f1').value;

    //check with a regex if the input is correct
    let regex = "^([0-9]{1,3}\\.){3}[0-9]{1,3}$";
    let regexObj = new RegExp(regex);

    return regexObj.test(ip);
}







