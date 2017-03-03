var ev3dev = require('ev3dev-lang');

module.exports.ColorSensor = function (port, output) {
  this.sensor = new ev3dev.ColorSensor(port);
  this.output = output;

  this.REFLECTIVE = 'COL-REFLECT';

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'color sensor has been disconnected');
  }

  this.mode = function (mode) {
    this.output.log('mode', 'changing color sensor mode to: ' + mode);
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'color sensor is not connected');
  }

  this.check = function () {
    this.output.log('check', 'checking color sensor');
    (this.sensor.connected) ? this.output.info('check', 'color sensor connected') : this.output.err('check', 'color sensor is not connected');
  }
}

module.exports.UltrasonicSensor = function (port, output) {
  this.sensor = new ev3dev.UltrasonicSensor(port);
  this.output = output;

  this.DISTANCE = 'US-DIST-CM';

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'ultrasonic sensor has been disconnected');
  }

  this.mode = function (mode) {
    this.output.log('mode', 'changing ultrasonic sensor mode to: ' + mode);
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'ultrasonic sensor is not connected');
  }

  this.check = function () {
    this.output.log('check', 'checking ultrasonic sensor');
    (this.sensor.connected) ? this.output.info('check', 'ultrasonic sensor connected') : this.output.err('check', 'ultrasonic sensor is not connected');
  }
}