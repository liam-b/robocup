var Logger = require('./log.js');
var constants = require('./constants.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');

var kick = require('./behavior/kick.js')

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

var motor = new motor.Motor('outD', output);
var sensor = new sensor.SeekerSensor('in3:i2c8', output);

sensor.mode(sensor.MODULATED);

setInterval(function () {
  var values = sensor.value();
  console.log(values);
  if (values.distance >= 30 && values.angle >= 5 && values.angle <= 6) kick.kick(motor);
}, 500);