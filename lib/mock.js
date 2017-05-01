module.exports = {
  'Logger': function () {
    this.cyan = function (text) { return text; }
    this.trace = function (task, text) {}
    this.info = function (task, text) {}
    this.log = function (task, text) {}
    this.warn = function (task, text) {}
    this.err = function (task, text) {}
  },
  'LargeMotor': function (port) {
    this.connected = true;

    this.runForever = function (speed) {}
    this.stop = function () {}
  },
  'ColorSensor': function (port) {
    this.connected = true;

    this.getValue = function (id) {}
    this.setProperty = function (property, value) {}
  },
  'UltrasonicSensor': function (port) {
    this.connected = true;

    this.getValue = function (id) {}
    this.setProperty = function (property, value) {}
  },
  'Sensor': function (port, id) {
    this.connected = true;

    this.getValue = function (id) { return 5; }
    this.setProperty = function (property, value) {}
  }
}