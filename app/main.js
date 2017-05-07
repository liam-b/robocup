process.on('uncaughtException', function (err) {
  output.error('Unhandled Error', 'Caught exception: ' + err + "\n" + err.stack);
});

var Logger = require('./log.js');
var constants = require('./constants.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');
var buttons = require('./io/buttons.js');
var position = require('./helper/position.js')

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));
position.init(output)

var version = 'alpha 0';
var speed = 0;

output.log('start', 'started');
output.info('start', 'runtime version ' + output.cyan(version));
constants.BOT_STATE = 'setup';
output.log('start', 'setting up');

var behavior = {
  'chase': require('./behavior/chase.js')
}

var bot = {
  'motors': new motor.DriveMotors('outC', 'outA', output),
  'kicker': new motor.Motor('outD', output),

  'colorSensor': new sensor.ColorSensor('in1', output),
  'ultrasonicSensor': new sensor.UltrasonicSensor('in2', output),
  'compass': new sensor.CompassSensor('in4:i2c1', output),
  'seeker': new sensor.SeekerSensor('in3:i2c8', output),

  'battery': new extra.PowerSupply(output)
}

output.info('start', 'checking connections');

bot.motors.check();
bot.colorSensor.check();
bot.ultrasonicSensor.check();
bot.compass.check();
bot.seeker.check();

bot.battery.check();

output.info('start', 'setting modes');

bot.colorSensor.mode(bot.colorSensor.REFLECTIVE);
bot.ultrasonicSensor.mode(bot.ultrasonicSensor.DISTANCE);
bot.seeker.mode(bot.seeker.MODULATED);

leds.color(leds.BLACK);

output.info('start', 'other setup');



buttons.event.pressed('up', function () {
  constants.BOT_STATE = 'role set';
  constants.ROLE = 'attack';
  output.log('start', 'bot set to play in attack');
  start();
});

buttons.event.pressed('down', function () {
  constants.BOT_STATE = 'role set';
  constants.ROLE = 'defend';
  output.log('start', 'bot set to play in defend');
  start();
});

buttons.event.pressed('enter', function () {
  constants.PAUSED = (constants.PAUSED) ? false : true;
  if (constants.PAUSED) output.log('interrupt', 'program paused');
  else output.log('interrupt', 'program resumed');
});

buttons.event.pressed('back', function () {
  constants.BOT_STATE = 'end';
  output.log('end', 'ending program');
  process.exit();
});

buttons.event.pressed('left', function () {
  if (constants.PAUSED){
    position.setRelativeNorth(bot.compass.value());
  }
});

constants.BOT_STATE = 'post_setup';
output.info('start', 'finished setup');

function start () {
  position.setRelativeNorth(bot.compass.value());
  output.log('set', 'relative north set');
  constants.BOT_STATE = 'looping';
  var loopInterval = setInterval(function () {
    if (!constants.PAUSED) loop();
  }, 10);
}

function loop () {
  behavior.chase(bot.motors, seeker.angle, seeker.distance, constants.CHASE_SPEED);
}
