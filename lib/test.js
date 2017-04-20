var buttons = require('./buttons.js');

buttons.event.pressed('up', function () {
  console.log('hello');
})

buttons.event.pressed('back', function () {
  console.log('back butten clicked');
  process.exit();
})

// setInterval(function () {
//   console.log(buttons.checkState('up'));
// }, 300);

