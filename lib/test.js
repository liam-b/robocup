var buttons = require('./buttons.js');

buttons.event.pressed('up', function () {
  console.log('hello')
})

// setInterval(function () {
//   console.log(buttons.checkState('up'));
// }, 300);