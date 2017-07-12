var Logger = require('./log.js');
var constants = require('./constants.js');
var sensor = require('./io/sensor.js');
var buttons = require('./io/buttons.js');

var output = new Logger(leds, (process.argv[2] == 'quiet'));

output.log('start', 'started');

var colorSensor = new sensor.ColorSensor('in1', output)
var ultrasonicSensor = new sensor.UltrasonicSensor('in2', output)
var seeker = new sensor.SeekerSensor('in3:i2c8', output)

output.info('start', 'checking connections');

colorSensor.check()
ultrasonicSensor.check()
seeker.check()

output.info('start', 'setting modes');

bot.colorSensor.mode(bot.colorSensor.REFLECTIVE);
bot.ultrasonicSensor.mode(bot.ultrasonicSensor.DISTANCE);
bot.seeker.mode(bot.seeker.MODULATED);

buttons.event.pressed('back', function () {
  output.log('end', 'ending program');
  process.exit();
});

buttons.event.pressed('enter', function () {
  constants.PAUSED = (constants.PAUSED) ? false : true;
  if (constants.PAUSED) {
    output.log('interrupt', 'program paused');
  }
  else output.log('interrupt', 'program resumed');
});

var loopInterval = setInterval(function () {
  if (!constants.PAUSED) loop();
}, 1000);

function loop() {
  switch (process.argv[2]) {
    case 'color':
      output.log('calibrate', 'color sensor value: ' + colorSensor.value());
      break;
    case 'ultrasonic':
      output.log('calibrate', 'ultrasonic sensor value: ' + ultrasonicSensor.value());
      break;
    case 'seeker':
      output.log('calibrate', 'seeker value: ' + seeker.value());
      break;
  }
}
