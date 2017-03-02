var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');
var Leds = require('./leds.js');
var motor = require('./motor.js');

var output = new Logger();
var bot = new Bot();

var version = 'alpha 0'

output.log('start', 'started');
output.info('start', 'runtime version ' + version);
output.log('start', 'setup running...');

var motors = new motor.DriveMotors('outA', 'outB');
motors.check(output);

var leds = new Leds();
leds.green();

var test = new ev3dev.Sensor('in1');

output.info('start', 'finished setup');
loop();

function loop () {
  output.trace('loop', test.getValue(0) + '|' + test.getValue(1));
  setTimeout(loop, 1000);
}