var ev3dev = require('ev3dev-lang');

module.exports.ColorSensor = function (port, output) {
  this.sensor = new ev3dev.ColorSensor(port);
  this.output = output;

  this.REFLECTIVE = 'COL-REFLECT';

  this.value = function () {
    if (this.sensor.connected) {
      return this.sensor.getValue(0);
    }
  }

  this.mode = function (mode) {
    this.output.log('mode', 'changing color sensor mode to: ' + mode);
    if (this._checkConnected()) {
      this.sensor.setProperty('mode', mode);
    }
  }

  this.check = function () {
    this.output.log('check', 'checking color sensor');
    this._checkConnected(output);
  }

  this._checkConnected = function (info) {
    if (typeof info == 'boolean') (this.sensor.connected) ? this.output.info('check', 'color sensor connected') : this.output.err('check', 'color sensor is not connected');
    else (this.sensor.connected) ? this.output.log('check', 'color sensor connected') : this.output.err('check', 'color sensor is not connected');
    return this.sensor.connected;
  }
}

module.exports.UltrasonicSensor = function (port, output) {
  this.sensor = new ev3dev.UltrasonicSensor(port);
  this.output = output;

  this.DISTANCE = 'US-DIST-CM';

  this.value = function () {
    if (this.sensor.connected) {
      return this.sensor.getValue(0);
    }
  }

  this.mode = function (mode) {
    this.output.log('mode', 'changing ultrasonic sensor mode to: ' + mode);
    if (this._checkConnected()) {
      this.sensor.setProperty('mode', mode);
    }
  }

  this.check = function () {
    this.output.log('check', 'checking ultrasonic sensor');
    this._checkConnected(output);
  }

  this._checkConnected = function () {
    if (typeof info == 'boolean') (this.sensor.connected) ? this.output.info('check', 'ultrasonic sensor connected') : this.output.err('check', 'ultrasonic sensor is not connected');
    else (this.sensor.connected) ? this.output.log('check', 'ultrasonic sensor connected') : this.output.err('check', 'ultrasonic sensor is not connected');
    return this.sensor.connected;
  }
}