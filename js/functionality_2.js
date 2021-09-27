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
        // convert in decimal then in binary if it is cidr
        if(verifyMaskCIDR(mask)) maskParts = convertMaskToBinary(mask);
        else { // deleting the . then converting in binary
            for (let i = 0 ; i < maskParts.length ; i++) {
                if(i < 3) {
                    maskParts[i] = mask.substring(0, mask.indexOf("."));
                    mask = mask.substring(mask.indexOf(".") + 1, mask.length);
                }
                maskParts[i] = addZerosLeft(convert(maskParts[i], 10, 2))
            }
        }
        // ip in binary
        // then separating the net part and the broadcast part
        for (let i = 0 ; i < ipParts.length ; i++) {
            ipParts[i] = addZerosLeft(convert(ipParts[i], 10, 2));
            for (let j = 0; j < ipParts[i].length; j++) {
                if(maskParts[i][j].localeCompare("1") == 0) {
                    netParts[i] += ipParts[i][j];
                    broadcastParts[i] += ipParts[i][j];
                }
                else {
                    broadcastParts[i] += "1";
                    netParts[i] += "0";
                }
            }
        }
        answerF2.innerText = "Net address : ";
        let answerBroadcast = "\nBroadcast address : ";
        for (let i = 0 ; i < netParts.length ; i++) {
            netParts[i] = convert(netParts[i], 2, 10);
            broadcastParts[i] = convert(broadcastParts[i], 2, 10);
            answerF2.innerText += (i < 3) ? netParts[i] + "." : netParts[i];
            answerBroadcast += (i < 3) ? broadcastParts[i] + "." : broadcastParts[i];
        }
        answerF2.innerText += answerBroadcast;
    } else {
        answerF2.innerText = "";
        if(!verifyIPAddress(ip, ipParts)) answerF2.innerText += "IP address is not valid.";
        if(!verifyMaskCIDR(mask)) answerF2.innerText += "\nMask is not valid.";
    }
}