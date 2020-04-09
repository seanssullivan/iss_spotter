// iss.js

const request = require('request');
const { IP_URL } = require('./constants');

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
  request(IP_URL, (err, resp, body) => {
    if (err) {
      callback(err, null);
    } if (resp.statusCode == 200 && body) {
      const obj = JSON.parse(body);
      const ipAddress = obj["ip"];
      callback(null, ipAddress);
    }
  })
}

module.exports = { fetchMyIP };
