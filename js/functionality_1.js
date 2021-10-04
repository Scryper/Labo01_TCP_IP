//get the button and the answer field
var btn = document.getElementById('send-f1');
var answerF1 = document.getElementById('answer-f1');

//when you click on the button
btn.addEventListener('click', ipClass);

//return the class of an IP address
function ipClass() {
    //get the IP address
    let ip = document.getElementById('ip_address-f1').value;
    //passed to the function by address not by value
    let ipPart = new Array(4);

    // verify the validity of the fields' content
    if(verifyIPAddress(ip, ipPart)) {
        let classIP;
        let netNb = 0;
        let hostsNb = 0;

        // determinates the information about the class of the IP address entered
        //Class A
        if(ipPart[0] > 0 && ipPart[0] < 127){
            classIP = "A";
            netNb = 126;
            hostsNb = 16777214;
        }
        else if(ipPart[0] >= 128 && ipPart[0] < 192) {
            classIP = "B";
            netNb = 16384;
            hostsNb = 65534;
        }
        else if(ipPart[0] >= 192 && ipPart[0] < 224) {
            classIP = "C";
            netNb = 2097152;
            hostsNb = 254;
        }
        else if(ipPart[0] >= 224 && ipPart[0] < 240) {
            classIP = "D";
        }
        else if(ipPart[0] >= 240 && ipPart[0] < 248) {
            classIP = "E";
        }
        else {
            classIP = "No class"
        }
        answerF1.innerText = "IP address : " + ip + "\nClass : " + classIP + "\nNumber of subnetwork : " + netNb +
            "\nNumber maximum of hosts per subnetwork : " + hostsNb;
    }
    // if the information is note valid
    else {
        answerF1.innerText = "The IP address entered is incorrect."
    }
}