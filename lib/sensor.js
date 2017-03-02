var ev3dev = require('ev3dev-lang');

module.exports.ColorSensor = function (port) {
  this.sensor = new ev3dev.ColorSensor(port);

  this.REFLECTIVE = 'COL-REFLECT';

  this.value = function () {
    return this.sensor.getValue(0);
  }

  this.mode = function (mode) {
    this.sensor.setProperty('mode', mode);
  }

  this.check = function (output) {
    output.log('check', 'checking color sensor');

    (this.sensor.connected) ? output.info('check', 'color sensor connected') : output.err('check', 'sensor sensor is not connected');
  }