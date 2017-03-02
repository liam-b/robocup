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

var test = new ev3dev.ColorSensor('in1');
test.mode('COL-REFLECT');

output.info('start', 'finished setup');
loop();

function loop () {
  output.trace('loop', test.reflectedLightIntensity());
  setTimeout(loop, 1000);
}