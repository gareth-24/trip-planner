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

  document.querySelector('#showEventResponse').innerText = `The type in ${post} is ${response.events["0"].type}. Title ${response.events["0"].title}. The utc time of event is ${response.events["0"]["datetime_utc"]}. The average price for this event is $${response.events["0"].stats["average_price"]}. The link is ${response.events["0"].venue.url}.`;
}

// 4 events together, display each 
/*
events[0].type
events.0.title
events.0.datetime_utc
events.0.stats.average_price
events.0.url
first event type title
price datetime
url
*/

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