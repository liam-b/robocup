var fs = require('fs');

var EV_KEY = 0x01;
var buttonEventFile = '/dev/input/by-path/platform-gpio-keys.0-event';

var buttonNames = {
  103: 'up',
  108: 'down',
  105: 'left',
  106: 'right',
  28: 'enter',
  14: 'back'
}

// Keep track of the states of each button
// States are: 'pressed', 'released', and not currently 'neutral'
var button = {
  pressed: {
    'up': function () {},
    'down': function () {},
    'left': function () {},
    'right': function () {},
    'enter': function () {},
    'back': function () {}
  },
  released: {
    'up': function () {},
    'down': function () {},
    'left': function () {},
    'right': function () {},
    'enter': function () {},
    'back': function () {}
  }
}

function parseInputEvents (eventChunk) {
  var events = [];
  for (var i = 0; i < eventChunk.length; i += 16) {
    events.push({
      time: {
        sec: eventChunk.readUInt32LE(i + 0),
        usec: eventChunk.readUInt32LE(i + 4)
      },
      type: eventChunk.readUInt16LE(i + 8),
      code: eventChunk.readUInt16LE(i + 10),
      value: eventChunk.readUInt32LE(i + 12)
    });
  }

  return events;
}

fs.createReadStream(buttonEventFile).on('data', function (chunk) {
  var allEvents = parseInputEvents(chunk);
  var keyEvents = allEvents.filter(function (event) {
    return event.type == EV_KEY;
  });

  for (var keyEventIndex in keyEvents) {
    var keyEvent = keyEvents[keyEventIndex];
    if (keyEvent.code in buttonNames) {
      // buttonStates[buttonNames[keyEvent.code]] = (keyEvent.value) ? 'pressed' : 'released';
      if (keyEvent.value) buttonEvents[buttonNames].pressed()
      else buttonEvents[buttonNames].released()
    }
  }
});

module.exports.event = {
  'pressed': function (button, callback) {
    button.pressed[button] = callback
  },
  'released': function (button, callback) {
    button.released[button] = callback
  }
}
