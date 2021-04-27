
/*const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDqLOxjEOSotKDaYy3aiQXUdPwV79NPPlY&callback=initMap&libraries=&v=weekly"

//--------------------------------------//
<script defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqLOxjEOSotKDaYy3aiQXUdPwV79NPPlY&callback=initMap"></script>
</script>
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 <div class ="inputTemp">
      <form class="search_submit"id="search_submit"></form>

//________________________________________________________________
// key  google map  =AIzaSyDqLOxjEOSotKDaYy3aiQXUdPwV79NPPlY*/
// key  water open map  =200620ec785035814622c11a27a29932
//api.openweathermap.org/data/2.5/weather?id=2172797&appid=

//'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=200620ec785035814622c11a27a29932'
//---------------------------------------------//
// API contries 
//**  "https://restcountries.eu/rest/v2/all" */

"use strict";

//____________________________________________________________//
// API OPEN WEATHER 
var rest = -263;

var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var tempmax = document.querySelector('.tempmax');
var tempmin = document.querySelector('.tempmin');


var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=200620ec785035814622c11a27a29932')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];

  var tempmaxValue = data['main']['temp_max'];
  var tempminValue = data['main']['temp_min'];

  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Estado actual = "+descValue;
  temp.innerHTML = "Temperatura  =  °C "+tempValue;

  tempmax.innerHTML = "Temperatura Maxima =  °C "+tempmaxValue;
  tempmin.innerHTML = "Temperatura Minima =  °C "+tempminValue;

  input.value ="";

})

.catch(err => alert("Escriba nombre de una ciudad o Pais !"));
})



//______________________________________________________________________________//
// API GOOGLE MAPS

function initMap(){

  var options = {

      center: {lat: 38.3460 , lng:-0.4907 },
      zoom: 10
  }
      map = new google.maps.Map(document.getElementById("map"),options)

}



///////////////////////////////////////////////////////////////////////////////////////////////////////
// API  contries//

const countriesList = document.getElementById("countries");
let countries; 

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}


fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";


  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
  
  countriesList.innerHTML = options;
 
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);

  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
}


// ---------------------------------------------------------------------------//
// api COVID
//https://api.covid19api.com/summary // https://api.covid19api.com/world/total




fetch('https://api.covid19api.com/world/total')
.then((respuesta) => {
    return respuesta.json();
} ).then((respuesta) => {
    
    document.getElementById('TotalConfirmed').value = respuesta.TotalConfirmed;
    document.getElementById('TotalDeaths').value = respuesta.TotalDeaths;
    document.getElementById('TotalRecovered').value = respuesta.TotalDeaths;

    
})


let url = 'https://jsonplaceholder.typicode.com/users'
        fetch(url)
            .then(response => response.json())
            .then(data => mostrarData(data))
            .catch(error => console.log(error))
			
        const mostrarData = (data) => {
            console.log(data)
            let body = ''
            for (let i = 0; i<data.length; i++){
                body += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`                
            }
            document.getElementById('data').innerHTML = body
        }           