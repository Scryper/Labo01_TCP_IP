//get the button and the answer field
var btn = document.getElementById('send-f2');
var answerF2 = document.getElementById('answer-f2');

//when you click on the button
btn.addEventListener('click', netInfo);

//return the class of an IP adress
function netInfo() {
    //
    let ip = document.getElementById('ip_adress-f2').value;
    let ipPart = new Array(4);

    let mask = document.getElementById('mask-f2').value;

    if(verifyIPAdress(ip, ipPart) && verifyMask(mask)) {

    } else {
        answerF2.innerText = "";
        if(!verifyIPAdress(ip, ipPart)) answerF2.innerText += "IP adress is not valid.";
        if(!verifyMask(mask)) answerF2.innerText += "\nMask is not valid.";
    }
}