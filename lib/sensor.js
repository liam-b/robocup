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

    (this.sensor.connected) ? output.info('check', 'color sensor connected') : output.err('check', 'color sensor is not connected');
  }
}

module.exports.UltrasonicSensor = function (port) {
  this.sensor = new ev3dev.UltrasonicSensor(port);

  this.DISTANCE = 'US-DIST-CM';

  this.value = function () {
    return this.sensor.getValue(0);
  }

  this.mode = function (mode) {
    this.sensor.setProperty('mode', mode);
  }

  this.check = function (output) {
    output.log('check', 'checking ultrasonic sensor');

    (this.sensor.connected) ? output.info('check', 'ultrasonic sensor connected') : output.err('check', 'ultrasonic sensor is not connected');
  }
}