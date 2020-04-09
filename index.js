// index.js

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
 */

/*
fetchCoordsByIP("209572", (error, data) => { // "184.64.188.193"
  console.log(error, data);
});
*/

/*
fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
   console.log(error, data);
});
*/