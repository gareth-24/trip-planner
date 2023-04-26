import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/src/Leaflet.js';
import './css/styles.css';
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

import EventService from './js/event-service.js';
import buildMap from './js/map.js';

// buisness for event service
async function getEventService(lat, long) {
  const response = await EventService.getEventService(lat,long);
  if (response) {
    printEventElements(response);
  } else {
    printEventError(response);
  }
}

//business for map service
function handleMap()  {

  let map = L.map("map").setView([40, -95], 5); //sets default zoom when the webpage loads
  buildMap(map);

  map.addEventListener("dblclick", function(event)  {
    // Get coordinates of click
    let lat = event.latlng.lat;
    let lng = event.latlng.lng;
    console.log(lat, lng);
    sessionStorage.setItem("latitude", lat);
    sessionStorage.setItem("longitude", lng);

    // Adds a pin icon to the map when double clicked
    let pinLocation = event.latlng;
    let pinMarker = L.marker(pinLocation).addTo(map);
    pinMarker.bindPopup('You clicked the map at ' + pinLocation.toString()).openPopup();

    pinMarker.on('click',function(){
      map.removeLayer(pinMarker);
    });
  });
}

// ui 
function printEventElements(response) { 

  response.events.forEach(function(key){
    let eventLink = document.createElement("li");
    let URLlink = document.createElement("a");
    URLlink.setAttribute("href",key.venue.url);
    URLlink.innerText = `${key.title}`;
    eventLink.append(URLlink);
    document.querySelector("#eventName").append(eventLink);

    let eventTime = document.createElement("li");
    eventTime.innerText = `${key["datetime_utc"]}`;
    document.querySelector("#eventTime").append(eventTime);

    let eventPrice = document.createElement("li");
    eventPrice.innerText = `$${key.stats["average_price"]}`;
    document.querySelector("#eventPrice").append(eventPrice);
  });  
}

function printEventError(error) {
  document.querySelector('#showEventResponse').innerText = `There was an error accessing the data: 
  ${error}.`;
}

function updateSummary(location,arrival,departure,travelMode,description)  {
  const summaryDiv = document.querySelector("#destination-summary");

  const newDestination = document.createElement("li");
  newDestination.append(location);
  const newInfo = document.createElement("ul");
    const newArrival = document.createElement("li");
    newArrival.append("Arrival Date: " + (arrival.toString()));
    newInfo.append(newArrival);
    const newDeparture = document.createElement("li");
    newDeparture.append("Departure Date: " + (departure.toString()));
    newInfo.append(newDeparture);
    const newTravelMode = document.createElement("li");
    newTravelMode.append("Method of travel: " + travelMode);
    newInfo.append(newTravelMode);
    const newDescription = document.createElement("li");
    newDescription.append(description);
    newInfo.append(newDescription);
  
  newDestination.append(newInfo);
  summaryDiv.append(newDestination);
}

function handleFormSubmission(event){
  event.preventDefault();
  const location = document.querySelector("#location").value;
  const arrival = document.querySelector("#arrival-date").value;
  const departure = document.querySelector("#departure-date").value;
  const travelMode = document.querySelector("#travel-mode").value;
  const description = document.querySelector("#description").value;
  console.log(location, arrival, departure, travelMode, description); //check form inputs
  updateSummary(location,arrival,departure,travelMode,description);

  let latitude = sessionStorage.getItem("latitude");
  let longitude = sessionStorage.getItem("longitude");
  getEventService(latitude,longitude)
  sessionStorage.removeItem("latitude");
  sessionStorage.removeItem("longitude");

}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
  handleMap();
});