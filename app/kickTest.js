var Logger = require('./log.js');
var constants = require('./constants.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');

var kick = require('./behavior/kick.js')

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

var motor = new motor.Motor('outD', output);

kick.reset(motor);
setTimeout(function () {
  kick.kick(motor);
}, 4000);