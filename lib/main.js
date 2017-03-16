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
seeker.mode(seeker.MODULATED);

leds.color(leds.BLACK);

output.info('start', 'other setup');

var test = false;

output.info('start', 'finished setup');

var speed = 600;
var inc = 0;

loop();

function loop () {
  // if (test) {
  //   motors.run(10000, 10000);
  //   test = false;
  // } else {
  //   motors.stop();
  //   test = true;
  // }
  chase(seeker.value()[0], seeker.value()[1]);
  console.log(seeker.value()[1]);
  // output.trace('value', '\n' + dataLog({
  //   direction: seeker.value()[0],
  //   distance: seeker.value()[1]
  // }).ball);
  // output.trace('value', seeker.value()[0] + ' | ' + (10 - Math.floor(seeker.value()[1] / 5)));

  // output.trace('value', 'dir: ' + seeker.value()[0] + ', dist: ' + Math.floor(1 / seeker.value()[1] * 100) + ', rot: ' + compass.value());

  setTimeout(loop, 10);
}

function chase (angle, distance) {
  switch (angle) {
    case 9:
      motors.ratio([1, -1], speed);
      break;
    case 8:
      motors.ratio([2, 0], speed);
      break;
    case 7:
      motors.ratio([1.5, 0.5], speed);
      break;
    case 6:
      motors.ratio([1.2, 0.8], speed);
      break;
    case 5:
      motors.ratio([1, 1], speed);
      break;
    case 4:
      motors.ratio([0.8, 1.2], speed);
      break;
    case 3:
      motors.ratio([0.5, 1.5], speed);
      break;
    case 2:
      motors.ratio([0, 2], speed);
      break;
    case 1:
      motors.ratio([-1, 1], speed);
      break;
    case 0:
      inc += 1;
      break;
  }

  if (distance > 60) {
    motors.ratio([1, 1], speed);
  }

  if (angle != 0) {
    inc = 0;
  }

  if (inc >= 14) {
    motors.stop();
    process.exit();
  }

  if (inc >= 7) {
    motors.ratio([-1, 1], 300);
  }
}