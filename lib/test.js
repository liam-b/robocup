var buttons = require('./buttons.js');

setInterval(function () {
  console.log(buttons.checkState('up'));
}, 300);