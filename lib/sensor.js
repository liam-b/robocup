var ev3dev = require('ev3dev-lang');

module.exports.ColorSensor = function (port, output) {
  this.sensor = new ev3dev.ColorSensor(port);
  this.output = output;

  this.REFLECTIVE = 'COL-REFLECT';

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'color sensor has been disconnected');
  }

  this.mode = function (mode) {
    this.output.log('mode', 'changing color sensor mode to ' + output.cyan(mode));
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'color sensor is not connected');
  }

  this.check = function () {
    this.output.trace('check', 'checking color sensor');
    (this.sensor.connected) ? this.output.log('check', 'color sensor connected') : this.output.err('check', 'color sensor is not connected');
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
    this.output.log('mode', 'changing ultrasonic sensor mode to ' + output.cyan(mode));
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'ultrasonic sensor is not connected');
  }

  this.check = function () {
    this.output.trace('check', 'checking ultrasonic sensor');
    (this.sensor.connected) ? this.output.log('check', 'ultrasonic sensor connected') : this.output.err('check', 'ultrasonic sensor is not connected');
  }
}

module.exports.CompassSensor = function (port, output) {
  this.sensor = new ev3dev.Sensor(port, 'ht-nxt-compass');
  this.output = output;

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'compass has been disconnected');
  }

  this.check = function () {
    this.output.trace('check', 'checking compass');
    (this.sensor.connected) ? this.output.log('check', 'compass connected') : this.output.err('check', 'compass is not connected');
  }
}

module.exports.SeekerSensor = function (port, output) {
  this.sensor = new ev3dev.Sensor(port, 'ht-nxt-ir-seek-v2');
  this.output = output;

  this.UNMODULATED = 'DC-ALL';
  this.MODULATED = 'AC-ALL';

  this.direction = {
    FAR_RIGHT: 0,
    RIGHT: 1,
    CENTER: 2,
    LEFT: 3,
    FAR_LEFT: 4
  }

  this.value = function () {
    return (this.sensor.connected) ? [this._direction(), this._average()] : this.output.warn('value', 'seeker has been disconnected');
  }

  this.mode = function (mode) {
    this.output.log('mode', 'changing seeker mode to ' + output.cyan(mode));
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'seeker is not connected');
  }

  this.check = function () {
    this.output.trace('check', 'checking seeker');
    (this.sensor.connected) ? this.output.log('check', 'seeker connected') : this.output.err('check', 'seeker is not connected');
  }

  this._average = function () {
    return (this.sensor.getValue(1) + this.sensor.getValue(2) + this.sensor.getValue(3) + this.sensor.getValue(4) + this.sensor.getValue(5)) / 5;
  }

  this._direction = function () {
    var arr = [this.sensor.getValue(1), this.sensor.getValue(2), this.sensor.getValue(3), this.sensor.getValue(4), this.sensor.getValue(5)];
    return arr.indexOf(Math.max.apply(null, arr));
  }
}