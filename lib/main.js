var ev3dev = require('ev3dev-lang');
var chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

var Logger = require('./log.js');
var Bot = require('./bot.js');
var Leds = require('./leds.js');

var motor = require('./motor.js');
var sensor = require('./sensor.js');

var leds = new Leds();
var output = new Logger(leds);
var bot = new Bot();

var version = 'alpha 0'

output.log('start', 'started');
output.info('start', 'runtime version: ' + version);
output.log('start', 'seting up');

var motors = new motor.DriveMotors('outA', 'outB', output);
var colorSensor = new sensor.ColorSensor('in1', output);
var ultrasonicSensor = new sensor.UltrasonicSensor('in2', output);
var compass = new sensor.CompassSensor('in4:i2c1', output);

output.info('start', 'checking connections');

motors.check();
colorSensor.check();
ultrasonicSensor.check();
compass.check();

output.info('start', 'setting modes');

colorSensor.mode(colorSensor.REFLECTIVE);
ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);

output.info('start', 'finished setup');

loop();

function loop () {
  output.trace('loop', compass.value());
  setTimeout(loop, 300);
}