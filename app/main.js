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
  'motors': new motor.DriveMotors('outB', 'outA', output),
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
  if (constants.PAUSED) {
    bot.motors.stop();
    bot.kicker.stop();
    output.log('interrupt', 'program paused');
  }
  else output.log('interrupt', 'program resumed');
});

buttons.event.pressed('back', function () {
  constants.BOT_STATE = 'end';
  output.log('end', 'ending program');
  quit();
});

buttons.event.pressed('left', function () {
  if (constants.PAUSED) position.setRelativeNorth(bot.compass.value());
});

constants.BOT_STATE = 'post_setup';
output.info('start', 'finished setup');

function start () {
  position.setRelativeNorth(bot.compass.value());
  bot.motors.run(100, 100);

  constants.BOT_STATE = 'looping';
  var loopInterval = setInterval(function () {
    if (!constants.PAUSED) loop();
  }, 50);
}

function loop () {
  var seekerValues = bot.seeker.value();
  console.log(seekerValues);
  behavior.chase(bot.motors, seekerValues.angle, seekerValues.distance, constants.CHASE_SPEED);
}

function quit () {
  bot.motors.stop()
  bot.kicker.stop()
  process.exit()
}

// The below code handles exiting the program
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.exit) quit();
    // if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
}
 
//do something when app is closing
process.on('exit', exitHandler.bind(null));
 
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
 
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null));
