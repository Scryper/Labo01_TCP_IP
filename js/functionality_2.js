// get the button and the answer field
var btn = document.getElementById('send-f2');
var answerF2 = document.getElementById('answer-f2');

// event binding
btn.addEventListener('click', netInfo);

// net address, broadcast address
function netInfo() {
    // get the ip and the mask the user wrote
    let ip = document.getElementById('ip_address-f2').value;
    let ipParts = new Array(4);

    let mask = document.getElementById('mask-f2').value;
    let maskParts = new Array(4);

    if(verifyIPAddress(ip, ipParts) && (verifyMaskCIDR(mask) || verifyMaskDecimal(mask, maskParts))) {
        // ip in binary
        for (let i = 0 ; i < ipParts.length ; i++) {
            ipParts[i] = addZeros(intoBinaries(ipParts[i]));
        }

    } else {
        answerF2.innerText = "";
        if(!verifyIPAddress(ip, ipParts)) answerF2.innerText += "IP address is not valid.";
        if(!verifyMaskCIDR(mask)) answerF2.innerText += "\nMask is not valid.";
    }
}