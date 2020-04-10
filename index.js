// index.js

const { nextISSTimesForMyLocation } = require('./iss');

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

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  for (const time of data) {
    console.log(printFlyOverResponse(time));
}
});


/**
 * Formats the timestamp and duration information returned from the API.
 * Input:
 * - An object with keys 'duration' and 'risetime'
 * Returns:
 * - A formated string:
 *   example: Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
 */
const printFlyOverResponse = function(passoverTime) {
  const { duration, risetime } = passoverTime;
  const flyOverDate = new Date(risetime * 1000);
  const flyOverDateString = flyOverDate.toString();
  // console.log(flyOverDateString);

  const formattedString = `Next pass at ${flyOverDateString} for ${duration} seconds!`;
  return formattedString;
};
