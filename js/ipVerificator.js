let ip ="1.168.1.1";
let regex = "^([0-9]{1,3}\\.){3}[0-9]{1,3}$";


/* remove the "."'s and divide the IP adress into 4 parts */

//define an array
let ipPart = new Array(4);

//select all characters before the point
for (let i = 0; i < 3; i++) {
    ipPart[i] = ip.substring(0,ip.indexOf("."));
    ip=ip.substring(ip.indexOf(".")+1,ip.length);
}

//what is left is the last part of the IP
ipPart[3] = ip;

//boolean
let wrong=false;

//verify if each number is between 0 and 255 included
for(let i = 0; i < 3; i++){
    if(ipPart[i]<0||ipPart[i]>255){
        wrong=true;
    }
}

let classIP="";
let nbReseau=0;
let nbHote=0;


//Class A
if(ipPart[0]>0&&ipPart[0]<127){
    classIP="A";
    nbReseau=126;
    nbHote=16777214;
}
else{
    //Class B
    if(ipPart[0]>=128&&ipPart[0]<192){
        classIP="B";
        nbReseau=16384;
        nbHote=65534;
    }
    else{
        //Class C
        if(ipPart[0]>=192&&ipPart[0]<224){
            classIP="C";
            nbReseau=2097152;
            nbHote=254;
        }
        else{
            //Class D
            if(ipPart[0]>=224&&ipPart[0]<240){
                classIP="D";
            }
            else{
                //Class E
                if(ipPart[0]>=240&&ipPart[0]<248){
                    classIP="E";
                }
                else{
                    wrong=true;
                }
            }
        }
    }
}


if(wrong==true){
    console.log("IP incorrecte");
}
else{
    console.log(classIP + " " + nbHote + " " + nbReseau);
}





