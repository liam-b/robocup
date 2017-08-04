console.log('-----------\nusing mock!\n-----------');
module.exports = {
  'LargeMotor': function (port) {
    this.connected = true;

    this.runForever = function (speed) {};
    this.stop = function () {};
  },
  'ColorSensor': function (port) {
    this.connected = true;

    this.getValue = function (id) {};
    this.setProperty = function (property, value) {};
  },
  'UltrasonicSensor': function (port) {
    this.connected = true;

    this.getValue = function (id) {};
    this.setProperty = function (property, value) {};
  },
  'Sensor': function (port, id) {
    this.connected = true;

    this.getValue = function (id) {
      if (id == 0) return 5;
      else return 25;
    };
    this.setProperty = function (property, value) {};
  },
  'LEDGroup': function (l1, r1, l2, r2) {
    this.connected = true;

    this.setColor = function (color, num) {};
  },
  'PowerSupply': function (l1, r1, l2, r2) {
    this.connected = true;

    this.measuredVoltage = 8;
    this.minVoltage = 6;
    this.maxVoltage = 8;
  }
};
