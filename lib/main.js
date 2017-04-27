var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var constants = require('./constants.js');

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

var bot = {
  'motors': new motor.DriveMotors('outC', 'outA', output),
  'kicker': new motor.Motor('outD', output),

  'colorSensor': new sensor.ColorSensor('in1', output),
  'ultrasonicSensor': new sensor.UltrasonicSensor('in2', output),
  'compass': new sensor.CompassSensor('in4:i2c1', output),
  'seeker': new sensor.SeekerSensor('in3:i2c8', output),

  'battery': new extra.PowerSupply(output)
}

bot.output.info('start', 'checking connections');

bot.motors.check();
bot.colorSensor.check();
bot.ultrasonicSensor.check();
bot.compass.check();
bot.seeker.check();

bot.battery.check();

bot.output.info('start', 'setting modes');

bot.colorSensor.mode(colorSensor.REFLECTIVE);
bot.ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);
bot.seeker.mode(seeker.MODULATED);

bot.leds.color(leds.BLACK);

output.info('start', 'other setup');

var paused = false

// Set bot position
settingPosition = true;
buttons.event.pressed('up', function () {
  if (settingPosition) {
    settingPosition = false;
    playingPosition = 'attack';
    output.log('start', 'bot set to play in attack');
  }
});

buttons.event.pressed('down', function () {
  if (settingPosition) {
    settingPosition = false;
    playingPosition = 'defend';
    output.log('start', 'bot set to play in defence');
  }
});

while (settingPosition == true) {
  // no code necessary
}

output.info('start', 'finished setup');

var loopTimer = setInterval(loop, 10);

buttons.event.pressed('back', function () {
  clearInterval(loopTimer);
  output.log('end', 'program finished');
  process.exit();
});

buttons.event.pressed('enter', function () {
  paused = (paused) ? false : true;
  if (paused) {
    output.log('pause', 'program paused');
  } else {
    output.log('resume', 'program resumed');
  }
});

function loop () {
  if (paused != true) {
    behave.chase(motors, sensor.angle, sensor.distance, constants.CHASE_SPEED);
    console.log(compass.value());
  }
}
