//get the button and the answer field
var btn = document.getElementById('send-f4');
var answerF4 = document.getElementById('answer-f4');

// event binding
btn.addEventListener('click', isIPInMachinePart);

// checks if the ip is in the machine parts of the network
function isIPInMachinePart() {
    // get the ip, the mask and the network address the user wrote
    let ip = document.getElementById('ip_address-f4').value;
    let ipParts = new Array(4);
    let mask = document.getElementById('mask-f4').value;
    let maskParts = new Array(4);
    let net = document.getElementById('net_address-f4').value;
    let netParts = new Array(4);

    // verifying data validity
    if(verifyIPAddress(ip, ipParts) && (verifyMaskCIDR(mask) || verifyMaskDecimal(mask, maskParts))
        && verifyIPAddress(net, netParts)) {
        // verify if the IPs are in the same network
        // if there aren't, IP can't be in the network machine part
        if(isInNetwork(ipParts, netParts, mask, maskParts)) {
            let unauthorizedAddress = ["", "", "", ""]; // broadcast address
            maskParts = convertMaskToBinary(mask);

            // calculating the broadcast part
            for (let i = 0 ; i < ipParts.length ; i++) {
                for (let j = 0; j < ipParts[i].length; j++) {
                    if(maskParts[i][j].localeCompare("1") == 0) {
                        unauthorizedAddress[i] += ipParts[i][j];
                    }
                    else {
                        unauthorizedAddress[i] += "1";
                    }
                }
            }

            // converting in decimal and displaying the answer
            for (let i = 0 ; i < ipParts.length ; i++) {
                ipParts[i] = convert(ipParts[i], 2, 10);
                unauthorizedAddress[i] = convert(unauthorizedAddress[i], 2, 10);
                netParts[i] = convert(netParts[i], 2, 10);
                if(ipParts[i].localeCompare(netParts[i]) == 0 || ipParts[i].localeCompare(unauthorizedAddress[i]) == 0) {
                    answerF4.innerText = "This IP address is not authorized in this network.";
                }
                else answerF4.innerText = "This IP address is part of the network's machines address.";
            }
        }
        else answerF4.innerText = "This IPs are not in the same network.";
    // data not valid
    } else {
        answerF4.innerText = "";
        if(!verifyIPAddress(ip, ipParts)) answerF4.innerText += "IP address is not valid.";
        if(!verifyMaskCIDR(mask)) answerF4.innerText += "\nMask is not valid.";
        if(!verifyIPAddress(net, netParts)) answerF4.innerText += "\nNetwork address is not valid.";
    }
}