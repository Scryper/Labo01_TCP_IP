//get the button and the answer field
var btn = document.getElementById('send-f3');
var answerF3 = document.getElementById('answer-f3');

//when you click on the button
btn.addEventListener('click', membershipCheck);

// check if an ip address is in a network
function membershipCheck() {
    //get the IP address, the mask and the net
    let ip = document.getElementById('ip_address-f3').value;
    let mask = document.getElementById('mask-f3').value;
    let net = document.getElementById('net_address-f3').value;

    //creating the array containing the number of the IP's
    let ipParts = new Array(4);
    let netParts = new Array(4);
    let maskParts = new Array(4);

    //if the mask and the IP's are correct
    if((verifyMaskCIDR(mask) || verifyMaskDecimal(mask, maskParts))
        && verifyIPAddress(ip, ipParts) && verifyIPAddress(net, netParts)) {
        // verify if the IPs are in the same network or not
        if(isInNetwork(ipParts, netParts, mask, maskParts)) answerF3.innerText = "The IP's are on the same network";
        else answerF3.innerText = "The IP's are not on the same network";
    }
    // data not valid
    else {
        answerF3.innerText = "";
        if(!verifyIPAddress(ip, ipParts)) answerF3.innerText = "The IP address is not a valid IP address.";
        if(!verifyMaskCIDR(mask)&&!verifyMaskDecimal(mask,maskParts)) answerF3.innerText = answerF3.innerText + "\nThe mask is not a correct mask.";
        if(!verifyIPAddress(net, netParts)) answerF3.innerText = answerF3.innerText + "\nThe Net address is not a valid IP address..";
    }
}