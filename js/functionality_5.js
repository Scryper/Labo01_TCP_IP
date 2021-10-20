//get the button and the answer field
var btn = document.getElementById('send-f5');
var answerF5 = document.getElementById('answer-f5');

//when you click on the button
btn.addEventListener('click', awarenessCheck);

// checks if the two machine sknows each other
function awarenessCheck(){
    //get the IP addresses and the masks
    let ip1 = document.getElementById('ip_address_1-f5').value;
    let ip2 = document.getElementById('ip_address_2-f5').value;
    let mask1 = document.getElementById('mask_1-f5').value;
    let mask2 = document.getElementById('mask_2-f5').value;

    //creating the array containing the number of the IP's and masks
    let ipParts1 = new Array(4);
    let ipParts2 = new Array(4);
    let maskParts1 = new Array(4);
    let maskParts2 = new Array(4);

    //if the masks and the IP's are correct
    if((verifyMaskCIDR(mask1) || verifyMaskDecimal(mask1, maskParts1))
        &&(verifyMaskCIDR(mask2) || verifyMaskDecimal(mask2, maskParts2))
        && verifyIPAddress(ip1, ipParts1) && verifyIPAddress(ip2, ipParts2)) {
        if(mask1[0] == "\/") mask1 = mask1.substring(1, mask1.length);
        if(mask2[0] == "\/") mask2 = mask2.substring(1, mask2.length);
        //creating an object to get the information on the mask
        let maskObject1 = {
            byte:0,
            digit:0
        }
        let maskObject2 = {
            byte:0,
            digit:0
        }

        //if the mask is not in the CIDR form
        if(verifyMaskDecimal(mask1, maskParts1)){
            for(let i = 0 ; i < 4 ; i++){
                maskParts1[i] = addZerosLeft(convert(maskParts1[i], 10, 2));
            }
        }
        else {
            maskParts1 = convertMaskToBinary(mask1);
            maskObject1.byte = Math.floor(mask1 / 8);
            maskObject1.digit = mask1 % 8;
        }
        //if the mask is not in the CIDR form
        if(verifyMaskDecimal(mask2, maskParts2)){
            for(let i = 0 ; i < 4 ; i++){
                maskParts2[i] = addZerosLeft(convert(maskParts2[i], 10, 2));
            }
        }
        else {
            maskParts2 = convertMaskToBinary(mask2);
            maskObject2.byte = Math.floor(mask2 / 8);
            maskObject2.digit = mask2 % 8;
        }
        mask1 = computeMask(maskParts1, maskObject1);
        mask2 = computeMask(maskParts2, maskObject2);

        if(isSameNetwork(ipParts1, ipParts2, maskObject1)) answerF5.innerText = "IP1 considers that they are in the same network";
        else answerF5.innerText = "IP1 considers that they are not in the same network";
        if(isSameNetwork(ipParts1, ipParts2, maskObject2)) answerF5.innerText = answerF5.innerText + "\nIP2 considers that they are in the same network";
        else answerF5.innerText = answerF5.innerText + "\nIP2 considers that they are not in the same network";

    }
    //data is not valid
    else {
        answerF5.innerText = "";
        if(!verifyIPAddress(ip1, ipParts1)) answerF5.innerText += "IP address 1 is not valid.";
        if(!verifyMaskCIDR(mask1)) answerF5.innerText += "\nMask  1 is not valid.";
        if(!verifyIPAddress(ip2, ipParts2)) answerF5.innerText += "IP address 2 is not valid.";
        if(!verifyMaskCIDR(mask2)) answerF5.innerText += "\nMask  2 is not valid.";
    }
}