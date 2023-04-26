export default class EventService {
  static async getEventService(latitude, longitude){
    let urlString = `https://api.seatgeek.com/2/events?client_id=${process.env.API_KEY}&range=12mi&sort=score.desc`;
    
    if (latitude != null && longitude != null){
      urlString = `https://api.seatgeek.com/2/events?client_id=${process.env.API_KEY}&range=12mi&sort=score.desc&lat=${latitude}&lon=${longitude}`;
    
    } else {
      urlString = `https://api.seatgeek.com/2/events?geoip=true&client_id=${process.env.API_KEY}`;
    }
    
    try{
      const response = await fetch(urlString);
      const jsoinifiedResponse = await response.json();
      
      //https://api.seatgeek.com/2/events?geoip=94560&range=12mi&client_id=MzMyNjYyMjV8MTY4MjM1OTcyNC42MzUxOTk
      // MzMyNjYyMjV8MTY4MjM1OTcyNC42MzUxOTk - current api key

      // fetch for lat and longitutde
      // fetch(`https://api.seatgeek.com/2/events?lat=${lat}&lon=${long}&client_id=${process.env.API_KEY}`);

      // fetch for ip address
      // fetch(`https://api.seatgeek.com/2/events?geoip=true&client_id=${process.env.API_KEY}`);

      //fetch for postal code and range and score
      // fetch(`https://api.seatgeek.com/2/events?geoip=94560&range=12mi&sort=score.desc&client_id=${process.env.API_KEY}`);

      // https://api.seatgeek.com/2/events?geoip=94560&range=12mi&sort=datetime_local.desc&sort=score.desc&client_id=MzMyNjYyMjV8MTY4MjM1OTcyNC42MzUxOTk (by postal,range,datetime, and score)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return jsoinifiedResponse;
    } catch(error){
      return error;
    }

  }
}