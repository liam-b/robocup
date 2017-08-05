global.fs = require('fs');
global.file = require('./file.js');

global.Device = require('./device.js');

var motor = require('./motor.js');
var sensor = require('./sensor.js');

function errorHandler (err) {
  console.log(err.code);
  console.log(err.stack);
  process.exit(1);
}

// var drive = new motor.Drive(file.port.OUT_C, file.port.OUT_B, errorHandler);
//
// drive.run(200);
//
// setTimeout(function () {
//   drive.stop();
// }, 1000);

var compass = new sensor.Compass(file.port.IN_4);
var seeker = new sensor.IRSeeker(file.port.IN_3);

seeker.mode(seeker.DC_ALL);

console.log(compass.rotation());
console.log(seeker.angle());