// making a map and tiles for the map
//initially the view of the map is set to 0 lat and long, with zoom factor of 2.

const mymap = L.map('map').setView([0, 0], 2);

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tiles = L.tileLayer(tileURL, {attribution});

tiles.addTo(mymap); 



// creating an icon for the marker
//iss is set as the custom icon for the marker, which is then displayed at 0 lat and long, until fetchLocation() is executed

const issIcon = L.icon({
    iconUrl: './resources/iss_img.png',
    iconSize: [50, 30],
    iconAnchor: [25, 15]
});

const marker = L.marker([0, 0], { icon: issIcon}).addTo(mymap);


//function to fetch api, and insert via DOM, all necessary details. marker and map view is also moved from default 0 lat long to whatever is fetched
// from the API.

var api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function fetchLocation(){
    
    var data = await fetch(api_url);

    var details = await data.json();

    const {latitude, longitude, visibility, altitude, velocity} = details;

    
    marker.setLatLng([latitude, longitude]);
    
    if(firstTime){
    mymap.setView([latitude, longitude],3);
    firstTime = false;
    }

    document.getElementById("lat").innerHTML = `${latitude.toFixed(6)}°`;    
    document.getElementById("long").innerHTML = `${longitude.toFixed(6)}°`;
    document.getElementById("timeofday").innerHTML = `${visibility} area`;
    document.getElementById("altitude").innerHTML = `${Math.round(altitude)} km`;
    document.getElementById("velocity").innerHTML = `${Math.round(velocity)} km/h`;
};

setInterval(fetchLocation, 2000);



