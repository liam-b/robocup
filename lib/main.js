var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');
var Leds = require('./leds.js');
var motor = require('./motor.js');

var output = new Logger();
var bot = new Bot();

var version = 'alpha 0'

function start () {
  output.log('start', 'started');
  output.info('start', 'runtime version ' + version);
  output.log('start', 'setup running...');

  var motors = new motor.DriveMotors('outA', 'outB');
  motors.check(output);

  var leds = new Leds();
  leds.green();

  output.info('start', 'finished setup');
}

function loop () {
  // bot.update();
  output.trace('loop', 'looping');
}

module.exports = {'start': start, 'loop': loop};