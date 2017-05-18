var Logger = require('./log.js');
var constants = require('./constants.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');

var kick = require('./behavior/kick.js')

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

var motor = new motor.Motor('outD', output);
var sensor = new sensor.CompassSensor('in4:i2c1', output),

setInterval(function () {
  var values = sensor.value();
  if (values.distance >= 26 && values.distance <= 30 && values.angle == 7) kick.kick(motor);
}, 1000);