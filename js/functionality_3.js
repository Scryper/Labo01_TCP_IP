//get the button and the answer field
var btn = document.getElementById('send-f3');
var answerF3 = document.getElementById('answerF3');

//when you click on the button
btn.addEventListener('click', subnetContained);

function subnetContained() {
    //get the IP adress, the mask and the net
    let ip = document.getElementById('ip_adress-f3').value;
    let mask = document.getElementById('mask-f3').value;
    let net = document.getElementById('net_adress-f3').value;

    //creating the array containing the number of the IP's
    let ipPart = new Array(4);
    let netPart = new Array(4);

    //if the mask and the IP's are correct
    if(verifyMask(mask) && verifyIPAdress(ip, ipPart) && verifyIPAdress(net, netPart)) {
        //verify if there is a "/" in the mask
        if(mask.substring(0, 1) === "\/"){
            mask = mask.substring(1, mask.length);
        }
        //transform the IPs into binaries number
        for(let i = 0 ; i < 4 ; i++){
            ipPart[i] = addZeros(intoBinaries(ipPart[i]));
            netPart[i] = addZeros(intoBinaries(netPart[i]));
        }
        //creating an object to get the informations on the mask
        let maskObject = {
            byte:0,
            digit:0
        }
        //compute the mask of the net
        let netMask = computeMask(netPart, maskObject);
        //if both mask are equals
        if(netMask == mask) {
            let different = isSameNetwork(netPart, ipPart, maskObject);
            if(different) answerF3.innerText = "The IP's are not on the same network";
            else answerF3.innerText = "The IP's are on the same network";
        }
        else answerF3.innerText = "The mask of the two IP are different\nThe IP's are not on the same network";
    }
    else {
        answerF3.innerText = "";
        if(!verifyIPAdress(ip, ipPart)) answerF3.innerText = "The IP adress is not a valid IP adress.";
        if(!verifyMask(mask)) answerF3.innerText = answerF3.innerText + "\nThe mask is not a correct mask.";
        if(!verifyIPAdress(net, netPart)) answerF3.innerText = answerF3.innerText + "\nThe Net adress is not a valid IP adress..";
    }
}