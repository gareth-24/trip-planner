export default class EventService {
  static async getEventService(postal){
    try{
      const response = await fetch(`https://api.seatgeek.com/2/events?geoip=${postal}&range=12mi&sort=score.desc&client_id=${process.env.API_KEY}`)
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