var ev3dev = require('ev3dev-lang');

var Logger = require('./log.js');
var Bot = require('./bot.js');

var output = new Logger ();
var bot = new Bot ();

var version = 'alpha 0'

function start () {
  output.log('start', 'runtime version ' + version);
  var leftGreen = new ev3dev.LED ('ev3:left:green:ev3dev');
  leftGreen.off();
  // TODO: reset gyro / compass
}

function loop () {
  // bot.update();
  output.log('loop', 'looping');
}

module.exports = {'start': start, 'loop': loop};