

var api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

var issLocation = async function fetching(){
    
    var data = await fetch(api_url);

    var details = await data.json();

    const {latitude, longitude, visibility, altitude, velocity} = details;

    

    document.getElementById("lat").innerText = latitude.toFixed(4);    
    document.getElementById("long").innerText = longitude.toFixed(4);
    document.getElementById("timeofday").innerText = `${visibility} area`;
    document.getElementById("altitude").innerText = `${Math.round(altitude)} km`;
    document.getElementById("velocity").innerText = `${Math.round(velocity)} km/h`;
};

setInterval(issLocation, 3000);



