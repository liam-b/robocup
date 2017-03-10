var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');

var motor = require('./motor.js');
var sensor = require('./sensor.js');
var extra = require('./extra.js');

var dataLog = require('./behavior/dataLog.js');

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));
var bot = new Bot();

var version = 'alpha 0'
var speed = 0;

output.log('start', 'started');
output.info('start', 'runtime version ' + output.cyan(version));
output.log('start', 'seting up');

var motors = new motor.DriveMotors('outD', 'outA', output);
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

output.info('start', 'other setup');

var test = false;

output.info('start', 'finished setup');

loop();

function loop () {
  // if (test) {
  //   motors.run(10000, 10000);
  //   test = false;
  // } else {
  //   motors.stop();
  //   test = true;
  // }
  chase(seeker.value()[0]);
  output.trace('value', dataLog({
    direction: seeker.value()[0]
  }).direction);
  setTimeout(loop, 100);
}

function chase (angle) {
  switch (angle) {
    case 9:
      motors.ratio([1, -1], 300)
      break;
    case 8:
      motors.ratio([2, 0], 300)
      break;
    case 7:
      motors.ratio([1.5, 0.5], 300)
      break;
    case 6:
      motors.ratio([1.2, 0.8], 300)
      break;
    case 5:
      motors.ratio([1, 1], 300)
      break;
    case 4:
      motors.ratio([0.8, 1.2], 300)
      break;
    case 3:
      motors.ratio([0.5, 1.5], 300)
      break;
    case 2:
      motors.ratio([0, 2], 300)
      break;
    case 1:
      motors.ratio([-1, 1], 300)
      break;
    case 0:
      motors.stop()
      break;
  }
}
