import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/src/Leaflet.js';
import './css/styles.css';
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

import EventService from './js/event-service.js';
import buildMap from './js/map.js';

// Business LOGIC for event service

function preEventService(choice){
  let latitude = sessionStorage.getItem("latitude");
  let longitude = sessionStorage.getItem("longitude");

  if(choice === 1){
    sessionStorage.removeItem("pageNumber");
    sessionStorage.setItem("pageNumber", 1);
    
    getEventService(latitude,longitude, 1);
  } else if (choice === 2){
    let pageNum = parseInt(sessionStorage.getItem("pageNumber"));
    sessionStorage.setItem("pageNumber", pageNum + 1);
    getEventService(latitude,longitude, pageNum + 1);
  } else if (choice === 3){
    let pageNum = parseInt(sessionStorage.getItem("pageNumber"));
    if(pageNum >=2){
      pageNum -= 1;
    }
    sessionStorage.setItem("pageNumber", pageNum);
    getEventService(latitude,longitude, pageNum);
  }
}

async function getEventService(lat, long, pageNumber) {
  console.log(lat,long,pageNumber)
  const response = await EventService.getEventService(lat,long,pageNumber);
  
  if (response) {
    printEventElements(response);
  } else {
    printEventError(response);
  }
}

//business for map service
function handleMap()  {
  let map = L.map("map").setView([40, -95], 4); //sets default zoom when the webpage loads
  buildMap(map);

  map.addEventListener("dblclick", function(event)  {
    // Get coordinates of click
    let lat = event.latlng.lat;
    let lng = event.latlng.lng;
    sessionStorage.setItem("latitude", lat);
    sessionStorage.setItem("longitude", lng);

    // Adds a pin icon to the map when double clicked
    let pinLocation = event.latlng;
    let pinMarker = L.marker(pinLocation).addTo(map);
    pinMarker.bindPopup('Destination pinned at ' + pinLocation.toString()).openPopup();

    pinMarker.on('click',function(){
      map.removeLayer(pinMarker);
    });
  });
}

// UI LOGIC 
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

function clearEvents(){
  document.querySelector("#eventName").innerText= "";
  document.querySelector("#eventTime").innerText= "";
  document.querySelector("#eventPrice").innerText= "";
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

function handleSavedInfo(event){
  event.preventDefault();
  const location = document.querySelector("#location").value;
  const arrival = document.querySelector("#arrival-date").value;
  const departure = document.querySelector("#departure-date").value;
  const travelMode = document.querySelector("#travel-mode").value;
  const description = document.querySelector("#description").value;
  updateSummary(location,arrival,departure,travelMode,description);
}

function handleResetItinerary(event){
  event.preventDefault();
  const summaryDiv = document.querySelector("#destination-summary");
  const lastDestination = summaryDiv.lastChild;
  if (lastDestination) {
    summaryDiv.removeChild(lastDestination);
  }
}
  
function handleMapEvent(event){
  event.preventDefault();
  clearEvents();
  preEventService(1);
}

function handleNextPage(event){
  event.preventDefault();
  clearEvents();
  preEventService(2);
}

function handlePreviousPage(event){
  event.preventDefault();
  clearEvents();
  preEventService(3);
}

window.addEventListener("load", function() {
  handleMap();
  document.querySelector("#map").addEventListener("dblclick", handleMapEvent);
  document.querySelector("#saveInputtedInfo").addEventListener("click", handleSavedInfo);
  document.querySelector("#nextPage").addEventListener("click", handleNextPage);
  document.querySelector("#previousPage").addEventListener("click", handlePreviousPage);
  document.querySelector("#clearItinerary").addEventListener("click", handleResetItinerary);
});
