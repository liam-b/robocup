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
var ultrasonicSensor = new sensor.UltrasonicSensor('in2');

output.log('start', 'checking connections');

leds.green();
motors.check(output);
colorSensor.check(output);
ultrasonicSensor.check(output);

output.log('start', 'setting modes');

colorSensor.mode(colorSensor.REFLECTIVE);
ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);

output.log('start', 'finished setup');

loop();

function loop () {
  output.trace('loop', ultrasonicSensor.value());
  setTimeout(loop, 300);
}