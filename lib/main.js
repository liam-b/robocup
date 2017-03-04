var ev3dev = require('ev3dev-lang');
var stdin = process.openStdin();

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
output.info('start', 'runtime version ' + output.cyan(version));
output.log('start', 'seting up');

var motors = new motor.DriveMotors('outA', 'outB', output);
var colorSensor = new sensor.ColorSensor('in1', output);
var ultrasonicSensor = new sensor.UltrasonicSensor('in2', output);
var compass = new sensor.CompassSensor('in4:i2c1', output);

output.log('start', 'checking connections');

motors.check();
colorSensor.check();
ultrasonicSensor.check();
compass.check();

output.log('start', 'setting modes');

colorSensor.mode(colorSensor.REFLECTIVE);
ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);

leds.color(leds.BLACK);

output.info('start', 'finished setup');

// setTimeout(function () {
//   output.info('test', 'hello');
//   setTimeout(function () {
//     output.warn('test', 'hello');
//     setTimeout(function () {
//       output.err('test', 'hello');
//     }, 1000);
//   }, 1000);
// }, 1000);

loop();

function loop () {
  output.trace('loop', output.cyan(compass.value()));
  setTimeout(loop, 2000);
}

stdin.addListener('data', function (text) {
  eval(text.toString().trim());
});