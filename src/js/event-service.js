export default class EventService {
  static async getEventService(latitude, longitude, pageNumber){
    let urlString = `https://api.seatgeek.com/2/events?client_id=${process.env.API_KEY}&range=12mi&sort=score.desc`;
    
    if (latitude != null && longitude != null){
      urlString = `https://api.seatgeek.com/2/events?client_id=${process.env.API_KEY}&range=12mi&sort=score.desc&lat=${latitude}&lon=${longitude}&page=${pageNumber}`;
    
    } else {
      urlString = `https://api.seatgeek.com/2/events?geoip=true&client_id=${process.env.API_KEY}`;
    }
    
    try{
      const response = await fetch(urlString);
      const jsoinifiedResponse = await response.json();

      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return jsoinifiedResponse;
    } catch(error){
      return error;
    }

  }
}