# _🏖Trip Planner🏖_

#### By _**Gareth Grindeland, Joseph Wahbeh, Marcus Kyung, and Qian Li**_

#### A web application to plan out travel destinations and to view popular events in the area.

## Technologies Used

* _HTML_
* _JavaScript_
* _Node.js version 16.13.1_
* _Webpack version 4.46.0_
* _Bootstrap version 5.2.3_
* _Leaflet version 1.9.3_
* _SeatGeek API version 2.0_


## Description

_This is a web application that uses Leaflet's open source map to plan vacation or trip destinations and the SeatGeek API to view popular nearby events. Users can pin a location on the interactive map to see the geocoordinates of a location as well as a list of concerts, sports games, and other popular events in the area. After filling out the submission form, the location information will be added to the trip itinerary displayed below. This project was built for Epicodus team week 7._

## Setup/Installation Requirements

* _Clone this repository to desired location_
* _Open your terminal_
* _Navigate to root directory of the cloned repository with your terminal_
* _Create new file named *".env"*_
* _Go to https://seatgeek.com/?next=%2Faccount%2Fdevelop#login_
* _Make an account_
* _Enter an app name and hit Register_
* _Copy the Client ID_
* _Open .env file paste in this line "API_KEY={xxx}" where {xxx} is replaced with Client ID from website_
* _Run the following commands in the terminal to install packages with npm:_
```
$ npm install
$ npm run build
$ npm run start
```
* _Alternatively, after installation and bundling, you can run the application by opening ./dist/index.html in the browser if you do not need the live server._
* _All source files are located in the ./src/ folder_

## Known Bugs

* _No known bugs as of 4/27/23_
* _SeetGeek's API only supports events in the US and Canada. While you can still pin locations in other countries, the webpage may not display any nearby events._

## License

MIT License

Copyright (c) 2023 Gareth Grindeland, Joseph Wahbeh, Marcus Kyung, and Qian Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
