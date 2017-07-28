var Logger = require('./log.js');
var constants = require('./constants.js');
var sensor = require('./io/sensor.js');
var buttons = require('./io/buttons.js');
var extra = require('./io/extra.js');

var helpers = {
  'position': require('./helpers/position.js')
};

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

output.debug('start', 'started');

var colorSensor = new sensor.ColorSensor('in1', output);
var ultrasonicSensor = new sensor.UltrasonicSensor('in2', output);
var seeker = new sensor.SeekerSensor('in3:i2c8', output);
var compass = new sensor.CompassSensor('in4:i2c1', output);

output.info('start', 'checking connections');

colorSensor.check();
ultrasonicSensor.check();
seeker.check();
compass.check()

output.info('start', 'setting modes');

colorSensor.mode(colorSensor.REFLECTIVE);
ultrasonicSensor.mode(ultrasonicSensor.DISTANCE);
seeker.mode(seeker.MODULATED);
helpers.position.setRelativeNorth(bot.compass.value())

buttons.event.pressed('back', function () {
  output.debug('end', 'ending program');
  process.exit();
});

buttons.event.pressed('enter', function () {
  constants.PAUSED = (constants.PAUSED) ? false : true;
  if (constants.PAUSED) {
    output.debug('interrupt', 'program paused');
  }
  else output.debug('interrupt', 'program resumed');
});

var loopInterval = setInterval(function () {
  if (!constants.PAUSED) loop();
}, 1000);

function loop() {
  switch (process.argv[2]) {
    case 'color':
      output.debug('calibrate', 'color sensor value: ' + colorSensor.value());
      break;
    case 'ultrasonic':
      output.debug('calibrate', 'ultrasonic sensor value: ' + ultrasonicSensor.value());
      break;
    case 'seeker':
      output.debug('calibrate', 'seeker value: ' + seeker.value());
      break;
    case 'direction':
      output.debug('calibrate', 'direction: ' + helpers.position.relativeRotation(compass.value()));
  }
}
