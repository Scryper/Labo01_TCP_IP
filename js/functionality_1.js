//get the button and the answer field
var btn = document.getElementById('send-f1');
var answerF1 = document.getElementById('answerF1');

//when you click on the button
btn.addEventListener('click', ipClass);

//return the class of an IP adress
function ipClass(){
    //get the IP adress
    let ip = document.getElementById('ip_adress-f1').value;

    //passed to the function by adress not by value
    let ipPart = new Array(4);

    if(verifyIPAdress(ip,ipPart)){
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
                            classIP="no class"
                        }
                    }
                }
            }
        }

        answerF1.innerText="IP adress : "+ip+"\nClass : " + classIP +"\nNumber of subnetwork : "+nbReseau +"\nNumber maximum of host per subnetwork : "+nbHote;
    }
    else{
        answerF1.innerText="The IP adress entered is incorrect."
    }
}




