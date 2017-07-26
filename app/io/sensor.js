try { var ev3dev = require('ev3dev-lang'); }
catch (e) { var ev3dev = require('../mock.js'); }

module.exports.ColorSensor = function (port, output) {
  this.sensor = new ev3dev.ColorSensor(port);
  this.output = (typeof output != 'undefined') ? output : new ev3dev.Logger();

  this.REFLECTIVE = 'COL-REFLECT';

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'color sensor has been disconnected');
  };

  this.mode = function (mode) {
    this.output.debug('mode', 'changing color sensor mode to ' + mode);
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'color sensor is not connected');
  };

  this.check = function () {
    this.output.trace('check', 'checking color sensor');
    (this.sensor.connected) ? this.output.debug('check', 'color sensor connected') : this.output.err('check', 'color sensor is not connected');
  };
};

module.exports.UltrasonicSensor = function (port, output) {
  this.sensor = new ev3dev.UltrasonicSensor(port);
  this.output = (typeof output != 'undefined') ? output : new ev3dev.Logger();

  this.DISTANCE = 'US-DIST-CM';

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'ultrasonic sensor has been disconnected');
  };

  this.mode = function (mode) {
    this.output.debug('mode', 'changing ultrasonic sensor mode to ' + mode);
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'ultrasonic sensor is not connected');
  };

  this.check = function () {
    this.output.trace('check', 'checking ultrasonic sensor');
    (this.sensor.connected) ? this.output.debug('check', 'ultrasonic sensor connected') : this.output.err('check', 'ultrasonic sensor is not connected');
  };
};

module.exports.CompassSensor = function (port, output) {
  this.sensor = new ev3dev.Sensor(port, 'ht-nxt-compass');
  this.output = (typeof output != 'undefined') ? output : new ev3dev.Logger();

  this.value = function () {
    return (this.sensor.connected) ? this.sensor.getValue(0) : this.output.warn('value', 'compass has been disconnected');
  };

  this.check = function () {
    this.output.trace('check', 'checking compass');
    (this.sensor.connected) ? this.output.debug('check', 'compass connected') : this.output.err('check', 'compass is not connected');
  };
};

module.exports.SeekerSensor = function (port, output) {
  this.sensor = new ev3dev.Sensor(port, 'ht-nxt-ir-seek-v2');
  this.output = (typeof output != 'undefined') ? output : new ev3dev.Logger();

  this.UNMODULATED = 'DC-ALL';
  this.MODULATED = 'AC-ALL';

  this.direction = {
    FAR_RIGHT: 1,
    RIGHT: 2,
    CENTER: 3,
    LEFT: 4,
    FAR_LEFT: 5,
  };

  this.value = function () {
    return (this.sensor.connected) ? {'angle': this.sensor.getValue(0), 'distance': this._average()} : this.output.warn('value', 'seeker has been disconnected');
  };

  this.mode = function (mode) {
    this.output.debug('mode', 'changing seeker mode to ' + mode);
    (this.sensor.connected) ? this.sensor.setProperty('mode', mode) : this.output.err('mode', 'seeker is not connected');
  };

  this.check = function () {
    this.output.trace('check', 'checking seeker');
    (this.sensor.connected) ? this.output.debug('check', 'seeker connected') : this.output.err('check', 'seeker is not connected');
  };

  this._average = function () {
    return (this.sensor.getValue(1) + this.sensor.getValue(2) + this.sensor.getValue(3) + this.sensor.getValue(4) + this.sensor.getValue(5)) / 5;
  };
};