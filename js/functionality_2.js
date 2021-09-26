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
        let netParts = ["", "", "", ""];
        let broadcastParts = ["", "", "", ""];
        // convert the mask in decimal if necessary
        if(verifyMaskCIDR(mask)) maskParts = convertMaskToBinary(mask);
        // ip in binary
        // then separating the net part from the ip
        for (let i = 0 ; i < ipParts.length ; i++) {
            ipParts[i] = addZerosLeft(convert(ipParts[i], 10, 2));
            for (let j = 0; j < 8; j++) {
                if(maskParts[i][j].localeCompare("1") == 0) {
                    netParts[i] += ipParts[i][j];
                    broadcastParts[i] += "0";
                }
                else {
                    broadcastParts[i] += ipParts[i][j];
                    netParts[i] += "0";
                }
            }
        }

    } else {
        answerF2.innerText = "";
        if(!verifyIPAddress(ip, ipParts)) answerF2.innerText += "IP address is not valid.";
        if(!verifyMaskCIDR(mask)) answerF2.innerText += "\nMask is not valid.";
    }
}