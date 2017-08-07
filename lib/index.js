global.fs = require('fs');
global.file = require('./file.js');

global.Device = require('./device.js');

module.exports.motor = require('./motor.js');
module.exports.sensor = require('./sensor.js');
module.exports.extra = require('./extra.js');
module.exports.buttons = require('./buttons.js');