var Logger = require('./log.js');
var constants = require('./constants.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');
var buttons = require('./io/buttons.js');

var leds = new extra.Leds();
var output = new Logger('robot');

output.debug('start', 'started');
constants.BOT_STATE = 'setup';
output.debug('start', 'setting up');

var behaviors = {
  'chase': require('./behaviors/chase.js'),
  'kick': require('./behaviors/kick.js'),
  'track': require('./behaviors/track.js')
};

var helpers = {
  'position': require('./helpers/position.js')
};

var controllers = {
  'attacker': require('./controllers/attacker.js'),
  'defender': require('./controllers/defender.js')
};

helpers.position.init(output);

var bot = {
  'motors': new motor.DriveMotors('outB', 'outA', output),
  'kicker': new motor.Motor('outD', output),

  'colorSensor': new sensor.ColorSensor('in1', output),
  // 'ultrasonicSensor': new sensor.UltrasonicSensor('in2', output),
  'compass': new sensor.CompassSensor('in4:i2c1', output),
  'seeker': new sensor.SeekerSensor('in3:i2c8', output),

  'battery': new extra.PowerSupply(output)
};

output.info('start', 'checking connections');

bot.motors.check();
bot.colorSensor.check();
// bot.ultrasonicSensor.check();
bot.compass.check();
bot.seeker.check();

bot.battery.check();

output.info('start', 'setting modes');

bot.colorSensor.mode(bot.colorSensor.REFLECTIVE);
// bot.ultrasonicSensor.mode(bot.ultrasonicSensor.DISTANCE);
bot.seeker.mode(bot.seeker.MODULATED);

leds.color(leds.BLACK);

output.info('start', 'other setup');

buttons.event.pressed('up', function () {
  constants.BOT_STATE = 'role set';
  constants.ROLE = 'attack';
  output.debug('start', 'bot set to play in attack');
  start();
});

buttons.event.pressed('down', function () {
  constants.BOT_STATE = 'role set';
  constants.ROLE = 'defend';
  output.debug('start', 'bot set to play in defend');
  start();
});

buttons.event.pressed('enter', function () {
  constants.PAUSED = (constants.PAUSED) ? false : true;
  if (constants.PAUSED) {
    bot.motors.stop();
    bot.kicker.stop();
    output.debug('interrupt', 'program paused');
  }
  else {
    constants.ATTACKER.STATE = 'dribble';
    constants.DEFENDER.STATE = 'track';

    output.debug('interrupt', 'program resumed');
  }
});

buttons.event.pressed('back', function () {
  constants.BOT_STATE = 'end';
  output.debug('end', 'ending program');
  quit();
});

buttons.event.pressed('left', function () {
  if (constants.PAUSED) helpers.position.setRelativeNorth(bot.compass.value());
});

constants.BOT_STATE = 'post_setup';
output.info('start', 'finished setup');

function start () {
  helpers.position.setRelativeNorth(bot.compass.value());
  bot.motors.run(100, 100);

  constants.BOT_STATE = 'looping';
  var loopInterval = setInterval(function () {
    if (!constants.PAUSED) loop();
  }, 50);
}

function loop () {
  // var seekerValues = bot.seeker.value();
  // console.log(seekerValues);
  // behaviors.chase(bot.motors, seekerValues.angle, seekerValues.distance, constants.CHASE_SPEED);

  if (constants.ROLE == 'defend') {
    output.trace('state', '', constants.DEFENDER.STATE);
    controllers.defender(bot, behaviors, helpers, constants);
  }

  if (constants.ROLE == 'attack') {
    output.trace('state', '', constants.ATTACKER.STATE);
    controllers.attacker(bot, behaviors, helpers, constants);
  }
}

function quit () {
  bot.motors.stop();
  bot.kicker.stop();
  process.exit();
}

process.stdin.resume();

function exitHandler (options, err) {
    if (options.exit) quit();
    if (err) console.log(err.stack);
}
 
process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
// process.on('uncaughtException', exitHandler.bind(null));
