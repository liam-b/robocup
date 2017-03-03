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
output.info('start', 'runtime version: ' + version);
output.log('start', 'seting up');

var leds = new Leds();
var motors = new motor.DriveMotors('outA', 'outB', output);
var colorSensor = new sensor.ColorSensor('in1', output);
var ultrasonicSensor = new sensor.UltrasonicSensor('in2', output);

var test = new ev3dev.I2CSensor('in4', ['ht-nxt-compass']);

output.info('start', 'checking connections');

motors.check();
colorSensor.check();
ultrasonicSensor.check();

output.info('start', 'setting modes');

leds.green();
colorSensor.mode(colorSensor.REFLECTIVE);
ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);

output.info('start', 'finished setup');

loop();

function loop () {
  // output.trace('loop', ultrasonicSensor.value());
  output.trace('loop', test.getValue(0));
  setTimeout(loop, 300);
}