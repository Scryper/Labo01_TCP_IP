//get the button and the answer field
var btn = document.getElementById('send-f3');

//when you click on the button
btn.addEventListener('click', subnetContained);

function subnetContained(){
    //get the IP adress
    let ip = document.getElementById('ip_adress-f3').value;
    let mask = document.getElementById('mask-f3').value;
    let net = document.getElementById('net_adress-f3').value;

    let ipPart = new Array(4);
    let netPart = new Array(4);

    if(verifyMask(mask)&&verifyIPAdress(ip,ipPart)&&verifyIPAdress(net,netPart)){
        //verify if there is a "/" in the mask
        if(mask.substring(0,1)=="\/"){
            mask=mask.substring(1,mask.length);
        }

        //transform the IPs into binaries number
        for(let i=0;i<4;i++){
            ipPart[i]=addZeros(intoBinaries(ipPart[i]));
            netPart[i]=addZeros(intoBinaries(netPart[i]));
        }

        //determine the mask of the net
        let octet=0;
        let chiffre=0;
        let done = false;

        //on parcourt les octets a l'envers
        for(let i=3;i>=0;i--){
            //on parcourt chaque octet a l'envers pour savoir quel est le premier bit a 1
            for(let j=7;j>=0;j--){
                if(netPart[i].substring(j,j+1)!=0){
                    octet = i+1;
                    chiffre = j+1;
                    done = true;
                    break;
                }
            }
            if(done==true){
                break;
            }
        }

        netMask = 8*(octet-1) + chiffre;

        //si les deux masques sont les mêmes
        if(netMask==mask){
            console.log("meme masque");

            //on parcourt chaque bit du masque pour le comparer avec celui de l'IP
            //s'ils sont semblable, les IP sont dans le même sous réseau

            let different = false;
            for(let i=0;i<octet;i++){
                if(i+1==octet){
                    for(let j = 0;j<chiffre;j++){
                        if(netPart[i].substring(j,j+1)!=ipPart[i].substring(j,j+1)){
                            different = true;
                        }
                    }
                }
                else{
                    for(let j = 0;j<8;j++){
                        if(netPart[i].substring(j,j+1)!=ipPart[i].substring(j,j+1)){
                            different = true;
                        }
                    }
                }
            }
            if(different){
                console.log("different reseau");
            }
            else{
                console.log("meme reseau");
            }

        }
        else{
            console.log("masque different");
        }
        /*
        console.log(netPart);
        console.log(octet);
        console.log(chiffre);
        console.log(netMask);*/




    }
    else{
        //faire cas par cas pour les erreurs
    }

}

function addZeros(number) {
    while (number.length < 8) number = "0" + number;
    return number;
}

function intoBinaries(number){
    return parseInt(number,10).toString(2);
}

