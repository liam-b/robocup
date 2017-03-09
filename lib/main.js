var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');

var motor = require('./motor.js');
var sensor = require('./sensor.js');
var extra = require('./extra.js');

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
  setTimeout(loop, 100);
}

function chase (angle) {
  switch (angle) {
    case 2:
      motors.ratio(motors.FORWARD, 300)
      break;
    case 1:
      motors.ratio(motors.SLIGHT_LEFT, 300)
      break;
    case 0:
      motors.ratio(motors.HARD_LEFT, 300)
      break;
    case 3:
      motors.ratio(motors.SLIGHT_RIGHT, 300)
      break;
    case 4:
      motors.ratio(motors.HARD_RIGHT, 300)
      break;
  }
}
