// get the button and the answer field
var btn = document.getElementById('send-f2');
var answerF2 = document.getElementById('answer-f2');

// event binding
btn.addEventListener('click', netInfo);

// net address, broadcast address
function netInfo() {
    // get the ip and the mask the user wrote
    // get the value of the check button to know if it's classfull or not
    let ip = document.getElementById('ip_address-f2').value;
    let ipParts = new Array(4);
    let mask = document.getElementById('mask-f2').value;
    let maskParts = new Array(4);
    let isChecked = document.getElementById('cb-f2').checked;

    // verify the validity of the information entered
    if(verifyIPAddress(ip, ipParts) && (verifyMaskCIDR(mask) || verifyMaskDecimal(mask, maskParts))) {
        let possible = true;
        let subnetting = false;
        let byte;

        // if we are in classfull : verify if we are subnetting
        if(isChecked) {
            // convert the mask in cidr if it is not in cidr
            if(!verifyMaskCIDR(mask)) {
                let tmp;
                mask = 0;
                for (let i = 0; i <= 3; i++) {
                    tmp = convert(maskParts[i], 10, 2);
                    mask += convertMaskToCIDR(tmp);
                }
            }
            else {
                if(mask[0] == "\/") mask = mask.substring(1, mask.length);
            }

            // if class A/B/C, only 1/2/3 bytes need to be fill with 1s (see line 97)
            if(ipParts[0] > 0 && ipParts[0] < 127) byte = 1;
            else if(ipParts[0] >= 128 && ipParts[0] < 192) byte = 2;
            else if(ipParts[0] >= 192 && ipParts[0] < 224) byte = 3;
            else possible = false;
            if(byte * 8 > mask) possible = false;

            // check if the mask is a multiple of 8
            if(mask % 8 != 0) subnetting = true;
        }
        if(possible) {
            let netParts = ["", "", "", ""];
            let broadcastParts = ["", "", "", ""];
            // convert in binary if it is cidr
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

            answerF2.innerText = "";
            let answerNetwork = "";
            let answerSubnet = "";
            let answerBroadcast = "\nBroadcast address : ";
            // converting the address in decimal
            for (let i = 0 ; i < netParts.length ; i++) {
                netParts[i] = convert(netParts[i], 2, 10);
                broadcastParts[i] = convert(broadcastParts[i], 2, 10);
                // we add a "." only if i < 3. Avoid : 255.255.255.255.
                answerNetwork += (i < 3) ? netParts[i] + "." : netParts[i];
                answerBroadcast += (i < 3) ? broadcastParts[i] + "." : broadcastParts[i];
            }

            // if we are subnetting, we need to do some changes
            if(subnetting) {
                // reseting the parts (as they have been used before but's it's not valid anymore)
                netParts = ["", "", "", ""];
                broadcastParts = ["", "", "", ""];
                // resetting the broadcast and network answers
                answerBroadcast = "\nBroadcast address : ";
                answerSubnet = "\nSubnet address : " + answerNetwork; /*By default, it calculates if there is no
                subnetting. In this case there is, so the value calculated for the network is in reality the subnetwork.*/
                answerNetwork = "\nNetwork address : ";

                // creating the correct mask
                let maskPartsClassfull = new Array(4);
                // we fill with 1s the bytes which needs to be filled
                for (let i = 0 ; i < byte ; i++) {
                    maskPartsClassfull[i] = "11111111";
                }
                // 0s for last byte(s)
                for (let i = byte ; i < 4; i++) {
                    maskPartsClassfull[i] = "00000000";
                }
                // recalculating the broadcast and net address with the right mask
                for (let i = 0 ; i < ipParts.length ; i++) {
                    for (let j = 0; j < ipParts[i].length; j++) {
                        if(maskPartsClassfull[i][j].localeCompare("1") == 0) {
                            broadcastParts[i] += ipParts[i][j];
                            netParts[i] += ipParts[i][j];
                        }
                        else {
                            broadcastParts[i] += "1";
                            netParts[i] += "0";
                        }
                    }
                    // we add a "." only if i < 3. Avoid : 255.255.255.255.
                    answerBroadcast += (i < 3) ? convert(broadcastParts[i], 2, 10) + "." : convert(broadcastParts[i], 2, 10);
                    answerNetwork += (i < 3) ? convert(netParts[i], 2, 10) + "." : convert(netParts[i], 2, 10);
                }
            }
            else {
                answerNetwork = "Network address : " + answerNetwork;
            }
            // displaying the answer on the screen
            answerF2.innerText += answerNetwork +  answerBroadcast + answerSubnet;
        } else answerF2.innerText = "The mask is not valid for this class.";
    // if the data are not valid
    } else {
        answerF2.innerText = "";
        if(!verifyIPAddress(ip, ipParts)) answerF2.innerText += "IP address is not valid.";
        if(!verifyMaskCIDR(mask)) answerF2.innerText += "\nMask is not valid.";
    }
}