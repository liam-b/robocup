var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');

var output = new Logger ();
var bot = new Bot ();

var version = 'alpha 0'

function start () {
  output.log('start', 'runtime version ' + version);
  var leds = new ev3dev.Ev3Leds ()
  console.log(leds);
  // TODO: reset gyro / compass
}

function loop () {
  // bot.update();
  output.log('loop', 'looping');
}

module.exports = {'start': start, 'loop': loop};