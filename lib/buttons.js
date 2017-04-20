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
      if (keyEvent.value) button[buttonNames].pressed()
      else button[buttonNames].released()
    }
  }
});

module.exports.event = {
  'pressed': function (buttonID, callback) {
    button.pressed[buttonID] = callback;
  },
  'released': function (buttonID, callback) {
    button.released[buttonID] = callback;
  }
}
