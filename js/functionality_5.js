//get the button and the answer field
var btn = document.getElementById('send-f5');
var answerF5 = document.getElementById('answer-f5');

//when you click on the button
btn.addEventListener('click', awarenessCheck);

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

        //creating an object to get the information on the mask
        let maskObject = {
            byte:0,
            digit:0
        }

        //check if the masks are the same
        if(sameMask(mask1,maskParts1, mask2,maskParts2,maskObject)){
            if(isSameNetwork(ipParts1,ipParts2, maskObject)){
                answerF5.innerText = "The IP's are in the same network";
            }
        else{
                answerF5.innerText = "The IP's are not in the same network";
            }
        }
        else{
            answerF5.innerText = "The IP's have different masks";
        }
    }
}