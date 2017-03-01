var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');
var Leds = require('./leds.js');

var output = new Logger ();
var bot = new Bot ();
var leds = new Leds ();

var version = 'alpha 0'

function start () {
  output.log('start', 'started');
  output.info('start', 'runtime version ' + version);
  output.log('start', 'setup running...');

  leds.orange();

  output.info('start', 'finished setup');
  // leds.green();
}

function loop () {
  // bot.update();
  output.trace('loop', 'looping');
}

module.exports = {'start': start, 'loop': loop};