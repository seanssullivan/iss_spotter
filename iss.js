// iss.js

const request = require('request');
const { IP_URL, COORDS_URL } = require('./constants');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(IP_URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode === 200 && body) {
      const ipAddress = JSON.parse(body).ip;
      callback(null, ipAddress);
    }

  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch latitude and longitude from JSON API
  const url = COORDS_URL + ip;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode === 200 && body) {
      const data = JSON.parse(body).data;
      const latitude = data["latitude"];
      const longitude = data["longitude"];
      callback(null, { latitude, longitude });
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const {latitude, longitude } = coords;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode === 200 && body) {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  });
};

/* const sampleFlyOvers = [
  { duration: 652, risetime: 1586475419 },
  { duration: 586, risetime: 1586481235 },
  { duration: 158, risetime: 1586487189 },
  { duration: 536, risetime: 1586541658 },
  { duration: 645, risetime: 1586547376 }
];

console.log(formatFlyOverResponse(sampleFlyOvers[1]));
 */
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  // Fetch public IP address
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, data);
        }
      });

    });

  });

}

module.exports = {
  nextISSTimesForMyLocation
};
