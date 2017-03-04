var ev3dev = require('ev3dev-lang');

module.exports.Leds = function () {
  this.group = new ev3dev.LEDGroup('ev3:left:green:ev3dev', 'ev3:left:red:ev3dev', 'ev3:right:green:ev3dev', 'ev3:right:red:ev3dev');

  this.BLACK = [0, 0, 0, 0];
  this.GREEN = [1, 0, 1, 0];
  this.ORANGE = [1, 1, 1, 1];
  this.RED = [0, 1, 0, 1];

  this.color = function (color) {
    this.group.setColor(color, 1);
  }

  this.color(this.BLACK);
}

module.exports.PowerSupply = function (output) {
  this.battery = new ev3dev.PowerSupply();
  this.output = output;

  this.charge = function () {
    return this.battery.measuredVoltage;
  }

  this.check = function () {
    this.output.trace('check', 'checking battery');
    (this.percentage() > 30) ? this.output.log('check', 'battery ok ' + output.cyan(this.percentage())) : this.output.warn('check', 'battery is low at ' + output.cyan(this.percentage()));
  }

  this.percentage = function () {
    return 100 * ((this.battery.measuredVoltage - this.battery.minVoltage) / (this.battery.maxVoltage - this.battery.minVoltage))
  }
}