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

var drive = new motor.Drive(file.port.OUT_C, file.port.OUT_B, errorHandler);

drive.run(200);

setTimeout(function () {
  drive.stop();
}, 2000);