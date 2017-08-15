#!/usr/bin/env node

console.log('            _                            \r\n  _ __ ___ | |__   ___   ___ _   _ _ __  \r\n | \'__\/ _ \\| \'_ \\ \/ _ \\ \/ __| | | | \'_ \\ \r\n | | | (_) | |_) | (_) | (__| |_| | |_) |\r\n |_|  \\___\/|_.__\/ \\___\/ \\___|\\__,_| .__\/ \r\n                                  |_|    ');

// -----

function argumentPassed (arg) {
  return process.argv.indexOf(arg) != -1;
}

Array.prototype.contains = function (item) {
  return this.indexOf(item) != -1;
};

var Logger = require('./log.js');
global.constants = require('./constants.js');
constants.COMPETITION = argumentPassed('--comp');
constants.SURPRESS_TRACE = argumentPassed('--trace');

global.output = new Logger('robot', quit, constants.SURPRESS_TRACE, constants.COMPETITION);

if (constants.COMPETITION) {
  process.argv.push('-p');
  process.argv.push('comp');
}

require('./presets.js');

if (constants.PRESETS.length > 0) output.info('main/presets', 'running presets: [' + constants.PRESETS.toString().replace(',', ', ') + ']');
else output.info('main/presets', 'no active presets');

function errorHandler (err) {
  console.log(err.code);
  console.log(err.stack);
  output.exit('uncaught', 'fatal uncaught error', 'fatal');
  process.exit(1);
}

function quit (level) {
  try {
    bot.motors.stop();
    bot.kicker.stop();
  }
  catch (e) {}
  process.exit(level);
}

if (constants.COMPETITION) {
  output.info('main', 'running with competition flag');
  output.info('main', 'running with much more strict rules');
}

var io = require('../lib/index.js');

process.stdin.resume();

process.on('SIGINT', function (err) {
  output.exit('SIGINT', 'caught ctrl-c', 'info');
});

process.on('uncaughtException', errorHandler);

output.debug('start', 'started');
constants.BOT_STATE = 'setup';
output.debug('start', 'setting up');

global.behaviors = {
  'chase': require('./behaviors/chase.js'),
  'kick': require('./behaviors/kick.js'),
  'track': require('./behaviors/track.js')
};

global.helpers = {
  'position': require('./helpers/position.js')
};

global.controllers = {
  'attacker': require('./controllers/attacker.js'),
  'defender': require('./controllers/defender.js')
};

helpers.position.init(output);

global.bot = {
  'motors': new io.motor.Drive('outB', 'outC', errorHandler),
  'kicker': new io.motor.Motor('outD', errorHandler),

  'colorSensor': new io.sensor.Color('in1', errorHandler),
  'compass': new io.sensor.Compass('in4', errorHandler),
  'seeker': new io.sensor.IRSeeker('in3', errorHandler),

  'battery': new io.extra.Battery(errorHandler),
  'speaker': new io.sound.Speaker(errorHandler)
};

output.info('start', 'setting modes');

bot.colorSensor.mode(bot.colorSensor.REFLECTIVE);
bot.seeker.mode(bot.seeker.MODULATED);

output.info('start', 'other setup');

io.buttons.event.pressed('up', function () {
  constants.BOT_STATE = 'role set';
  constants.ROLE = 'attack';
  output.info('start', 'bot set to play in attack');
  start();
});

io.buttons.event.pressed('down', function () {
  constants.BOT_STATE = 'role set';
  constants.ROLE = 'defend';
  output.info('start', 'bot set to play in defend');
  start();
});

io.buttons.event.pressed('enter', function () {
  constants.PAUSED = (constants.PAUSED) ? false : true;
  if (constants.PAUSED) {
    bot.motors.stop();
    bot.kicker.stop();
    output.info('interrupt', 'program paused');
  }
  else {
    constants.ATTACKER.STATE = 'dribble';
    constants.DEFENDER.STATE = 'track';

    output.info('interrupt', 'program resumed');
  }
});

io.buttons.event.pressed('back', function () {
  constants.BOT_STATE = 'end';
  output.exit('SIGINT', 'caught escape', 'info');
});

io.buttons.event.pressed('left', function () {
  if (constants.PAUSED) helpers.position.setRelativeNorth(bot.compass.value());
});

constants.BOT_STATE = 'post_setup';
output.info('start', 'finished setup');

if (argumentPassed('-d') || argumentPassed('--defender')) {
  start();
  constants.ROLE = 'defend';
}

if (argumentPassed('-a') || argumentPassed('--attacker')) {
  start();
  constants.ROLE = 'attack';
}

function start () {
  bot.motors.run(100, 100);
  
  if (argumentPassed('-p') || argumentPassed('--pause')) {
    constants.PAUSED = true;
    bot.motors.stop();
    bot.kicker.stop();
    output.info('interrupt', 'program paused');
  }
  // helpers.position.setRelativeNorth(bot.compass.value());

  constants.BOT_STATE = 'looping';
  var loopInterval = setInterval(function () {
    if (!constants.PAUSED) loop();
  }, 50);
}

function loop () {
  // var value = bot.seeker.value();

  if (constants.ROLE == 'defend') {
    output.trace('state', 'angle: ' + bot.seeker.angle() + ', dist: ' + bot.seeker.distance(), constants.DEFENDER.STATE);
    // output.trace('state', 'state: ' + bot.motors.state());
    controllers.defender();
  }

  if (constants.ROLE == 'attack') {
    output.trace('state', 'angle: ' + bot.seeker.angle() + ', dist: ' + bot.seeker.distance(), constants.ATTACKER.STATE);
    controllers.attacker();
  }
}
