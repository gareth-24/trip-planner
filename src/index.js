import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/src/Leaflet.js';
import './css/styles.css';

import EventService from './js/event-service.js';
import buildMap from './js/map.js';


// buisness for event service
async function getEventService(post) {
  const response = await EventService.getEventService(post);
  if (response) {
    printEventElements(response, post);
  } else {
    printEventError(response, post);
  }
}

//business for map service

function handleMap()  {
  let mymap = L.map("map").setView([45.519859, -122.677803], 13);

  buildMap(mymap);
}

// ui 
function printEventElements(response, post) { 

  response.events.forEach(function(key){
    let event = document.createElement("li");
    event.innerText = `${key.title}`;
    document.querySelector("#eventName").append(event);

    let event1 = document.createElement("li");
    event1.innerText = `${key["datetime_utc"]}`;
    document.querySelector("#eventTime").append(event1);

    let event2 = document.createElement("li");
    event2.innerText = `$${key.stats["average_price"]}`;
    document.querySelector("#eventPrice").append(event2);

    let event3 = document.createElement("li");
    let URLlink = document.createElement("a");
    URLlink.setAttribute("href",key.venue.url);
    URLlink.innerText = key.venue.url;
    event3.append(URLlink);
    document.querySelector("#eventURL").append(event3);
  })  
}

function printEventError(error, post) {
  document.querySelector('#showEventResponse').innerText = `There was an error accessing the data for ${post}: 
  ${error}.`;
}

function handleFormSubmission(event){
  event.preventDefault();
  const post = document.querySelector("#postal").value;
  getEventService(post);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
  handleMap();
});