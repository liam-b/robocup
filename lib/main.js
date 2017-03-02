var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');
var Leds = require('./leds.js');

var motor = require('./motor.js');
var sensor = require('./sensor.js');

var output = new Logger();
var bot = new Bot();

var version = 'alpha 0'

output.log('start', 'started');
output.info('start', 'runtime version ' + version);
output.log('start', 'seting up');

var leds = new Leds();
var motors = new motor.DriveMotors('outA', 'outB');
var colorSensor = new sensor.ColorSensor('in1');
colorSensor.mode(colorSensor.REFLECTIVE)

output.log('start', 'checking')

leds.green();
motors.check(output);
colorSensor.check(output);

output.info('start', 'finished setup');
loop();

function loop () {
  output.trace('loop', colorSensor.value());
  setTimeout(loop, 300);
}