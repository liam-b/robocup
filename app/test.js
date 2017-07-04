var Logger = require('./log.js');
var constants = require('./constants.js');

var motor = require('./io/motor.js');
var sensor = require('./io/sensor.js');
var extra = require('./io/extra.js');

var kick = require('./behaviors/kick.js');
var track = require('./behaviors/track.js');

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

var motor = new motor.Motor('outD', output);
var sensor = new sensor.SeekerSensor('in3:i2c8', output);

sensor.mode(sensor.MODULATED);

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
  console.log('> received:', util.inspect(text));
  switch (text) {
    case '#kick':
      kick(motor);
      break;
    case '#reset':
      kick.reset(motor);
      break;
    default:
      if (text[0] === '$') runArbitrary(text.substr(1, text.length));
  }
  if (text === 'quit\n') {
    console.log('> exiting');
    process.exit();
  }
});

function runArbitrary (text) {
  try {
    eval(text);
  } catch (e) {
    console.log('> ' + e);
  } finally {
    console.log('< evaluated');
  }
}

// setInterval(function () {
//   var values = sensor.value();
//   console.log(values);
//   if (values.distance >= 30 && values.angle >= 5 && values.angle <= 6) setTimeout(function () { kick.kick(motor); }, 500);
// }, 500);
