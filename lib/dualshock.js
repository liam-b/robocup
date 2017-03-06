var dualShock = require('dualshock-controller');

var controller = dualShock({
  config: 'dualshock4-generic-driver',
  accelerometerSmoothing : true,
  analogStickSmoothing : false
});

controller.on('error', function () { console.log(err) });

controller.setExtras({
  rumbleLeft:  0,
  rumbleRight: 0,
  red:         0,
  green:       75,
  blue:        225,
  flashOn:     40,
  flashOff:    10
});

controller.on('square:press', function () { console.log('square press') });

controller.on('x:press', function () { console.log('cross press') });

controller.on('left:move', function (data) { console.log('left Moved: ' + data.x + ' | ' + data.y) });

controller.on('right:move', function (data) { console.log('right Moved: ' + data.x + ' | ' + data.y) });