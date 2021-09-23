//Création de la balise
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = '../js/ipVerificator.js' ;

//Ajout de la balise dans la page
console.log(document.body);
document.head.appendChild(js);

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}