var ev3dev = require('ev3dev-lang');
var stdin = process.openStdin();

var Logger = require('./log.js');
var Bot = require('./bot.js');

var motor = require('./motor.js');
var sensor = require('./sensor.js');
var extra = require('./extra.js');

var leds = new extra.Leds();
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
var seeker = new sensor.SeekerSensor('in3:i2c8', output);

var battery = new extra.PowerSupply(output);

output.info('start', 'checking connections');

motors.check();
colorSensor.check();
ultrasonicSensor.check();
compass.check();
seeker.check();

battery.check();

output.info('start', 'setting modes');

colorSensor.mode(colorSensor.REFLECTIVE);
ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);
seeker.mode(seeker.UNMODULATED);

leds.color(leds.BLACK);

output.info('start', 'finished setup');

loop();

function loop () {
  console.log(seeker.value());
  setTimeout(loop, 300);
}

stdin.addListener('data', function (text) {
  try {
    eval(text.toString().trim());
  } catch (e) {
    output.err('data', 'error with eval: ' + e);
  }
});