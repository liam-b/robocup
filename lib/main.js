var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var bot = require('./bot.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');
var buttons = require('./io/buttons.js');

var behave = {
  'chase': require('./behavior/chase.js')
}

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

var version = 'alpha 0';
var speed = 0;

output.log('start', 'started');
output.info('start', 'runtime version ' + output.cyan(version));
output.log('start', 'seting up');

var motors = new motor.DriveMotors('outC', 'outA', output);
var kicker = new motor.Motor('outD', output);

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

var paused = false

output.info('start', 'finished setup');

var loopTimer = setInterval(loop, 10);

buttons.event.pressed('back', function () {
  clearInterval(loopTimer);
  output.log('end', 'program finished');
  process.exit();
})

buttons.event.pressed('enter', function () {
  paused = (paused) ? true : false;
  if (paused) {
    output.log('pause', 'program paused');
  } else {
    output.log('resume', 'program resumed');
  }
})

function loop () {
  if (paused != true) {
    behave.chase(motors, sensor.angle, sensor.distance, bot.CHASE_SPEED);
    console.log(compass.value());
  }
}
